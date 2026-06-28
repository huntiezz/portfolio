"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Cloud,
  Code2,
  Cpu,
  Gamepad2,
  Layers,
  LayoutPanelLeft,
  Mail,
  Monitor,
  Plug,
  Rocket,
  Server,
  Terminal,
} from "lucide-react";
import { GameLogo } from "@/components/quote/GameLogos";
import MailSentAnimation from "@/components/quote/MailSentAnimation";
import {
  EMPTY_QUOTE_FORM,
  estimateQuote,
  formatUsd,
  getGameLabel,
  getServiceVariantOption,
  getServiceVariants,
  HUNTIEZ_DISCORD_URL,
  isHacksClientsVariant,
  isValidContactValue,
  QUOTE_CONTACT_METHODS,
  QUOTE_GAMES,
  QUOTE_SERVICES,
  QUOTE_STEPS,
  quoteOrderConfirmationMessage,
  quoteProgressStep,
  quoteTotalSteps,
  type QuoteContactMethod,
  type QuoteFormData,
  type QuoteService,
  type QuoteServiceVariant,
} from "@/data/quote";
import {
  quoteBody,
  quoteBtnBase,
  quoteCardClass,
  quoteCardDescClass,
  quoteCardIconClass,
  quoteCardPriceClass,
  quoteContinueArrow,
  quoteContinueBtn,
  quoteGrid,
  quoteGridFour,
  quoteGridThree,
  quoteHeading,
  quoteInput,
  quoteKicker,
  quotePrimaryBtn,
  quoteSecondaryBtn,
  quoteStepMotion,
  quoteTextarea,
} from "@/components/quote/quoteUi";

const SERVICE_ICONS: Record<QuoteService, typeof Monitor> = {
  frontend: Monitor,
  backend: Server,
  software: Code2,
  "full-web": Layers,
};

const VARIANT_ICONS: Record<QuoteServiceVariant, typeof Monitor> = {
  "frontend-landing": LayoutPanelLeft,
  "frontend-app": BarChart3,
  "backend-api": Plug,
  "backend-platform": Cloud,
  "software-tooling": Terminal,
  "software-system": Cpu,
  "software-hacks-clients": Gamepad2,
  "full-web-mvp": Rocket,
  "full-web-product": Layers,
};

function nextStep(step: number, data: QuoteFormData): number {
  if (step === 3 && !isHacksClientsVariant(data.serviceVariant)) return 5;
  return step + 1;
}

function prevStep(step: number, data: QuoteFormData): number {
  if (step === 5 && !isHacksClientsVariant(data.serviceVariant)) return 3;
  return step - 1;
}

function stepLabel(step: number): string {
  switch (step) {
    case 1:
      return "quote";
    case 2:
      return "service";
    case 3:
      return "type";
    case 4:
      return "game";
    case 5:
      return "tell me more";
    case 6:
      return "almost done";
    case 7:
      return "reach you";
    default:
      return "quote";
  }
}

function canContinue(step: number, data: QuoteFormData): boolean {
  switch (step) {
    case 1:
      return data.name.trim().length >= 2;
    case 2:
      return data.service !== null;
    case 3:
      return data.serviceVariant !== null;
    case 4:
      return isHacksClientsVariant(data.serviceVariant) && data.game !== null;
    case 5:
      return data.description.trim().length >= 12;
    case 6:
      return data.contactMethod !== null;
    case 7:
      return isValidContactValue(data.contactMethod, data.contactValue);
    default:
      return false;
  }
}

