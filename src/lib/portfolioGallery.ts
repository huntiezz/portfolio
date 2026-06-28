import type { PortfolioCardData, PortfolioMediaItem } from "@/data/portfolio";

function isLogoCover(entry: PortfolioCardData): boolean {
  return /\bobject-contain\b/.test(entry.coverClassName ?? "");
}

export function getGallerySlides(entry: PortfolioCardData): PortfolioMediaItem[] {
  const slides = [...entry.media];

  if (!entry.coverSrc) return slides;

  const coverIncluded = slides.some((item) => item.src === entry.coverSrc);
  if (coverIncluded) return slides;

  const logoCover = isLogoCover(entry);

  if (logoCover && slides.length > 0) {
    return [
      ...slides,
      {
        src: entry.coverSrc,
        alt: entry.coverAlt || `${entry.portfolioTitle} logo`,
        contain: true,
      },
    ];
  }

  if (slides.length === 0) {
    return [
      {
        src: entry.coverSrc,
        alt: entry.coverAlt || `${entry.portfolioTitle} preview`,
        contain: logoCover,
      },
    ];
  }

  return slides;
}
