import Link from "next/link";
import PortfolioLayout from "@/components/portfolio/PortfolioLayout";
import OpenSourceProjectCard from "@/components/portfolio/OpenSourceProjectCard";
import { OPEN_SOURCE_PROJECTS } from "@/data/openSource";

export default function OpenSourcePage() {
  return (
    <PortfolioLayout>
      <article className="mx-auto max-w-4xl pb-16">
        <header className="border-b border-border pb-10 md:pb-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.38em] text-foreground/50">
            downloads & repos
          </p>
          <h1 className="mt-4 font-pixel text-6xl lowercase leading-none tracking-wide text-foreground sm:text-[5.25rem] sm:leading-none">
            open source
          </h1>
          <p className="mt-8 max-w-2xl text-pretty text-lg lowercase leading-relaxed tracking-wide text-foreground/90 sm:text-xl">
            public github work with clone snippets and archive zips. for roles and shipped client builds see{" "}
            <Link
              href="/projects"
              className="text-foreground underline decoration-foreground/35 underline-offset-[5px] transition-colors hover:text-[color:var(--accent-blue)] hover:decoration-[color:var(--accent-blue)]"
            >
              projects
            </Link>
            .
          </p>
        </header>

        <ul className="mt-12 space-y-8 md:space-y-10">
          {OPEN_SOURCE_PROJECTS.map((project) => (
            <OpenSourceProjectCard key={project.id} project={project} />
          ))}
        </ul>

        <footer className="mt-16 border-t border-border pt-10 text-center">
          <a
            href="https://github.com/huntiezz?tab=repositories&q=&type=public"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex border border-border px-8 py-3.5 text-base lowercase tracking-wide text-foreground transition-colors hover:border-[color:var(--accent-blue)] hover:text-[color:var(--accent-blue)]"
            style={{
              clipPath:
                "polygon(14px 0,100% 0,100% calc(100% - 14px),calc(100% - 14px) 100%,0 100%,0 14px)",
            }}
          >
            all public repos on github
          </a>
        </footer>
      </article>
    </PortfolioLayout>
  );
}
