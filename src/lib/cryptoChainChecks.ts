import type { CryptoAsset } from "@/data/purchasePayment";

export type ChainIncomingTx = {
  hash: string;
  amount: number;
  timestampMs: number;
  confirmations: number;
};

const USDC_CONTRACT = (process.env.PURCHASE_USDC_CONTRACT ?? "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48").toLowerCase();

function parseAmount(value: string, decimals: number): number {
  const raw = BigInt(value);
  const base = 10n ** BigInt(decimals);
  const whole = raw / base;
  const fraction = raw % base;
  return Number(whole) + Number(fraction) / Number(base);
}

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  if (!res.ok) throw new Error(`chain fetch failed (${res.status})`);
  return (await res.json()) as T;
}

async function fetchEthIncomingTxs(address: string): Promise<ChainIncomingTx[]> {
  const apiKey = process.env.ETHERSCAN_API_KEY?.trim();
  if (apiKey) {
    const url = new URL("https://api.etherscan.io/v2/api");
    url.searchParams.set("chainid", "1");
    url.searchParams.set("module", "account");
    url.searchParams.set("action", "txlist");
    url.searchParams.set("address", address);
    url.searchParams.set("startblock", "0");
    url.searchParams.set("endblock", "99999999");
    url.searchParams.set("page", "1");
    url.searchParams.set("offset", "50");
    url.searchParams.set("sort", "desc");
    url.searchParams.set("apikey", apiKey);

    const json = await fetchJson<{ status?: string; result?: Array<Record<string, string>> }>(url.toString());
    if (json.status !== "1" || !Array.isArray(json.result)) return [];

    return json.result
      .filter((tx) => tx.to?.toLowerCase() === address.toLowerCase() && tx.isError === "0")
      .map((tx) => ({
        hash: tx.hash,
        amount: parseAmount(tx.value, 18),
        timestampMs: Number(tx.timeStamp) * 1000,
        confirmations: Number(tx.confirmations ?? 0),
      }));
  }

  const blockscoutUrl = `https://eth.blockscout.com/api/v2/addresses/${address}/transactions`;
  const json = await fetchJson<{ items?: Array<Record<string, unknown>> }>(blockscoutUrl);
  const items = json.items ?? [];

  return items
    .filter((item) => {
      const to = item.to as { hash?: string } | undefined;
      return to?.hash?.toLowerCase() === address.toLowerCase() && item.status === "ok";
    })
    .map((item) => ({
      hash: String(item.hash),
      amount: parseAmount(String(item.value ?? "0"), 18),
      timestampMs: new Date(String(item.timestamp ?? 0)).getTime(),
      confirmations: Number(item.confirmations ?? 0),
    }));
}

async function fetchUsdcIncomingTxs(address: string): Promise<ChainIncomingTx[]> {
  const apiKey = process.env.ETHERSCAN_API_KEY?.trim();
  if (apiKey) {
    const url = new URL("https://api.etherscan.io/v2/api");
    url.searchParams.set("chainid", "1");
    url.searchParams.set("module", "account");
    url.searchParams.set("action", "tokentx");
    url.searchParams.set("contractaddress", USDC_CONTRACT);
    url.searchParams.set("address", address);
    url.searchParams.set("page", "1");
    url.searchParams.set("offset", "50");
    url.searchParams.set("sort", "desc");
    url.searchParams.set("apikey", apiKey);

    const json = await fetchJson<{ status?: string; result?: Array<Record<string, string>> }>(url.toString());
    if (json.status !== "1" || !Array.isArray(json.result)) return [];

    return json.result
      .filter((tx) => tx.to?.toLowerCase() === address.toLowerCase())
      .map((tx) => ({
        hash: tx.hash,
        amount: parseAmount(tx.value, Number(tx.tokenDecimal ?? 6)),
        timestampMs: Number(tx.timeStamp) * 1000,
        confirmations: Number(tx.confirmations ?? 0),
      }));
  }

  const blockscoutUrl = `https://eth.blockscout.com/api/v2/addresses/${address}/token-transfers`;
  const json = await fetchJson<{ items?: Array<Record<string, unknown>> }>(blockscoutUrl);
  const items = json.items ?? [];

  return items
    .filter((item) => {
      const to = item.to as { hash?: string } | undefined;
      const token = item.token as { address_hash?: string } | undefined;
      return (
        to?.hash?.toLowerCase() === address.toLowerCase() &&
        token?.address_hash?.toLowerCase() === USDC_CONTRACT
      );
    })
    .map((item) => {
      const total = item.total as { value?: string; decimals?: string } | undefined;
      const decimals = Number(total?.decimals ?? 6);
      return {
        hash: String(item.transaction_hash ?? item.hash),
        amount: parseAmount(String(total?.value ?? "0"), decimals),
        timestampMs: new Date(String(item.timestamp ?? 0)).getTime(),
        confirmations: Number(item.confirmations ?? 0),
      };
    });
}

