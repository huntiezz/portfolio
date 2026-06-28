export type PortfolioKind = "work" | "side";

export type PortfolioMediaItem = {
  src: string;
  alt: string;
  type?: "image" | "video";
  contain?: boolean;
};

export type PortfolioShowcaseLink = {
  label: string;
  href: string;
};

export type PortfolioCardData = {
  id: string;
  kind: PortfolioKind;
  portfolioTitle: string;
  role: string;
  timeline: string;
  summary: string;
  bullets: string[];
  link?: string;
  showcaseLinks?: readonly PortfolioShowcaseLink[];
  coverSrc: string | null;
  coverAlt: string;
  coverClassName?: string;
  media: PortfolioMediaItem[];
};

export const PORTFOLIO_CARDS: PortfolioCardData[] = [
  {
    id: "nelsoncyber",
    kind: "work",
    portfolioTitle: "NelsonCybersecurity LLC",
    role: "Frontend Developer",
    timeline: "March 2026 - Present",
    summary:
      "Frontend developer on Vaultcord and other NelsonCyber projects - shipping dashboards, marketing pages, and product UI.",
    bullets: [
      "Frontend role at NelsonCybersecurity LLC, focused on Vaultcord and adjacent product surfaces.",
      "Built client-facing UI for Vaultcord, a Discord bot for server security and moderation.",
      "Collaborated with the team on layout, components, and iterative frontend polish.",
    ],
    link: "https://nelsoncybersecurity.com/",
    coverSrc: "/vaultcordlogo.webp",
    coverAlt: "NelsonCybersecurity / Vaultcord",
    media: [{ src: "/vaultcordmedia.png", alt: "Vaultcord product context" }],
  },
  {
    id: "polarity",
    kind: "work",
    portfolioTitle: "polarity.top",
    role: "Developer",
    timeline: "Present",
    summary:
      "Building and maintaining polarity.top - a premium game-enhancements storefront with instant delivery, live status, and checkout flows.",
    bullets: [
      "Shipped marketing surfaces, product catalog, and account/dashboard paths for polarity.top.",
      "Integrated payment and fulfillment UX around instant license delivery.",
      "Maintained status and docs surfaces tied to live product detection states.",
    ],
    link: "https://polarity.top/",
    coverSrc: "/polaritylogo.png",
    coverAlt: "polarity.top",
    coverClassName: "object-contain max-w-[9rem]",
    media: [{ src: "/polaritymedia.png", alt: "polarity.top storefront and product surfaces" }],
  },
  {
    id: "storra",
    kind: "work",
    portfolioTitle: "Storra",
    role: "Developer & Owner",
    timeline: "April 2026",
    summary:
      "Founding and building storra.host - owning product direction, frontend, and the core hosting experience.",
    bullets: [
      "Own storra.host end-to-end as developer and owner - brand, site, and customer-facing flows.",
      "Shipped landing, pricing, and onboarding paths for the hosting product.",
      "Iterate on infra-adjacent UX around provisioning and account management.",
    ],
    link: "https://storra.host/",
    coverSrc: "/storralogo.ico",
    coverAlt: "Storra",
    coverClassName: "object-contain max-w-[9rem]",
    media: [{ src: "/storramedia.png", alt: "Storra marketing site and product surfaces" }],
  },
  {
    id: "storra-cloud",
    kind: "work",
    portfolioTitle: "Storra Cloud",
    role: "Developer & Owner",
    timeline: "June 2026",
    summary:
      "Building cloud.storra.host - the cloud console and product layer behind storra’s hosted infrastructure offering.",
    bullets: [
      "Developed cloud.storra.host as the operational surface for storra’s cloud product.",
      "Own dashboard, deployment, and account UX as co-owner of the storra stack.",
      "Pair console polish with the main storra.host marketing and billing footprint.",
    ],
    link: "https://cloud.storra.host/",
    coverSrc: "/storracloudlogo.png",
    coverAlt: "Storra Cloud",
    coverClassName: "object-contain max-w-[9rem]",
    media: [{ src: "/cloudmedia.png", alt: "Storra Cloud console and dashboard" }],
  },
  {
    id: "discordplug",
    kind: "work",
    portfolioTitle: "DiscordPlug",
    role: "website contract",
    timeline: "contract | completed",
    summary:
      "built discordplug.gg on a freelance contract - shipped the client-facing site, then lost access after handoff.",
    bullets: [
      "delivered the marketing website for discordplug.gg on a fixed-scope freelance contract.",
      "worked within client briefs on branding, layout, and conversion paths.",
      "engagement ended after delivery; no ongoing access to the repo or hosting.",
    ],
    link: "https://discordplug.gg/",
    coverSrc: "/discordpluglogo.png",
    coverAlt: "DiscordPlug",
    coverClassName: "object-contain max-w-[9rem]",
    media: [{ src: "/discordplugmedia.png", alt: "DiscordPlug product surfaces" }],
  },
  {
    id: "clovr",
    kind: "work",
    portfolioTitle: "clovr",
    role: "Developer",
    timeline: "Present",
    summary:
      "Building blinq.lol / clovr - a minecraft bedrock client for Windows with launcher flows, dashboard auth, and clovr+ premium modules.",
    bullets: [
      "Shipped marketing and account surfaces for clovr on blinq.lol.",
      "Built sign-up, xbox linking, and dashboard paths around client launch.",
      "Supported server-picker UX for lifeboat, donutsmp, and 2b2tpe entry points.",
    ],
    link: "https://blinq.lol/",
    coverSrc: "/clovrlogo.svg",
    coverAlt: "clovr",
    coverClassName: "object-contain max-w-[9rem] p-3",
    media: [{ src: "/clovrmedia.png", alt: "clovr launcher and client surfaces" }],
  },
  {
    id: "sellauth",
    kind: "work",
    portfolioTitle: "SellAuth | Ignite",
    role: "Frontend Developer",
    timeline: "February 2026 - April 2026",
    summary:
      "Joined as a frontend developer contributing to ignite, an open-source chat platform, and sellauth’s marketing surfaces.",
    bullets: [
      "Implementing ignite’s open-source frontend and shipping meaningful UI/features.",
      "Contributed landing and feature work toward sellauth’s main site footprint.",
      "Owning slices of ux polish alongside the ignite contributor community.",
    ],
    link: "https://sellauth.com/",
    coverSrc: "/sellauth.png",
    coverAlt: "SellAuth",
    coverClassName: "object-contain max-w-[15rem]",
    media: [{ src: "/sellauthmedia.png", alt: "SellAuth | Ignite product surfaces" }],
  },
  {
    id: "swiftly",
    kind: "work",
    portfolioTitle: "Swiftly.gg",
    role: "Founder",
    timeline: "October 2025 - March 2026",
    summary: "Founded an e-commerce platform while owning development, design, and ai-assisted tooling.",
    bullets: [
      "Designed and shipped swiftly’s storefront layer and supporting infrastructure.",
      "Balanced entrepreneurship, engineering, and product iteration as a solo operator.",
      "Explored embeddings, apis, and growth loops around checkout and fulfillment.",
    ],
    link: "https://swiftly.gg/",
    coverSrc: "/swiftlylogo.png",
    coverAlt: "Swiftly.gg",
    media: [{ src: "/swiftlymedia.png", alt: "Swiftly.gg storefront / dashboard screenshot" }],
  },
  {
    id: "donut-auction",
    kind: "side",
    portfolioTitle: "Donut Auction",
    role: "Builder",
    timeline: "Shipping",
    summary: "Realtime donut smp auction viewer and betting layer.",
    bullets: [
      "Built a realtime spectator and betting UX on top of live auction mechanics.",
      "Focused on responsiveness and low-friction wagering states.",
    ],
    coverSrc: "/donutactionmedia.png",
    coverAlt: "Donut Auction preview",
    media: [],
  },
  {
    id: "bracket",
    kind: "side",
    portfolioTitle: "(Bracket)",
    role: "Builder",
    timeline: "Shipping",
    summary:
      "Kanban-style productivity surface - columns from requests through archive - with ticketing and integrations.",
    bullets: [
      "Built board density for simultaneous pipelines plus ticket intake, progress, and shipped states.",
      "Integration hooks for Discord, Slack, Telegram, Linear, GitHub, and CLI-adjacent workflows.",
    ],
    coverSrc: "/bracketmedia.png",
    coverAlt: "Bracket product screenshot",
    media: [{ src: "/bracketmedia.png", alt: "Bracket board overview" }],
    showcaseLinks: [{ label: "watch on youtube", href: "https://www.youtube.com/watch?v=dZDwycKJ8z0" }],
  },
  {
    id: "ignite-showcase",
    kind: "side",
    portfolioTitle: "Ignite",
    role: "Builder",
    timeline: "Shipping",
    summary:
      "Community chat positioning-voice, video, and text - with a high-contrast landing and desktop-app story.",
    bullets: [
      "Landing narrative around hanging out, hosting spaces, and staying connected.",
      "Orange-on-dark marketing chrome with clear download and onboarding paths.",
    ],
    coverSrc: "/ignitemedia.png",
    coverAlt: "Ignite landing screenshot",
    media: [{ src: "/ignitemedia.png", alt: "Ignite marketing site" }],
    showcaseLinks: [{ label: "watch on youtube", href: "https://www.youtube.com/watch?v=WkmosNbtwLA" }],
  },
  {
    id: "tap-waitlist",
    kind: "side",
    portfolioTitle: "tap.fun waitlist",
    role: "Builder",
    timeline: "Shipping",
    summary: "Unofficial waitlist landing for tap.fun with motion-forward layout polish.",
    bullets: ["Shipped typography, pacing, and micro-interactions for the waitlist story."],
    link: "https://iideekk.vercel.app/",
    coverSrc: "/tap.funmedia.png",
    coverAlt: "tap.fun waitlist",
    media: [],
  },
  {
    id: "surgecheats",
    kind: "side",
    portfolioTitle: "SurgeCheats",
    role: "Builder",
    timeline: "Shipping",
    summary: "Client storefront with sellhub-embedded checkout and product surfaces.",
    bullets: ["Embedded storefront flows leveraging sellhub’s apis and hosted checkout primitives."],
    link: "https://surgecheats.fun",
    coverSrc: "/surgecheatsmedia.png",
    coverAlt: "SurgeCheats storefront",
    media: [],
  },
  {
    id: "ezboosts",
    kind: "side",
    portfolioTitle: "ezboosts",
    role: "Builder",
    timeline: "Shipping",
    summary: "Discord boosts marketplace showcasing swiftly’s embed api and fulfillment paths.",
    bullets: ["Demonstrated embed-driven merchandising loops with tight checkout scaffolding."],
    link: "https://ezboosts.vercel.app/",
    coverSrc: "/ezboostsmedia.png",
    coverAlt: "ezboosts",
    media: [],
  },
  {
    id: "bytehack",
    kind: "work",
    portfolioTitle: "ByteHack",
    role: "Developer",
    timeline: "December 2025 - February 2026",
    summary:
      "Forum software for a private community - development, moderation tooling, and stability (project later closed).",
    bullets: [
      "Developed forum features alongside security posture and uptime work.",
      "Supported 400+ members and 100+ active threads at peak.",
      "Forum-first focus meant the marketing surface stayed minimal by choice.",
      "Project later closed due to a cease & desist.",
    ],
    link: "https://www.bytehack.net/",
    coverSrc: "/bytehacklogo.png",
    coverAlt: "ByteHack",
    media: [
      { src: "/bytehackmedia1.png", alt: "ByteHack forum moderation / thread tooling" },
      { src: "/bytehackmedia2.png", alt: "ByteHack community dashboards" },
    ],
  },
  {
    id: "safello-prompt",
    kind: "work",
    portfolioTitle: "Safello",
    role: "Prompt Engineer",
    timeline: "October 2025 - January 2026",
    summary:
      "Prompt engineering alongside product partners for Wu-Tao within a top-tier swedish fintech org.",
    bullets: [
      "Developed + tuned prompts powering Wu-Tao-facing experiences.",
      "Collaborated tightly with Wu-Tao stakeholders while tuning prompts for conversational quality metrics.",
      "Shipped iterative prompt packs while observing compliance constraints.",
    ],
    link: "https://safello.com/",
    coverSrc: "/safellologo.png",
    coverAlt: "Safello",
    media: [{ src: "/wutaomedia.png", alt: "Wu-Tao workflows + prompt tooling" }],
  },
  {
    id: "safello-qa",
    kind: "work",
    portfolioTitle: "Safello",
    role: "QA Intern",
    timeline: "September 2025 - October 2025",
    summary: "One-week intensive internship focused on professional qa processes inside regulated fintech.",
    bullets: [
      "Ran structured testing passes against production-adjacent environments.",
      "Observed qa rituals, release gates, and cross-team escalation patterns.",
      "Captured bugs with crisp repro steps for downstream engineering.",
    ],
    link: "https://safello.com/",
    coverSrc: "/safellologo.png",
    coverAlt: "Safello",
    media: [],
  },
  {
    id: "nlhybrid",
    kind: "work",
    portfolioTitle: "Nlhybrid",
    role: "Developer",
    timeline: "April 2025 - October 2025",
    summary:
      "Delivered nlhybrid’s web footprint plus the in-game csharp web-view shell powering a wildly distributed community.",
    bullets: [
      "Built nlhybrid’s official website and csharp webview ui for the server-side skin tooling.",
      "Supported a community topping 118k discord members while content collected millions of views.",
      "Worked across dotnet + frontend integration constraints for in-game overlays.",
    ],
    link: "https://pagesnlhybrid.vercel.app/",
    coverSrc: "/nlhybridlogo.png",
    coverAlt: "Nlhybrid",
    media: [{ src: "/nlhybridmedia.mp4", alt: "Nlhybrid trailer / interface motion", type: "video" }],
  },
  {
    id: "lumina-cheats",
    kind: "work",
    portfolioTitle: "Lumina Cheats",
    role: "Co-Owner & Developer",
    timeline: "June 2025 - August 2025",
    summary:
      "Counter-strike 2 internals in c++ paired with selective go-to-market through undetek’s audience.",
    bullets: [
      "Owned internal cheats development workflows while iterating performance-sensitive rendering paths.",
      "Partnered with undetek (~20k+ members) for marketing reach.",
      "Split responsibilities across core engineering versus partner-managed growth.",
    ],
    link: "https://luminacheats.com/",
    coverSrc: "/luminacheatslogo.png",
    coverAlt: "Lumina Cheats",
    media: [{ src: "/luminacheatsmedia.png", alt: "Lumina internals + loader surfaces" }],
  },
  {
    id: "webhook-wizardy",
    kind: "work",
    portfolioTitle: "Webhook Wizardy",
    role: "Developer",
    timeline: "April 2025",
    summary: "First-ever shipped website: a blunt webhook tooling experiment deployed on vercel.",
    bullets: [
      "Explored foundational html/css/js ergonomics.",
      "Captured early deployment habits on modern edge hosting.",
    ],
    link: "https://webhookwizardy.vercel.app/",
    coverSrc: "/webhookwizardymedia.png",
    coverAlt: "Webhook Wizardy preview",
    media: [],
  },
  {
    id: "encryption-shop",
    kind: "work",
    portfolioTitle: "Encryption",
    role: "Founder",
    timeline: "September 2024 - December 2024",
    summary:
      "Ran a fortnite cheats storefront with a partner developer, netting ~$4,000 revenue over the stint.",
    bullets: [
      "Operationalized storefront processes while iterating with a collaborator on product readiness.",
      "Balanced payouts, ux, and support load while remaining scrappy.",
    ],
    link: "https://ohioskibiditoilet.mysellauth.com/",
    coverSrc: "/encryptionmedia.png",
    coverAlt: "Encryption storefront",
    media: [],
  },
];

