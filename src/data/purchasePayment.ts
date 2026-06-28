export type PurchasePaymentMethod = "crypto" | "card";

export type CryptoAsset = "btc" | "eth" | "ltc" | "usdc" | "sol";

export const PURCHASE_PAYMENT_METHODS: readonly {
  id: PurchasePaymentMethod;
  title: string;
  description: string;
}[] = [
  {
    id: "crypto",
    title: "crypto",
    description: "instant invoice - scan qr and pay on the spot.",
  },
  {
    id: "card",
    title: "card",
    description: "card checkout - i'll send a payment link after review.",
  },
];

export const CRYPTO_ASSETS: readonly {
  id: CryptoAsset;
  title: string;
  symbol: string;
  coingeckoId: string;
  decimals: number;
  logoSrc: string;
  network?: string;
}[] = [
  { id: "btc", title: "bitcoin", symbol: "BTC", coingeckoId: "bitcoin", decimals: 8, logoSrc: "/crypto/btc.svg" },
  { id: "eth", title: "ethereum", symbol: "ETH", coingeckoId: "ethereum", decimals: 8, logoSrc: "/crypto/eth.svg" },
  { id: "ltc", title: "litecoin", symbol: "LTC", coingeckoId: "litecoin", decimals: 8, logoSrc: "/crypto/ltc.svg" },
  {
    id: "usdc",
    title: "usdc",
    symbol: "USDC",
    coingeckoId: "usd-coin",
    decimals: 6,
    logoSrc: "/crypto/usdc.svg",
    network: "ethereum",
  },
  { id: "sol", title: "solana", symbol: "SOL", coingeckoId: "solana", decimals: 6, logoSrc: "/crypto/sol.svg" },
];

export function getCryptoAssetMeta(asset: CryptoAsset) {
  return CRYPTO_ASSETS.find((entry) => entry.id === asset);
}

export function getPaymentMethodLabel(method: PurchasePaymentMethod | null): string | undefined {
  if (!method) return undefined;
  return PURCHASE_PAYMENT_METHODS.find((m) => m.id === method)?.title ?? method;
}

export function purchaseCardConfirmationMessage(): string {
  return "received your purchase request. i'll send a secure card payment link once availability is confirmed.";
}

export function purchaseCryptoConfirmationMessage(): string {
  return "your crypto invoice is ready. send the amount due within the accepted range before the rate lock expires - this covers normal wallet rounding and rate movement while your payment confirms.";
}
