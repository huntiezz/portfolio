import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/index/Hero";
import About from "@/components/sections/index/About";
import Experience from "@/components/sections/index/Experience";
import Projects from "@/components/sections/index/Projects";
import Footer from "@/components/sections/index/Footer";
import { GridPattern } from "@/components/GridPattern";



export default function Home() {
  const [isBirthday, setIsBirthday] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {

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
      <main className="relative min-h-screen overflow-x-hidden px-6">
        <GridPattern
          width={50}
          height={50}
          x={-1}
          y={-1}
          className='z-[-5]'
        />
        <Hero inView={inView} descRef={ref} />
        <About />
        <Experience />
        <Projects />
        <Footer />
      </main>

    </>
  );
}
