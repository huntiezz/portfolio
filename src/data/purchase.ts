import { PORTFOLIO_CARDS } from "@/data/portfolio";
import type { PurchasePaymentMethod } from "@/data/purchasePayment";
import type { QuoteContactMethod } from "@/data/quote";

export type PurchaseScope = "frontend" | "backend" | "full";

export type PurchaseFormData = {
  scope: PurchaseScope | null;
  projectId: string | null;
  name: string;
  contactMethod: QuoteContactMethod | null;
  contactValue: string;
  paymentMethod: PurchasePaymentMethod | null;
};

export const PURCHASE_SCOPES: readonly {
  id: PurchaseScope;
  title: string;
  description: string;
}[] = [
  {
    id: "frontend",
    title: "frontend",
    description: "ui, pages, components, and client-side flows.",
  },
  {
    id: "backend",
    title: "backend",
    description: "apis, auth, databases, and server logic.",
  },
  {
    id: "full",
    title: "full project",
    description: "complete codebase - frontend, backend, and deploy path.",
  },
];

type PurchasableConfig = {
  id: string;
  portfolioId?: string;
  title?: string;
  summary?: string;
  coverSrc?: string | null;
  coverAlt?: string;
  prices: Record<PurchaseScope, number>;
};

export type PurchasableProjectCard = {
  id: string;
  title: string;
  summary: string;
  coverSrc: string | null;
  coverAlt: string;
  prices: Record<PurchaseScope, number>;
};

export const PURCHASABLE_PROJECTS: readonly PurchasableConfig[] = [
  {
    id: "test-product",
    title: "test product",
    summary: "debug-only placeholder - use for testing checkout, crypto invoices, and emails.",
    coverSrc: null,
    prices: { frontend: 0.2, backend: 0.2, full: 0.2 },
  },
  { id: "ezboosts", portfolioId: "ezboosts", prices: { frontend: 75, backend: 110, full: 150 } },
  { id: "surgecheats", portfolioId: "surgecheats", prices: { frontend: 75, backend: 110, full: 150 } },
  { id: "bracket", portfolioId: "bracket", prices: { frontend: 150, backend: 225, full: 350 } },
  {
    id: "swiftly",
    portfolioId: "swiftly",
    title: "swiftly",
    summary:
      "Full swiftly.gg source - storefront, seller dashboard, payment flows, embed api, and fulfillment infrastructure.",
    prices: { frontend: 175, backend: 275, full: 400 },
  },
  {
    id: "storra-cloud",
    portfolioId: "storra-cloud",
    title: "storra cloud",
    summary: "cloud.storra.host console - dashboard, deployment UX, account management, and product surfaces.",
    prices: { frontend: 150, backend: 225, full: 350 },
  },
  {
    id: "clovr",
    portfolioId: "clovr",
    title: "blinq.lol",
    summary: "blinq.lol / clovr - marketing site, launcher flows, dashboard auth, xbox linking, and client entry paths.",
    prices: { frontend: 125, backend: 200, full: 300 },
  },
  { id: "nlhybrid", portfolioId: "nlhybrid", prices: { frontend: 50, backend: 75, full: 100 } },
  { id: "polarity", portfolioId: "polarity", prices: { frontend: 100, backend: 150, full: 225 } },
  { id: "bytehack", portfolioId: "bytehack", prices: { frontend: 100, backend: 150, full: 225 } },
  { id: "lumina-cheats", portfolioId: "lumina-cheats", prices: { frontend: 65, backend: 100, full: 150 } },
  {
    id: "sellauth-landing",
    portfolioId: "sellauth",
    title: "sellauth landing",
    summary: "SellAuth marketing landing - hero, feature sections, and conversion paths from the main site footprint.",
    prices: { frontend: 85, backend: 125, full: 200 },
  },
  { id: "phase", portfolioId: "phase", prices: { frontend: 75, backend: 115, full: 175 } },
  { id: "discordplug", portfolioId: "discordplug", prices: { frontend: 65, backend: 100, full: 150 } },
  { id: "webhook-wizardy", portfolioId: "webhook-wizardy", prices: { frontend: 40, backend: 50, full: 75 } },
];

const purchasableById = new Map(PURCHASABLE_PROJECTS.map((p) => [p.id, p]));

function resolvePurchasable(config: PurchasableConfig): PurchasableProjectCard | null {
  if (config.portfolioId) {
    const card = PORTFOLIO_CARDS.find((c) => c.id === config.portfolioId);
    if (!card) return null;
    return {
      id: config.id,
      title: config.title ?? card.portfolioTitle,
      summary: config.summary ?? card.summary,
      coverSrc: config.coverSrc !== undefined ? config.coverSrc : card.coverSrc,
      coverAlt: config.coverAlt ?? card.coverAlt,
      prices: config.prices,
    };
  }

  if (!config.title || !config.summary) return null;

  return {
    id: config.id,
    title: config.title,
    summary: config.summary,
    coverSrc: config.coverSrc ?? null,
    coverAlt: config.coverAlt ?? config.title,
    prices: config.prices,
  };
}

export function getPurchasableProjects(): PurchasableProjectCard[] {
  return PURCHASABLE_PROJECTS.map(resolvePurchasable).filter(
    (card): card is PurchasableProjectCard => card !== null,
  );
}

export function getPurchasableProject(projectId: string | null): PurchasableProjectCard | undefined {
  if (!projectId) return undefined;
  const config = purchasableById.get(projectId);
  if (!config) return undefined;
  return resolvePurchasable(config) ?? undefined;
}

export function getPurchasePrice(data: PurchaseFormData): number | null {
  const project = getPurchasableProject(data.projectId);
  if (!project || !data.scope) return null;
  return project.prices[data.scope];
}

export function getPurchaseScopeLabel(scope: PurchaseScope | null): string | undefined {
  if (!scope) return undefined;
  return PURCHASE_SCOPES.find((s) => s.id === scope)?.title ?? scope;
}

export function purchaseOrderConfirmationMessage(): string {
  return "received your purchase request. i am checking availability then i will send a further email with payment and delivery details.";
}

export const EMPTY_PURCHASE_FORM: PurchaseFormData = {
  scope: null,
  projectId: null,
  name: "",
  contactMethod: null,
  contactValue: "",
  paymentMethod: null,
};

export const PURCHASE_STEPS = 6;

export function formatPurchasePrice(price: number): string {
  const needsCents = price < 1 || !Number.isInteger(price);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: needsCents ? 2 : 0,
    maximumFractionDigits: needsCents ? 2 : 0,
  }).format(price);
}
