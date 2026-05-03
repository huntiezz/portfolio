"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import type { PortfolioCardData } from "@/data/portfolio";
import Modal from "@/components/Modal";
import PortfolioMediaCarousel from "@/components/portfolio/PortfolioMediaCarousel";
import { getGallerySlides } from "@/lib/portfolioGallery";

const CUT_CORNER_BTN =
  "polygon(14px 0,100% 0,100% calc(100% - 14px),calc(100% - 14px) 100%,0 100%,0 14px)";

const COVER_FRAME =
  "mx-auto h-[11rem] w-[11rem] shrink-0 overflow-hidden rounded-sm ring-1 ring-border sm:h-[12rem] sm:w-[12rem] md:mx-0 md:h-[14rem] md:w-[14rem]";

export default function PortfolioProjectCard({ entry }: { entry: PortfolioCardData }) {
  const [detailOpen, setDetailOpen] = useState(false);
  const safeLink = normalizeUrl(entry.link);
  const slides = useMemo(() => getGallerySlides(entry), [entry]);

  return (
    <li className="list-none">
      <div className="relative flex flex-col gap-0 overflow-hidden rounded-sm border border-border bg-background p-5 pb-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] ring-1 ring-black/[0.04] dark:bg-[color:var(--hero-panel-bg)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] dark:ring-white/[0.06]">
        <div className="relative z-[1] flex flex-col gap-6 md:flex-row md:items-stretch md:pb-0">
          <PortfolioCover
            src={entry.coverSrc}
            alt={entry.coverAlt}
            className={entry.coverClassName}
          />

          <div className="relative z-[2] flex min-w-0 flex-1 flex-col">
            <h2 className="text-center font-pixel text-[2.65rem] leading-[0.95] lowercase tracking-wide text-foreground md:text-left md:text-[3.15rem]">
              {entry.role}
            </h2>
            <p className="mt-3 text-center font-mono text-[13px] leading-snug lowercase tracking-[0.1em] text-foreground/50 md:text-left">
              {entry.portfolioTitle}{" "}
              <span className="text-foreground/30"> | </span> {entry.timeline}
            </p>
            <hr className="my-4 border-border" />
            <p className="text-center text-lg lowercase leading-relaxed tracking-wide text-foreground/90 md:text-left md:text-[1.1rem] md:leading-[1.6]">
              {entry.summary}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
              {safeLink ? (
                <Link
                  href={safeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[48px] min-w-[11.5rem] flex-1 items-center justify-center border border-[color:var(--hero-about-border)] bg-[color:var(--hero-about-bg)] px-6 py-3.5 text-base lowercase tracking-wide text-[color:var(--hero-copy-title)] transition-colors hover:border-[color:var(--hero-phosphor)] hover:bg-[color:var(--hero-about-hover-bg)] hover:text-[color:var(--hero-phosphor)] dark:border-white/[0.12] dark:bg-[#12121a] dark:hover:border-[color:var(--hero-phosphor)] sm:flex-none"
                  style={{ clipPath: CUT_CORNER_BTN }}
                >
                  visit website
                </Link>
              ) : null}
              <button
                type="button"
                onClick={() => setDetailOpen(true)}
                className="inline-flex min-h-[48px] min-w-[11.5rem] flex-1 items-center justify-center border border-[color:var(--hero-about-border)] bg-[color:var(--hero-about-bg)] px-6 py-3.5 text-base lowercase tracking-wide text-[color:var(--hero-copy-title)] transition-colors hover:border-[color:var(--hero-phosphor)] hover:bg-[color:var(--hero-about-hover-bg)] hover:text-[color:var(--hero-phosphor)] dark:border-white/[0.12] dark:bg-[#12121a] dark:hover:border-[color:var(--hero-phosphor)] sm:flex-none"
                style={{ clipPath: CUT_CORNER_BTN }}
              >
                view more info
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal open={detailOpen} setOpen={setDetailOpen}>
        <div className="space-y-6 lowercase text-foreground">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="font-pixel text-3xl text-foreground sm:text-4xl">{entry.portfolioTitle}</h2>
              {safeLink ? (
                <Link
                  href={safeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-2 text-sm text-[color:var(--accent-blue)] underline decoration-[color:var(--accent-blue)] underline-offset-2"
                >
                  visit website
                  <span aria-hidden>↗</span>
                </Link>
              ) : null}
              {entry.showcaseLinks && entry.showcaseLinks.length > 0 ? (
                <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                  {entry.showcaseLinks.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-[color:var(--accent-blue)] underline decoration-[color:var(--accent-blue)] underline-offset-2"
                      >
                        {item.label}
                        <span aria-hidden>↗</span>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>

          {slides.length > 0 ? (
            <div className="relative w-full">
              <PortfolioMediaCarousel items={slides} />
            </div>
          ) : null}

          <div className="grid gap-6 lg:grid-cols-[1fr_auto_1fr]">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground/55">role</h3>
                <p className="mt-1 text-lg text-foreground/90">{entry.role}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground/55">timeline</h3>
                <p className="mt-1 text-lg text-foreground/90">{entry.timeline}</p>
              </div>
            </div>
            <div className="hidden h-auto w-px bg-border lg:block" aria-hidden />
            <hr className="border-border lg:hidden" />
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground/55">overview</h3>
              <div className="mt-3 max-h-[18rem] space-y-3 overflow-y-auto rounded-sm border border-border bg-muted/10 p-3 text-[0.95rem] leading-relaxed text-foreground/85">
                {entry.bullets.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </li>
  );
}

function PortfolioCover({
  src,
  alt,
  className = "",
}: {
  src: string | null;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        className={twMerge(COVER_FRAME, "flex items-center justify-center border border-dashed border-border bg-muted/10")}
      >
        <span className="sr-only">{alt || "project cover"}</span>
      </div>
    );
  }

  return (
    <div className={twMerge(COVER_FRAME, "border border-transparent bg-muted/5")}>
      <img
        alt={alt || "project cover"}
        draggable={false}
        src={src}
        onError={() => setFailed(true)}
        className={twMerge("h-full w-full object-cover duration-300", className)}
      />
    </div>
  );
}

function normalizeUrl(url?: string) {
  if (!url?.trim()) return undefined;
  return url.trim().startsWith("hhttps://") ? url.replace(/^h/, "") : url;
}
