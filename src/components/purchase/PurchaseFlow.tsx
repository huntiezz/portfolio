"use client";

import { useCallback, useMemo, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Layers, Monitor, Server } from "lucide-react";
import { useRouter } from "next/router";
import {
  EMPTY_PURCHASE_FORM,
  getPurchasePrice,
  getPurchaseScopeLabel,
  getPurchasableProject,
  getPurchasableProjects,
  PURCHASE_SCOPES,
  PURCHASE_STEPS,
  formatPurchasePrice,
  type PurchaseFormData,
  type PurchaseScope,
} from "@/data/purchase";
import {
  purchaseCardConfirmationMessage,
} from "@/data/purchasePayment";
import { HUNTIEZ_DISCORD_URL, isValidContactValue } from "@/data/quote";
import type { CryptoInvoice } from "@/lib/cryptoInvoice";
import type { CryptoPaymentState } from "@/lib/cryptoPaymentState";
import type { StoredPurchaseInvoice } from "@/lib/purchaseInvoiceStore";
import { getPurchaseOrderPath } from "@/lib/purchaseOrderPaths";
import MailSentAnimation from "@/components/quote/MailSentAnimation";
import { ContactDetailStep, ContactMethodStep, NameStep } from "@/components/quote/ContactSteps";
import CryptoInvoicePanel, {
  CryptoInvoiceError,
  CryptoInvoiceLoading,
} from "@/components/purchase/CryptoInvoicePanel";
import { PaymentMethodStep } from "@/components/purchase/PaymentSteps";
import {
  quoteBody,
  quoteBtnBase,
  quoteCardClass,
  quoteCardDescClass,
  quoteCardIconClass,
  quoteCardPriceClass,
  quoteContinueArrow,
  quoteFlowContent,
  quoteGridThree,
  quoteHeading,
  quoteKicker,
  quotePrimaryBtn,
  quoteStepMotion,
} from "@/components/quote/quoteUi";

const SCOPE_ICONS: Record<PurchaseScope, typeof Monitor> = {
  frontend: Monitor,
  backend: Server,
  full: Layers,
};

function canContinue(step: number, data: PurchaseFormData): boolean {
  switch (step) {
    case 1:
      return data.scope !== null;
    case 2:
      return data.projectId !== null;
    case 3:
      return data.name.trim().length >= 2;
    case 4:
      return data.contactMethod !== null;
    case 5:
      return (
        getPurchasePrice(data) !== null &&
        data.contactMethod !== null &&
        isValidContactValue(data.contactMethod, data.contactValue)
      );
    case 6:
      return data.paymentMethod !== null;
    default:
      return false;
  }
}

function QuoteKicker({ children }: { children: ReactNode }) {
  return <p className={quoteKicker}>{children}</p>;
}

function restoredState(restoredInvoice: StoredPurchaseInvoice | null) {
  if (!restoredInvoice) {
    return {
      step: 1,
      data: EMPTY_PURCHASE_FORM,
      submitted: false,
      invoiceState: "idle" as const,
      invoice: null as CryptoInvoice | null,
    };
  }

  return {
    step: PURCHASE_STEPS,
    data: restoredInvoice.data,
    submitted: true,
    invoiceState: "ready" as const,
    invoice: restoredInvoice.invoice,
  };
}

