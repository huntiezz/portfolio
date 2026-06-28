"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { PortfolioMediaItem } from "@/data/portfolio";

export default function PortfolioMediaCarousel({ items }: { items: PortfolioMediaItem[] }) {
  const [current, setCurrent] = useState(0);
  const refs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    refs.current = refs.current.slice(0, items.length);
  }, [items.length]);

  const scrollTo = (i: number) => {
    const ix = Math.max(0, Math.min(i, items.length - 1));
    setCurrent(ix);
    refs.current[ix]?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  };

  const next = () => scrollTo((current + 1) % items.length);
  const prev = () => scrollTo((current - 1 + items.length) % items.length);

  if (items.length === 0) return null;

  return (
    <div className="relative w-full">
      {items.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => prev()}
            aria-label="Previous slide"
            className="btn-with-arrow absolute left-2 top-1/2 z-[2] hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-sm border border-border bg-background/95 text-foreground backdrop-blur-sm transition hover:border-[color:var(--accent-blue)] hover:text-[color:var(--accent-blue)] md:flex"
          >
            <ArrowLeft className="btn-arrow btn-arrow-left h-4 w-4" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => next()}
            aria-label="Next slide"
            className="btn-with-arrow absolute right-2 top-1/2 z-[2] hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-sm border border-border bg-background/95 text-foreground backdrop-blur-sm transition hover:border-[color:var(--accent-blue)] hover:text-[color:var(--accent-blue)] md:flex"
          >
            <ArrowRight className="btn-arrow h-4 w-4" aria-hidden />
          </button>
        </>
      )}
      <div className="media-carousel scrollbar flex snap-x snap-mandatory overflow-x-auto rounded-sm border border-border bg-muted/5">
        {items.map((m, i) => (
          <div
            key={`${m.src}-${i}`}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className={
              m.contain
                ? "flex min-h-[9rem] w-full shrink-0 snap-start items-center justify-center bg-muted/20 px-8 py-6 dark:bg-muted/10"
                : "flex min-h-[14rem] w-full shrink-0 snap-start items-center justify-center bg-muted/10 px-3 py-3 dark:bg-black/25"
            }
          >
            {m.type === "video" || /\.(mp4|webm)$/i.test(m.src.split(/[?#]/)[0] ?? "") ? (
              <video
                controls
                className="max-h-[24rem] w-full rounded-sm shadow-md ring-1 ring-black/10 dark:ring-white/[0.06]"
                src={m.src}
                aria-label={m.alt}
              />
            ) : (
              <img
                src={m.src}
                alt={m.alt}
                className={
                  m.contain
                    ? "max-h-[7rem] w-auto max-w-[min(100%,14rem)] object-contain md:max-h-[8rem]"
                    : "max-h-[26rem] w-full max-w-full rounded-sm object-contain shadow-md ring-1 ring-black/[0.08] md:max-h-[28rem] dark:ring-white/[0.08]"
                }
                loading="lazy"
                decoding="async"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
