"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import type { CryptoInvoice, CryptoInvoiceLine } from "@/lib/cryptoInvoice";
import {
  buildCryptoPaymentPolicy,
  formatLockCountdown,
  getRemainingLockMs,
  isInvoiceExpired,
  normalizeCryptoInvoice,
} from "@/lib/cryptoPaymentPolicy";
import type { CryptoPaymentState } from "@/lib/cryptoPaymentState";
import { createEmptyPaymentState } from "@/lib/cryptoPaymentState";
import type { QuoteContactMethod } from "@/data/quote";
import { purchaseCryptoPaidUiMessage } from "@/lib/purchaseEmail";
import { getCryptoAssetMeta, type CryptoAsset } from "@/data/purchasePayment";
import { CryptoLogo } from "@/components/purchase/CryptoLogos";

const QR_DISPLAY_SIZE = 220;
const QR_RENDER_SCALE = 4;

type CryptoInvoicePanelProps = {
  invoice: CryptoInvoice;
  projectTitle: string;
  scopeLabel: string;
  priceLabel: string;
  contactMethod: QuoteContactMethod | null;
  contactValue: string;
  initialPayment?: CryptoPaymentState | null;
  onPaymentStatusChange?: (status: CryptoPaymentState["status"]) => void;
};

async function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

async function generateQrWithLogo(uri: string, logoSrc: string): Promise<string> {
  const renderSize = QR_DISPLAY_SIZE * QR_RENDER_SCALE;
  const canvas = document.createElement("canvas");
  canvas.width = renderSize;
  canvas.height = renderSize;

  await QRCode.toCanvas(canvas, uri, {
    width: renderSize,
    margin: 2 * QR_RENDER_SCALE,
    errorCorrectionLevel: "H",
    color: { dark: "#0c50ff", light: "#ffffff" },
  });

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas unavailable");

  const logo = await loadImage(logoSrc);
  const logoSize = renderSize * 0.19;
  const logoX = (renderSize - logoSize) / 2;
  const logoY = (renderSize - logoSize) / 2;

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);

  return canvas.toDataURL("image/png");
}

async function generateQr(uri: string): Promise<string> {
  const renderSize = QR_DISPLAY_SIZE * QR_RENDER_SCALE;
  return QRCode.toDataURL(uri, {
    width: renderSize,
    margin: 2 * QR_RENDER_SCALE,
    errorCorrectionLevel: "H",
    color: { dark: "#0c50ff", light: "#ffffff" },
  });
}

function PaymentQr({ uri, label, asset }: { uri: string; label: string; asset: CryptoAsset }) {
  const [src, setSrc] = useState<string | null>(null);
  const logoSrc = getCryptoAssetMeta(asset)?.logoSrc;

  useEffect(() => {
    let active = true;

    const render = async () => {
      try {
        const url = logoSrc ? await generateQrWithLogo(uri, logoSrc) : await generateQr(uri);
        if (active) setSrc(url);
      } catch {
        if (active) setSrc(null);
      }
    };

    void render();
    return () => {
      active = false;
    };
  }, [uri, logoSrc]);

  return (
    <div className="mx-auto w-fit sm:mx-0">
      <div className="rounded-sm border border-border bg-white p-3">
        {src ? (
          <img
            src={src}
            alt={`${label} payment qr code`}
            width={QR_DISPLAY_SIZE}
            height={QR_DISPLAY_SIZE}
            draggable={false}
            className="block"
            style={{ width: QR_DISPLAY_SIZE, height: QR_DISPLAY_SIZE }}
          />
        ) : (
          <div
            className="flex items-center justify-center bg-white text-xs text-foreground/40"
            style={{ width: QR_DISPLAY_SIZE, height: QR_DISPLAY_SIZE }}
          >
            generating qr…
          </div>
        )}
      </div>
    </div>
  );
}

function AssetTab({
  line,
  selected,
  onSelect,
}: {
  line: CryptoInvoiceLine;
  selected: boolean;
  onSelect: () => void;
}) {
  const meta = getCryptoAssetMeta(line.asset);

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      title={meta?.network ? `${line.symbol} on ${meta.network}` : line.symbol}
      className={`inline-flex shrink-0 items-center gap-2 border px-2.5 py-2 transition-colors ${
        selected
          ? "border-[#0c50ff] bg-[#0c50ff]/10 text-[#0c50ff]"
          : "border-border text-foreground/70 hover:border-foreground/25 hover:text-foreground"
      }`}
    >
      <CryptoLogo asset={line.asset} className="h-6 w-6" />
      <span className="flex flex-col items-start leading-none">
        <span className="font-mono text-xs lowercase tracking-wide">{line.symbol.toLowerCase()}</span>
        {meta?.network ? (
          <span
            className={`mt-0.5 font-mono text-[10px] lowercase tracking-wide ${
              selected ? "text-[#0c50ff]/70" : "text-foreground/40"
            }`}
          >
            {meta.network}
          </span>
        ) : null}
      </span>
    </button>
  );
}

