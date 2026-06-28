import type { CryptoInvoiceLine } from "@/lib/cryptoInvoice";
import { fetchIncomingTxsForAsset, type ChainIncomingTx } from "@/lib/cryptoChainChecks";
import {
  CHAIN_CONFIRMATIONS,
  createEmptyPaymentState,
  type CryptoPaymentLogEntry,
  type CryptoPaymentState,
  type CryptoPaymentStatus,
} from "@/lib/cryptoPaymentState";
import { isInvoiceExpired } from "@/lib/cryptoPaymentPolicy";
import type { StoredPurchaseInvoice } from "@/lib/purchaseInvoiceStore";

function appendLog(
  logs: CryptoPaymentLogEntry[],
  message: string,
): CryptoPaymentLogEntry[] {
  if (logs.some((entry) => entry.message === message)) return logs;
  return [...logs, { at: new Date().toISOString(), message }];
}

function findMatchingTx(
  txs: ChainIncomingTx[],
  line: CryptoInvoiceLine,
  sinceMs: number,
): ChainIncomingTx | null {
  const min = Number.parseFloat(line.minAmount);
  const max = Number.parseFloat(line.maxAmount);
  const target = Number.parseFloat(line.amount);

  const candidates = txs
    .filter((tx) => tx.timestampMs >= sinceMs - 120_000)
    .filter((tx) => tx.amount >= min && tx.amount <= max)
    .sort((a, b) => {
      const aDistance = Math.abs(a.amount - target);
      const bDistance = Math.abs(b.amount - target);
      if (aDistance !== bDistance) return aDistance - bDistance;
      return a.timestampMs - b.timestampMs;
    });

  return candidates[0] ?? null;
}

function statusFromConfirmations(
  confirmations: number,
  asset: NonNullable<CryptoPaymentState["asset"]>,
): CryptoPaymentStatus {
  const required = CHAIN_CONFIRMATIONS[asset];
  if (confirmations >= required.confirmed) return "confirmed";
  if (confirmations >= required.pending) return "pending";
  return "pending";
}

export async function checkInvoicePayment(record: StoredPurchaseInvoice): Promise<CryptoPaymentState> {
  const previous = record.payment ?? createEmptyPaymentState();
  if (previous.status === "confirmed") return previous;

  let logs = [...previous.logs];
  const sinceMs = new Date(record.invoice.createdAt).getTime();
  const expired = isInvoiceExpired(record.invoice);

  if (expired && !previous.txHash) {
    logs = appendLog(logs, "rate lock expired - no matching payment detected");
    return {
      ...previous,
      status: "expired",
      updatedAt: new Date().toISOString(),
      logs,
    };
  }

  logs = appendLog(logs, "checking wallet for incoming payment (no memo required)…");

  let bestMatch: { line: CryptoInvoiceLine; tx: ChainIncomingTx } | null = null;

  for (const line of record.invoice.lines) {
    try {
      const txs = await fetchIncomingTxsForAsset(line.asset, line.address);
      const match = findMatchingTx(txs, line, sinceMs);
      if (!match) continue;

      if (!bestMatch || match.timestampMs < bestMatch.tx.timestampMs) {
        bestMatch = { line, tx: match };
      }
    } catch {
      logs = appendLog(logs, `couldn't reach ${line.symbol.toLowerCase()} network - will retry`);
    }
  }

  if (!bestMatch) {
    if (expired && previous.txHash) {
      return {
        ...previous,
        status: "pending",
        updatedAt: new Date().toISOString(),
        logs,
      };
    }

    return {
      ...previous,
      status: expired ? "expired" : "awaiting",
      updatedAt: new Date().toISOString(),
      logs,
    };
  }

  const { line, tx } = bestMatch;
  const status = statusFromConfirmations(tx.confirmations, line.asset);
  const required = CHAIN_CONFIRMATIONS[line.asset];

  if (tx.hash !== previous.txHash) {
    logs = appendLog(
      logs,
      `found ${line.symbol} payment ${tx.hash.slice(0, 10)}… (${tx.amount} ${line.symbol})`,
    );
  }

  if (status === "pending" && previous.status !== "pending") {
    logs = appendLog(
      logs,
      `payment detected - waiting for confirmations (${tx.confirmations}/${required.confirmed})`,
    );
  }

  if (status === "confirmed") {
    logs = appendLog(logs, "payment confirmed");
  }

  return {
    status,
    asset: line.asset,
    txHash: tx.hash,
    receivedAmount: `${tx.amount} ${line.symbol}`,
    confirmations: tx.confirmations,
    updatedAt: new Date().toISOString(),
    logs,
  };
}
