import PortfolioLayout from "@/components/portfolio/PortfolioLayout";
import PortfolioProjectCard from "@/components/portfolio/PortfolioProjectCard";
import { getPortfolioPageSections } from "@/data/portfolio";

export default function ProjectsPage() {
  const { workExperience, sideProjects } = getPortfolioPageSections();

  return (
    <PortfolioLayout>
      <article className="mx-auto max-w-4xl pb-16">
        <header className="border-b border-border pb-10 md:pb-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.38em] text-foreground/50">
            portfolio
          </p>
          <h1 className="mt-4 font-pixel text-6xl lowercase leading-none tracking-wide text-foreground sm:text-[5.25rem] sm:leading-none">
            projects
          </h1>
          <p className="mt-8 max-w-2xl text-pretty text-lg lowercase leading-relaxed tracking-wide text-foreground/90 sm:text-xl">
            roles and timelines first, then independent builds. ongoing listings appear before ended ones in each group.
            tap <span className="text-foreground/70">view more info</span> for the write-up and media.
          </p>
        </header>

        <section className="mt-12 md:mt-14" aria-labelledby="work-experience-heading">
          <h2
            id="work-experience-heading"
            className="font-mono text-[11px] uppercase tracking-[0.38em] text-foreground/50"
          >
            work experience
          </h2>
          <ul className="mt-6 space-y-8 md:mt-8 md:space-y-10">
            {workExperience.map((entry) => (
              <PortfolioProjectCard key={entry.id} entry={entry} />
            ))}
          </ul>
        </section>

        <section className="mt-14 md:mt-16" aria-labelledby="side-projects-heading">
          <h2
            id="side-projects-heading"
            className="font-mono text-[11px] uppercase tracking-[0.38em] text-foreground/50"
          >
            side projects
          </h2>
          <ul className="mt-6 space-y-8 md:mt-8 md:space-y-10">
            {sideProjects.map((entry) => (
              <PortfolioProjectCard key={entry.id} entry={entry} />
            ))}
          </ul>
        </section>

        <footer className="mt-16 border-t border-border pt-10 text-center">
          <a
            href="mailto:hunter@huntiez.com"
            className="inline-flex border border-border px-8 py-3.5 text-base lowercase tracking-wide text-foreground transition-colors hover:border-[color:var(--accent-blue)] hover:text-[color:var(--accent-blue)]"
            style={{
              clipPath:
                "polygon(14px 0,100% 0,100% calc(100% - 14px),calc(100% - 14px) 100%,0 100%,0 14px)",
            }}
          >
            start a project
          </a>
        </footer>
      </article>
    </PortfolioLayout>
  );
}
