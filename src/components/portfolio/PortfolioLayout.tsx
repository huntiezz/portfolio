import type { ReactNode } from "react";
import SiteFrame from "@/components/portfolio/SiteFrame";
import SiteHeader from "@/components/portfolio/SiteHeader";
import SiteFooter from "@/components/portfolio/SiteFooter";

export default function PortfolioLayout({ children }: { children: ReactNode }) {
  return (
    <SiteFrame>
      <SiteHeader />
      <div className="flex min-h-0 flex-1 flex-col">
        <main className="relative min-h-0 flex-1 px-5 py-12 sm:px-10 sm:py-16 md:px-14 md:py-20 lg:px-16 lg:py-24">
          {children}
        </main>
      </div>
      <SiteFooter />
    </SiteFrame>
  );
}
