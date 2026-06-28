import { Resend } from "resend";
import {
  buildCryptoPaymentCustomerEmail,
  buildCryptoPaymentOwnerEmail,
  PURCHASE_TO_EMAIL,
} from "@/lib/purchaseEmail";
import type { CryptoPaymentState } from "@/lib/cryptoPaymentState";
import type { StoredPurchaseInvoice } from "@/lib/purchaseInvoiceStore";

export async function sendCryptoPaymentConfirmedEmails(
  record: StoredPurchaseInvoice,
  payment: CryptoPaymentState,
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const from = process.env.RESEND_FROM ?? "huntiez quotes <onboarding@resend.dev>";
  const ownerTo = process.env.QUOTE_TO_EMAIL ?? PURCHASE_TO_EMAIL;
  const resend = new Resend(apiKey);

  const ownerEmail = buildCryptoPaymentOwnerEmail(record, payment);
  const ownerResult = await resend.emails.send({
    from,
    to: ownerTo,
    subject: ownerEmail.subject,
    text: ownerEmail.text,
    html: ownerEmail.html,
    ...(ownerEmail.replyTo ? { replyTo: ownerEmail.replyTo } : {}),
  });

  if (ownerResult.error) {
    throw new Error(ownerResult.error.message ?? "failed to send owner payment email");
  }

  if (record.data.contactMethod === "email") {
    const customerEmail = buildCryptoPaymentCustomerEmail(record, payment);
    const customerResult = await resend.emails.send({
      from,
      to: record.data.contactValue.trim(),
      subject: customerEmail.subject,
      text: customerEmail.text,
      html: customerEmail.html,
    });

    if (customerResult.error) {
      throw new Error(customerResult.error.message ?? "failed to send customer payment email");
    }
  }
}
