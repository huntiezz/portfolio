"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
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

function CloneCommandRow({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [command]);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  return (
    <div className="mt-4 max-w-full">
      <p className="mb-2 font-mono text-[11px] lowercase tracking-[0.14em] text-foreground/45">clone</p>
      <div className="flex overflow-hidden rounded-sm border border-border bg-muted/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] focus-within:border-[color:var(--hero-phosphor)]/35 focus-within:ring-1 focus-within:ring-[color:var(--hero-phosphor)]/25 dark:bg-[#12121a]/90 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
        <input
          readOnly
          value={command}
          onClick={() => void copy()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              void copy();
            }
          }}
          aria-label="Git clone command, click to copy"
          className="min-w-0 flex-1 cursor-pointer overflow-x-auto border-0 bg-transparent px-3 py-2.5 font-mono text-[12px] leading-snug text-[color:var(--hero-phosphor)] outline-none selection:bg-[color:var(--hero-phosphor)]/20 dark:text-[color:var(--hero-phosphor)]"
        />
        <button
          type="button"
          onClick={() => void copy()}
          className="flex shrink-0 items-center justify-center border-l border-border px-3 py-2 text-foreground/55 transition-colors hover:bg-muted/30 hover:text-[color:var(--hero-phosphor)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[color:var(--accent-blue)]"
          aria-label={copied ? "Copied" : "Copy command"}
        >
          {copied ? <Check className="h-4 w-4" strokeWidth={2} aria-hidden /> : <Copy className="h-4 w-4" strokeWidth={2} aria-hidden />}
        </button>
      </div>
      <p className="mt-1.5 min-h-[1rem] font-mono text-[10px] lowercase tracking-wide text-foreground/35" aria-live="polite">
        {copied ? "copied to clipboard" : "click to copy"}
      </p>
    </div>
  );
}

export default function OpenSourceProjectCard({ project }: { project: OpenSourceProject }) {
  const branch = project.defaultBranch ?? "main";
  const zipHref = githubArchiveZipUrl(project.repoUrl, branch);
  const cloneLine = gitCloneHttps(project.repoUrl);

  return (
    <li className="list-none">
      <div className="rounded-sm border border-border bg-background p-4 pb-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] ring-1 ring-black/[0.04] dark:bg-[color:var(--hero-panel-bg)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] dark:ring-white/[0.06] md:flex md:items-start md:justify-between md:gap-8 md:p-5">
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
          <p className="mt-3 max-w-2xl text-base lowercase leading-relaxed tracking-wide text-foreground/88 md:text-[1.05rem] md:leading-relaxed">
            {project.description}
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.stack.map((tag) => (
              <li key={tag}>
                <StackChip tag={tag} />
              </li>
            ))}
          </ul>
          {cloneLine ? <CloneCommandRow command={cloneLine} /> : null}
        </div>

        <div className="mt-4 flex w-full shrink-0 flex-col gap-2.5 md:mt-0 md:w-auto md:min-w-[12rem]">
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
