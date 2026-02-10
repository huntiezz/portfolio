import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/index/Hero";
import About from "@/components/sections/index/About";
import Experience from "@/components/sections/index/Experience";
import Projects from "@/components/sections/index/Projects";
import Footer from "@/components/sections/index/Footer";
import DotGrid from "@/components/DotGrid";
import { useTheme } from 'next-themes';


export default function Home() {
  const [isBirthday, setIsBirthday] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const today = new Date();
    const isDebug = localStorage.getItem('debug_birthday') === 'true';
    if ((today.getMonth() === 6 && today.getDate() === 17) || isDebug) {
      setIsBirthday(true);
    }

    const updateDimensions = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const currentTheme = mounted ? (resolvedTheme || theme) : 'dark';
  const dotBaseColor = currentTheme === 'dark' ? '#ffffff' : '#000000';
  const dotActiveColor = '#3b82f6'; // Keep blue for both for now, or change if desired

  return (
    <>
      <Navbar />
      {isBirthday && (
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
      <div className="fixed inset-0 z-[-1]">
        <DotGrid
          dotSize={3}
          gap={30}
          baseColor={dotBaseColor}
          activeColor={dotActiveColor}
          className="opacity-30"
        />
      </div>
      <main className="relative min-h-screen overflow-x-hidden px-6 z-10">
        <Hero inView={inView} descRef={ref} />
        <About />
        <Experience />
        <Projects />
        <Footer />
      </main>

    </>
  );
}
