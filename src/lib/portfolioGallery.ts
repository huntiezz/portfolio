import type { PortfolioCardData } from "@/data/portfolio";

export function getGallerySlides(entry: PortfolioCardData) {
  return [...entry.media];
}
