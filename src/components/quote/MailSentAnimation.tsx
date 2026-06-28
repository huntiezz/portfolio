import { Mail } from "lucide-react";

export default function MailSentAnimation() {
  return (
    <span className="inline-flex items-center gap-2 lowercase">
      sending…
      <span className="quote-send-mail" aria-hidden>
        <span className="quote-send-mail-trail" />
        <Mail className="quote-send-mail-icon" strokeWidth={1.75} />
      </span>
    </span>
  );
}
