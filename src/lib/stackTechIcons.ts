export type StackChipDisplayMode = "both" | "icons";

export const STACK_CHIP_DISPLAY: StackChipDisplayMode = "both";

const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

function normalizeStackTag(tag: string): string {
  return tag.trim().toLowerCase().replace(/\s+/g, "");
}

const STACK_ICON_BY_KEY: Record<string, string> = {
  "next.js": `${DEVICON}/nextjs/nextjs-original.svg`,
  nextjs: `${DEVICON}/nextjs/nextjs-original.svg`,
  react: `${DEVICON}/react/react-original.svg`,
  typescript: `${DEVICON}/typescript/typescript-original.svg`,
  tailwind: `${DEVICON}/tailwindcss/tailwindcss-original.svg`,
  tailwindcss: `${DEVICON}/tailwindcss/tailwindcss-original.svg`,
  javascript: `${DEVICON}/javascript/javascript-original.svg`,
  js: `${DEVICON}/javascript/javascript-original.svg`,
  vercel: `${DEVICON}/vercel/vercel-original.svg`,
  nodejs: `${DEVICON}/nodejs/nodejs-original.svg`,
  node: `${DEVICON}/nodejs/nodejs-original.svg`,
  python: `${DEVICON}/python/python-original.svg`,
  go: `${DEVICON}/go/go-original.svg`,
  rust: `${DEVICON}/rust/rust-original.svg`,
  csharp: `${DEVICON}/csharp/csharp-original.svg`,
  "c#": `${DEVICON}/csharp/csharp-original.svg`,
  cpp: `${DEVICON}/cplusplus/cplusplus-original.svg`,
  "c++": `${DEVICON}/cplusplus/cplusplus-original.svg`,
  cplusplus: `${DEVICON}/cplusplus/cplusplus-original.svg`,
  c: `${DEVICON}/c/c-original.svg`,
  vite: `${DEVICON}/vitejs/vitejs-original.svg`,
  astro: `${DEVICON}/astro/astro-original.svg`,
};

export function stackIconSrc(tag: string): string | null {
  return STACK_ICON_BY_KEY[normalizeStackTag(tag)] ?? null;
}
