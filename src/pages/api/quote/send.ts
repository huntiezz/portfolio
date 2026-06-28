import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";
import type { QuoteFormData } from "@/data/quote";
import {
  buildCustomerConfirmationEmail,
  buildQuoteEmailContent,
  isValidQuoteSubmission,
  QUOTE_TO_EMAIL,
} from "@/lib/quoteEmail";

type QuoteSendBody = {
  data?: QuoteFormData;
  estimate?: { low: number; high: number };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "method not allowed" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: "email service not configured" });
  }

  const body = req.body as QuoteSendBody;
  const data = body.data;
  const estimate = body.estimate;

  if (!data || !estimate) {
    return res.status(400).json({ error: "invalid quote payload" });
  }

  if (!isValidQuoteSubmission(data, estimate)) {
    return res.status(400).json({ error: "invalid quote data" });
  }

  const from = process.env.RESEND_FROM ?? "huntiez quotes <onboarding@resend.dev>";
  const ownerTo = process.env.QUOTE_TO_EMAIL ?? QUOTE_TO_EMAIL;
  const ownerEmail = buildQuoteEmailContent(data, estimate);
  const resend = new Resend(apiKey);

  try {
    const ownerResult = await resend.emails.send({
      from,
      to: ownerTo,
      subject: ownerEmail.subject,
      text: ownerEmail.text,
      html: ownerEmail.html,
      ...(ownerEmail.replyTo ? { replyTo: ownerEmail.replyTo } : {}),
    });

    if (ownerResult.error) {
      return res.status(502).json({ error: ownerResult.error.message ?? "failed to send quote email" });
    }

    if (data.contactMethod === "email") {
      const customerEmail = buildCustomerConfirmationEmail(data, estimate);
      const customerResult = await resend.emails.send({
        from,
        to: data.contactValue.trim(),
        subject: customerEmail.subject,
        text: customerEmail.text,
        html: customerEmail.html,
      });

      if (customerResult.error) {
        return res.status(502).json({
          error: customerResult.error.message ?? "failed to send confirmation email",
        });
      }

      return res.status(200).json({
        ok: true,
        ownerId: ownerResult.data?.id ?? null,
        customerId: customerResult.data?.id ?? null,
      });
    }

    return res.status(200).json({ ok: true, ownerId: ownerResult.data?.id ?? null });
  } catch {
    return res.status(502).json({ error: "failed to send email" });
  }
}
