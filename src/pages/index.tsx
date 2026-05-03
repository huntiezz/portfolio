import Link from "next/link";
import dynamic from "next/dynamic";
import SiteFrame from "@/components/portfolio/SiteFrame";
import SiteHeader from "@/components/portfolio/SiteHeader";
import SiteFooter from "@/components/portfolio/SiteFooter";

const DitherFluidCanvas = dynamic(() => import("@/components/portfolio/DitherFluidCanvas"), {
  ssr: false,
  loading: () => null,
});

export default function Home() {
  return (
    <SiteFrame>
      <SiteHeader />
      <div className="flex min-h-0 flex-1 flex-col">
        <main className="relative min-h-0 flex-1 overflow-hidden">
          <div className="absolute inset-0 z-0 bg-[var(--hero-void-canvas)]">
            <div
              className="absolute inset-0 [view-transition-name:none] motion-reduce:[&_canvas]:[filter:none] lg:motion-safe:dark:[&_canvas]:brightness-[0.93] lg:motion-safe:dark:[&_canvas]:contrast-[0.96] lg:motion-safe:dark:[&_canvas]:saturate-[0.88] lg:motion-safe:[&_canvas]:brightness-[1.03] lg:motion-safe:[&_canvas]:contrast-[0.94] lg:motion-safe:[&_canvas]:saturate-[0.92]"
              aria-hidden
            >
              <DitherFluidCanvas />
            </div>
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_72%_12%,var(--hero-vignette-chroma),transparent_58%)]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--bg)]/40 via-transparent to-[var(--hero-void-canvas)]/60"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_110%_75%_at_88%_90%,var(--hero-wedge-a)_0%,var(--hero-wedge-b)_38%,transparent_68%)]"
              aria-hidden
            />
          </div>

          <div className="absolute inset-x-0 bottom-0 z-20 flex justify-center px-4 pb-10 pt-10 sm:px-6 sm:pb-12 md:justify-end md:px-12 md:pb-14 md:pt-12 lg:px-14 lg:pb-16">
            <div className="relative isolate flex w-full max-w-lg flex-col items-start overflow-x-clip rounded-lg border border-[color:color-mix(in_srgb,var(--hero-panel-ring)_55%,transparent)] bg-[var(--hero-panel-bg)] p-8 text-left shadow-[0_16px_48px_var(--hero-panel-shadow),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-md dark:border-white/[0.09] dark:bg-[var(--hero-panel-scrim)] sm:max-w-xl md:max-w-[28rem] md:rounded-md md:backdrop-blur-xl md:items-end md:p-14 md:text-right lg:max-w-[30rem]">
              <p className="hidden font-mono text-[11px] uppercase tracking-[0.42em] text-[color:var(--hero-copy-kicker)] dark:[text-shadow:0_1px_18px_rgb(0_0_0/0.88)] md:block">
                huntiez · folio
              </p>
              <h1 className="mt-0 max-w-full font-pixel text-5xl leading-[0.94] lowercase tracking-wide text-[color:var(--hero-copy-title)] [text-wrap:balance] dark:[text-shadow:0_0_2px_rgb(0_0_0/1),0_2px_22px_rgb(0_0_0/0.8),0_5px_40px_rgb(0_0_0/0.5)] sm:text-6xl md:mt-3 md:text-7xl">
                huntiez
              </h1>
              <h2 className="mt-4 max-w-full font-mono text-lg lowercase tracking-[0.08em] text-[color:var(--hero-copy-strong)] dark:[text-shadow:0_1px_16px_rgb(0_0_0/0.85)] sm:text-xl md:text-2xl">
                dev <span className="text-[color:var(--hero-copy-faint)]">&amp;</span> ai engineer
              </h2>
              <p className="mt-6 max-w-full text-[0.95rem] lowercase leading-[1.65] tracking-wide text-[color:var(--hero-copy-body)] dark:[text-shadow:0_1px_14px_rgb(0_0_0/0.82)] md:ml-auto md:max-w-[21rem] md:text-[1rem] md:leading-relaxed">
                hey - i&apos;m hunter. i build fast web products, ship experiments,
                and care about motion, ux, and sharp interfaces.
              </p>
              <div className="mt-9 flex w-full flex-col gap-3 md:mt-10 md:w-auto md:flex-row md:flex-row-reverse md:justify-end md:gap-3">
                <Link
                  href="/projects"
                  className="inline-flex min-h-[48px] w-full items-center justify-center border border-[color:var(--hero-phosphor)] bg-[color:var(--hero-phosphor)] px-6 py-3.5 text-base font-medium lowercase tracking-wide text-[color:var(--hero-on-phosphor)] antialiased shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] transition-colors hover:bg-transparent hover:text-[color:var(--hero-phosphor)] md:w-auto md:min-h-0"
                  style={{
                    clipPath:
                      "polygon(14px 0,100% 0,100% calc(100% - 14px),calc(100% - 14px) 100%,0 100%,0 14px)",
                  }}
                >
                  projects
                </Link>
                <Link
                  href="/about"
                  className="inline-flex min-h-[48px] w-full items-center justify-center border border-[color:var(--hero-about-border)] bg-[color:var(--hero-about-bg)] px-6 py-3.5 text-base lowercase tracking-wide text-[color:var(--hero-copy-title)] transition-colors hover:border-[color:var(--hero-phosphor)] hover:bg-[color:var(--hero-about-hover-bg)] hover:text-[color:var(--hero-phosphor)] md:w-auto md:min-h-0"
                  style={{
                    clipPath:
                      "polygon(14px 0,100% 0,100% calc(100% - 14px),calc(100% - 14px) 100%,0 100%,0 14px)",
                  }}
                >
                  about
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
      <SiteFooter />
    </SiteFrame>
  );
}
