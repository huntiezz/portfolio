import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Song {
    title: string;
    src: string;
    cover?: string;
}

const PLAYLIST: Song[] = [
    { title: "Cali Man - EsDeeKid", src: "/Cali Man - EsDeeKid.mp3", cover: "https://i.scdn.co/image/ab67616d00001e022940ac3a182dac2a5ec72249" },
    { title: "Chrome - Dayymein", src: "/Chrome - Dayymein.mp3", cover: "https://i.scdn.co/image/ab67616d000048518268b0ee16bbb845cb952cc4" },
    { title: "cts-v - OsamaSon", src: "/cts-v - OsamaSon.mp3", cover: "https://i.scdn.co/image/ab67616d00001e0204e302d64094bab26c5bee3e" },
    { title: "F_CK CANCER - Nettspend", src: "/F_CK CANCER - Nettspend.mp3", cover: "https://i.scdn.co/image/ab67616d00001e02796f9b36c012f78028b31914" },
    { title: "girls pay for my dick - phreshboyswag", src: "/girls pay for my dick - phreshboyswag.mp3", cover: "https://i.scdn.co/image/ab67616d00001e02962a8b9aa82f295c731245aa" },
    { title: "Grand Slam - Heney", src: "/Grand Slam - Heney.mp3", cover: "https://i.scdn.co/image/ab67616d00001e02751f716a84c9cb7a9e3a87d0" },
    { title: "Headlines - Drake", src: "/Headlines - Drake.mp3", cover: "https://i.scdn.co/image/ab67616d00001e02c7ea04a9b455e3f68ef82550" },
    { title: "LIKE WEEZY - Playboi Carti", src: "/LIKE WEEZY - Playboi Carti.mp3", cover: "https://i.scdn.co/image/ab67616d00001e026b219c8d8462bfe254a20469" },
    { title: "MANNEQUIN - Che", src: "/MANNEQUIN - Che.mp3", cover: "https://i.scdn.co/image/ab67616d00001e027930341e245fc8d02b54dab0" },
    { title: "Masturbation - Chief Keef", src: "/Masturbation - Chief Keef.mp3", cover: "https://i.scdn.co/image/ab67616d00001e027ec1af3bee0993768a9ef1f1" },
    { title: "Money Counter - Heney", src: "/Money Counter - Heney.mp3", cover: "https://i.scdn.co/image/ab67616d00001e021f10ccf832f9053dccaf2b34" },
    { title: "Need Me - xaviersobased", src: "/Need Me - xaviersobased.mp3", cover: "https://i.scdn.co/image/ab67616d00001e02beb7e537258a5ad2acd19d30" },
    { title: "Nun 4 No Schmuck - Glokk40Spaz", src: "/Nun 4 No Schmuck - Glokk40Spaz.mp3", cover: "https://i.scdn.co/image/ab67616d00001e02787fb799e21f9e7aea03f296" },
    { title: "PlaqueBoyMax - Fivio Foreign", src: "/PlaqueBoyMax - Fivio Foreign.mp3", cover: "https://i.scdn.co/image/ab67616d00001e02a983eb486c4d22eb2c2e9778" },
    { title: "Poängplockarna - Shacki", src: "/Poängplockarna - Shacki.mp3", cover: "https://i.scdn.co/image/ab67616d00001e02887c4a6f2cede2f504526f56" },
    { title: "red snapper - xaviersobased", src: "/red snapper - xaviersobased.mp3", cover: "https://i.scdn.co/image/ab67616d00001e02b4be17849945a3be6c38724a" },
    { title: "Shot Callin - YoungBoy Never Broke Again", src: "/Shot Callin - YoungBoy Never Broke Again.mp3", cover: "https://i.scdn.co/image/ab67616d00001e0248a01bee651fe18592202621" },
    { title: "Special - xaviersobased", src: "/Special - xaviersobased.mp3", cover: "https://i.scdn.co/image/ab67616d00001e02beb7e537258a5ad2acd19d30" },
    { title: "To The Max - Lil Loaded", src: "/To The Max - Lil Loaded.mp3", cover: "https://i.scdn.co/image/ab67616d00001e02b48ed9fdb400adda49aa5871" },
    { title: "We not like you - Nettspend", src: "/We not like you - Nettspend.mp3", cover: "https://i.scdn.co/image/ab67616d00001e02be184405ea8e0bb7fd6d752f" },
    { title: "Welcome To Sweden - Einár", src: "/Welcome To Sweden - Einár.mp3", cover: "https://i.scdn.co/image/ab67616d00001e02105e4f84b054c66afc38edd3" },
    { title: "What they say - Nettspend", src: "/What they say - Nettspend.mp3", cover: "https://i.scdn.co/image/ab67616d00001e022b0ba8a9db30e278d33a479d" }
];

