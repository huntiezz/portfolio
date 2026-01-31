import { motion } from "framer-motion";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import TimeModal from "./TimeModal";
import BirthdayModal from "./BirthdayModal";
import { Clock, Cake, Github } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
    const [timeModalOpen, setTimeModalOpen] = useState(false);
    const [birthdayModalOpen, setBirthdayModalOpen] = useState(false);
    const [isBirthday, setIsBirthday] = useState(false);
    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseMove = (e: MouseEvent) => {
            const cards = container.getElementsByClassName("hover-card") as HTMLCollectionOf<HTMLElement>;
            for (const card of cards) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                card.style.setProperty("--mouse-x", `${x}px`);
                card.style.setProperty("--mouse-y", `${y}px`);
            }
        };

        container.addEventListener("mousemove", handleMouseMove);
        return () => {
            container.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);


    useEffect(() => {
        if (timeModalOpen || birthdayModalOpen) {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        } else {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        }


        const today = new Date();
        const isDebug = localStorage.getItem('debug_birthday') === 'true';
        if ((today.getMonth() === 6 && today.getDate() === 17) || isDebug) {
            setIsBirthday(true);
        }

        return () => {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        };
    }, [timeModalOpen, birthdayModalOpen]);

    const handleClickScroll = () => {
        const element = document.getElementById('about');
        if (element) {
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: elementPosition - 50,
                behavior: 'smooth'
            });
        }
    };

    const handleClickScroll2 = () => {
        const element = document.getElementById('experience');
        if (element) {
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: elementPosition - 50,
                behavior: 'smooth'
            });
        }
    };

    return (
        <>
            <TimeModal open={timeModalOpen} setOpen={setTimeModalOpen} />
            <BirthdayModal open={birthdayModalOpen} setOpen={setBirthdayModalOpen} />
            <motion.header
                className="flex justify-center items-center w-full fixed px-4 top-0 z-50 pt-4"
                initial={{ transform: 'translateY(-30px)', opacity: 0 }}
                animate={{ transform: 'translateY(0px)', opacity: 100 }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.39, 0.21, 0.12, 0.96], }}
            >
                <nav ref={containerRef} className="flex h-14 max-w-[46rem] w-screen bg-gradient-to-br from-primary to-secondary rounded-lg border-1 border-accent px-4 shadow-2xl">
                    <div className="flex flex-row items-center justify-between w-full">
                        <div className="flex flex-row gap-1 sm:gap-2 items-center">
                            <img alt="" draggable={false} className="h-8 w-8 sm:h-10 sm:w-10" src="/me.png" />
                            <button onClick={handleClickScroll} className="hover-card group relative p-1.5 sm:p-2 duration-300 text-sm sm:text-lg font-medium hover:bg-secondary rounded-md overflow-hidden">
                                <div className="pointer-events-none absolute -inset-px rounded-md opacity-0 transition duration-300 group-hover:opacity-100 z-10"
                                    style={{ background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), var(--glow-color), transparent 40%)` }}
                                />
                                <span className="relative z-20">About</span>
                            </button>
                            <button onClick={handleClickScroll2} className="hover-card group relative p-1.5 sm:p-2 duration-300 text-sm sm:text-lg font-medium hover:bg-secondary rounded-md overflow-hidden">
                                <div className="pointer-events-none absolute -inset-px rounded-md opacity-0 transition duration-300 group-hover:opacity-100 z-10"
                                    style={{ background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), var(--glow-color), transparent 40%)` }}
                                />
                                <span className="relative z-20">Experience</span>
                            </button>
                        </div>
                        <div className="min-[330px]:flex hidden flex-row gap-2 items-center">
                            <a
                                href="https://github.com/huntiezz/portfolio"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover-card group relative p-2 hover:bg-secondary rounded-lg duration-300 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white overflow-hidden flex items-center gap-2"
                                aria-label="View source code"
                                title="View Source Code"
                            >
                                <div className="pointer-events-none absolute -inset-px rounded-lg opacity-0 transition duration-300 group-hover:opacity-100 z-10"
                                    style={{ background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), var(--glow-color), transparent 40%)` }}
                                />
                                <Github className="w-5 h-5 relative z-20" />
                                <span className="relative z-20 font-medium text-sm hidden sm:inline">Source</span>
                            </a>
                            <button
                                onClick={() => setTimeModalOpen(true)}
                                className="hover-card group relative p-2 hover:bg-secondary rounded-lg duration-300 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white overflow-hidden"
                                aria-label="View my current time"
                            >
                                <div className="pointer-events-none absolute -inset-px rounded-lg opacity-0 transition duration-300 group-hover:opacity-100 z-10"
                                    style={{ background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), var(--glow-color), transparent 40%)` }}
                                />
                                <Clock className="w-5 h-5 relative z-20" />
                            </button>
                            <button
                                onClick={() => setBirthdayModalOpen(true)}
                                className="hover-card group relative p-2 hover:bg-secondary rounded-lg duration-300 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white overflow-hidden"
                                aria-label="View my birthday info"
                            >
                                <div className="pointer-events-none absolute -inset-px rounded-lg opacity-0 transition duration-300 group-hover:opacity-100 z-10"
                                    style={{ background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), var(--glow-color), transparent 40%)` }}
                                />
                                <Cake className="w-5 h-5 relative z-20" />
                                {isBirthday && (
                                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse z-30" />
                                )}
                            </button>
                            <ThemeToggle />
                        </div>
                    </div>
                </nav>
            </motion.header>
        </>
    );
}
