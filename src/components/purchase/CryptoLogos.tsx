import clsx from "clsx";
import type { CryptoAsset } from "@/data/purchasePayment";
import { getCryptoAssetMeta } from "@/data/purchasePayment";

type CryptoLogoProps = {
  asset: CryptoAsset;
  className?: string;
  size?: "sm" | "md" | "lg";
};

const sizeClass: Record<NonNullable<CryptoLogoProps["size"]>, string> = {
  sm: "h-7 w-7",
  md: "h-9 w-9",
  lg: "h-12 w-12",
};

export function CryptoLogo({ asset, className, size = "md" }: CryptoLogoProps) {
  const meta = getCryptoAssetMeta(asset);
  if (!meta) return null;

  return (
    <img
      src={meta.logoSrc}
      alt=""
      aria-hidden
      draggable={false}
      className={clsx(sizeClass[size], "shrink-0 object-contain", className)}
    />
  );
}
