"use client";

import { type ReactNode } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { QUOTE_CONTACT_METHODS, type QuoteContactMethod } from "@/data/quote";
import {
  quoteBody,
  quoteBtnBase,
  quoteCardClass,
  quoteCardDescClass,
  quoteCardIconClass,
  quoteContinueArrow,
  quoteContinueBtn,
  quoteGrid,
  quoteHeading,
  quoteInput,
} from "@/components/quote/quoteUi";

export function DiscordIcon({ className = "" }: { className?: string }) {
  return (
    <svg role="img" className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        fill="currentColor"
        d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"
      />
    </svg>
  );
}

export function NameStep({
  name,
  onNameChange,
  onContinue,
  disabled,
  heading,
  body,
}: {
  name: string;
  onNameChange: (value: string) => void;
  onContinue: () => void;
  disabled: boolean;
  heading: ReactNode;
  body: string;
}) {
  return (
    <>
      <h1 className={quoteHeading}>{heading}</h1>
      <p className={quoteBody}>{body}</p>
      <label className="mt-10 block max-w-lg">
        <span className="sr-only">your name</span>
        <input
          autoFocus
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !disabled) onContinue();
          }}
          placeholder="your name"
          className={quoteInput}
        />
      </label>
      <button
        type="button"
        disabled={disabled}
        onClick={onContinue}
        className={`${quoteBtnBase} ${quoteContinueBtn}`}
      >
        continue
        <ArrowRight className={quoteContinueArrow} aria-hidden />
      </button>
    </>
  );
}

export function ContactMethodStep({
  contactMethod,
  onSelect,
  body = "pick whichever you check more often.",
}: {
  contactMethod: QuoteContactMethod | null;
  onSelect: (method: QuoteContactMethod) => void;
  body?: string;
}) {
  return (
    <>
      <h1 className={quoteHeading}>how should i reach you?</h1>
      <p className={quoteBody}>{body}</p>
      <div className={quoteGrid}>
        {QUOTE_CONTACT_METHODS.map((method) => {
          const selected = contactMethod === method.id;
          return (
            <button
              key={method.id}
              type="button"
              onClick={() => onSelect(method.id)}
              className={quoteCardClass(selected)}
            >
              <span className={quoteCardIconClass(selected)}>
                {method.id === "discord" ? (
                  <DiscordIcon className="h-7 w-7" />
                ) : (
                  <Mail className="h-7 w-7" strokeWidth={1.5} aria-hidden />
                )}
              </span>
              <span className="font-pixel text-2xl lowercase tracking-wide">{method.title}</span>
              <span className={quoteCardDescClass(selected)}>{method.description}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}

export function ContactDetailStep({
  contactMethod,
  contactValue,
  onContactValueChange,
  onContinue,
  disabled,
  continueLabel = "continue",
  emailBody = "i'll use this for the estimate summary and follow-up.",
  discordBody = "drop your username so i know who to expect when you dm.",
}: {
  contactMethod: QuoteContactMethod;
  contactValue: string;
  onContactValueChange: (value: string) => void;
  onContinue: () => void;
  disabled: boolean;
  continueLabel?: string;
  emailBody?: string;
  discordBody?: string;
}) {
  const isEmail = contactMethod === "email";

  return (
    <>
      <h1 className={quoteHeading}>{isEmail ? "what's your email?" : "what's your discord?"}</h1>
      <p className={quoteBody}>{isEmail ? emailBody : discordBody}</p>
      <label className="mt-10 block max-w-lg">
        <span className="sr-only">{isEmail ? "email" : "discord username"}</span>
        <input
          autoFocus
          type={isEmail ? "email" : "text"}
          inputMode={isEmail ? "email" : "text"}
          autoComplete={isEmail ? "email" : "username"}
          value={contactValue}
          onChange={(e) => onContactValueChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onContinue();
          }}
          placeholder={isEmail ? "you@company.com" : "@yourusername"}
          className={quoteInput}
        />
      </label>
      <button
        type="button"
        disabled={disabled}
        onClick={onContinue}
        className={`${quoteBtnBase} ${quoteContinueBtn}`}
      >
        {continueLabel}
        <ArrowRight className={quoteContinueArrow} aria-hidden />
      </button>
    </>
  );
}
