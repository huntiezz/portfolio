import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import clsx from "clsx";

type ThemeToggleProps = {
    variant?: "default" | "minimal" | "segmented";
};

export default function ThemeToggle({ variant = "default" }: ThemeToggleProps) {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

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

    if (variant === "segmented") {
        return (
            <button
                type="button"
                onClick={toggleTheme}
                className="flex items-center justify-center px-4 py-4 text-foreground transition-colors hover:bg-[color:var(--accent-blue)] hover:text-[color:var(--hero-on-phosphor)] md:px-5 md:py-5"
                aria-label="Toggle theme"
            >
                {isDark ? (
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
            onClick={toggleTheme}
            className="hover-card group relative p-2 rounded-md hover:bg-secondary/50 dark:hover:bg-secondary transition-colors overflow-hidden"
            aria-label="Toggle theme"
        >
            <div className="pointer-events-none absolute -inset-px rounded-md opacity-0 transition duration-300 group-hover:opacity-100 z-10"
                style={{ background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), var(--glow-color), transparent 40%)` }}
            />
            <motion.div
                className="relative z-20"
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                key={theme}
            >
                {isDark ? (
                    <Sun className="w-5 h-5 text-gray-300" />
                ) : (
                    <Moon className="w-5 h-5 text-orange-500" />
                )}
            </motion.div>
        </button>
    );
}
