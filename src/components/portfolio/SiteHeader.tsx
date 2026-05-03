import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import BrandFavicon from "@/components/portfolio/BrandFavicon";
import HeroMotionPauseButton from "@/components/portfolio/HeroMotionPauseButton";

const NAV = [
  { href: "/about", label: "about" },
  { href: "/projects", label: "projects" },
  { href: "/open-source", label: "open source" },
  { href: "/links", label: "links" },
] as const;

const navLinkDesktop =
  "flex items-center px-5 py-5 text-sm lowercase tracking-wide text-foreground transition-colors hover:bg-[color:var(--accent-blue)] hover:text-[color:var(--hero-on-phosphor)]";

const navLinkMobile =
  "flex shrink-0 items-center whitespace-nowrap px-4 py-3 text-sm lowercase tracking-wide text-foreground transition-colors hover:bg-[color:var(--accent-blue)] hover:text-[color:var(--hero-on-phosphor)] active:bg-[color:var(--accent-blue)]/25";

export default function SiteHeader() {
  return (
    <header className="border-b border-border bg-background">
      <div className="flex flex-col md:hidden">
        <div className="flex min-w-0 items-stretch">
          <div className="flex items-center justify-center border-r border-border px-4 py-4">
            <Link href="/" aria-label="Home" className="flex leading-none">
              <BrandFavicon size={24} className="h-6 w-6 shrink-0" />
            </Link>
          </div>
          <div className="flex min-w-0 flex-1 items-center border-r border-border px-4 py-4">
            <Link
              href="/"
              className="truncate font-pixel text-lg lowercase tracking-wide text-foreground"
            >
              huntiez
            </Link>
          </div>
          <div className="flex shrink-0 items-stretch border-l border-border">
            <HeroMotionPauseButton />
            <ThemeToggle variant="segmented" />
          </div>
        </div>
        <nav
          className="scrollbar-hide flex w-full overflow-x-auto overflow-y-hidden border-t border-border"
          aria-label="Primary navigation"
        >
          <div className="flex min-w-min items-stretch">
            {NAV.map((item) => (
              <div key={item.href} className="flex items-stretch border-r border-border">
                <Link href={item.href} className={navLinkMobile}>
                  {item.label}
                </Link>
              </div>
            ))}
          </div>
        </nav>
      </div>

      <nav
        className="hidden min-h-0 w-full items-stretch md:flex"
        aria-label="Primary navigation"
      >
        <div className="flex items-center justify-center border-r border-border px-5 py-5">
          <Link href="/" aria-label="Home" className="flex leading-none">
            <BrandFavicon size={28} className="h-7 w-7 shrink-0" />
          </Link>
        </div>

        <div className="flex min-w-0 flex-1 items-center border-r border-border px-5 py-5">
          <Link
            href="/"
            className="truncate font-pixel text-xl lowercase tracking-wide text-foreground sm:text-2xl"
          >
            huntiez
          </Link>
        </div>

        {NAV.map((item) => (
          <div key={item.href} className="flex items-stretch border-r border-border">
            <Link href={item.href} className={navLinkDesktop}>
              {item.label}
            </Link>
          </div>
        ))}

        <div className="flex shrink-0 items-stretch">
          <HeroMotionPauseButton />
          <ThemeToggle variant="segmented" />
        </div>
      </nav>
    </header>
  );
}
