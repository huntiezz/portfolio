export type QuoteService = "frontend" | "backend" | "software" | "full-web";

export type QuoteTimeline = "rush" | "short" | "medium" | "flexible";

export type QuoteServiceVariant =
  | "frontend-landing"
  | "frontend-app"
  | "backend-api"
  | "backend-platform"
  | "software-tooling"
  | "software-system"
  | "software-hacks-clients"
  | "full-web-mvp"
  | "full-web-product";

export type QuoteGame = "minecraft" | "cs2" | "fortnite" | "roblox" | "other";

export type QuoteContactMethod = "discord" | "email";

export type QuoteFormData = {
  name: string;
  service: QuoteService | null;
  serviceVariant: QuoteServiceVariant | null;
  game: QuoteGame | null;
  description: string;
  timeline: QuoteTimeline | null;
  contactMethod: QuoteContactMethod | null;
  contactValue: string;
};

export const QUOTE_CONTACT_METHODS: readonly {
  id: QuoteContactMethod;
  title: string;
  description: string;
}[] = [
  {
    id: "discord",
    title: "discord",
    description: "fastest. dm me directly.",
  },
  {
    id: "email",
    title: "email",
    description: "good for longer briefs.",
  },
];

export const HUNTIEZ_DISCORD_URL = "https://discord.com/users/1495341793871663114";

export function quoteOrderConfirmationMessage(): string {
  return "received your order. i am checking if i can accept it then i will send a further email when i start working.";
}

export const QUOTE_STEPS = 7;

export const QUOTE_GAMES: readonly {
  id: QuoteGame;
  title: string;
  description: string;
}[] = [
  {
    id: "minecraft",
    title: "minecraft",
    description: "java or bedrock clients, mods, tooling",
  },
  {
    id: "cs2",
    title: "counter-strike 2",
    description: "internals, externals, loaders",
  },
  {
    id: "fortnite",
    title: "fortnite",
    description: "cheats, spoofer-adjacent tooling",
  },
  {
    id: "roblox",
    title: "roblox",
    description: "executors, scripts, client tooling",
  },
  {
    id: "other",
    title: "other",
    description: "another title - note it in scope",
  },
];

export function isHacksClientsVariant(variant: QuoteServiceVariant | null): boolean {
  return variant === "software-hacks-clients";
}

export function quoteTotalSteps(data: QuoteFormData): number {
  return isHacksClientsVariant(data.serviceVariant) ? 7 : 6;
}

export function quoteProgressStep(step: number, data: QuoteFormData): number {
  if (isHacksClientsVariant(data.serviceVariant)) return step;
  if (step >= 5) return step - 1;
  return step;
}

export function getGameLabel(game: QuoteGame | null): string | undefined {
  if (!game) return undefined;
  return QUOTE_GAMES.find((g) => g.id === game)?.title ?? game;
}

export const QUOTE_SERVICES: readonly {
  id: QuoteService;
  title: string;
  description: string;
  variantHeading: string;
  variantHint: string;
}[] = [
  {
    id: "frontend",
    title: "frontend",
    description: "react, next.js, ui, motion, dashboards",
    variantHeading: "what kind of frontend?",
    variantHint: "landing pages can grow with extra pages. dashboards are flat-rate.",
  },
  {
    id: "backend",
    title: "backend",
    description: "apis, auth, databases, infra glue",
    variantHeading: "what kind of backend?",
    variantHint: "apis are scoped per integration. platforms cover auth, data, and deploy paths.",
  },
  {
    id: "software",
    title: "software",
    description: "c++, go, native tooling, performance work",
    variantHeading: "what kind of software?",
    variantHint:
      "tooling covers utilities and helpers. systems work is for performance-critical builds. hacks/clients adds a game pick next.",
  },
  {
    id: "full-web",
    title: "full web project",
    description: "frontend + backend - ui, api, auth, database",
    variantHeading: "what kind of full stack?",
    variantHint:
      "mvp covers launch-ready ui with a real api. full product adds dashboards, data, and production infra.",
  },
];

export type QuoteServiceVariantOption = {
  id: QuoteServiceVariant;
  service: QuoteService;
  title: string;
  description: string;
  basePrice: number;
};

export const QUOTE_SERVICE_VARIANTS: readonly QuoteServiceVariantOption[] = [
  {
    id: "frontend-landing",
    service: "frontend",
    title: "landing page",
    description: "marketing site, hero to footer",
    basePrice: 350,
  },
  {
    id: "frontend-app",
    service: "frontend",
    title: "app / dashboard",
    description: "app ui, dashboards, complex flows",
    basePrice: 650,
  },
  {
    id: "backend-api",
    service: "backend",
    title: "api / integration",
    description: "rest, auth, webhooks, glue code",
    basePrice: 450,
  },
  {
    id: "backend-platform",
    service: "backend",
    title: "platform / infra",
    description: "databases, services, production systems",
    basePrice: 850,
  },
  {
    id: "software-tooling",
    service: "software",
    title: "tooling / utility",
    description: "c++, go cli, native helpers",
    basePrice: 500,
  },
  {
    id: "software-system",
    service: "software",
    title: "performance system",
    description: "low-level, optimized systems work",
    basePrice: 900,
  },
  {
    id: "software-hacks-clients",
    service: "software",
    title: "hacks / clients",
    description: "game cheats, clients, loaders",
    basePrice: 650,
  },
  {
    id: "full-web-mvp",
    service: "full-web",
    title: "mvp / launch",
    description: "ui + api, auth, core features shipped",
    basePrice: 850,
  },
  {
    id: "full-web-product",
    service: "full-web",
    title: "full product",
    description: "dashboard, api, database, deploy path",
    basePrice: 1350,
  },
];

export function getServiceVariants(service: QuoteService): QuoteServiceVariantOption[] {
  return QUOTE_SERVICE_VARIANTS.filter((v) => v.service === service);
}

export function getServiceVariantOption(
  variant: QuoteServiceVariant | null,
): QuoteServiceVariantOption | undefined {
  if (!variant) return undefined;
  return QUOTE_SERVICE_VARIANTS.find((v) => v.id === variant);
}

const TIMELINE_MULT: Record<QuoteTimeline, number> = {
  rush: 1.35,
  short: 1.1,
  medium: 1,
  flexible: 0.92,
};

export function estimateQuote(data: QuoteFormData): { low: number; high: number } | null {
  const variant = getServiceVariantOption(data.serviceVariant);
  if (!variant) return null;

  const timeline = data.timeline ?? "medium";
  const mult = TIMELINE_MULT[timeline];
  const descBoost = data.description.trim().length > 120 ? 1.12 : 1;
  const mid = Math.round(variant.basePrice * mult * descBoost);

  return {
    low: Math.round((mid * 0.85) / 50) * 50,
    high: Math.round((mid * 1.25) / 50) * 50,
  };
}

export function isValidContactValue(method: QuoteContactMethod | null, value: string): boolean {
  const trimmed = value.trim();
  if (!method || !trimmed) return false;
  if (method === "email") return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
  return trimmed.length >= 2;
}

export function formatUsd(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export const EMPTY_QUOTE_FORM: QuoteFormData = {
  name: "",
  service: null,
  serviceVariant: null,
  game: null,
  description: "",
  timeline: null,
  contactMethod: null,
  contactValue: "",
};
