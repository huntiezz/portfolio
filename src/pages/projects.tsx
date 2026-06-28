import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PortfolioLayout from "@/components/portfolio/PortfolioLayout";
import PortfolioProjectCard from "@/components/portfolio/PortfolioProjectCard";
import { btnPrimary, btnArrow } from "@/components/portfolio/cardUi";
import { getPortfolioPageSections } from "@/data/portfolio";

export default function ProjectsPage() {
  const { workExperience, sideProjects } = getPortfolioPageSections();

  return (
    <PortfolioLayout>
      <article className="mx-auto max-w-5xl pb-12">
        <header className="border-b border-border pb-8 md:pb-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.38em] text-foreground/50">portfolio</p>
          <h1 className="mt-4 font-pixel text-6xl lowercase leading-none tracking-wide text-foreground sm:text-[5.25rem] sm:leading-none">
            projects
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg lowercase leading-relaxed tracking-wide text-foreground/90 sm:text-xl">
            roles and timelines first, then independent builds. ongoing listings appear before ended ones in
            each group. tap <span className="text-foreground/70">view more info</span> for the write-up and
            media.
          </p>
        </header>

        <section className="mt-8 md:mt-10" aria-labelledby="work-experience-heading">
          <h2
            id="work-experience-heading"
            className="font-mono text-[11px] uppercase tracking-[0.38em] text-foreground/50"
          >
            work experience
          </h2>
          <ul className="mt-5 space-y-6 md:space-y-7">
            {workExperience.map((entry) => (
              <PortfolioProjectCard key={entry.id} entry={entry} />
            ))}
          </ul>
        </section>

        <section className="mt-10 md:mt-12" aria-labelledby="side-projects-heading">
          <h2
            id="side-projects-heading"
            className="font-mono text-[11px] uppercase tracking-[0.38em] text-foreground/50"
          >
            side projects
          </h2>
          <ul className="mt-5 space-y-6 md:space-y-7">
            {sideProjects.map((entry) => (
              <PortfolioProjectCard key={entry.id} entry={entry} />
            ))}
          </ul>
        </section>

        <footer className="mt-14 flex justify-center">
          <Link href="/quote" className={`${btnPrimary} no-underline`}>
            get an instant quote
            <ArrowRight className={btnArrow} aria-hidden />
          </Link>
        </footer>
      </article>
    </PortfolioLayout>
  );
}
