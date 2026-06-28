import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import clsx from "clsx";

type ThemeToggleProps = {
  variant?: "default" | "minimal" | "segmented" | "salt";
};

export default function ThemeToggle({ variant = "default" }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  if (!mounted) return null;

  const toggleTheme = () => {
    const isDark = theme === "dark";
    const newTheme = isDark ? "light" : "dark";

    const doc = document as Document & {
      startViewTransition?: (cb: () => Promise<void>) => { finished?: Promise<void> };
    };

    if (typeof doc.startViewTransition !== "function") {
      setTheme(newTheme);
      return;
    }

    const direction = isDark ? "dark-to-light" : "light-to-dark";
    doc.documentElement.setAttribute("data-transition-direction", direction);

    doc.startViewTransition(async () => {
      setTheme(newTheme);
    });
  };

  const isDark = theme === "dark";

  if (variant === "segmented" || variant === "salt") {
    const saltButton =
      "flex shrink-0 items-center justify-center px-5 py-3 text-foreground transition-colors hover:bg-[#0c50ff] hover:text-[#eeeeee]";

    return (
      <button
        type="button"
        onClick={toggleTheme}
        className={
          variant === "salt"
            ? saltButton
            : "flex items-center justify-center px-4 py-4 text-foreground transition-colors hover:bg-[color:var(--accent-blue)] hover:text-[color:var(--hero-on-phosphor)] md:px-5 md:py-5"
        }
        aria-label="Toggle theme"
      >
        {variant === "salt" ? (
          isDark ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 256 256"
              aria-hidden
            >
              <path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 256 256"
              aria-hidden
            >
              <path d="M233.54,142.23a8,8,0,0,0-8-2,88.08,88.08,0,0,1-109.8-109.8,8,8,0,0,0-10-10,104.84,104.84,0,0,0-52.91,37A104,104,0,0,0,136,224a103.09,103.09,0,0,0,62.52-20.88,104.84,104.84,0,0,0,37-52.91A8,8,0,0,0,233.54,142.23ZM188.9,190.34A88,88,0,0,1,65.66,67.11a89,89,0,0,1,31.4-26A106,106,0,0,0,96,56,104.11,104.11,0,0,0,200,160a106,106,0,0,0,14.92-1.06A89,89,0,0,1,188.9,190.34Z" />
            </svg>
          )
        ) : isDark ? (
          <Sun className="h-5 w-5" strokeWidth={1.5} />
        ) : (
          <Moon className="h-5 w-5" strokeWidth={1.5} />
        )}
      </button>
    );
  }

  if (variant === "minimal") {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className={clsx(
          "p-1 text-[var(--muted)] transition-colors hover:text-[var(--body-fg)]",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-blue)]",
        )}
        aria-label="Toggle theme"
      >
        <motion.span
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.2 }}
          key={theme}
          className="inline-flex"
        >
          {isDark ? (
            <Sun className="h-4 w-4 md:h-[18px] md:w-[18px]" strokeWidth={1.5} />
          ) : (
            <Moon className="h-4 w-4 md:h-[18px] md:w-[18px]" strokeWidth={1.5} />
          )}
        </motion.span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="hover-card group relative p-2 rounded-md hover:bg-secondary/50 dark:hover:bg-secondary transition-colors overflow-hidden"
      aria-label="Toggle theme"
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-md opacity-0 transition duration-300 group-hover:opacity-100 z-10"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), var(--glow-color), transparent 40%)`,
        }}
      />
      <motion.div
        className="relative z-20"
        initial={{ rotate: -180, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        key={theme}
      >
        {isDark ? <Sun className="w-5 h-5 text-gray-300" /> : <Moon className="w-5 h-5 text-orange-500" />}
      </motion.div>
    </button>
  );
}
