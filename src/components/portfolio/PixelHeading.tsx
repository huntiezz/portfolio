import clsx from "clsx";
import { getGlyph } from "@/lib/pixelGlyphs";

type PixelHeadingProps = {
  text: string;
  pixel?: number;
  letterGap?: number;
  rowGap?: number;
  className?: string;
  "aria-label"?: string;
};

export default function PixelHeading({
  text,
  pixel = 4,
  letterGap = 6,
  rowGap = 1,
  className,
  "aria-label": ariaLabel,
}: PixelHeadingProps) {
  const normalized = text.trim();
  const label = ariaLabel ?? normalized;

  return (
    <div
      role="img"
      aria-label={label}
      className={clsx("inline-flex flex-wrap items-start", className)}
      style={{ gap: letterGap }}
    >
      {normalized.split("").map((ch, gi) => {
        const rows = getGlyph(ch === " " ? " " : ch);
        return (
          <div
            key={`${gi}-${ch}`}
            className="flex flex-col"
            style={{ gap: rowGap }}
            aria-hidden
          >
            {rows.map((row, ri) => (
              <div key={ri} className="flex flex-row" style={{ gap: rowGap }}>
                {row.split("").map((cell, ci) => (
                  <span
                    key={ci}
                    className={clsx(
                      "inline-block shrink-0 rounded-[0.5px]",
                      cell === "1"
                        ? "bg-[var(--pixel-fg)]"
                        : "bg-transparent",
                    )}
                    style={{
                      width: pixel,
                      height: pixel,
                      minWidth: pixel,
                      minHeight: pixel,
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
