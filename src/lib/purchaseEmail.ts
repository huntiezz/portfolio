import {
  getPurchasableProject,
  getPurchaseScopeLabel,
  type PurchaseFormData,
} from "@/data/purchase";
import {
  getPaymentMethodLabel,
  purchaseCardConfirmationMessage,
  purchaseCryptoConfirmationMessage,
  purchaseCryptoPaidCustomerEmailBody,
  purchaseCryptoPaidCustomerMessage,
} from "@/data/purchasePayment";
import { formatPurchasePrice } from "@/data/purchase";
import { isValidContactValue } from "@/data/quote";
import { QUOTE_TO_EMAIL } from "@/lib/quoteEmail";
import type { CryptoPaymentState } from "@/lib/cryptoPaymentState";
import type { StoredPurchaseInvoice } from "@/lib/purchaseInvoiceStore";

export { QUOTE_TO_EMAIL as PURCHASE_TO_EMAIL };

export function buildPurchaseEmailContent(data: PurchaseFormData, price: number) {
  const project = getPurchasableProject(data.projectId);
  const scope = getPurchaseScopeLabel(data.scope) ?? data.scope ?? "";
  const contactLabel = data.contactMethod === "email" ? "email" : "discord";
  const contactValue = data.contactValue.trim();
  const priceLine = formatPurchasePrice(price);
  const paymentLabel = getPaymentMethodLabel(data.paymentMethod) ?? data.paymentMethod ?? "";

  const lines = [
    `name: ${data.name.trim()}`,
    `purchase: ${scope}`,
    `project: ${project?.title ?? data.projectId ?? ""}`,
    `${contactLabel}: ${contactValue}`,
    `payment: ${paymentLabel}`,
    `price: ${priceLine}`,
  ];

  const text = lines.join("\n");

  const html = `
    <div style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; line-height: 1.6; color: #111;">
      <p style="margin: 0 0 16px; font-size: 14px; letter-spacing: 0.08em; text-transform: uppercase; color: #0c50ff;">project purchase request</p>
      <table style="border-collapse: collapse; font-size: 14px;">
        <tr><td style="padding: 4px 0;">name: ${escapeHtml(data.name.trim())}</td></tr>
        <tr><td style="padding: 4px 0;">purchase: ${escapeHtml(scope)}</td></tr>
        <tr><td style="padding: 4px 0;">project: ${escapeHtml(project?.title ?? data.projectId ?? "")}</td></tr>
        <tr><td style="padding: 4px 0;">${escapeHtml(contactLabel)}: ${escapeHtml(contactValue)}</td></tr>
        <tr><td style="padding: 4px 0;">payment: ${escapeHtml(paymentLabel)}</td></tr>
        <tr><td style="padding: 4px 0;">price: <span style="color: #0c50ff; font-weight: 600;">${escapeHtml(priceLine)}</span></td></tr>
      </table>
    </div>
  `.trim();

  return {
    subject: "project purchase request",
    text,
    html,
    replyTo: data.contactMethod === "email" ? contactValue : undefined,
  };
}

export function buildPurchaseCustomerEmail(data: PurchaseFormData, price: number) {
  const project = getPurchasableProject(data.projectId);
  const scope = getPurchaseScopeLabel(data.scope) ?? data.scope ?? "";
  const name = data.name.trim();
  const message =
    data.paymentMethod === "crypto"
      ? purchaseCryptoConfirmationMessage()
      : purchaseCardConfirmationMessage();
  const priceLine = formatPurchasePrice(price);
  const paymentLabel = getPaymentMethodLabel(data.paymentMethod) ?? data.paymentMethod ?? "";

  const text = [
    `hey ${name},`,
    "",
    message,
    "",
    `project: ${project?.title ?? data.projectId ?? ""}`,
    `purchase: ${scope}`,
    `payment: ${paymentLabel}`,
    `price: ${priceLine}`,
    "",
    "- huntiez",
  ].join("\n");

  const html = `
    <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif; line-height: 1.65; color: #111; max-width: 32rem;">
      <p style="margin: 0 0 16px; font-size: 14px; letter-spacing: 0.08em; text-transform: uppercase; color: #0c50ff;">purchase received</p>
      <p style="margin: 0 0 12px; font-size: 16px;">hey ${escapeHtml(name)},</p>
      <p style="margin: 0 0 20px; font-size: 15px; color: #333;">${escapeHtml(message)}</p>
      <table style="border-collapse: collapse; font-size: 14px; color: #444;">
        <tr><td style="padding: 4px 0;">project: ${escapeHtml(project?.title ?? data.projectId ?? "")}</td></tr>
        <tr><td style="padding: 4px 0;">purchase: ${escapeHtml(scope)}</td></tr>
        <tr><td style="padding: 4px 0;">payment: ${escapeHtml(paymentLabel)}</td></tr>
        <tr><td style="padding: 4px 0;">price: <span style="color: #0c50ff; font-weight: 600;">${escapeHtml(priceLine)}</span></td></tr>
      </table>
      <p style="margin: 24px 0 0; font-size: 14px; color: #666;">- huntiez</p>
    </div>
  `.trim();

  return {
    subject: "purchase received - huntiez",
    text,
    html,
  };
}

