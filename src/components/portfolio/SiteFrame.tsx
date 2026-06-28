import type { ReactNode } from "react";

type SiteFrameProps = {
  children: ReactNode;
  variant?: "default" | "home" | "flow";
};

const frameShell = "mx-auto flex w-full max-w-6xl min-h-0 flex-1 flex-col border-x border-border";

export default function SiteFrame({ children, variant = "default" }: SiteFrameProps) {
  const isHome = variant === "home";
  const isFlow = variant === "flow";

  return (
    <div
      className={
        isFlow
          ? "flex h-dvh flex-col overflow-hidden bg-[var(--bg)] px-4 text-[var(--body-fg)] sm:px-6 md:px-8 lg:px-10"
          : "flex min-h-dvh flex-col bg-[var(--bg)] px-4 text-[var(--body-fg)] sm:px-6 md:px-8 lg:px-10"
      }
    >
      <div className={`${frameShell} ${isHome ? "min-h-screen" : ""}`}>{children}</div>
    </div>
  );
}
