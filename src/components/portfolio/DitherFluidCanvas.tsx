"use client";

import { useEffect, useRef } from "react";

const BAYER_8 = [
  [0, 32, 8, 40, 2, 34, 10, 42],
  [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44, 4, 36, 14, 46, 6, 38],
  [60, 28, 52, 20, 62, 30, 54, 22],
  [3, 35, 11, 43, 1, 33, 9, 41],
  [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47, 7, 39, 13, 45, 5, 37],
  [63, 31, 55, 23, 61, 29, 53, 21],
];

const DEFAULT_HI_R = 48;
const DEFAULT_HI_G = 218;
const DEFAULT_HI_B = 188;

const DEFAULT_LO_R = 5;
const DEFAULT_LO_G = 5;
const DEFAULT_LO_B = 8;

function parseSpaceRgb(cssValue: string, fallback: [number, number, number]): [number, number, number] {
  const parts = cssValue.trim().split(/\s+/).map((n) => Number.parseInt(n, 10));
  if (parts.length < 3 || parts.some(Number.isNaN)) return fallback;
  return [parts[0]!, parts[1]!, parts[2]!];
}

type PerfTier = "static" | "low" | "high";

function clamp(v: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, v));
}

function fract(n: number): number {
  return n - Math.floor(n);
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function hash(ix: number, iy: number): number {
  return fract(Math.sin(ix * 127.1 + iy * 311.7 + 9.2) * 43758.5453123);
}

function vnoise(x: number, y: number): number {
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const fx = x - x0;
  const fy = y - y0;
  const ux = fx * fx * (3 - 2 * fx);
  const uy = fy * fy * (3 - 2 * fy);
  const a = hash(x0, y0);
  const b = hash(x0 + 1, y0);
  const c = hash(x0, y0 + 1);
  const d = hash(x0 + 1, y0 + 1);
  return lerp(lerp(a, b, ux), lerp(c, d, ux), uy);
}

function fbm(x: number, y: number, octaves: number): number {
  let sum = 0;
  let amp = 0.52;
  let freq = 2.12;
  const n = clamp(Math.floor(octaves), 2, 8);
  for (let i = 0; i < n; i++) {
    sum += amp * vnoise(x * freq + i * 23.4, y * freq + i * 11.2);
    freq *= 2.18;
    amp *= 0.52;
  }
  return clamp(sum, 0, 1);
}

function warp(x: number, y: number, t: number): [number, number] {
  const pivotX = 0.38;
  const pivotY = 0.56;
  let cx = x - pivotX;
  let cy = y - pivotY;
  const spin = t * 0.087;
  const cos = Math.cos(spin);
  const sin = Math.sin(spin);
  const rx = cx * cos - cy * sin;
  const ry = cx * sin + cy * cos;
  cx = rx + pivotX;
  cy = ry + pivotY;

  const shear = 0.09 * Math.sin(t * 0.19 + y * Math.PI * 2 * 1.1);
  cx += shear;

  const flow = t * 0.26;
  let wx =
    cx +
    0.39 * Math.sin(cy * Math.PI * 2 * 2.65 + flow * 1.1) +
    0.24 * Math.cos((cx * 1.1 + cy) * Math.PI * 2 * 3.1 + flow * 0.55);
  let wy =
    cy +
    0.37 * Math.cos(cx * Math.PI * 2 * 1.88 - flow * 0.92) +
    0.18 * Math.sin((cx - cy * 1.08) * Math.PI * 2 * 4.2 + flow * 0.62);

  wx +=
    0.065 *
    Math.sin(wx * Math.PI * 2 * 13 + wy * Math.PI * 2 * 8 + flow * 1.15);
  wy +=
    0.06 *
    Math.cos(wy * Math.PI * 2 * 10 - wx * Math.PI * 2 * 9 + flow * 0.88);

  return [wx, wy];
}

function fluidLite(x: number, y: number, t: number): number {
  const [wx, wy] = warp(x, y, t);
  const zoom = 3.05;
  const px = wx * zoom;
  const py = wy * zoom;

  const drift = t * 0.072;
  const sx = px + drift * 1.05;
  const sy = py - drift * 0.68;
  let v = fbm(sx, sy, 4);

  v = Math.pow(clamp(v, 0, 1), 0.74);

  const dx = x - 0.42;
  const dy = y - 0.5;
  const d = Math.hypot(dx, dy);
  v *= 0.54 + 0.46 * Math.pow(clamp(1 - d * 0.76, 0, 1), 1.02);

  return clamp(v, 0, 1);
}

function fluidHigh(x: number, y: number, t: number): number {
  const [wx, wy] = warp(x, y, t);
  const zoom = 3.05;
  const px = wx * zoom;
  const py = wy * zoom;

  const drift = t * 0.072;
  const sx = px + drift * 1.05;
  const sy = py - drift * 0.68;
  let v = fbm(sx, sy, 6);

  v = clamp(v * 0.78 + fbm(sx * 1.72 + 4.1, sy * 1.72 - 2.6, 5) * 0.22, 0, 1);

  const e = 0.0024;
  const gx = fbm(sx + e, sy, 6) - fbm(sx - e, sy, 6);
  const gy = fbm(sx, sy + e, 6) - fbm(sx, sy - e, 6);
  const mag = Math.sqrt(gx * gx + gy * gy) / (2 * e);
  const veins = smoothstep(5.8, 28, mag);
  v *= 1 - veins * 0.93;

  const ridges = Math.pow(Math.abs(Math.sin(v * Math.PI * 5.4 + drift * 2.2)), 1.35);
  v = clamp(v * (0.82 + 0.18 * ridges), 0, 1);

  v = Math.pow(clamp(v, 0, 1), 0.74);

  const dx = x - 0.42;
  const dy = y - 0.5;
  const d = Math.hypot(dx, dy);
  v *= 0.54 + 0.46 * Math.pow(clamp(1 - d * 0.76, 0, 1), 1.02);

  return clamp(v, 0, 1);
}

function resolvePerfTier(): PerfTier {
  if (typeof window === "undefined") return "low";

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return "static";
  }

  const nav = navigator as Navigator & {
    connection?: { effectiveType?: string; saveData?: boolean };
    deviceMemory?: number;
  };

  const conn = nav.connection;
  if (conn?.saveData) return "static";
  if (conn?.effectiveType === "slow-2g" || conn?.effectiveType === "2g") return "static";

  const cores = nav.hardwareConcurrency ?? 4;
  if (cores <= 2) return "static";

  if (nav.deviceMemory !== undefined && nav.deviceMemory <= 2) return "static";

  const narrow = window.matchMedia("(max-width: 719px)").matches;
  const lowMem = nav.deviceMemory !== undefined && nav.deviceMemory <= 4;
  const deskClass = !narrow && cores >= 8 && (nav.deviceMemory === undefined || nav.deviceMemory >= 4);

  if (narrow || lowMem || cores <= 4 || conn?.effectiveType === "3g") return "low";
  if (!deskClass) return "low";
  return "high";
}

