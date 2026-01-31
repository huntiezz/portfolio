import { Dialog } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cake, Calendar, Gift, Sparkles, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

interface BirthdayModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function BirthdayModal({ open, setOpen }: BirthdayModalProps) {

    const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });
    const [currentTime, setCurrentTime] = useState(new Date());


    const birthDate = new Date(2010, 6, 17);
    const birthMonth = 6;
    const birthDay = 17;

    useEffect(() => {
        const updateDimensions = () => {
            setWindowDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);

        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => {
            window.removeEventListener('resize', updateDimensions);
            clearInterval(timer);
        };
    }, []);

    const isBirthday = () => {
        if (typeof window !== 'undefined' && localStorage.getItem('debug_birthday') === 'true') {
            return true;
        }
        const today = new Date();
        return today.getMonth() === birthMonth && today.getDate() === birthDay;
    };

    const calculateAge = () => {
        const today = new Date();
        const yearDiff = today.getFullYear() - birthDate.getFullYear();


        if (isBirthday()) {
            return yearDiff;
        }

        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            return yearDiff - 1;
        }

        return yearDiff;
    };

    const getNextBirthdayInfo = () => {
        const today = new Date();
        const currentYear = today.getFullYear();

        let nextBirthday = new Date(currentYear, birthMonth, birthDay);

        if (today > nextBirthday) {
            nextBirthday = new Date(currentYear + 1, birthMonth, birthDay);
        }

        const timeDiff = nextBirthday.getTime() - today.getTime();
        const daysUntil = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        const nextAge = nextBirthday.getFullYear() - birthDate.getFullYear();

        return { nextBirthday, daysUntil, nextAge };
    };

    const currentAge = calculateAge();
    const isToday = isBirthday();
    const { nextBirthday, daysUntil, nextAge } = getNextBirthdayInfo();

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        }).format(date);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.39, 0.21, 0.12, 0.96] as const,
            }
        }
    };

    return (
        <>
            {open && isToday && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 9999, pointerEvents: 'none' }}>
                    <Confetti
                        width={windowDimensions.width}
                        height={windowDimensions.height}
                        recycle={true}
                        numberOfPieces={200}
                        gravity={0.3}
                    />
                </div>
            )}

            <AnimatePresence>
                {open && (
                    <Dialog
                        static
                        as={motion.div}
                        open={open}
                        onClose={() => setOpen(false)}
                        className="relative z-50"
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                            aria-hidden="true"
                        />

                        <div className="fixed inset-0 flex items-center justify-center p-4" onClick={() => setOpen(false)}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                transition={{ duration: 0.4, ease: [0.39, 0.21, 0.12, 0.96] } as any}
                                onClick={(e) => e.stopPropagation()}
                                className="max-w-md w-full relative overflow-hidden rounded-2xl bg-[#111] border border-[#333] shadow-2xl"
                            >

                                <button
                                    onClick={() => setOpen(false)}
                                    className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-colors z-10"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                <div className="p-6">

                                    <motion.div
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.1 }}
                                        className="mb-4"
                                    >
                                        <div className="flex items-center gap-2 mb-1">
                                            <motion.div
                                                animate={{
                                                    rotate: [0, -10, 10, -10, 0],
                                                }}
                                                transition={{
                                                    duration: 1,
                                                    repeat: Infinity,
                                                    repeatDelay: 3,
                                                }}
                                            >
                                                <Cake className="w-6 h-6" />
                                            </motion.div>
                                            <h2 className="text-2xl font-bold">
                                                {isToday ? 'Happy Birthday! 🎉' : 'My Birthday'}
                                            </h2>
                                        </div>
                                    </motion.div>


                                    <motion.div
                                        variants={containerVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className="space-y-3"
                                    >

                                        {isToday && (
                                            <motion.div
                                                variants={itemVariants}
                                                className="relative overflow-hidden p-4 rounded-lg bg-white/5 border border-white/10"
                                            >
                                                <div className="text-center">
                                                    <motion.div
                                                        animate={{
                                                            scale: [1, 1.1, 1],
                                                        }}
                                                        transition={{
                                                            duration: 2,
                                                            repeat: Infinity,
                                                        }}
                                                        className="text-5xl font-black mb-1"
                                                    >
                                                        {currentAge}
                                                    </motion.div>
                                                    <div className="text-lg font-semibold opacity-90">
                                                        Let&apos;s celebrate! 🎂
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}


                                        {!isToday && (
                                            <motion.div
                                                variants={itemVariants}
                                                whileHover={{ scale: 1.02, y: -2 }}
                                                className="relative overflow-hidden p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all cursor-pointer group"
                                            >
                                                <div className="text-center">
                                                    <div className="text-xs font-medium opacity-70 mb-1">Current Age</div>
                                                    <div className="text-5xl font-black">
                                                        {currentAge}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}


                                        <div className="grid grid-cols-1 gap-2">
                                            <motion.div
                                                variants={itemVariants}
                                                whileHover={{ x: 4 }}
                                                className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all cursor-pointer group"
                                            >
                                                <div className="p-1.5 rounded-md bg-white/10 group-hover:bg-white/20 transition-colors">
                                                    <Calendar className="w-4 h-4" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="text-xs opacity-70">Birthday</div>
                                                    <div className="font-semibold text-sm">July 17</div>
                                                </div>
                                            </motion.div>

                                            {!isToday && (
                                                <>
                                                    <motion.div
                                                        variants={itemVariants}
                                                        whileHover={{ x: 4 }}
                                                        className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all cursor-pointer group"
                                                    >
                                                        <div className="p-1.5 rounded-md bg-white/10 group-hover:bg-white/20 transition-colors">
                                                            <Gift className="w-4 h-4" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="text-xs opacity-70">Next Birthday</div>
                                                            <div className="font-semibold text-sm">{formatDate(nextBirthday)}</div>
                                                        </div>
                                                    </motion.div>

                                                    <motion.div
                                                        variants={itemVariants}
                                                        whileHover={{ x: 4 }}
                                                        className="relative overflow-hidden flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all cursor-pointer group"
                                                    >
                                                        <div className="p-1.5 rounded-md bg-white/10 group-hover:bg-white/20 transition-colors">
                                                            <Sparkles className="w-4 h-4 text-blue-300" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="text-xs opacity-70">Countdown</div>
                                                            <div className="font-semibold text-sm">
                                                                {daysUntil === 0 ? 'Today!' : `${daysUntil} day${daysUntil === 1 ? '' : 's'} until I turn ${nextAge}`}
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                </>
                                            )}

                                            <motion.div
                                                variants={itemVariants}
                                                whileHover={{ x: 4 }}
                                                className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all cursor-pointer group"
                                            >
                                                <div className="p-1.5 rounded-md bg-white/10 group-hover:bg-white/20 transition-colors">
                                                    <Cake className="w-4 h-4" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="text-xs opacity-70">Born</div>
                                                    <div className="font-semibold text-sm">{formatDate(birthDate)}</div>
                                                </div>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>
                    </Dialog>
                )}
            </AnimatePresence>
        </>
    );
}
