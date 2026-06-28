import type { ReactNode } from "react";

type SiteFrameProps = {
  children: ReactNode;
  variant?: "default" | "home";
};

const frameShell = "mx-auto flex w-full max-w-6xl flex-1 flex-col border-x border-border";

export default function SiteFrame({ children, variant = "default" }: SiteFrameProps) {
  const isHome = variant === "home";

  return (
    <div className="flex min-h-dvh flex-col bg-[var(--bg)] px-4 text-[var(--body-fg)] sm:px-6 md:px-8 lg:px-10">
      <div className={`${frameShell} ${isHome ? "min-h-screen" : "min-h-0"}`}>{children}</div>
    </div>
  );
}