const CARD_ORDER = new Map(PORTFOLIO_CARDS.map((e, i) => [e.id, i]));

const MONTH_TO_INDEX: Record<string, number> = {
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11,
};

function isPresentOrShippingTimeline(timeline: string): boolean {
  const t = timeline.toLowerCase();
  return /\bpresent\b/.test(t) || t.trim() === "shipping";
}

function parseLeadingMonthYearTs(timeline: string): number {
  const m = timeline.trim().match(/^([a-z]+)\s+(\d{4})/i);
  if (!m) return 0;
  const mon = MONTH_TO_INDEX[m[1].toLowerCase()];
  if (mon === undefined) return 0;
  return Date.UTC(Number(m[2]), mon);
}

function comparePortfolioForDisplay(a: PortfolioCardData, b: PortfolioCardData): number {
  const aActive = isPresentOrShippingTimeline(a.timeline);
  const bActive = isPresentOrShippingTimeline(b.timeline);
  if (aActive !== bActive) return aActive ? -1 : 1;
  const ta = parseLeadingMonthYearTs(a.timeline);
  const tb = parseLeadingMonthYearTs(b.timeline);
  if (tb !== ta) return tb - ta;
  return (CARD_ORDER.get(a.id) ?? 0) - (CARD_ORDER.get(b.id) ?? 0);
}

export function getPortfolioPageSections(): {
  workExperience: PortfolioCardData[];
  sideProjects: PortfolioCardData[];
} {
  const work = PORTFOLIO_CARDS.filter((e) => e.kind === "work");
  const side = PORTFOLIO_CARDS.filter((e) => e.kind === "side");
  return {
    workExperience: [...work].sort(comparePortfolioForDisplay),
    sideProjects: [...side].sort(comparePortfolioForDisplay),
  };
}
