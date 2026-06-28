import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import BrandFavicon from "@/components/portfolio/BrandFavicon";

const NAV = [
  { href: "/about", label: "about" },
  { href: "/projects", label: "projects" },
  { href: "/pricing", label: "pricing" },
  { href: "/links", label: "links" },
] as const;

const navLinkDesktop =
  "flex h-full items-center px-6 py-3.5 text-sm lowercase tracking-wide text-foreground transition-colors hover:bg-[#0c50ff] hover:text-[#eeeeee]";

const navLinkMobile =
  "flex min-h-[44px] items-center justify-center border-border px-1 py-2.5 text-center text-[10px] lowercase leading-snug tracking-wide text-foreground transition-colors hover:bg-[#0c50ff] hover:text-[#eeeeee] sm:text-[11px]";

export default function SiteHeader() {
  return (
    <>
      <nav
        className="flex w-full shrink-0 flex-col border-b border-border bg-background md:hidden"
        aria-label="Primary navigation"
      >
        <div className="flex min-w-0 items-stretch">
          <div className="flex w-14 shrink-0 items-center justify-center border-r border-border py-3">
            <Link href="/" aria-label="Home" className="flex leading-none">
              <BrandFavicon size={24} width={24} height={24} />
            </Link>
          </div>
          <div className="flex min-w-0 flex-1 items-center border-r border-border px-3 py-3">
            <Link href="/" className="truncate font-pixel text-xl lowercase tracking-wide text-foreground">
              huntiez
            </Link>
          </div>
          <ThemeToggle variant="segmented" />
        </div>
        <div className="grid w-full grid-cols-4 border-t border-border">
          {NAV.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${navLinkMobile} ${i < NAV.length - 1 ? "border-r" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      <nav
        className="hidden w-full shrink-0 border-b border-border bg-background md:flex"
        aria-label="Primary navigation"
      >
        <div className="flex items-center justify-center border-r border-border px-6 py-3.5">
          <Link href="/" aria-label="Home" className="flex leading-none">
            <BrandFavicon size={28} width={28} height={28} />
          </Link>
        </div>

        <div className="flex min-w-0 flex-1 items-center border-r border-border px-6 py-3.5">
          <Link href="/" className="truncate font-pixel text-2xl lowercase tracking-wide text-foreground">
            huntiez
          </Link>
        </div>

        {NAV.map((item) => (
          <div key={item.href} className="flex shrink-0 items-center border-r border-border">
            <Link href={item.href} className={navLinkDesktop}>
              {item.label}
            </Link>
          </div>
        ))}

        <ThemeToggle variant="segmented" />
      </nav>
    </>
  );
}