async function fetchBtcIncomingTxs(address: string): Promise<ChainIncomingTx[]> {
  const txs = await fetchJson<
    Array<{
      txid: string;
      status: { confirmed?: boolean; block_height?: number; block_time?: number };
      vout: Array<{ scriptpubkey_address?: string; value: number }>;
    }>
  >(`https://blockstream.info/api/address/${address}/txs`);

  let tipHeight = 0;
  try {
    tipHeight = Number(await fetch(`https://blockstream.info/api/blocks/tip/height`).then((r) => r.text()));
  } catch {
    /* ignore */
  }

  const incoming: ChainIncomingTx[] = [];

  for (const tx of txs) {
    const receivedSats = tx.vout
      .filter((out) => out.scriptpubkey_address === address)
      .reduce((sum, out) => sum + out.value, 0);
    if (receivedSats <= 0) continue;

    const blockHeight = tx.status.block_height ?? 0;
    const confirmations =
      tx.status.confirmed && blockHeight > 0 && tipHeight > 0 ? Math.max(1, tipHeight - blockHeight + 1) : 0;

    incoming.push({
      hash: tx.txid,
      amount: receivedSats / 1e8,
      timestampMs: (tx.status.block_time ?? 0) * 1000,
      confirmations,
    });
  }

  return incoming;
}

async function fetchLtcIncomingTxs(address: string): Promise<ChainIncomingTx[]> {
  const json = await fetchJson<{
    txs?: Array<{
      hash: string;
      confirmed?: string;
      received?: string;
      confirmations?: number;
      confirmed_at?: string;
    }>;
  }>(`https://api.blockcypher.com/v1/ltc/main/addrs/${address}/full?limit=30`);

  return (json.txs ?? [])
    .filter((tx) => Number(tx.received ?? 0) > 0)
    .map((tx) => ({
      hash: tx.hash,
      amount: Number(tx.received) / 1e8,
      timestampMs: tx.confirmed_at ? new Date(tx.confirmed_at).getTime() : Date.now(),
      confirmations: tx.confirmations ?? 0,
    }));
}

async function fetchSolIncomingTxs(address: string): Promise<ChainIncomingTx[]> {
  const rpcUrl = process.env.SOLANA_RPC_URL?.trim() ?? "https://api.mainnet-beta.solana.com";
  const sigRes = await fetchJson<{
    result?: Array<{ signature: string; blockTime?: number; confirmationStatus?: string }>;
  }>(rpcUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "getSignaturesForAddress",
      params: [address, { limit: 20 }],
    }),
  });

  const incoming: ChainIncomingTx[] = [];

  for (const sig of sigRes.result ?? []) {
    const txRes = await fetchJson<{
      result?: {
        meta?: { postBalances?: number[]; preBalances?: number[] };
        transaction?: { message?: { accountKeys?: Array<string | { pubkey: string }> } };
      };
    }>(rpcUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getTransaction",
        params: [sig.signature, { encoding: "json", maxSupportedTransactionVersion: 0 }],
      }),
    });

    const result = txRes.result;
    if (!result?.meta || !result.transaction?.message?.accountKeys) continue;

    const keys = result.transaction.message.accountKeys.map((key) =>
      typeof key === "string" ? key : key.pubkey,
    );
    const index = keys.indexOf(address);
    if (index < 0) continue;

    const pre = result.meta.preBalances?.[index] ?? 0;
    const post = result.meta.postBalances?.[index] ?? 0;
    const lamports = post - pre;
    if (lamports <= 0) continue;

    incoming.push({
      hash: sig.signature,
      amount: lamports / 1e9,
      timestampMs: (sig.blockTime ?? 0) * 1000,
      confirmations: sig.confirmationStatus === "finalized" ? 32 : sig.confirmationStatus === "confirmed" ? 1 : 0,
    });
  }

  return incoming;
}

export async function fetchIncomingTxsForAsset(asset: CryptoAsset, address: string): Promise<ChainIncomingTx[]> {
  switch (asset) {
    case "eth":
      return fetchEthIncomingTxs(address);
    case "usdc":
      return fetchUsdcIncomingTxs(address);
    case "btc":
      return fetchBtcIncomingTxs(address);
    case "ltc":
      return fetchLtcIncomingTxs(address);
    case "sol":
      return fetchSolIncomingTxs(address);
    default:
      return [];
  }
}
