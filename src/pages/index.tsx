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
    <SiteFrame variant="home">
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <main className="relative min-h-[calc(100dvh-11rem)] flex-1 overflow-hidden sm:min-h-[calc(100dvh-10rem)]">
          <div className="absolute inset-0">
            <div className="dither-container relative h-full w-full overflow-hidden">
              <div className="relative h-full w-full">
                <DitherFluidCanvas />
              </div>
            </div>
          </div>

          <div
            className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-tr from-black/20 via-transparent to-transparent dark:from-black/25"
            aria-hidden
          />

          <div className="absolute bottom-0 left-0 z-10 flex w-full flex-col items-start px-8 py-12 text-left sm:px-16 sm:py-20">
            <h1 className="font-pixel text-7xl leading-none lowercase tracking-wide text-[#1c1c1c] sm:text-9xl md:text-[10rem] [text-shadow:0_1px_0_rgba(255,255,255,0.35)] dark:text-[#eeeeee] dark:[text-shadow:0_2px_18px_rgba(0,0,0,0.95),0_0_1px_rgba(0,0,0,1)]">
              huntiez
            </h1>
            <h2 className="mt-4 font-pixel text-2xl lowercase tracking-wide text-[#1c1c1c] sm:text-3xl dark:text-[#eeeeee] dark:[text-shadow:0_2px_14px_rgba(0,0,0,0.95),0_0_1px_rgba(0,0,0,1)]">
              dev &amp; web designer
            </h2>
            <p className="mt-8 max-w-xl text-xl leading-relaxed text-[#1c1c1c] sm:text-2xl dark:text-[#eeeeee] dark:[text-shadow:0_2px_12px_rgba(0,0,0,0.95),0_0_1px_rgba(0,0,0,1)]">
              hey - i&apos;m hunter. i build fast web products, ship experiments, and care about motion, ux,
              and sharp interfaces.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/about"
                className="border border-[#1c1c1c] bg-transparent px-7 py-3.5 text-base text-[#1c1c1c] transition-colors hover:bg-[#1c1c1c] hover:text-[#eeeeee] dark:border-[#eeeeee] dark:text-[#eeeeee] dark:hover:bg-[#eeeeee] dark:hover:text-[#1c1c1c]"
              >
                About Me
              </Link>
              <Link
                href="/projects"
                className="border border-[#0c50ff] bg-[#0c50ff] px-7 py-3.5 text-base text-[#eeeeee] transition-colors hover:bg-transparent hover:text-[#0c50ff]"
              >
                Projects
              </Link>
            </div>
          </div>
        </main>
      </div>
      <SiteFooter />
    </SiteFrame>
  );
}
