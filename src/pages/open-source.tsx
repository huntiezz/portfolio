import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import GitHubMarkIcon from "@/components/GitHubMarkIcon";
import SiteFrame from "@/components/portfolio/SiteFrame";
import SiteHeader from "@/components/portfolio/SiteHeader";
import SiteFooter from "@/components/portfolio/SiteFooter";
import OpenSourceProjectCard from "@/components/portfolio/OpenSourceProjectCard";
import {
  GITHUB_PROFILE_REPOS_URL,
  OPEN_SOURCE_SECTIONS,
  getOpenSourceSectionProjects,
} from "@/data/openSource";
import {
  quoteBody,
  quoteBtnBase,
  quoteContinueArrow,
  quoteContinueBtn,
  quoteGrid,
  quoteHeading,
  quoteKicker,
} from "@/components/quote/quoteUi";

export default function OpenSourcePage() {
  return (
    <SiteFrame>
      <SiteHeader />
      <main className="flex min-h-0 flex-1 flex-col">
        <div className="mx-auto w-full max-w-4xl flex-1 px-6 py-12 sm:px-10 sm:py-20">
          <header>
            <p className={quoteKicker}>public work</p>
            <h1 className={quoteHeading}>open source</h1>
            <p className={quoteBody}>
              repos you can clone, fork, or study on <span className="normal-case">GitHub</span>. for shipped
              client work and roles, see{" "}
              <Link
                href="/projects"
                className="text-[#0c50ff] underline decoration-[#0c50ff] underline-offset-2"
              >
                projects
              </Link>
              .
            </p>
            <a
              href={GITHUB_PROFILE_REPOS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`${quoteBtnBase} ${quoteContinueBtn} mt-10 inline-flex no-underline`}
            >
              <GitHubMarkIcon className="h-4 w-4 shrink-0" aria-hidden />
              all repos on github
              <ArrowRight className={quoteContinueArrow} aria-hidden />
            </a>
          </header>

          <div className="mt-16 space-y-16 sm:mt-20 sm:space-y-20">
            {OPEN_SOURCE_SECTIONS.map((section) => {
              const projects = getOpenSourceSectionProjects(section);

              return (
                <section key={section.id} aria-labelledby={`opensource-${section.id}`}>
                  <p className={quoteKicker} id={`opensource-${section.id}`}>
                    {section.kicker}
                  </p>
                  <h2 className="mt-3 font-pixel text-3xl lowercase leading-[1.05] tracking-wide text-foreground sm:text-4xl">
                    {section.heading}
                  </h2>
                  <p className="mt-3 max-w-xl text-sm text-foreground/60 sm:text-base">{section.hint}</p>

                  <ul className={`${quoteGrid} list-none`}>
                    {projects.map((project) => (
                      <li key={project.id}>
                        <OpenSourceProjectCard project={project} />
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>

          <footer className="mt-16 border-t border-border pt-10 sm:mt-20">
            <p className="max-w-xl text-sm lowercase leading-relaxed text-foreground/55">
              more experiments and forks live on the profile. star or open an issue if something is useful.
            </p>
            <a
              href={GITHUB_PROFILE_REPOS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`${quoteBtnBase} ${quoteContinueBtn} mt-8 inline-flex no-underline`}
            >
              view on github
              <ArrowUpRight className={quoteContinueArrow} aria-hidden />
            </a>
          </footer>
        </div>
      </main>
      <SiteFooter />
    </SiteFrame>
  );
}