function CryptoPaymentSuccess({
  projectTitle,
  scopeLabel,
  priceLabel,
  orderId,
  contactMethod,
  contactValue,
}: {
  projectTitle: string;
  scopeLabel: string;
  priceLabel: string;
  orderId: string;
  contactMethod: QuoteContactMethod | null;
  contactValue: string;
}) {
  const deliveryHint =
    contactMethod === "email"
      ? `confirmation sent to ${contactValue.trim()}`
      : contactMethod === "discord"
        ? `i'll reach you on discord (${contactValue.trim()})`
        : null;

  return (
    <div className="border border-border px-4 py-8 sm:px-8 sm:py-10">
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-emerald-400">payment received</p>
      <p className="mt-2 font-mono text-xs lowercase text-foreground/55">
        {projectTitle} · {scopeLabel}
      </p>
      <p className="mt-1 font-pixel text-3xl lowercase tracking-wide text-[#0c50ff] sm:text-4xl">{priceLabel}</p>
      <p className="mt-5 max-w-lg text-sm leading-relaxed text-foreground/75">
        {purchaseCryptoPaidUiMessage(contactMethod)}
      </p>
      {deliveryHint ? <p className="mt-2 text-sm text-foreground/50">{deliveryHint}</p> : null}
      <p className="mt-6 font-mono text-[11px] text-foreground/35">{orderId}</p>
    </div>
  );
}

function CryptoPaymentPendingBanner() {
  return (
    <div className="border-b border-amber-500/30 bg-amber-500/10 px-4 py-4 sm:px-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-amber-400/80">payment pending</p>
      <p className="mt-1 text-sm leading-relaxed text-amber-100/90">
        payment detected - waiting for network confirmations.
      </p>
    </div>
  );
}

