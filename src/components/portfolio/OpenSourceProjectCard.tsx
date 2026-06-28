import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import type { OpenSourceProject } from "@/data/openSource";
import { githubArchiveZipUrl } from "@/data/openSource";
import { stackIconSrc } from "@/lib/stackTechIcons";
import {
  quoteCardDescClass,
  quoteCardIconClass,
  quoteSecondaryBtn,
  quoteBtnBase,
} from "@/components/quote/quoteUi";

const openSourceCard =
  "group relative flex h-full flex-col items-start gap-3 border border-border bg-transparent p-5 text-left transition-colors duration-200 hover:border-[#0c50ff] sm:gap-3.5 sm:p-6";

function StackChip({ tag }: { tag: string }) {
  const icon = stackIconSrc(tag);

  return (
    <span className="inline-flex items-center gap-1.5 border border-border px-2 py-1 font-mono text-[10px] lowercase tracking-wide text-foreground/55">
      {icon ? <img src={icon} alt="" width={14} height={14} className="h-3.5 w-3.5 object-contain" /> : null}
      {tag}
    </span>
  );
}

export default function OpenSourceProjectCard({ project }: { project: OpenSourceProject }) {
  const branch = project.defaultBranch ?? "main";
  const zipHref = githubArchiveZipUrl(project.repoUrl, branch);

  return (
    <article className={openSourceCard}>
      <div className="flex w-full items-start justify-between gap-3">
        <div className={quoteCardIconClass(false)}>
          <Github className="h-5 w-5" strokeWidth={1.5} aria-hidden />
        </div>
        {project.license ? (
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/45">
            {project.license}
          </span>
        ) : null}
      </div>

      <div className="space-y-1.5">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <h3 className="font-pixel text-xl lowercase leading-none tracking-wide sm:text-2xl">
            {project.name}
          </h3>
          <span className="font-mono text-[11px] lowercase tracking-wide text-foreground/45">
            {project.tagline}
          </span>
        </div>
        <p className={`${quoteCardDescClass(false)} line-clamp-3`}>{project.description}</p>
      </div>

      <ul className="flex flex-wrap gap-1.5">
        {project.stack.map((tag) => (
          <li key={tag}>
            <StackChip tag={tag} />
          </li>
        ))}
      </ul>

      <div className="mt-auto flex w-full flex-col gap-2 pt-1">
        <Link
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${quoteBtnBase} ${quoteSecondaryBtn} w-full no-underline`}
        >
          view on github
          <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden />
        </Link>
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm">
          {project.homepage ? (
            <Link
              href={project.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 lowercase text-[#0c50ff] underline decoration-[#0c50ff] underline-offset-2"
            >
              live site
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          ) : null}
          {zipHref ? (
            <a
              href={zipHref}
              download
              className="lowercase text-foreground/55 underline decoration-foreground/25 underline-offset-2 transition-colors hover:text-[#0c50ff] hover:decoration-[#0c50ff]"
            >
              download zip
            </a>
          ) : null}
          {project.extras?.map((extra) => (
            <Link
              key={extra.href}
              href={extra.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 lowercase text-foreground/55 underline decoration-foreground/25 underline-offset-2 transition-colors hover:text-[#0c50ff] hover:decoration-[#0c50ff]"
            >
              {extra.label}
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
