"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  quoteBody,
  quoteContinueArrow,
  quoteHeading,
  quoteKicker,
  quotePricingBtnPrimary,
  quotePricingBtnSecondary,
  quoteStepMotion,
} from "@/components/quote/quoteUi";

const PurchaseFlow = dynamic(() => import("@/components/purchase/PurchaseFlow"), {
  ssr: false,
  loading: () => (
    <div className="px-6 py-12 sm:px-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.34em] text-foreground/45">loading…</p>
    </div>
  ),
});

export default function PricingPageContent() {
  const [purchaseOpen, setPurchaseOpen] = useState(false);

  if (purchaseOpen) {
    return (
      <main className="flex min-h-0 flex-1 flex-col">
        <PurchaseFlow onExit={() => setPurchaseOpen(false)} />
      </main>
    );
  }

  return (
    <main className="flex min-h-0 flex-1 flex-col">
      <div className="mx-auto flex w-full max-w-4xl min-h-0 flex-1 flex-col justify-center px-6 py-8 sm:px-10 sm:py-10">
        <AnimatePresence mode="wait">
          <motion.section key="pricing-hero" {...quoteStepMotion} className="max-w-2xl">
            <p className={quoteKicker}>work with me</p>
            <h1 className={quoteHeading}>pricing</h1>
            <p className={quoteBody}>
              custom build or ready-made project - pick how you want to get started.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/quote" className={`${quotePricingBtnPrimary} no-underline`}>
                get an instant quote
                <ArrowRight className={quoteContinueArrow} aria-hidden />
              </Link>
              <button type="button" onClick={() => setPurchaseOpen(true)} className={quotePricingBtnSecondary}>
                buy a ready-made project
                <ArrowRight className={quoteContinueArrow} aria-hidden />
              </button>
            </div>
          </motion.section>
        </AnimatePresence>
      </div>
    </main>
  );
}
