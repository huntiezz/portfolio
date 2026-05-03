"use client";

import { Pause, Play } from "lucide-react";
import { useHeroDitherMotion } from "@/context/HeroDitherMotionContext";

const segmentedBtn =
  "flex items-center justify-center border-r border-border px-4 py-4 text-foreground transition-colors hover:bg-[color:var(--accent-blue)] hover:text-[color:var(--hero-on-phosphor)] md:px-5 md:py-5";

export default function HeroMotionPauseButton() {
  const ctx = useHeroDitherMotion();
  if (!ctx) return null;

  const { motionPaused, toggleMotionPaused } = ctx;

  return (
    <button
      type="button"
      onClick={toggleMotionPaused}
      className={segmentedBtn}
      aria-label={motionPaused ? "Resume background animation" : "Pause background animation"}
      aria-pressed={motionPaused}
    >
      {motionPaused ? (
        <Play className="h-5 w-5" strokeWidth={1.5} aria-hidden />
      ) : (
        <Pause className="h-5 w-5" strokeWidth={1.5} aria-hidden />
      )}
    </button>
  );
}
