import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        mono: [
          "var(--font-geist-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "Roboto Mono",
          "Menlo",
          "Monaco",
          "monospace",
        ],
        pixel: ["var(--font-geist-pixel-square)", "monospace"],
      },
      colors: {
        border: "var(--hairline)",
        background: "var(--bg)",
        foreground: "var(--body-fg)",
        text: "var(--text)",
        primary: "var(--primary)",
        middle: "var(--middle)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
      },
      borderWidth: {
        1: "1px",
      },
      keyframes: {
        wave: {
          "0%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-20deg)" },
          "75%": { transform: "rotate(20deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
      },
      animation: {
        wave: "wave 0.8s linear",
      },
    },
  },
  plugins: [],
};
export default config;
