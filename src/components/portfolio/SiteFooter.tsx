import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-border px-4 py-5 text-sm lowercase tracking-wide text-foreground/60 sm:px-8 md:py-6">
      <div className="mx-auto flex max-w-6xl flex-row items-center justify-between gap-3 md:justify-center">
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-background text-[11px] font-bold text-foreground/45 md:hidden"
          aria-hidden
        >
          N
        </span>
        <p className="flex-1 text-right text-[13px] leading-snug md:flex-none md:text-center md:text-sm">
          <Link
            href="/"
            className="transition-colors hover:text-[color:var(--accent-blue)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
          >
            hunter jackson - huntiez.com
          </Link>
        </p>
      </div>
    </footer>
  );
}
