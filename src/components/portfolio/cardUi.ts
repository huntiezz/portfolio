export const CUT_CORNER_BTN =
  "polygon(14px 0,100% 0,100% calc(100% - 14px),calc(100% - 14px) 100%,0 100%,0 14px)";

export const cardShell =
  "overflow-hidden rounded-md border border-[color:var(--card-border)] bg-[color:var(--card-bg)] p-5 shadow-[inset_0_1px_0_var(--card-inset),0_10px_36px_rgba(15,23,42,0.08)] ring-1 ring-[color:var(--card-ring)] transition-[border-color] duration-150 hover:border-[color:var(--hero-phosphor)]/30 dark:shadow-[inset_0_1px_0_var(--card-inset),0_14px_44px_rgba(0,0,0,0.28)] sm:p-6 md:p-7";

const btnBase =
  "inline-flex min-h-[44px] items-center justify-center gap-2 px-5 py-2.5 text-sm lowercase leading-none tracking-wide transition-colors duration-150 ease-out sm:min-h-[48px] sm:px-6 sm:py-3 sm:text-base";

export const btnPrimary = `${btnBase} btn-with-arrow border border-[color:var(--hero-phosphor)] bg-[color:var(--hero-phosphor)] font-medium text-[color:var(--hero-on-phosphor)] hover:bg-transparent hover:text-[color:var(--hero-phosphor)]`;

export const btnArrow = "btn-arrow h-4 w-4 shrink-0";

export const btnSecondary = `${btnBase} border border-[color:var(--hero-about-border)] bg-[color:var(--hero-about-bg)] text-[color:var(--hero-copy-title)] hover:border-[color:var(--hero-phosphor)] hover:bg-[color:var(--hero-about-hover-bg)] hover:text-[color:var(--hero-phosphor)]`;

export const btnMuted = btnSecondary;

export const coverShell =
  "mx-auto h-[5.75rem] w-[5.75rem] shrink-0 overflow-hidden rounded-2xl border border-[color:var(--card-border)] bg-[color:var(--hero-about-bg)] shadow-[inset_0_1px_0_var(--card-inset)] sm:h-[6.5rem] sm:w-[6.5rem] md:mx-0 md:h-[7.25rem] md:w-[7.25rem]";

export const modalShell =
  "relative z-[2] mx-4 my-8 max-h-[min(90vh,calc(100dvh-2rem))] w-full max-w-[52rem] overflow-y-auto overflow-x-hidden rounded-md border border-[color:var(--card-border)] bg-[color:var(--card-bg)] p-5 shadow-[inset_0_1px_0_var(--card-inset),0_10px_36px_rgba(15,23,42,0.08)] ring-1 ring-[color:var(--card-ring)] dark:shadow-[inset_0_1px_0_var(--card-inset),0_14px_44px_rgba(0,0,0,0.28)] sm:m-8 sm:p-6 md:p-7";