function fitCanvasToParent(
  canvas: HTMLCanvasElement,
  parent: HTMLElement,
  tier: PerfTier,
) {
  const w = parent.clientWidth;
  const h = parent.clientHeight;
  if (w < 1 || h < 1) return;

  const narrowPhone = w < 520;

  let cell: number;
  let maxW: number;
  let minW: number;
  let ihMin: number;

  if (tier === "high") {
    cell = 4;
    maxW = 384;
    minW = 220;
    ihMin = 120;
  } else if (tier === "low") {
    if (narrowPhone) {
      cell = 10;
      maxW = 140;
      minW = 72;
      ihMin = 64;
    } else {
      cell = 6;
      maxW = 200;
      minW = 100;
      ihMin = 90;
    }
  } else {
    cell = 8;
    maxW = 160;
    minW = 80;
    ihMin = 80;
  }

  const IW = clamp(Math.round(w / cell), minW, maxW);
  const canvasH = Math.max(ihMin, Math.round(IW * (h / w)));

  canvas.width = IW;
  canvas.height = canvasH;
}

function paint(
  canvas: HTMLCanvasElement,
  t: number,
  tier: PerfTier,
  scratch: { img: ImageData | null; w: number; h: number },
  hiRgb: readonly [number, number, number],
  loRgb: readonly [number, number, number],
) {
  const ctx = canvas.getContext("2d", { alpha: false });
  if (!ctx) return;

  const IW = canvas.width;
  const IH = canvas.height;
  if (IW < 2 || IH < 2) return;

  const fullQuality = tier === "high";
  const ditherAmp = fullQuality ? 0.36 : 0.34;
  const sample = fullQuality ? fluidHigh : fluidLite;

  if (!scratch.img || scratch.w !== IW || scratch.h !== IH) {
    scratch.img = ctx.createImageData(IW, IH);
    scratch.w = IW;
    scratch.h = IH;
  }

  const img = scratch.img;
  const data = img.data;

  for (let y = 0; y < IH; y++) {
    const row = y * IW * 4;
    const by = BAYER_8[y % 8];
    for (let x = 0; x < IW; x++) {
      const nx = x / IW;
      const ny = y / IH;
      const v = sample(nx, ny, t);
      const th = (by[x % 8] + 0.5) / 64;
      const adjusted = clamp(v + (th - 0.5) * ditherAmp, 0, 1);
      const phosphorPx = adjusted >= 0.5;

      const i = row + x * 4;
      if (phosphorPx) {
        data[i] = hiRgb[0];
        data[i + 1] = hiRgb[1];
        data[i + 2] = hiRgb[2];
      } else {
        data[i] = loRgb[0];
        data[i + 1] = loRgb[1];
        data[i + 2] = loRgb[2];
      }
      data[i + 3] = 255;
    }
  }

  ctx.putImageData(img, 0, 0);
}

