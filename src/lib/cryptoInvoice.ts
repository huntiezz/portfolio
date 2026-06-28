import type { CryptoAsset } from "@/data/purchasePayment";
import { CRYPTO_ASSETS } from "@/data/purchasePayment";
import {
  CRYPTO_INVOICE_LOCK_MINUTES,
  getCryptoPaymentUsdBounds,
  getInvoiceExpiry,
} from "@/lib/cryptoPaymentPolicy";

export type CryptoWalletConfig = {
  asset: CryptoAsset;
  address: string;
};

export type CryptoInvoiceLine = {
  asset: CryptoAsset;
  title: string;
  symbol: string;
  address: string;
  amount: string;
  amountDisplay: string;
  minAmount: string;
  maxAmount: string;
  amountRangeDisplay: string;
  paymentUri: string;
  usdAmount: number;
  minUsd: number;
  maxUsd: number;
};

export type CryptoInvoice = {
  orderId: string;
  usdAmount: number;
  minUsd: number;
  maxUsd: number;
  toleranceUsd: number;
  tolerancePercent: number;
  lockMinutes: number;
  expiresAt: string;
  lines: CryptoInvoiceLine[];
  createdAt: string;
};

export {
  getCryptoPaymentToleranceUsd,
  getCryptoPaymentUsdBounds,
  isCryptoPaymentAccepted,
  isCryptoPaymentAcceptedByAmount,
} from "@/lib/cryptoPaymentPolicy";

const USDC_CONTRACT = process.env.PURCHASE_USDC_CONTRACT ?? "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

const WALLET_ENV: Record<CryptoAsset, string> = {
  btc: "PURCHASE_WALLET_BTC",
  eth: "PURCHASE_WALLET_ETH",
  ltc: "PURCHASE_WALLET_LTC",
  usdc: "PURCHASE_WALLET_USDC",
  sol: "PURCHASE_WALLET_SOL",
};

export function getConfiguredWallets(): CryptoWalletConfig[] {
  return CRYPTO_ASSETS.flatMap((asset) => {
    const address = process.env[WALLET_ENV[asset.id]]?.trim();
    if (!address) return [];
    return [{ asset: asset.id, address }];
  });
}

export function createOrderId(): string {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `HNT-${stamp}-${rand}`;
}

function formatCryptoAmount(amount: number, maxDecimals: number): string {
  const fixed = amount.toFixed(maxDecimals);
  return fixed.replace(/(\.\d*?[1-9])0+$/, "$1").replace(/\.0+$/, "");
}

export async function fetchCryptoUsdRates(): Promise<Record<CryptoAsset, number>> {
  const ids = CRYPTO_ASSETS.map((a) => a.coingeckoId).join(",");
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("failed to fetch crypto rates");

  const json = (await res.json()) as Record<string, { usd?: number }>;
  const rates = {} as Record<CryptoAsset, number>;

  for (const asset of CRYPTO_ASSETS) {
    const usd = json[asset.coingeckoId]?.usd;
    if (!usd || usd <= 0) throw new Error(`missing rate for ${asset.id}`);
    rates[asset.id] = usd;
  }

  return rates;
}

function buildPaymentUri(
  asset: CryptoAsset,
  address: string,
  cryptoAmount: number,
  decimals: number,
  orderId: string,
): string {
  const amount = formatCryptoAmount(cryptoAmount, decimals);

  switch (asset) {
    case "btc":
      return `bitcoin:${address}?amount=${amount}&label=huntiez&message=${encodeURIComponent(orderId)}`;
    case "ltc":
      return `litecoin:${address}?amount=${amount}&label=huntiez&message=${encodeURIComponent(orderId)}`;
    case "eth":
      return `ethereum:${address}?value=${amount}&label=huntiez`;
    case "sol":
      return `solana:${address}?amount=${amount}&label=huntiez&message=${encodeURIComponent(orderId)}`;
    case "usdc": {
      const raw = Math.round(cryptoAmount * 10 ** decimals);
      return `ethereum:${USDC_CONTRACT}/transfer?address=${address}&uint256=${raw}`;
    }
    default:
      return address;
  }
}

export async function buildCryptoInvoice(usdAmount: number, orderId: string): Promise<CryptoInvoice> {
  const wallets = getConfiguredWallets();
  if (wallets.length === 0) {
    throw new Error("no crypto wallets configured");
  }

  const rates = await fetchCryptoUsdRates();
  const createdAt = new Date().toISOString();
  const { minUsd, maxUsd, toleranceUsd, tolerancePercent } = getCryptoPaymentUsdBounds(usdAmount);
  const lines: CryptoInvoiceLine[] = [];

  for (const wallet of wallets) {
    const meta = CRYPTO_ASSETS.find((a) => a.id === wallet.asset);
    if (!meta) continue;

    const rate = rates[wallet.asset];
    const cryptoAmount = usdAmount / rate;
    const minCryptoAmount = minUsd / rate;
    const maxCryptoAmount = maxUsd / rate;
    const amount = formatCryptoAmount(cryptoAmount, meta.decimals);
    const minAmount = formatCryptoAmount(minCryptoAmount, meta.decimals);
    const maxAmount = formatCryptoAmount(maxCryptoAmount, meta.decimals);
    const paymentUri = buildPaymentUri(wallet.asset, wallet.address, cryptoAmount, meta.decimals, orderId);

    lines.push({
      asset: wallet.asset,
      title: meta.title,
      symbol: meta.symbol,
      address: wallet.address,
      amount,
      amountDisplay: `${amount} ${meta.symbol}`,
      minAmount,
      maxAmount,
      amountRangeDisplay: `${minAmount} – ${maxAmount} ${meta.symbol}`,
      paymentUri,
      usdAmount,
      minUsd,
      maxUsd,
    });
  }

  return {
    orderId,
    usdAmount,
    minUsd,
    maxUsd,
    toleranceUsd,
    tolerancePercent,
    lockMinutes: CRYPTO_INVOICE_LOCK_MINUTES,
    expiresAt: getInvoiceExpiry(createdAt),
    lines,
    createdAt,
  };
}