export default function PurchaseFlow({
  onExit,
  restoredInvoice = null,
}: {
  onExit?: () => void;
  restoredInvoice?: StoredPurchaseInvoice | null;
}) {
  const router = useRouter();
  const initial = restoredState(restoredInvoice);
  const [step, setStep] = useState(initial.step);
  const [data, setData] = useState<PurchaseFormData>(initial.data);
  const [submitted, setSubmitted] = useState(initial.submitted);
  const [sendState, setSendState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [invoiceState, setInvoiceState] = useState<"idle" | "loading" | "ready" | "error">(
    initial.invoiceState,
  );
  const [invoice, setInvoice] = useState<CryptoInvoice | null>(initial.invoice);
  const [invoiceError, setInvoiceError] = useState<string | null>(null);
  const [cryptoPaymentStatus, setCryptoPaymentStatus] = useState<
    CryptoPaymentState["status"] | null
  >(restoredInvoice?.payment?.status ?? null);

  const projects = useMemo(() => getPurchasableProjects(), []);
  const price = useMemo(() => getPurchasePrice(data), [data]);
  const selectedProject = useMemo(() => getPurchasableProject(data.projectId), [data.projectId]);

  const patch = (partial: Partial<PurchaseFormData>) =>
    setData((prev) => {
      const next = { ...prev, ...partial };
      if (partial.scope !== undefined && partial.scope !== prev.scope) {
        next.projectId = null;
      }
      if (partial.contactMethod !== undefined && partial.contactMethod !== prev.contactMethod) {
        next.contactValue = "";
      }
      return next;
    });

  const goNext = () => {
    if (!canContinue(step, data)) return;
    if (step >= PURCHASE_STEPS) setSubmitted(true);
    else setStep((s) => s + 1);
  };

  const goBack = () => {
    if (submitted) {
      if (restoredInvoice) {
        onExit?.();
        return;
      }
      setSubmitted(false);
      setSendState("idle");
      setInvoiceState("idle");
      setInvoice(null);
      setInvoiceError(null);
      return;
    }
    if (step > 1) setStep((s) => s - 1);
    else onExit?.();
  };

  const loadInvoice = useCallback(async (payload: PurchaseFormData = data) => {
    if (payload.paymentMethod !== "crypto") return;
    setInvoiceState("loading");
    setInvoiceError(null);

    try {
      const res = await fetch("/api/purchase/invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: payload }),
      });
      const json = (await res.json()) as { invoice?: CryptoInvoice; error?: string };
      if (!res.ok || !json.invoice) {
        setInvoiceState("error");
        setInvoiceError(json.error ?? "couldn't generate invoice");
        return;
      }
      setInvoice(json.invoice);
      setInvoiceState("ready");
      void router.push(getPurchaseOrderPath(json.invoice.orderId));
    } catch {
      setInvoiceState("error");
      setInvoiceError("couldn't generate invoice");
    }
  }, [data, router]);

  const sendPurchase = async () => {
    if (sendState === "sending" || sendState === "sent" || price === null || data.paymentMethod !== "card") return;
    setSendState("sending");

    const minAnim = new Promise((resolve) => setTimeout(resolve, 1750));

    try {
      const [res] = await Promise.all([
        fetch("/api/purchase/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data }),
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

  const activeStep = submitted ? PURCHASE_STEPS : step;
  const progressPct = (activeStep / PURCHASE_STEPS) * 100;

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="relative shrink-0">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-border" aria-hidden />
        <div
          className="pointer-events-none absolute left-0 top-0 h-px bg-[#0c50ff] transition-[width] duration-500 ease-out"
          style={{ width: `${progressPct}%` }}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={PURCHASE_STEPS}
          aria-valuenow={activeStep}
          aria-label="purchase progress"
        />
        <div className="flex items-center justify-between border-b border-border px-6 py-3 sm:px-10">
          {step > 1 || submitted || onExit ? (
            <button
              type="button"
              onClick={goBack}
              className="group inline-flex items-center gap-2 text-sm lowercase text-foreground/70 transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" aria-hidden />
              back
            </button>
          ) : (
            <span />
          )}
          <span className="font-mono text-xs lowercase tracking-wide text-foreground/60">
            {String(activeStep).padStart(2, "0")} / {String(PURCHASE_STEPS).padStart(2, "0")}
          </span>
        </div>
      </div>

      <div className={quoteFlowContent}>
        <div className="mx-auto max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div key={submitted ? "submitted" : step} {...quoteStepMotion}>
            {submitted && price !== null && selectedProject ? (
              data.paymentMethod === "crypto" ? (
                <>
                  {invoiceState === "loading" ? (
                    <CryptoInvoiceLoading />
                  ) : invoiceState === "error" ? (
                    <CryptoInvoiceError
                      message={invoiceError ?? "couldn't generate invoice"}
                      onRetry={() => void loadInvoice()}
                    />
                  ) : invoice ? (
                    <CryptoInvoicePanel
                      invoice={invoice}
                      projectTitle={selectedProject.title}
                      scopeLabel={getPurchaseScopeLabel(data.scope) ?? ""}
                      priceLabel={formatPurchasePrice(price)}
                      contactMethod={data.contactMethod}
                      contactValue={data.contactValue}
                      initialPayment={restoredInvoice?.payment ?? null}
                      onPaymentStatusChange={setCryptoPaymentStatus}
                    />
                  ) : null}

                  {data.contactMethod === "discord" && cryptoPaymentStatus !== "confirmed" ? (
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <a
                        href={HUNTIEZ_DISCORD_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${quoteBtnBase} ${quotePrimaryBtn} no-underline`}
                      >
                        open discord
                        <ArrowRight className={quoteContinueArrow} aria-hidden />
                      </a>
                    </div>
                  ) : null}
                </>
              ) : (
                <>
                  <QuoteKicker>purchase | {String(PURCHASE_STEPS).padStart(2, "0")}</QuoteKicker>
                  <h2 className={quoteHeading}>ready to purchase</h2>
                  <p className={quoteBody}>
                    {data.contactMethod === "email" && sendState === "sent"
                      ? purchaseCardConfirmationMessage()
                      : "review your selection, then place the order."}
                  </p>

                  <div className="mt-6 flex flex-wrap items-end justify-between gap-4 border border-border px-4 py-4 sm:px-5">
                    <div>
                      <p className="font-mono text-xs lowercase text-foreground/55">
                        {selectedProject.title} · {getPurchaseScopeLabel(data.scope)}
                      </p>
                      <p className="mt-1 font-pixel text-3xl lowercase tracking-wide text-[#0c50ff] sm:text-4xl">
                        {formatPurchasePrice(price)}
                      </p>
                    </div>
                    <ul className="space-y-1 text-sm text-foreground/65">
                      <li>
                        <span className="text-foreground/45">name: </span>
                        {data.name.trim()}
                      </li>
                      <li>
                        <span className="text-foreground/45">{data.contactMethod ?? "contact"}: </span>
                        {data.contactValue.trim()}
                      </li>
                    </ul>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
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
                      <button
                        type="button"
                        onClick={() => void sendPurchase()}
                        disabled={sendState === "sending" || sendState === "sent"}
                        aria-busy={sendState === "sending"}
                        aria-live="polite"
                        className={`${quoteBtnBase} ${quotePrimaryBtn} min-w-[10.5rem] ${sendState === "sending" ? "cursor-wait" : ""} disabled:cursor-default disabled:opacity-100`}
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
                        ) : (
                          <>
                            place order
                            <ArrowRight className={quoteContinueArrow} aria-hidden />
                          </>
                        )}
                      </button>
                    )}
                    {sendState === "error" ? (
                      <p className="text-sm text-red-500">couldn&apos;t send - try again or dm on discord.</p>
                    ) : null}
                  </div>
                </>
              )
            ) : step === 1 ? (
              <>
                <QuoteKicker>purchase | 01</QuoteKicker>
                <h2 className={quoteHeading}>what are you buying?</h2>
                <p className={quoteBody}>pick frontend, backend, or the full project codebase.</p>
                <ul className={`${quoteGridThree} list-none`}>
                  {PURCHASE_SCOPES.map((scope) => {
                    const Icon = SCOPE_ICONS[scope.id];
                    const selected = data.scope === scope.id;
                    return (
                      <li key={scope.id}>
                        <button
                          type="button"
                          onClick={() => {
                            patch({ scope: scope.id });
                            setStep(2);
                          }}
                          className={quoteCardClass(selected)}
                        >
                          <span className={quoteCardIconClass(selected)}>
                            <Icon className="h-8 w-8 sm:h-9 sm:w-9" strokeWidth={1.5} aria-hidden />
                          </span>
                          <span className="font-pixel text-2xl lowercase tracking-wide sm:text-3xl">
                            {scope.title}
                          </span>
                          <span className={quoteCardDescClass(selected)}>{scope.description}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </>
            ) : step === 2 ? (
              <>
                <QuoteKicker>{getPurchaseScopeLabel(data.scope) ?? "project"} | 02</QuoteKicker>
                <h2 className={quoteHeading}>pick a project</h2>
                <p className={quoteBody}>choose from ready-made builds in the portfolio.</p>
                <ul className={`${quoteGridThree} list-none`}>
                  {projects.map((project) => {
                    const selected = data.projectId === project.id;
                    const scopePrice = data.scope ? project.prices[data.scope] : null;
                    return (
                      <li key={project.id}>
                        <button
                          type="button"
                          onClick={() => {
                            patch({ projectId: project.id });
                            setStep(3);
                          }}
                          className={quoteCardClass(selected)}
                        >
                          <div className="flex w-full items-start justify-between gap-3">
                            {project.coverSrc ? (
                              <div className="h-12 w-12 shrink-0 overflow-hidden border border-border bg-muted/10">
                                <img src={project.coverSrc} alt="" className="h-full w-full object-cover" />
                              </div>
                            ) : (
                              <div className={quoteCardIconClass(selected)}>
                                <Layers className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                              </div>
                            )}
                            {scopePrice !== null ? (
                              <span className={quoteCardPriceClass(selected)}>{formatPurchasePrice(scopePrice)}</span>
                            ) : null}
                          </div>
                          <div className="space-y-2 text-left">
                            <h3 className="font-pixel text-xl lowercase leading-none tracking-wide sm:text-2xl">
                              {project.title}
                            </h3>
                            <p className={`${quoteCardDescClass(selected)} line-clamp-2`}>
                              {project.summary}
                            </p>
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </>
            ) : step === 3 ? (
              <>
                <QuoteKicker>contact | 03</QuoteKicker>
                <NameStep
                  name={data.name}
                  onNameChange={(value) => patch({ name: value })}
                  onContinue={goNext}
                  disabled={!canContinue(3, data)}
                  heading="what&apos;s your name?"
                  body="so i know who the order is for."
                />
              </>
            ) : step === 4 ? (
              <>
                <QuoteKicker>
                  nice to meet you, {data.name.trim().split(/\s+/)[0] ?? "there"}
                </QuoteKicker>
                <ContactMethodStep
                  contactMethod={data.contactMethod}
                  onSelect={(method) => {
                    patch({ contactMethod: method });
                    setStep(5);
                  }}
                />
              </>
            ) : step === 5 && data.contactMethod ? (
              <>
                <QuoteKicker>contact | 05</QuoteKicker>
                <ContactDetailStep
                  contactMethod={data.contactMethod}
                  contactValue={data.contactValue}
                  onContactValueChange={(value) => patch({ contactValue: value })}
                  onContinue={goNext}
                  disabled={!canContinue(5, data)}
                  continueLabel="continue"
                  emailBody="i'll send payment and delivery details here."
                  discordBody="drop your username so i know who to expect."
                />
              </>
            ) : step === 6 ? (
              <>
                <QuoteKicker>payment | 06</QuoteKicker>
                <PaymentMethodStep
                  paymentMethod={data.paymentMethod}
                  onSelect={(method) => {
                    const next = { ...data, paymentMethod: method };
                    patch({ paymentMethod: method });
                    setSubmitted(true);
                    if (method === "crypto") void loadInvoice(next);
                  }}
                />
              </>
            ) : null}
          </motion.div>
        </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