const STATIC_T = 0;

export default function DitherFluidCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const hiRef = useRef<[number, number, number]>([DEFAULT_HI_R, DEFAULT_HI_G, DEFAULT_HI_B]);
  const loRef = useRef<[number, number, number]>([DEFAULT_LO_R, DEFAULT_LO_G, DEFAULT_LO_B]);
  const syncDitherPalette = () => {
    const s = getComputedStyle(document.documentElement);
    hiRef.current = parseSpaceRgb(s.getPropertyValue("--hero-dither-hi"), hiRef.current);
    loRef.current = parseSpaceRgb(s.getPropertyValue("--hero-dither-lo"), loRef.current);
  };

  useEffect(() => {
    const el = canvasRef.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;

    syncDitherPalette();

    const scratch = { img: null as ImageData | null, w: 0, h: 0 };

    const mqReduce =
      typeof window !== "undefined"
        ? window.matchMedia("(prefers-reduced-motion: reduce)")
        : null;

    function paintTierForRuntime(): PerfTier {
      if (mqReduce?.matches) return "static";
      return resolvePerfTier();
    }

    const renderStatic = () => {
      const tier = paintTierForRuntime();
      fitCanvasToParent(el, parent, tier);
      paint(el, STATIC_T, tier, scratch, hiRef.current, loRef.current);
    };

    let themeRepaintRaf1 = 0;
    let themeRepaintRaf2 = 0;
    const cancelThemeRepaint = () => {
      if (themeRepaintRaf1) {
        cancelAnimationFrame(themeRepaintRaf1);
        themeRepaintRaf1 = 0;
      }
      if (themeRepaintRaf2) {
        cancelAnimationFrame(themeRepaintRaf2);
        themeRepaintRaf2 = 0;
      }
    };

    const queueThemeRepaint = () => {
      cancelThemeRepaint();
      themeRepaintRaf1 = requestAnimationFrame(() => {
        themeRepaintRaf1 = 0;
        themeRepaintRaf2 = requestAnimationFrame(() => {
          themeRepaintRaf2 = 0;
          syncDitherPalette();
          renderStatic();
        });
      });
    };

    const themeObserver = new MutationObserver(queueThemeRepaint);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const scheduleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resizeTimer = null;
        renderStatic();
      }, 140);
    };

    const ro = new ResizeObserver(scheduleResize);

    ro.observe(parent);
    renderStatic();

    const onVisibility = () => {
      if (document.visibilityState === "visible") renderStatic();
    };

    document.addEventListener("visibilitychange", onVisibility);

    const onMq = () => {
      renderStatic();
    };
    mqReduce?.addEventListener("change", onMq);

    return () => {
      cancelThemeRepaint();
      themeObserver.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      mqReduce?.removeEventListener("change", onMq);
      if (resizeTimer) clearTimeout(resizeTimer);
      scratch.img = null;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      style={{ imageRendering: "pixelated" }}
      aria-hidden
    />
  );
}
