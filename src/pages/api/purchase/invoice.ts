import type { NextApiRequest, NextApiResponse } from "next";
import type { PurchaseFormData } from "@/data/purchase";
import { getPurchasePrice } from "@/data/purchase";
import { buildCryptoInvoice, createOrderId } from "@/lib/cryptoInvoice";
import { isValidPurchaseSubmission } from "@/lib/purchaseEmail";
import {
  getPurchaseInvoice,
  savePurchaseInvoice,
} from "@/lib/purchaseInvoiceStore";
import { isValidOrderId } from "@/lib/purchaseOrderPaths";

type InvoiceBody = {
  data?: PurchaseFormData;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const orderId = typeof req.query.order === "string" ? req.query.order : "";
    if (!isValidOrderId(orderId)) {
      return res.status(400).json({ error: "invalid order id" });
    }

    const record = await getPurchaseInvoice(orderId);
    if (!record) {
      return res.status(404).json({ error: "invoice not found" });
    }

    return res.status(200).json({ ok: true, ...record });
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ error: "method not allowed" });
  }

  const data = (req.body as InvoiceBody).data;
  if (!data) {
    return res.status(400).json({ error: "invalid purchase payload" });
  }

  if (data.paymentMethod !== "crypto") {
    return res.status(400).json({ error: "invoice only available for crypto payments" });
  }

  const price = getPurchasePrice(data);
  if (!isValidPurchaseSubmission(data, price)) {
    return res.status(400).json({ error: "invalid purchase data" });
  }

  try {
    const orderId = createOrderId();
    const invoice = await buildCryptoInvoice(price!, orderId);

    await savePurchaseInvoice({
      orderId,
      invoice,
      data,
      price: price!,
      createdAt: new Date().toISOString(),
    });

    return res.status(200).json({ ok: true, orderId, invoice });
  } catch (err) {
    const message = err instanceof Error ? err.message : "failed to generate invoice";
    if (message.includes("no crypto wallets")) {
      return res.status(503).json({ error: "crypto payments not configured" });
    }
    return res.status(502).json({ error: message });
  }
}