const shuffleArray = (array: Song[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

export default function MusicPlayer() {
    const [playlist, setPlaylist] = useState<Song[]>(PLAYLIST);
    const [mounted, setMounted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [volume, setVolume] = useState(0.5);
    const [imageError, setImageError] = useState<Record<number, boolean>>({});
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        setPlaylist(shuffleArray(PLAYLIST));
        setMounted(true);

        audioRef.current = new Audio();
        audioRef.current.volume = volume;

        audioRef.current.onended = () => {
            handleNext();
        };

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (playlist.length > 0 && audioRef.current) {
            audioRef.current.src = playlist[currentSongIndex].src;
            // Reset image error for the new song
            setImageError(prev => ({ ...prev, [currentSongIndex]: false }));
            if (isPlaying) {
                audioRef.current.play().catch(e => console.log("Playback error:", e));
            }
        }
    }, [currentSongIndex, playlist]);

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch(e => console.log("Playback error:", e));
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    const handlePlayPause = () => {
        if (playlist.length === 0) return;
        setIsPlaying(!isPlaying);
    };

    const handleNext = () => {
        if (playlist.length === 0) return;
        setCurrentSongIndex((prev) => (prev + 1) % playlist.length);
    };

    const handlePrev = () => {
        if (playlist.length === 0) return;
        setCurrentSongIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    };

    const handleImageError = (index: number) => {
        setImageError(prev => ({ ...prev, [index]: true }));
    }

    if (!mounted || playlist.length === 0) return null;

    const currentSong = playlist[currentSongIndex];
    const coverPath = currentSong.cover || "/Music.png";

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed bottom-6 right-6 z-50 hidden md:block"
        >
            <div className="hover-card flex items-center gap-3 p-3 bg-gray-200 dark:bg-white/10 backdrop-blur-md border border-gray-300 dark:border-white/10 rounded-lg shadow-2xl overflow-hidden max-w-sm transition-all duration-300 hover:scale-105 group">

                {/* Glow Effect (Static/Simulated since global mouse tracking isn't here) */}
                <div className="pointer-events-none absolute -inset-px rounded-lg opacity-0 transition duration-300 group-hover:opacity-100 z-0 bg-white/5" />

                {/* Album Art / Icon */}
                <div className="relative w-12 h-12 flex-shrink-0 bg-gray-300 dark:bg-white/5 rounded-md overflow-hidden flex items-center justify-center border border-gray-400 dark:border-white/10 z-10">
                    <img
                        src={coverPath}
                        alt={currentSong.title}
                        className={`w-full h-full object-cover ${imageError[currentSongIndex] ? 'hidden' : 'block'}`}
                        onError={() => handleImageError(currentSongIndex)}
                    />
                    {imageError[currentSongIndex] && (
                        <Music className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                    )}
                </div>

                {/* Song Info */}
                <div className="flex flex-col min-w-[120px] max-w-[180px] overflow-hidden mr-2 z-10">
                    <motion.a
                        href={`https://open.spotify.com/search/${encodeURIComponent(currentSong.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ x: 10 }}
                        animate={{ x: 0 }}
                        key={currentSong.title}
                        className="text-sm font-bold text-gray-900 dark:text-white truncate hover:underline hover:text-primary transition-all cursor-pointer"
                        title="Search song on Spotify"
                    >
                        {currentSong.title.split(' - ')[1] || currentSong.title}
                    </motion.a>
                    <a
                        href={`https://open.spotify.com/search/${encodeURIComponent(currentSong.title.split(' - ')[0] || currentSong.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-gray-600 dark:text-white/70 truncate hover:underline hover:text-primary transition-all cursor-pointer"
                        title="Search artist on Spotify"
                    >
                        {currentSong.title.split(' - ')[0] || "Unknown Artist"}
                    </a>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-2 z-10">
                    <button
                        onClick={handlePrev}
                        className="p-1.5 hover:bg-gray-300 dark:hover:bg-white/10 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all"
                    >
                        <SkipBack className="w-4 h-4" />
                    </button>

                    <button
                        onClick={handlePlayPause}
                        className="p-2 bg-gray-900 dark:bg-white text-white dark:text-black rounded-md hover:scale-105 transition-transform"
                    >
                        {isPlaying ? (
                            <Pause className="w-4 h-4 fill-current" />
                        ) : (
                            <Play className="w-4 h-4 fill-current ml-0.5" />
                        )}
                    </button>

                    <button
                        onClick={handleNext}
                        className="p-1.5 hover:bg-gray-300 dark:hover:bg-white/10 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all"
                    >
                        <SkipForward className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
