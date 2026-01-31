import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
        const isDark = theme === "dark";
        const newTheme = isDark ? "light" : "dark";


        if (!(document as any).startViewTransition) {
            setTheme(newTheme);
            return;
        }

        const transition = (document as any).startViewTransition(async () => {
            setTheme(newTheme);
        });


        const direction = isDark ? "dark-to-light" : "light-to-dark";
        document.documentElement.setAttribute('data-transition-direction', direction);


    };

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
                {theme === "dark" ? (
                    <Moon className="w-5 h-5 text-gray-300" />
                ) : (
                    <Sun className="w-5 h-5 text-orange-500" />
                )}
            </motion.div>
        </button>
    );
}
