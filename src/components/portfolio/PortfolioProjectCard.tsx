"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { twMerge } from "tailwind-merge";
import type { PortfolioCardData } from "@/data/portfolio";
import Modal from "@/components/Modal";
import PortfolioMediaCarousel from "@/components/portfolio/PortfolioMediaCarousel";
import {
  btnPrimary,
  btnSecondary,
  btnArrow,
  cardShell,
  coverShell,
  CUT_CORNER_BTN,
} from "@/components/portfolio/cardUi";
import { getGallerySlides } from "@/lib/portfolioGallery";

export default function PortfolioProjectCard({ entry }: { entry: PortfolioCardData }) {
  const [detailOpen, setDetailOpen] = useState(false);
  const safeLink = normalizeUrl(entry.link);
  const slides = useMemo(() => getGallerySlides(entry), [entry]);

  return (
    <li className="list-none">
      <div className={cardShell}>
        <div className="flex flex-col gap-6 sm:gap-7 md:flex-row md:items-stretch md:gap-8">
          <PortfolioCover src={entry.coverSrc} alt={entry.coverAlt} className={entry.coverClassName} />

          <div className="flex min-w-0 flex-1 flex-col md:min-h-[7.25rem]">
            <div className="space-y-3">
              <p className="text-center font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--hero-copy-faint)] md:text-left">
                {entry.portfolioTitle}
                <span className="mx-2 text-[color:var(--hero-copy-faint)]/70">|</span>
                {entry.timeline}
              </p>
              <h2 className="text-center font-pixel text-[2.35rem] leading-[0.95] lowercase tracking-wide text-foreground sm:text-4xl md:text-left md:text-[2.85rem]">
                {entry.role}
              </h2>
              <p className="max-w-2xl text-center text-base lowercase leading-relaxed tracking-wide text-[color:var(--hero-copy-body)] md:text-left md:text-[1.05rem] md:leading-[1.65]">
                {entry.summary}
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:mt-auto md:pt-6">
              {safeLink ? (
                <Link
                  href={safeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${btnSecondary} w-full sm:w-auto sm:min-w-[10.5rem]`}
                  style={{ clipPath: CUT_CORNER_BTN }}
                >
                  visit website
                </Link>
              ) : null}
              <button
                type="button"
                onClick={() => setDetailOpen(true)}
                className={`${btnPrimary} w-full gap-2 sm:w-auto sm:min-w-[10.5rem]`}
                style={{ clipPath: CUT_CORNER_BTN }}
              >
                view more info
                <ArrowRight className={btnArrow} aria-hidden />
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
                  className="btn-with-arrow mt-2 inline-flex items-center gap-2 text-sm text-[color:var(--accent-blue)] underline decoration-[color:var(--accent-blue)] underline-offset-2"
                >
                  visit website
                  <span className="btn-arrow btn-arrow-external" aria-hidden>
                    ↗
                  </span>
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
                        className="btn-with-arrow inline-flex items-center gap-2 text-sm text-[color:var(--accent-blue)] underline decoration-[color:var(--accent-blue)] underline-offset-2"
                      >
                        {item.label}
                        <span className="btn-arrow btn-arrow-external" aria-hidden>
                          ↗
                        </span>
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
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground/55">
                  timeline
                </h3>
                <p className="mt-1 text-lg text-foreground/90">{entry.timeline}</p>
              </div>
            </div>
            <div className="hidden h-auto w-px bg-border lg:block" aria-hidden />
            <hr className="border-border lg:hidden" />
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground/55">
                overview
              </h3>
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

  const isContained = /\bobject-contain\b/.test(className);

  if (!src || failed) {
    return (
      <div
        className={twMerge(
          coverShell,
          "flex items-center justify-center border-dashed bg-[color:var(--hero-about-hover-bg)]/60",
        )}
      >
        <span className="sr-only">{alt || "project cover"}</span>
      </div>
    );
  }

  return (
    <div className={twMerge(coverShell, "self-center md:self-start")}>
      {isContained ? (
        <div className="flex h-full w-full items-center justify-center p-2.5 sm:p-3">
          <img
            alt={alt || "project cover"}
            draggable={false}
            src={src}
            onError={() => setFailed(true)}
            className={twMerge("max-h-full max-w-full object-contain duration-300", className)}
          />
        </div>
      ) : (
        <img
          alt={alt || "project cover"}
          draggable={false}
          src={src}
          onError={() => setFailed(true)}
          className={twMerge("h-full w-full object-cover duration-300", className)}
        />
      )}
    </div>
  );
}

function normalizeUrl(url?: string) {
  if (!url?.trim()) return undefined;
  return url.trim().startsWith("hhttps://") ? url.replace(/^h/, "") : url;
}
