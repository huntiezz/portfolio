import { Dialog } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';

interface TimeModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function TimeModal({ open, setOpen }: TimeModalProps) {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);


    const swedenTime = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Europe/Stockholm',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    }).format(currentTime);

    const swedenDate = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Europe/Stockholm',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(currentTime);

    const timeZoneAbbr = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Europe/Stockholm',
        timeZoneName: 'short'
    }).formatToParts(currentTime).find(part => part.type === 'timeZoneName')?.value;

    const timeZoneOffset = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Europe/Stockholm',
        timeZoneName: 'shortOffset'
    }).formatToParts(currentTime).find(part => part.type === 'timeZoneName')?.value?.replace('GMT', 'UTC');

    return (
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
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            onClick={(e) => e.stopPropagation()}
                            className="max-w-md w-full relative transform overflow-hidden rounded-lg bg-white dark:bg-secondary border-1 border-gray-300 dark:border-accent p-6 shadow-xl transition-all"
                        >
                            <Dialog.Title className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                                <Clock className="w-6 h-6" />
                                My Current Time
                            </Dialog.Title>

                            <div className="space-y-4">

                                <div className="text-center py-6 bg-gray-100 dark:bg-[#1a1a1a] rounded-lg border border-gray-300 dark:border-[#333]">
                                    <div className="text-5xl font-bold text-gray-900 dark:text-white font-mono tabular-nums">
                                        {swedenTime}
                                    </div>
                                    <div className="text-lg text-gray-600 dark:text-gray-400 mt-2">
                                        {swedenDate}
                                    </div>
                                </div>


                                <div className="space-y-3">
                                    <div className="flex items-start gap-3 p-3 bg-gray-100 dark:bg-[#1a1a1a] rounded-lg border border-gray-300 dark:border-[#333]">
                                        <MapPin className="w-5 h-5 text-gray-600 dark:text-gray-400 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <div className="font-semibold text-gray-900 dark:text-white">Location</div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">Sweden</div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 p-3 bg-gray-100 dark:bg-[#1a1a1a] rounded-lg border border-gray-300 dark:border-[#333]">
                                        <Globe className="w-5 h-5 text-gray-600 dark:text-gray-400 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <div className="font-semibold text-gray-900 dark:text-white">Timezone</div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                                {timeZoneAbbr}<br />
                                                {timeZoneOffset}
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <button
                                    onClick={() => setOpen(false)}
                                    className="w-full mt-4 px-4 py-2 bg-gray-200 dark:bg-[#1a1a1a] hover:bg-gray-300 dark:hover:bg-[#252525] text-gray-900 dark:text-white font-semibold rounded-lg border border-gray-300 dark:border-[#333] transition-all"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </Dialog>
            )}
        </AnimatePresence>
    );
}
