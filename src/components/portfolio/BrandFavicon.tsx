import type { ImgHTMLAttributes } from "react";

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt"> & {
  size?: number;
};

export default function BrandFavicon({ size = 28, width, height, className = "", ...rest }: Props) {
  const w = width ?? size;
  const h = height ?? size;
  return (
    <img
      src="/favicon.ico"
      alt=""
      width={w}
      height={h}
      draggable={false}
      decoding="async"
      className={`pointer-events-none object-contain ${className}`}
      aria-hidden
      {...rest}
    />
  );
}
