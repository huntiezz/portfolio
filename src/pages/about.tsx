import PortfolioLayout from "@/components/portfolio/PortfolioLayout";
import BrandFavicon from "@/components/portfolio/BrandFavicon";
import Link from "next/link";

const aboutLink =
  "border-b border-[color:var(--accent-blue)] pb-px font-medium text-[color:var(--accent-blue)] underline-offset-[3px] transition-colors hover:bg-[color:var(--accent-blue)] hover:text-[color:var(--hero-on-phosphor)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]";

function SwedenFlagIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 10"
      role="img"
      aria-label="Sweden"
      className={`inline-block shrink-0 align-[-0.12em] ${className}`}
      width={22}
      height={14}
    >
      <title>Sweden</title>
      <rect width="16" height="10" fill="#006AA7" />
      <path fill="#FECC00" d="M5 0h2v10H5zM0 4h16v2H0z" />
    </svg>
  );
}

export default function AboutPage() {
  return (
    <PortfolioLayout>
      <article className="relative mx-auto max-w-2xl">
        <header className="pb-10 md:pb-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.38em] text-foreground/50">profile</p>
          <h1 className="mt-4 font-pixel text-6xl lowercase leading-none tracking-wide text-foreground sm:text-[5.25rem] sm:leading-none">
            about
          </h1>
        </header>

        <div className="relative mt-10 md:mt-12">
          <div className="space-y-8 text-lg lowercase leading-[1.65] tracking-wide text-foreground/90 sm:text-xl sm:leading-[1.7]">
            <p className="text-pretty text-foreground/95">
              hi, i&apos;m{" "}
              <span className="inline-flex items-center gap-1.5 align-middle">
                <span>hunter</span>
                <BrandFavicon size={20} className="h-5 w-5 shrink-0" />
              </span>{" "}
              - i&apos;m fifteen and based in sweden <SwedenFlagIcon />
            </p>

            <p className="text-pretty">
              i care about shipping real software people touch: realtime uis, apis, and tight feedback loops.
              i&apos;ve built storefronts, waitlists, internal tools, and experiments - always chasing{" "}
              <strong className="font-medium text-foreground">performance</strong>
              {" and "}
              <strong className="font-medium text-foreground">craft</strong>.
            </p>

            <section className="space-y-3" aria-labelledby="about-stack-heading">
              <h2
                id="about-stack-heading"
                className="text-[1.05rem] font-semibold lowercase tracking-tight text-foreground sm:text-lg"
              >
                stack & languages
              </h2>
              <p className="text-pretty">
                most days i&apos;m in <strong className="font-medium text-foreground">typescript</strong>,{" "}
                <strong className="font-medium text-foreground">react</strong>, and{" "}
                <strong className="font-medium text-foreground">next.js</strong>, with{" "}
                <strong className="font-medium text-foreground">tailwind</strong> for layout and polish. i
                reach for <strong className="font-medium text-foreground">node</strong> when i need apis,
                scripting, or glue behind the ui. i&apos;ve also shipped heavier native-style work in{" "}
                <strong className="font-medium text-foreground">c++</strong> (performance-sensitive tooling)
                and <strong className="font-medium text-foreground">c#</strong> when dotnet / in-game webviews
                are part of the stack.
              </p>
            </section>

            <p className="text-pretty">
              i&apos;m no longer at swiftly - that chapter wrapped so i could focus on new roles and builds.
              for timelines, titles, and everything i&apos;ve shipped professionally and on the side, see my{" "}
              <Link href="/projects" className={aboutLink}>
                experiences
              </Link>
              . public repos, source, and zip downloads live under{" "}
              <Link href="/open-source" className={aboutLink}>
                open source
              </Link>
              .
            </p>

            <section className="space-y-3" aria-labelledby="about-then-heading">
              <h2
                id="about-then-heading"
                className="text-[1.05rem] font-semibold lowercase tracking-tight text-foreground sm:text-lg"
              >
                before
              </h2>
              <p className="text-pretty">
                snapshots from the path: qa internship at safello, prompt engineering on{" "}
                <Link href="https://wutao.app" className={aboutLink}>
                  wu-tao
                </Link>{" "}
                - the full arc is on{" "}
                <Link href="/projects" className={aboutLink}>
                  experiences
                </Link>
                .
              </p>
            </section>
          </div>
        </div>
      </article>
    </PortfolioLayout>
  );
}
