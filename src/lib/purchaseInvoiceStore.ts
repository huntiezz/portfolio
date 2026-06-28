import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import type { PurchaseFormData } from "@/data/purchase";
import type { CryptoInvoice } from "@/lib/cryptoInvoice";
import type { CryptoPaymentState } from "@/lib/cryptoPaymentState";
import { isValidOrderId } from "@/lib/purchaseOrderPaths";

export type StoredPurchaseInvoice = {
  orderId: string;
  invoice: CryptoInvoice;
  data: PurchaseFormData;
  price: number;
  createdAt: string;
  payment?: CryptoPaymentState;
  paymentEmailsSent?: boolean;
};

const STORE_DIR = path.join(process.cwd(), ".data", "purchase-invoices");

function invoicePath(orderId: string): string {
  return path.join(STORE_DIR, `${orderId}.json`);
}

export async function savePurchaseInvoice(record: StoredPurchaseInvoice): Promise<void> {
  await mkdir(STORE_DIR, { recursive: true });
  await writeFile(invoicePath(record.orderId), JSON.stringify(record), "utf8");
}

export async function getPurchaseInvoice(orderId: string): Promise<StoredPurchaseInvoice | null> {
  if (!isValidOrderId(orderId)) return null;

  try {
    const raw = await readFile(invoicePath(orderId), "utf8");
    return JSON.parse(raw) as StoredPurchaseInvoice;
  } catch {
    return null;
  }
}
