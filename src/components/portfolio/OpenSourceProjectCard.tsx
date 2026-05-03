import Link from "next/link";
import type { OpenSourceProject } from "@/data/openSource";
import { githubArchiveZipUrl, gitCloneHttps } from "@/data/openSource";
import { STACK_CHIP_DISPLAY, stackIconSrc } from "@/lib/stackTechIcons";

const CUT_CORNER_BTN =
  "polygon(14px 0,100% 0,100% calc(100% - 14px),calc(100% - 14px) 100%,0 100%,0 14px)";

const btnMuted =
  "inline-flex min-h-[44px] items-center justify-center border border-[color:var(--hero-about-border)] bg-[color:var(--hero-about-bg)] px-5 py-2.5 text-sm lowercase tracking-wide text-[color:var(--hero-copy-title)] transition-colors hover:border-[color:var(--hero-phosphor)] hover:bg-[color:var(--hero-about-hover-bg)] hover:text-[color:var(--hero-phosphor)] dark:border-white/[0.12] dark:bg-[#12121a] dark:hover:border-[color:var(--hero-phosphor)]";

function StackChip({ tag }: { tag: string }) {
  const icon = stackIconSrc(tag);
  const iconsOnly = STACK_CHIP_DISPLAY === "icons";
  const showLabel = !iconsOnly || !icon;

  return (
    <span
      title={tag}
      className={`inline-flex items-center rounded-sm border border-border bg-muted/10 font-mono text-[11px] lowercase tracking-wide text-foreground/70 ${icon ? "gap-2 px-2 py-1.5" : "px-2.5 py-1"}`}
    >
      {icon ? (
        <img src={icon} alt="" width={20} height={20} draggable={false} className="h-5 w-5 shrink-0 object-contain" />
      ) : null}
      <span className={showLabel ? undefined : "sr-only"}>{tag}</span>
    </span>
  );
}

export default function OpenSourceProjectCard({ project }: { project: OpenSourceProject }) {
  const branch = project.defaultBranch ?? "main";
  const zipHref = githubArchiveZipUrl(project.repoUrl, branch);
  const cloneLine = gitCloneHttps(project.repoUrl);

  return (
    <li className="list-none">
      <div className="rounded-sm border border-border bg-background p-5 pb-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] ring-1 ring-black/[0.04] dark:bg-[color:var(--hero-panel-bg)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] dark:ring-white/[0.06] md:flex md:items-start md:justify-between md:gap-10 md:p-6">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h2 className="font-pixel text-[2rem] lowercase tracking-wide text-foreground sm:text-[2.35rem]">
              {project.name}
            </h2>
            <span className="font-mono text-[12px] lowercase tracking-[0.12em] text-foreground/45">{project.tagline}</span>
            {project.license ? (
              <span className="rounded-sm border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/50">
                {project.license}
              </span>
            ) : null}
          </div>
          <p className="mt-4 max-w-2xl text-base lowercase leading-relaxed tracking-wide text-foreground/88 md:text-[1.05rem] md:leading-relaxed">
            {project.description}
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((tag) => (
              <li key={tag}>
                <StackChip tag={tag} />
              </li>
            ))}
          </ul>
          {cloneLine ? (
            <div className="mt-5 max-w-full overflow-x-auto rounded-sm border border-border bg-muted/10 px-3 py-2.5">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/45">clone</p>
              <code className="mt-1 block whitespace-pre font-mono text-[12px] leading-snug text-[color:var(--hero-phosphor)] dark:text-[color:var(--hero-phosphor)]">
                {cloneLine}
              </code>
            </div>
          ) : null}
        </div>

        <div className="mt-6 flex w-full shrink-0 flex-col gap-3 md:mt-0 md:w-auto md:min-w-[12rem]">
          <Link
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${btnMuted} text-center`}
            style={{ clipPath: CUT_CORNER_BTN }}
          >
            source
          </Link>
          {zipHref ? (
            <a
              href={zipHref}
              download
              className={`${btnMuted} text-center`}
              style={{ clipPath: CUT_CORNER_BTN }}
            >
              download zip
            </a>
          ) : null}
          {project.extras?.map((x) => (
            <Link
              key={x.href}
              href={x.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${btnMuted} text-center`}
              style={{ clipPath: CUT_CORNER_BTN }}
            >
              {x.label}
            </Link>
          ))}
        </div>
      </div>
    </li>
  );
}
