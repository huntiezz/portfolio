import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PortfolioLayout from "@/components/portfolio/PortfolioLayout";
import { btnPrimary, btnArrow } from "@/components/portfolio/cardUi";

export default function PricingPage() {
  return (
    <PortfolioLayout>
      <article className="mx-auto max-w-2xl pb-12">
        <header className="border-b border-border pb-8 md:pb-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.38em] text-foreground/50">work with me</p>
          <h1 className="mt-4 font-pixel text-6xl lowercase leading-none tracking-wide text-foreground sm:text-[5.25rem] sm:leading-none">
            pricing
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-lg lowercase leading-relaxed tracking-wide text-foreground/90 sm:text-xl">
            interested? fill out this form and get an instant quote to get started.
          </p>
          <Link href="/quote" className={`${btnPrimary} mt-8 no-underline`}>
            get an instant quote
            <ArrowRight className={btnArrow} aria-hidden />
          </Link>
        </header>

        <section className="mt-10 space-y-8 text-lg lowercase leading-relaxed tracking-wide text-foreground/85 sm:text-xl">
          <div>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.34em] text-foreground/50">frontend</h2>
            <p className="mt-3 text-foreground/80">
              react, next.js, ui polish, motion, dashboards, and marketing surfaces.
            </p>
          </div>
          <div>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.34em] text-foreground/50">backend</h2>
            <p className="mt-3 text-foreground/80">
              apis, auth, databases, integrations, and the glue behind the product.
            </p>
          </div>
          <div>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.34em] text-foreground/50">software</h2>
            <p className="mt-3 text-foreground/80">
              c++, go, native tooling, and performance-sensitive systems work.
            </p>
          </div>
        </section>
      </article>
    </PortfolioLayout>
  );
}
