import type { ReactNode } from "react";

export default function SiteFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-[var(--bg)] px-4 text-[var(--body-fg)] sm:px-8 md:px-12 lg:px-14">
      <div className="mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col border-x border-border">
        {children}
      </div>
    </div>
  );
}
