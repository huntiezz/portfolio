import {
  formatUsd,
  getGameLabel,
  getServiceVariantOption,
  isValidContactValue,
  quoteOrderConfirmationMessage,
  QUOTE_SERVICES,
  type QuoteFormData,
} from "@/data/quote";

export const QUOTE_TO_EMAIL = "huntiezsobased@gmail.com";

export function buildQuoteEmailContent(data: QuoteFormData, estimate: { low: number; high: number }) {
  const service = QUOTE_SERVICES.find((s) => s.id === data.service)?.title ?? data.service ?? "";
  const variant = getServiceVariantOption(data.serviceVariant)?.title ?? data.serviceVariant ?? "";
  const game = data.game ? getGameLabel(data.game) : null;
  const contactLabel = data.contactMethod === "email" ? "email" : "discord";
  const contactValue = data.contactValue.trim();
  const estimateLine = `${formatUsd(estimate.low)} – ${formatUsd(estimate.high)}`;

  const lines = [
    `name: ${data.name.trim()}`,
    `service: ${service}`,
    `type: ${variant}`,
    ...(game ? [`game: ${game}`] : []),
    `${contactLabel}: ${contactValue}`,
    `estimate: ${estimateLine}`,
    "",
    "project details:",
    data.description.trim(),
  ];

  const text = lines.join("\n");

  const html = `
    <div style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; line-height: 1.6; color: #111;">
      <p style="margin: 0 0 16px; font-size: 14px; letter-spacing: 0.08em; text-transform: uppercase; color: #0c50ff;">new quote request</p>
      <table style="border-collapse: collapse; font-size: 14px;">
        <tr><td style="padding: 4px 12px 4px 0; color: #666;">name</td><td>${escapeHtml(data.name.trim())}</td></tr>
        <tr><td style="padding: 4px 12px 4px 0; color: #666;">service</td><td>${escapeHtml(service)}</td></tr>
        <tr><td style="padding: 4px 12px 4px 0; color: #666;">type</td><td>${escapeHtml(variant)}</td></tr>
        ${game ? `<tr><td style="padding: 4px 12px 4px 0; color: #666;">game</td><td>${escapeHtml(game)}</td></tr>` : ""}
        <tr><td style="padding: 4px 12px 4px 0; color: #666;">${escapeHtml(contactLabel)}</td><td>${escapeHtml(contactValue)}</td></tr>
        <tr><td style="padding: 4px 12px 4px 0; color: #666;">estimate</td><td style="color: #0c50ff; font-weight: 600;">${escapeHtml(estimateLine)}</td></tr>
      </table>
      <p style="margin: 24px 0 8px; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: #666;">project details</p>
      <p style="margin: 0; white-space: pre-wrap; font-size: 14px;">${escapeHtml(data.description.trim())}</p>
    </div>
  `.trim();

  return {
    subject: "project quote request",
    text,
    html,
    replyTo: data.contactMethod === "email" ? contactValue : undefined,
  };
}

export function buildCustomerConfirmationEmail(data: QuoteFormData, estimate: { low: number; high: number }) {
  const service = QUOTE_SERVICES.find((s) => s.id === data.service)?.title ?? data.service ?? "";
  const variant = getServiceVariantOption(data.serviceVariant)?.title ?? data.serviceVariant ?? "";
  const game = data.game ? getGameLabel(data.game) : null;
  const estimateLine = `${formatUsd(estimate.low)} – ${formatUsd(estimate.high)}`;
  const name = data.name.trim();
  const message = quoteOrderConfirmationMessage();

  const text = [
    `hey ${name},`,
    "",
    message,
    "",
    `service: ${service}`,
    `type: ${variant}`,
    ...(game ? [`game: ${game}`] : []),
    `estimated range: ${estimateLine}`,
    "",
    "- huntiez",
  ].join("\n");

  const html = `
    <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif; line-height: 1.65; color: #111; max-width: 32rem;">
      <p style="margin: 0 0 16px; font-size: 14px; letter-spacing: 0.08em; text-transform: uppercase; color: #0c50ff;">order received</p>
      <p style="margin: 0 0 12px; font-size: 16px;">hey ${escapeHtml(name)},</p>
      <p style="margin: 0 0 20px; font-size: 15px; color: #333;">${escapeHtml(message)}</p>
      <table style="border-collapse: collapse; font-size: 14px; color: #444;">
        <tr><td style="padding: 4px 12px 4px 0; color: #888;">service</td><td>${escapeHtml(service)} | ${escapeHtml(variant)}</td></tr>
        ${game ? `<tr><td style="padding: 4px 12px 4px 0; color: #888;">game</td><td>${escapeHtml(game)}</td></tr>` : ""}
        <tr><td style="padding: 4px 12px 4px 0; color: #888;">estimate</td><td style="color: #0c50ff; font-weight: 600;">${escapeHtml(estimateLine)}</td></tr>
      </table>
      <p style="margin: 24px 0 0; font-size: 14px; color: #666;">- huntiez</p>
    </div>
  `.trim();

  return {
    subject: "order received - huntiez",
    text,
    html,
  };
}

export function isValidQuoteSubmission(
  data: QuoteFormData,
  estimate: { low: number; high: number } | null,
): boolean {
  if (!estimate || !data.service || !data.serviceVariant || !data.contactMethod) return false;
  if (data.name.trim().length < 2) return false;
  if (data.description.trim().length < 12) return false;
  return isValidContactValue(data.contactMethod, data.contactValue);
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
