import clsx from "clsx";

export const quoteCardBase =
  "group relative flex min-h-[9.5rem] flex-col items-start gap-4 border p-6 text-left transition-colors duration-200 sm:min-h-[10.5rem] sm:p-8";

export function quoteCardClass(selected: boolean) {
  return clsx(
    quoteCardBase,
    selected
      ? "border-[#0c50ff] bg-[#0c50ff] text-[#eeeeee]"
      : "border-border bg-transparent text-foreground hover:border-[#0c50ff]",
  );
}

export function quoteCardIconClass(selected: boolean) {
  return clsx(
    "flex h-10 w-10 shrink-0 items-center justify-center transition-colors duration-200",
    selected ? "text-[#eeeeee]" : "text-foreground/80 group-hover:text-[#0c50ff]",
  );
}

export function quoteCardDescClass(selected: boolean) {
  return clsx("text-sm", selected ? "text-[#eeeeee]/75" : "text-foreground/60");
}

export function quoteCardPriceClass(selected: boolean) {
  return clsx("font-mono text-sm", selected ? "text-[#eeeeee]" : "text-[#0c50ff]");
}

export const quoteGrid = "mt-10 grid gap-4 sm:grid-cols-2";

export const quoteGridThree = "mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3";

export const quoteGridFour = "mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5";

export const quoteKicker = "font-mono text-xs uppercase tracking-[0.18em] text-[#0c50ff]";

export const quoteHeading =
  "mt-4 font-pixel text-4xl lowercase leading-[1.05] tracking-wide text-foreground sm:text-6xl";

export const quoteBody = "mt-4 max-w-xl text-base text-foreground/70 sm:text-lg";

export const quoteInput =
  "w-full max-w-lg border-b border-border bg-transparent pb-3 font-pixel text-3xl lowercase text-foreground placeholder:text-foreground/30 focus:border-[#0c50ff] focus:outline-none sm:text-4xl";

export const quoteTextarea =
  "min-h-[11rem] w-full resize-none border border-border bg-transparent p-4 pb-10 text-base lowercase leading-relaxed tracking-wide text-foreground outline-none transition-colors placeholder:text-foreground/30 focus:border-[#0c50ff]";

export const quoteBtnBase =
  "inline-flex items-center justify-center gap-2 px-6 py-3 text-sm lowercase tracking-wide transition-colors sm:text-base";

export const quoteContinueBtn =
  "group mt-10 border border-[#0c50ff] bg-[#0c50ff] text-[#eeeeee] hover:bg-transparent hover:text-[#0c50ff] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[#0c50ff] disabled:hover:text-[#eeeeee]";

export const quotePrimaryBtn =
  "group border border-[#0c50ff] bg-[#0c50ff] text-[#eeeeee] hover:bg-transparent hover:text-[#0c50ff]";

export const quoteSecondaryBtn =
  "border border-border bg-transparent text-foreground hover:border-[#0c50ff] hover:text-[#0c50ff]";

export const quoteContinueArrow = "h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5";

export const quoteStepMotion = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.32, ease: [0.4, 0, 0.2, 1] as const },
};
