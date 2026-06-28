import {
  getPurchasableProject,
  getPurchaseScopeLabel,
  type PurchaseFormData,
} from "@/data/purchase";
import {
  getPaymentMethodLabel,
  purchaseCardConfirmationMessage,
  purchaseCryptoConfirmationMessage,
} from "@/data/purchasePayment";
import { formatPurchasePrice } from "@/data/purchase";
import { isValidContactValue } from "@/data/quote";
import { QUOTE_TO_EMAIL } from "@/lib/quoteEmail";

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

export function isValidPurchaseSubmission(data: PurchaseFormData, price: number | null): boolean {
  if (price === null || !data.scope || !data.projectId || !data.contactMethod || !data.paymentMethod) return false;
  if (data.name.trim().length < 2) return false;
  return isValidContactValue(data.contactMethod, data.contactValue);
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
