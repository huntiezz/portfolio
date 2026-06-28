import Link from "next/link";

export default function SiteFooter({ home = false }: { home?: boolean }) {
  return (
    <footer
      className={
        home
          ? "shrink-0 border-t border-white/[0.08] bg-[var(--void)] px-8 py-3 text-xs lowercase tracking-wide text-white/55 sm:px-16 md:py-4"
          : "shrink-0 border-t border-border px-8 py-3 text-xs lowercase tracking-wide text-foreground/60 sm:px-16 md:py-4"
      }
    >
      <div className="mx-auto flex w-full flex-row items-center justify-between gap-3 md:justify-center">
        <span
          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border text-[8px] font-bold md:hidden ${home ? "border-white/15 bg-black text-white/40" : "border-border bg-background text-foreground/45"}`}
          aria-hidden
        >
          N
        </span>
        <p className="flex-1 text-right text-[11px] leading-snug md:flex-none md:text-center md:text-xs">
          <Link
            href="/"
            className="transition-colors hover:text-[color:var(--accent-blue)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
          >
            hunter jackson - lukky.rip
          </Link>
        </p>
      </div>
    </footer>
  );
}