export function buildCryptoPaymentOwnerEmail(record: StoredPurchaseInvoice, payment: CryptoPaymentState) {
  const { data, price, orderId, invoice } = record;
  const project = getPurchasableProject(data.projectId);
  const scope = getPurchaseScopeLabel(data.scope) ?? data.scope ?? "";
  const contactLabel = data.contactMethod === "email" ? "email" : "discord";
  const contactValue = data.contactValue.trim();
  const priceLine = formatPurchasePrice(price);
  const received = payment.receivedAmount ?? "unknown amount";

  const lines = [
    `order: ${orderId}`,
    `name: ${data.name.trim()}`,
    `purchase: ${scope}`,
    `project: ${project?.title ?? data.projectId ?? ""}`,
    `${contactLabel}: ${contactValue}`,
    `price: ${priceLine}`,
    `received: ${received}`,
    payment.txHash ? `tx: ${payment.txHash}` : "",
    "",
    "crypto payment confirmed - send the source.",
  ].filter(Boolean);

  const text = lines.join("\n");

  const html = `
    <div style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; line-height: 1.6; color: #111;">
      <p style="margin: 0 0 16px; font-size: 14px; letter-spacing: 0.08em; text-transform: uppercase; color: #0c50ff;">crypto payment confirmed</p>
      <p style="margin: 0 0 16px; font-size: 14px; color: #333;">send the source to the customer.</p>
      <table style="border-collapse: collapse; font-size: 14px;">
        <tr><td style="padding: 4px 0;">order: ${escapeHtml(orderId)}</td></tr>
        <tr><td style="padding: 4px 0;">name: ${escapeHtml(data.name.trim())}</td></tr>
        <tr><td style="padding: 4px 0;">purchase: ${escapeHtml(scope)}</td></tr>
        <tr><td style="padding: 4px 0;">project: ${escapeHtml(project?.title ?? data.projectId ?? "")}</td></tr>
        <tr><td style="padding: 4px 0;">${escapeHtml(contactLabel)}: ${escapeHtml(contactValue)}</td></tr>
        <tr><td style="padding: 4px 0;">price: <span style="color: #0c50ff; font-weight: 600;">${escapeHtml(priceLine)}</span></td></tr>
        <tr><td style="padding: 4px 0;">received: ${escapeHtml(received)}</td></tr>
        ${payment.txHash ? `<tr><td style="padding: 4px 0;">tx: ${escapeHtml(payment.txHash)}</td></tr>` : ""}
      </table>
    </div>
  `.trim();

  return {
    subject: `crypto paid - ${project?.title ?? orderId} - send source`,
    text,
    html,
    replyTo: data.contactMethod === "email" ? contactValue : undefined,
  };
}

export function buildCryptoPaymentCustomerEmail(record: StoredPurchaseInvoice, payment: CryptoPaymentState) {
  const { data, price, orderId } = record;
  const project = getPurchasableProject(data.projectId);
  const scope = getPurchaseScopeLabel(data.scope) ?? data.scope ?? "";
  const name = data.name.trim();
  const priceLine = formatPurchasePrice(price);
  const message = purchaseCryptoPaidCustomerEmailBody(data.contactMethod === "email" ? "email" : "discord");
  const received = payment.receivedAmount ?? "";

  const text = [
    `hey ${name},`,
    "",
    message,
    "",
    `order: ${orderId}`,
    `project: ${project?.title ?? data.projectId ?? ""}`,
    `purchase: ${scope}`,
    `price: ${priceLine}`,
    received ? `paid: ${received}` : "",
    "",
    "- huntiez",
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
    <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif; line-height: 1.65; color: #111; max-width: 32rem;">
      <p style="margin: 0 0 16px; font-size: 14px; letter-spacing: 0.08em; text-transform: uppercase; color: #0c50ff;">payment received</p>
      <p style="margin: 0 0 12px; font-size: 16px;">hey ${escapeHtml(name)},</p>
      <p style="margin: 0 0 20px; font-size: 15px; color: #333;">${escapeHtml(message)}</p>
      <table style="border-collapse: collapse; font-size: 14px; color: #444;">
        <tr><td style="padding: 4px 0;">order: ${escapeHtml(orderId)}</td></tr>
        <tr><td style="padding: 4px 0;">project: ${escapeHtml(project?.title ?? data.projectId ?? "")}</td></tr>
        <tr><td style="padding: 4px 0;">purchase: ${escapeHtml(scope)}</td></tr>
        <tr><td style="padding: 4px 0;">price: <span style="color: #0c50ff; font-weight: 600;">${escapeHtml(priceLine)}</span></td></tr>
        ${received ? `<tr><td style="padding: 4px 0;">paid: ${escapeHtml(received)}</td></tr>` : ""}
      </table>
      <p style="margin: 24px 0 0; font-size: 14px; color: #666;">- huntiez</p>
    </div>
  `.trim();

  return {
    subject: "payment received - huntiez",
    text,
    html,
  };
}

export function purchaseCryptoPaidUiMessage(contactMethod: "email" | "discord" | null): string {
  if (contactMethod === "email") {
    return purchaseCryptoPaidCustomerMessage("email");
  }
  if (contactMethod === "discord") {
    return purchaseCryptoPaidCustomerMessage("discord");
  }
  return "payment received. invoice has been sent to me - i'll confirm and send the source to you.";
}

export function isValidPurchaseSubmission(data: PurchaseFormData, price: number | null): boolean {
  if (price === null || !data.scope || !data.projectId || !data.contactMethod || !data.paymentMethod) return false;
  if (data.name.trim().length < 2) return false;
  return isValidContactValue(data.contactMethod, data.contactValue);
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