function RateLockBanner({ invoice }: { invoice: CryptoInvoice }) {
  const [remainingMs, setRemainingMs] = useState(() => getRemainingLockMs(invoice));
  const expired = isInvoiceExpired(invoice) || remainingMs <= 0;
  const policy = buildCryptoPaymentPolicy(invoice);

  useEffect(() => {
    if (expired) return;
    const timer = window.setInterval(() => {
      setRemainingMs(getRemainingLockMs(invoice));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [invoice, expired]);

  return (
    <div
      className={`border-b px-4 py-3 sm:px-5 ${
        expired ? "border-amber-500/30 bg-amber-500/10" : "border-[#0c50ff]/20 bg-[#0c50ff]/5"
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/45">rate lock</p>
          <p className="mt-1 text-sm leading-relaxed text-foreground/75">{policy.summary}</p>
        </div>
        <p
          className={`shrink-0 font-mono text-sm tabular-nums ${
            expired ? "text-amber-400" : "text-[#0c50ff]"
          }`}
        >
          {expired ? "rate lock expired" : formatLockCountdown(remainingMs)}
        </p>
      </div>
    </div>
  );
}

function CopyRow({ label, value, copyValue }: { label: string; value: string; copyValue?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(copyValue ?? value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="flex items-start justify-between gap-3 py-2.5">
      <div className="min-w-0 flex-1">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/45">{label}</p>
        <p className="mt-1 break-all font-mono text-sm leading-snug text-foreground/90">{value}</p>
      </div>
      <button
        type="button"
        onClick={() => void copy()}
        className="shrink-0 border border-border px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-foreground/55 transition-colors hover:border-[#0c50ff]/40 hover:text-[#0c50ff]"
      >
        {copied ? "copied" : "copy"}
      </button>
    </div>
  );
}

export default function CryptoInvoicePanel(props: CryptoInvoicePanelProps) {
  const {
    projectTitle,
    scopeLabel,
    priceLabel,
    contactMethod,
    contactValue,
    initialPayment = null,
    onPaymentStatusChange,
  } = props;
  const invoice = normalizeCryptoInvoice(props.invoice);
  const [activeAsset, setActiveAsset] = useState(invoice.lines[0]?.asset ?? null);
  const [payment, setPayment] = useState<CryptoPaymentState>(
    initialPayment ?? createEmptyPaymentState(),
  );
  const activeLine = invoice.lines.find((l) => l.asset === activeAsset) ?? invoice.lines[0];

  useEffect(() => {
    let active = true;

    const poll = async () => {
      try {
        const res = await fetch(`/api/purchase/invoice?order=${encodeURIComponent(invoice.orderId)}&check=1`);
        const json = (await res.json()) as { payment?: CryptoPaymentState };
        if (active && json.payment) {
          setPayment(json.payment);
          onPaymentStatusChange?.(json.payment.status);
        }
      } catch {
        /* retry on next interval */
      }
    };

    void poll();
    if (payment.status === "confirmed") {
      return () => {
        active = false;
      };
    }

    const timer = window.setInterval(() => void poll(), 12_000);
    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, [invoice.orderId, payment.status, onPaymentStatusChange]);

  if (payment.status === "confirmed") {
    return (
      <CryptoPaymentSuccess
        projectTitle={projectTitle}
        scopeLabel={scopeLabel}
        priceLabel={priceLabel}
        orderId={invoice.orderId}
        contactMethod={contactMethod}
        contactValue={contactValue}
      />
    );
  }

  if (!activeLine) return null;

  const activeMeta = getCryptoAssetMeta(activeLine.asset);
  const policy = buildCryptoPaymentPolicy(invoice);
  const showCheckout = payment.status === "awaiting" || payment.status === "expired";

  return (
    <div className="border border-border">
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-border px-4 py-3 sm:px-5">
        <div className="min-w-0">
          <p className="font-mono text-xs lowercase text-foreground/55">
            {projectTitle} · {scopeLabel}
          </p>
          <p className="mt-1 font-pixel text-3xl lowercase tracking-wide text-[#0c50ff] sm:text-4xl">
            {priceLabel}
          </p>
        </div>
        <p className="font-mono text-[11px] text-foreground/40">{invoice.orderId}</p>
      </div>

      {payment.status === "pending" ? (
        <CryptoPaymentPendingBanner />
      ) : (
        <RateLockBanner invoice={invoice} />
      )}

      {payment.status === "pending" ? (
        <div className="px-4 py-6 sm:px-5">
          <p className="text-sm leading-relaxed text-foreground/60">
            no action needed — this page will update when your payment confirms.
          </p>
        </div>
      ) : null}

      {showCheckout ? (
        <>
          <div className="border-b border-border px-4 py-3 sm:px-5">
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/45">pay with</p>
            <div className="flex gap-2 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {invoice.lines.map((line) => (
                <AssetTab
                  key={line.asset}
                  line={line}
                  selected={line.asset === activeLine.asset}
                  onSelect={() => setActiveAsset(line.asset)}
                />
              ))}
            </div>
          </div>

          <div className="grid gap-5 px-4 py-4 sm:grid-cols-[auto_1fr] sm:items-start sm:gap-6 sm:px-5 sm:py-5">
            <PaymentQr uri={activeLine.paymentUri} label={activeLine.symbol} asset={activeLine.asset} />

            <div className="min-w-0">
              <div className="divide-y divide-border">
                <CopyRow label={policy.amountDueLabel} value={activeLine.amountDisplay} copyValue={activeLine.amount} />
                <CopyRow label="wallet" value={activeLine.address} />
              </div>

              <p className="mt-3 text-xs leading-relaxed text-foreground/55">
                scan the qr or send exactly <span className="text-foreground/80">{activeLine.amountDisplay}</span> to the
                wallet above on {activeLine.title}
                {activeMeta?.network ? ` (${activeMeta.network})` : ""}.
              </p>
              <p className="mt-2 font-mono text-[11px] text-foreground/40">memo: {invoice.orderId}</p>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export function CryptoInvoiceLoading() {
  return (
    <div className="border border-border px-4 py-6 text-sm text-foreground/55 sm:px-5">
      generating invoice…
    </div>
  );
}

export function CryptoInvoiceError({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="border border-border px-4 py-6 sm:px-5">
      <p className="text-sm text-red-500">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-3 border border-border px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wide text-foreground/70 transition-colors hover:border-foreground/30 hover:text-foreground"
      >
        retry
      </button>
    </div>
  );
}
