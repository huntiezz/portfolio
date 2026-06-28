import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SiteFrame from "@/components/portfolio/SiteFrame";
import SiteHeader from "@/components/portfolio/SiteHeader";
import SiteFooter from "@/components/portfolio/SiteFooter";
import {
  quoteBody,
  quoteBtnBase,
  quoteContinueArrow,
  quoteContinueBtn,
  quoteHeading,
  quoteKicker,
} from "@/components/quote/quoteUi";

export default function PricingPage() {
  return (
    <SiteFrame>
      <SiteHeader />
      <main className="flex min-h-0 flex-1 flex-col">
        <div className="mx-auto w-full max-w-2xl flex-1 px-6 py-12 sm:px-10 sm:py-20">
          <p className={quoteKicker}>work with me</p>
          <h1 className={quoteHeading}>pricing</h1>
          <p className={quoteBody}>
            interested? fill out the form and get an instant quote based on scope and timeline. takes about a
            minute.
          </p>
          <Link href="/quote" className={`${quoteBtnBase} ${quoteContinueBtn} mt-10 no-underline`}>
            get an instant quote
            <ArrowRight className={quoteContinueArrow} aria-hidden />
          </Link>
        </div>
      </main>
      <SiteFooter />
    </SiteFrame>
  );
}
