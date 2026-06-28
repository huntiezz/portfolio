import dynamic from "next/dynamic";
import SiteFrame from "@/components/portfolio/SiteFrame";
import SiteHeader from "@/components/portfolio/SiteHeader";
import SiteFooter from "@/components/portfolio/SiteFooter";

const QuoteFlow = dynamic(() => import("@/components/quote/QuoteFlow"), {
  ssr: false,
  loading: () => (
    <div className="flex flex-1 items-start px-5 py-10 sm:px-10 md:px-14 lg:px-16">
      <p className="font-mono text-[11px] uppercase tracking-[0.34em] text-foreground/45">loading quote…</p>
    </div>
  ),
});

export default function QuotePage() {
  return (
    <SiteFrame variant="flow">
      <SiteHeader />
      <main className="flex min-h-0 flex-1 flex-col">
        <QuoteFlow />
      </main>
      <SiteFooter />
    </SiteFrame>
  );
}