export default function QuoteFlow() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<QuoteFormData>(EMPTY_QUOTE_FORM);
  const [submitted, setSubmitted] = useState(false);

  const estimate = useMemo(() => estimateQuote(data), [data]);

  const patch = (partial: Partial<QuoteFormData>) =>
    setData((prev) => {
      const next = { ...prev, ...partial };
      if (partial.service !== undefined && partial.service !== prev.service) {
        next.serviceVariant = null;
        next.game = null;
      }
      if (
        partial.serviceVariant !== undefined &&
        partial.serviceVariant !== prev.serviceVariant &&
        !isHacksClientsVariant(partial.serviceVariant)
      ) {
        next.game = null;
      }
      if (partial.contactMethod !== undefined && partial.contactMethod !== prev.contactMethod) {
        next.contactValue = "";
      }
      return next;
    });

  const goNext = () => {
    if (!canContinue(step, data)) return;
    if (step >= QUOTE_STEPS) setSubmitted(true);
    else setStep((s) => nextStep(s, data));
  };

  const goBack = () => {
    if (submitted) {
      setSubmitted(false);
      return;
    }
    if (step > 1) setStep((s) => prevStep(s, data));
  };

  const totalSteps = quoteTotalSteps(data);
  const activeStep = submitted ? totalSteps : quoteProgressStep(step, data);
  const progressPct = (activeStep / totalSteps) * 100;

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="relative shrink-0">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-border" aria-hidden />
        <div
          className="pointer-events-none absolute left-0 top-0 h-px bg-[#0c50ff] transition-[width] duration-500 ease-out"
          style={{ width: `${progressPct}%` }}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={totalSteps}
          aria-valuenow={activeStep}
          aria-label="quote progress"
        />
        <div className="flex items-center justify-between border-b border-border px-6 py-3 sm:px-10">
          {step > 1 || submitted ? (
            <button
              type="button"
              onClick={goBack}
              className="group inline-flex items-center gap-2 text-sm lowercase text-foreground/70 transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" aria-hidden />
              back
            </button>
          ) : (
            <Link
              href="/pricing"
              className="group inline-flex items-center gap-2 text-sm lowercase text-foreground/70 transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" aria-hidden />
              back
            </Link>
          )}
          <span className="font-mono text-xs lowercase tracking-wide text-foreground/60">
            {String(activeStep).padStart(2, "0")} / {String(totalSteps).padStart(2, "0")}
          </span>
        </div>
      </div>

      <div className="relative min-h-[560px] flex-1 px-6 py-12 sm:px-10 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div key={submitted ? "submitted" : step} {...quoteStepMotion}>
              {submitted && estimate ? (
                <SubmittedStep data={data} estimate={estimate} />
              ) : (
                <>
                  <QuoteKicker>
                    {step === 3 && data.service
                      ? `${QUOTE_SERVICES.find((s) => s.id === data.service)?.title ?? stepLabel(step)} | ${String(step).padStart(2, "0")}`
                      : step === 2
                        ? `nice to meet you, ${data.name.trim().split(/\s+/)[0] ?? "there"}`
                        : `${stepLabel(step)} | ${String(step).padStart(2, "0")}`}
                  </QuoteKicker>

                  {step === 1 ? <NameStep data={data} onPatch={patch} onContinue={goNext} /> : null}
                  {step === 2 ? <ServiceStep data={data} onPatch={patch} onContinue={goNext} /> : null}
                  {step === 3 ? <ServiceVariantStep data={data} onPatch={patch} onContinue={goNext} /> : null}
                  {step === 4 && isHacksClientsVariant(data.serviceVariant) ? (
                    <GameStep data={data} onPatch={patch} onContinue={goNext} />
                  ) : null}
                  {step === 5 ? <ScopeStep data={data} onPatch={patch} onContinue={goNext} /> : null}
                  {step === 6 ? (
                    <ContactMethodStep
                      data={data}
                      onSelect={(method) => {
                        patch({ contactMethod: method });
                        setStep(7);
                      }}
                    />
                  ) : null}
                  {step === 7 ? <ContactDetailStep data={data} onPatch={patch} onContinue={goNext} /> : null}
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function QuoteKicker({ children }: { children: ReactNode }) {
  return <span className={quoteKicker}>{children}</span>;
}

function ContinueButton({
  disabled,
  onClick,
  label = "continue",
}: {
  disabled: boolean;
  onClick: () => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`${quoteBtnBase} ${quoteContinueBtn}`}
    >
      {label}
      <ArrowRight className={quoteContinueArrow} aria-hidden />
    </button>
  );
}

function WaveEmoji() {
  return (
    <motion.span
      className="inline-block origin-[70%_70%]"
      animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
      transition={{ duration: 1.15, repeat: Infinity, repeatDelay: 0.85, ease: "easeInOut" }}
      aria-hidden
    >
      👋
    </motion.span>
  );
}

function NameStep({
  data,
  onPatch,
  onContinue,
}: {
  data: QuoteFormData;
  onPatch: (partial: Partial<QuoteFormData>) => void;
  onContinue: () => void;
}) {
  return (
    <>
      <h1 className={quoteHeading}>
        <span className="block">
          hey there <WaveEmoji />
        </span>
        <span className="block">whats your name?</span>
      </h1>
      <p className={quoteBody}>let&apos;s get a quote together. it&apos;ll take about a minute.</p>
      <label className="mt-10 block max-w-lg">
        <span className="sr-only">your name</span>
        <input
          autoFocus
          value={data.name}
          onChange={(e) => onPatch({ name: e.target.value })}
          onKeyDown={(e) => {
            if (e.key === "Enter") onContinue();
          }}
          placeholder="your name"
          className={quoteInput}
        />
      </label>
      <ContinueButton disabled={!canContinue(1, data)} onClick={onContinue} />
    </>
  );
}

function ServiceStep({
  data,
  onPatch,
  onContinue,
}: {
  data: QuoteFormData;
  onPatch: (partial: Partial<QuoteFormData>) => void;
  onContinue: () => void;
}) {
  return (
    <>
      <h1 className={quoteHeading}>what do you need?</h1>
      <p className={quoteBody}>pick the service you&apos;re interested in. you can change this later.</p>
      <div className={quoteGridFour}>
        {QUOTE_SERVICES.map((service) => {
          const Icon = SERVICE_ICONS[service.id];
          const selected = data.service === service.id;
          return (
            <button
              key={service.id}
              type="button"
              onClick={() => onPatch({ service: service.id })}
              className={quoteCardClass(selected)}
            >
              <span className={quoteCardIconClass(selected)}>
                <Icon className="h-8 w-8 sm:h-9 sm:w-9" strokeWidth={1.5} aria-hidden />
              </span>
              <span className="font-pixel text-2xl lowercase tracking-wide sm:text-3xl">{service.title}</span>
              <span className={`${quoteCardDescClass(selected)} text-sm sm:text-base`}>
                {service.description}
              </span>
            </button>
          );
        })}
      </div>
      <ContinueButton disabled={!canContinue(2, data)} onClick={onContinue} />
    </>
  );
}

function ServiceVariantStep({
  data,
  onPatch,
  onContinue,
}: {
  data: QuoteFormData;
  onPatch: (partial: Partial<QuoteFormData>) => void;
  onContinue: () => void;
}) {
  const serviceMeta = QUOTE_SERVICES.find((s) => s.id === data.service);
  const variants = data.service ? getServiceVariants(data.service) : [];

  if (!serviceMeta || variants.length === 0) return null;

  return (
    <>
      <h1 className={quoteHeading}>{serviceMeta.variantHeading}</h1>
      <p className={quoteBody}>{serviceMeta.variantHint}</p>
      <div className={variants.length > 2 ? quoteGridThree : quoteGrid}>
        {variants.map((variant) => {
          const Icon = VARIANT_ICONS[variant.id];
          const selected = data.serviceVariant === variant.id;
          return (
            <button
              key={variant.id}
              type="button"
              onClick={() => onPatch({ serviceVariant: variant.id })}
              className={quoteCardClass(selected)}
            >
              <span className={quoteCardIconClass(selected)}>
                <Icon className="h-7 w-7" strokeWidth={1.5} aria-hidden />
              </span>
              <div className="flex w-full items-baseline justify-between gap-3">
                <span className="font-pixel text-2xl lowercase tracking-wide">{variant.title}</span>
                <span className={quoteCardPriceClass(selected)}>{formatUsd(variant.basePrice)}</span>
              </div>
              <span className={quoteCardDescClass(selected)}>{variant.description}</span>
            </button>
          );
        })}
      </div>
      <ContinueButton disabled={!canContinue(3, data)} onClick={onContinue} />
    </>
  );
}

function GameStep({
  data,
  onPatch,
  onContinue,
}: {
  data: QuoteFormData;
  onPatch: (partial: Partial<QuoteFormData>) => void;
  onContinue: () => void;
}) {
  return (
    <>
      <h1 className={quoteHeading}>what game?</h1>
      <p className={quoteBody}>pick the title this hack or client is for.</p>
      <div className={`${quoteGrid} sm:grid-cols-2 lg:grid-cols-3`}>
        {QUOTE_GAMES.map((game) => {
          const selected = data.game === game.id;
          return (
            <button
              key={game.id}
              type="button"
              onClick={() => onPatch({ game: game.id })}
              className={quoteCardClass(selected)}
            >
              <span className={quoteCardIconClass(selected)}>
                <GameLogo game={game.id} />
              </span>
              <span className="font-pixel text-2xl lowercase tracking-wide">{game.title}</span>
              <span className={quoteCardDescClass(selected)}>{game.description}</span>
            </button>
          );
        })}
      </div>
      <ContinueButton disabled={!canContinue(4, data)} onClick={onContinue} />
    </>
  );
}

function ScopeStep({
  data,
  onPatch,
  onContinue,
}: {
  data: QuoteFormData;
  onPatch: (partial: Partial<QuoteFormData>) => void;
  onContinue: () => void;
}) {
  const charCount = data.description.length;

  return (
    <>
      <h1 className={quoteHeading}>what are we making?</h1>
      <p className={quoteBody}>
        a sentence or two is plenty. who&apos;s it for, what&apos;s the vibe, links to anything you love.
      </p>
      <label className="relative mt-10 block">
        <span className="sr-only">project description</span>
        <textarea
          autoFocus
          rows={6}
          value={data.description}
          onChange={(e) => onPatch({ description: e.target.value })}
          placeholder="a portfolio site for a film photographer, minimal, lots of whitespace…"
          className={quoteTextarea}
        />
        <span className="pointer-events-none absolute bottom-3 right-4 font-mono text-[11px] lowercase tracking-wide text-foreground/35">
          {charCount} chars
        </span>
      </label>
      <ContinueButton disabled={!canContinue(5, data)} onClick={onContinue} />
    </>
  );
}

function DiscordIcon({ className = "" }: { className?: string }) {
  return (
    <svg role="img" className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        fill="currentColor"
        d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"
      />
    </svg>
  );
}

function ContactMethodStep({
  data,
  onSelect,
}: {
  data: QuoteFormData;
  onSelect: (method: QuoteContactMethod) => void;
}) {
  return (
    <>
      <h1 className={quoteHeading}>how should i reach you?</h1>
      <p className={quoteBody}>pick whichever you check more often.</p>
      <div className={quoteGrid}>
        {QUOTE_CONTACT_METHODS.map((method) => {
          const selected = data.contactMethod === method.id;
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

function ContactDetailStep({
  data,
  onPatch,
  onContinue,
}: {
  data: QuoteFormData;
  onPatch: (partial: Partial<QuoteFormData>) => void;
  onContinue: () => void;
}) {
  const isEmail = data.contactMethod === "email";

  return (
    <>
      <h1 className={quoteHeading}>{isEmail ? "what's your email?" : "what's your discord?"}</h1>
      <p className={quoteBody}>
        {isEmail
          ? "i'll use this for the estimate summary and follow-up."
          : "drop your username so i know who to expect when you dm."}
      </p>
      <label className="mt-10 block max-w-lg">
        <span className="sr-only">{isEmail ? "email" : "discord username"}</span>
        <input
          autoFocus
          type={isEmail ? "email" : "text"}
          inputMode={isEmail ? "email" : "text"}
          autoComplete={isEmail ? "email" : "username"}
          value={data.contactValue}
          onChange={(e) => onPatch({ contactValue: e.target.value })}
          onKeyDown={(e) => {
            if (e.key === "Enter") onContinue();
          }}
          placeholder={isEmail ? "you@company.com" : "yourusername"}
          className={quoteInput}
        />
      </label>
      <ContinueButton disabled={!canContinue(7, data)} onClick={onContinue} label="get instant quote" />
    </>
  );
}

function SubmittedStep({ data, estimate }: { data: QuoteFormData; estimate: { low: number; high: number } }) {
  const service = QUOTE_SERVICES.find((s) => s.id === data.service)?.title ?? data.service;
  const variant = getServiceVariantOption(data.serviceVariant)?.title;
  const game = getGameLabel(data.game);
  const totalSteps = quoteTotalSteps(data);
  const isEmail = data.contactMethod === "email";
  const [sendState, setSendState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const sendQuoteEmail = async () => {
    if (sendState === "sending" || sendState === "sent") return;
    setSendState("sending");

    const minAnim = new Promise((resolve) => setTimeout(resolve, 1750));

    try {
      const [res] = await Promise.all([
        fetch("/api/quote/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data, estimate }),
        }),
        minAnim,
      ]);

      if (!res.ok) {
        setSendState("error");
        return;
      }

      setSendState("sent");
    } catch {
      setSendState("error");
    }
  };

  return (
    <>
      <QuoteKicker>estimate | {String(totalSteps).padStart(2, "0")}</QuoteKicker>
      <h1 className={quoteHeading}>your instant quote</h1>
      <p className={quoteBody}>
        {isEmail && sendState === "sent"
          ? quoteOrderConfirmationMessage()
          : `ballpark for ${variant ?? service} work based on scope. final pricing follows a quick chat.`}
      </p>

      <div className="mt-10 border border-border bg-transparent p-6">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-foreground/50">estimated range</p>
        <p className="mt-3 font-pixel text-4xl lowercase tracking-wide text-[#0c50ff] sm:text-5xl">
          {formatUsd(estimate.low)} – {formatUsd(estimate.high)}
        </p>
        <ul className="mt-6 space-y-2 text-sm text-foreground/70">
          <li>
            <span className="text-foreground/45">name | </span>
            {data.name.trim()}
          </li>
          <li>
            <span className="text-foreground/45">service | </span>
            {service}
            {variant ? ` | ${variant}` : ""}
            {game ? ` | ${game}` : ""}
          </li>
          <li>
            <span className="text-foreground/45">{data.contactMethod ?? "contact"} | </span>
            {data.contactValue.trim()}
          </li>
        </ul>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        {data.contactMethod === "discord" ? (
          <a
            href={HUNTIEZ_DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`${quoteBtnBase} ${quotePrimaryBtn} no-underline`}
          >
            open discord
            <ArrowRight className={quoteContinueArrow} aria-hidden />
          </a>
        ) : (
          <>
            <button
              type="button"
              onClick={() => void sendQuoteEmail()}
              disabled={sendState === "sending" || sendState === "sent"}
              aria-busy={sendState === "sending"}
              aria-live="polite"
              className={`${quoteBtnBase} ${quotePrimaryBtn} ${sendState === "sending" ? "cursor-wait" : ""} disabled:cursor-default disabled:opacity-100`}
            >
              {sendState === "sending" ? (
                <>
                  <span className="motion-reduce:hidden">
                    <MailSentAnimation />
                  </span>
                  <span className="hidden motion-reduce:inline">sending…</span>
                </>
              ) : sendState === "sent" ? (
                "sent ✓"
              ) : sendState === "error" ? (
                <>
                  try again
                  <ArrowRight className={quoteContinueArrow} aria-hidden />
                </>
              ) : (
                <>
                  place order
                  <ArrowRight className={quoteContinueArrow} aria-hidden />
                </>
              )}
            </button>
            {sendState === "error" ? (
              <p className="w-full text-sm text-red-400">couldn&apos;t send - try again or dm on discord.</p>
            ) : null}
          </>
        )}
        <Link href="/projects" className={`${quoteBtnBase} ${quoteSecondaryBtn} no-underline`}>
          view work
        </Link>
      </div>
    </>
  );
}
