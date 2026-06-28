export const CUT_CORNER_BTN =
  "polygon(14px 0,100% 0,100% calc(100% - 14px),calc(100% - 14px) 100%,0 100%,0 14px)";

const cardShadow =
  "shadow-[inset_0_1px_0_var(--card-inset),0_2px_4px_rgba(15,23,42,0.07),0_10px_28px_rgba(15,23,42,0.1),0_24px_48px_rgba(15,23,42,0.06)] dark:shadow-[inset_0_1px_0_var(--card-inset),0_4px_12px_rgba(0,0,0,0.28),0_16px_40px_rgba(0,0,0,0.38),0_32px_64px_rgba(0,0,0,0.22)]";

const cardShadowHover =
  "hover:shadow-[inset_0_1px_0_var(--card-inset),0_4px_10px_rgba(15,23,42,0.1),0_16px_36px_rgba(15,23,42,0.14),0_32px_56px_rgba(15,23,42,0.08)] dark:hover:shadow-[inset_0_1px_0_var(--card-inset),0_6px_16px_rgba(0,0,0,0.32),0_20px_48px_rgba(0,0,0,0.44),0_40px_72px_rgba(0,0,0,0.28)]";

export const cardShell = `overflow-hidden rounded-md border border-[color:var(--card-border)] bg-[color:var(--card-bg)] p-5 ring-1 ring-[color:var(--card-ring)] transition-[border-color,box-shadow] duration-150 hover:border-[color:var(--hero-phosphor)]/30 ${cardShadow} ${cardShadowHover} sm:p-6 md:p-7`;

const btnBase =
  "inline-flex min-h-[44px] items-center justify-center gap-2 px-5 py-2.5 text-sm lowercase leading-none tracking-wide transition-[color,background-color,border-color,box-shadow] duration-150 ease-out sm:min-h-[48px] sm:px-6 sm:py-3 sm:text-base";

export const btnPrimary = `${btnBase} btn-with-arrow border border-[color:var(--hero-phosphor)] bg-[color:var(--hero-phosphor)] font-medium text-[color:var(--hero-on-phosphor)] shadow-[0_2px_4px_rgba(12,80,255,0.22),0_8px_20px_rgba(12,80,255,0.28)] hover:bg-transparent hover:text-[color:var(--hero-phosphor)] hover:shadow-[0_4px_12px_rgba(12,80,255,0.32),0_12px_28px_rgba(12,80,255,0.22)]`;

export const btnArrow = "btn-arrow h-4 w-4 shrink-0";

export const btnSecondary = `${btnBase} border border-[color:var(--hero-about-border)] bg-[color:var(--hero-about-bg)] text-[color:var(--hero-copy-title)] shadow-[inset_0_1px_0_var(--card-inset),0_2px_8px_rgba(15,23,42,0.07),0_8px_20px_rgba(15,23,42,0.05)] hover:border-[color:var(--hero-phosphor)] hover:bg-[color:var(--hero-about-hover-bg)] hover:text-[color:var(--hero-phosphor)] hover:shadow-[inset_0_1px_0_var(--card-inset),0_4px_12px_rgba(15,23,42,0.1),0_12px_28px_rgba(15,23,42,0.08)] dark:shadow-[inset_0_1px_0_var(--card-inset),0_4px_12px_rgba(0,0,0,0.22),0_12px_28px_rgba(0,0,0,0.18)] dark:hover:shadow-[inset_0_1px_0_var(--card-inset),0_6px_16px_rgba(0,0,0,0.28),0_16px_36px_rgba(0,0,0,0.24)]`;

export const btnMuted = btnSecondary;

export const coverShell =
  "mx-auto h-[5.75rem] w-[5.75rem] shrink-0 overflow-hidden rounded-2xl border border-[color:var(--card-border)] bg-[color:var(--hero-about-bg)] shadow-[inset_0_1px_0_var(--card-inset),0_4px_12px_rgba(15,23,42,0.1),0_12px_28px_rgba(15,23,42,0.08)] dark:shadow-[inset_0_1px_0_var(--card-inset),0_6px_16px_rgba(0,0,0,0.32),0_16px_36px_rgba(0,0,0,0.28)] sm:h-[6.5rem] sm:w-[6.5rem] md:mx-0 md:h-[7.25rem] md:w-[7.25rem]";

export const modalShell =
  "relative z-[2] mx-4 my-8 max-h-[min(90vh,calc(100dvh-2rem))] w-full max-w-[52rem] overflow-y-auto overflow-x-hidden rounded-md border border-[color:var(--card-border)] bg-[color:var(--card-bg)] p-5 ring-1 ring-[color:var(--card-ring)] shadow-[inset_0_1px_0_var(--card-inset),0_8px_24px_rgba(15,23,42,0.12),0_24px_64px_rgba(15,23,42,0.18),0_48px_96px_rgba(15,23,42,0.1)] dark:shadow-[inset_0_1px_0_var(--card-inset),0_12px_32px_rgba(0,0,0,0.45),0_32px_80px_rgba(0,0,0,0.55),0_48px_120px_rgba(0,0,0,0.35)] sm:m-8 sm:p-6 md:p-7";
