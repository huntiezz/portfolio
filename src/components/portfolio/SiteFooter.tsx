import Link from "next/link";

export default function SiteFooter({ home = false }: { home?: boolean }) {
  return (
    <footer
      className={
        home
          ? "border-t border-white/[0.08] bg-[var(--void)] px-8 py-6 text-sm lowercase tracking-wide text-white/55 sm:px-16 md:py-8"
          : "border-t border-border px-8 py-6 text-sm lowercase tracking-wide text-foreground/60 sm:px-16 md:py-8"
      }
    >
      <div className="mx-auto flex w-full flex-row items-center justify-between gap-3 md:justify-center">
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[11px] font-bold md:hidden ${home ? "border-white/15 bg-black text-white/40" : "border-border bg-background text-foreground/45"}`}
          aria-hidden
        >
          N
        </span>
        <p className="flex-1 text-right text-[13px] leading-snug md:flex-none md:text-center md:text-sm">
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
