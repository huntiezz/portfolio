import type { CryptoInvoice } from "@/lib/cryptoInvoice";

export const CRYPTO_INVOICE_LOCK_MINUTES = Number(process.env.PURCHASE_CRYPTO_LOCK_MINUTES ?? 15) || 15;
export const CRYPTO_PAYMENT_TOLERANCE_PERCENT =
  Number(process.env.PURCHASE_CRYPTO_TOLERANCE_PERCENT ?? 5) || 5;

export type CryptoPaymentBounds = {
  minUsd: number;
  maxUsd: number;
  toleranceUsd: number;
  tolerancePercent: number;
};

export type CryptoPaymentPolicy = {
  bounds: CryptoPaymentBounds;
  lockMinutes: number;
  expiresAt: string;
  summary: string;
  amountDueLabel: string;
};

export function getCryptoPaymentToleranceUsd(expectedUsd: number): number {
  const fixed = Number(process.env.PURCHASE_CRYPTO_TOLERANCE_USD);
  if (!Number.isNaN(fixed) && fixed >= 0) return fixed;

  const pct = CRYPTO_PAYMENT_TOLERANCE_PERCENT / 100;
  return expectedUsd * pct;
}

export function getCryptoPaymentUsdBounds(expectedUsd: number): CryptoPaymentBounds {
  const toleranceUsd = getCryptoPaymentToleranceUsd(expectedUsd);
  const pct = CRYPTO_PAYMENT_TOLERANCE_PERCENT / 100;
  const fixed = Number(process.env.PURCHASE_CRYPTO_TOLERANCE_USD);
  const usesFixedTolerance = !Number.isNaN(fixed) && fixed >= 0;

  return {
    minUsd: usesFixedTolerance ? Math.max(0, expectedUsd - toleranceUsd) : expectedUsd * (1 - pct),
    maxUsd: usesFixedTolerance ? expectedUsd + toleranceUsd : expectedUsd * (1 + pct),
    toleranceUsd,
    tolerancePercent: CRYPTO_PAYMENT_TOLERANCE_PERCENT,
  };
}

export function isCryptoPaymentAccepted(receivedUsd: number, expectedUsd: number): boolean {
  const { minUsd, maxUsd } = getCryptoPaymentUsdBounds(expectedUsd);
  return receivedUsd >= minUsd && receivedUsd <= maxUsd;
}

export function isCryptoPaymentAcceptedByAmount(
  receivedCrypto: number,
  rateUsd: number,
  expectedUsd: number,
): boolean {
  return isCryptoPaymentAccepted(receivedCrypto * rateUsd, expectedUsd);
}

export function getInvoiceExpiry(createdAt: string): string {
  const created = new Date(createdAt).getTime();
  return new Date(created + CRYPTO_INVOICE_LOCK_MINUTES * 60_000).toISOString();
}

export function isInvoiceExpired(invoice: CryptoInvoice, now = Date.now()): boolean {
  return now >= new Date(invoice.expiresAt).getTime();
}

export function getRemainingLockMs(invoice: CryptoInvoice, now = Date.now()): number {
  return Math.max(0, new Date(invoice.expiresAt).getTime() - now);
}

export function formatLockCountdown(remainingMs: number): string {
  const totalSeconds = Math.ceil(remainingMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export function buildCryptoPaymentPolicy(invoice: CryptoInvoice): CryptoPaymentPolicy {
  const bounds = {
    minUsd: invoice.minUsd,
    maxUsd: invoice.maxUsd,
    toleranceUsd: invoice.toleranceUsd,
    tolerancePercent: invoice.tolerancePercent,
  };

  return {
    bounds,
    lockMinutes: invoice.lockMinutes,
    expiresAt: invoice.expiresAt,
    amountDueLabel: "amount due",
    summary: `Rate locked for ${invoice.lockMinutes} minutes. Send the exact amount due before the lock expires.`,
  };
}

export function normalizeCryptoInvoice(invoice: CryptoInvoice): CryptoInvoice {
  const bounds = getCryptoPaymentUsdBounds(invoice.usdAmount);
  const tolerancePercent = invoice.tolerancePercent ?? bounds.tolerancePercent;
  const lockMinutes = invoice.lockMinutes ?? CRYPTO_INVOICE_LOCK_MINUTES;
  const expiresAt = invoice.expiresAt ?? getInvoiceExpiry(invoice.createdAt);
  const minUsd = invoice.minUsd ?? bounds.minUsd;
  const maxUsd = invoice.maxUsd ?? bounds.maxUsd;
  const toleranceUsd = invoice.toleranceUsd ?? bounds.toleranceUsd;

  return {
    ...invoice,
    minUsd,
    maxUsd,
    toleranceUsd,
    tolerancePercent,
    lockMinutes,
    expiresAt,
  };
}
