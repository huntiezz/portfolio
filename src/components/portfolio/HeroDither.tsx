"use client";

import { useEffect, useState } from "react";
import Dither from "@/components/Dither/Dither";

const WAVE_COLOR: [number, number, number] = [12 / 255, 80 / 255, 1];

export default function HeroDither() {
  const [disableAnimation, setDisableAnimation] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setDisableAnimation(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <Dither
      waveSpeed={0.05}
      waveFrequency={3}
      waveAmplitude={0.3}
      waveColor={WAVE_COLOR}
      colorNum={4}
      pixelSize={3}
      disableAnimation={disableAnimation}
      enableMouseInteraction={false}
      mouseRadius={1}
    />
  );
}
