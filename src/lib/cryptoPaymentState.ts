import type { CryptoAsset } from "@/data/purchasePayment";

export type CryptoPaymentStatus =
  | "awaiting"
  | "pending"
  | "confirmed"
  | "expired";

export type CryptoPaymentLogEntry = {
  at: string;
  message: string;
};

export type CryptoPaymentState = {
  status: CryptoPaymentStatus;
  asset: CryptoAsset | null;
  txHash: string | null;
  receivedAmount: string | null;
  confirmations: number;
  updatedAt: string;
  logs: CryptoPaymentLogEntry[];
};

export const CHAIN_CONFIRMATIONS: Record<CryptoAsset, { pending: number; confirmed: number }> = {
  btc: { pending: 1, confirmed: 3 },
  eth: { pending: 1, confirmed: 12 },
  ltc: { pending: 1, confirmed: 6 },
  usdc: { pending: 1, confirmed: 12 },
  sol: { pending: 1, confirmed: 32 },
};

export function createEmptyPaymentState(): CryptoPaymentState {
  return {
    status: "awaiting",
    asset: null,
    txHash: null,
    receivedAmount: null,
    confirmations: 0,
    updatedAt: new Date().toISOString(),
    logs: [],
  };
}
