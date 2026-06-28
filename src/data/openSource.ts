export type OpenSourceExtraLink = {
  label: string;
  href: string;
};

export type OpenSourceProject = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  license?: string;
  stack: readonly string[];
  repoUrl: string;
  homepage?: string;
  defaultBranch?: string;
  extras?: readonly OpenSourceExtraLink[];
};

export type OpenSourceSection = {
  id: string;
  kicker: string;
  heading: string;
  hint: string;
  projectIds: readonly string[];
};

export const OPEN_SOURCE_PROJECTS: readonly OpenSourceProject[] = [
  {
    id: "storra",
    name: "storra",
    tagline: "storra.host",
    description:
      "secure file hosting - encrypted at rest, fast delivery, and private by default. marketing site and product surface for storra.host.",
    license: "MIT",
    stack: ["typescript", "next.js", "react"],
    repoUrl: "https://github.com/storra-host/storra.host",
    homepage: "https://storra.host/",
    defaultBranch: "main",
    extras: [
      { label: "org on github", href: "https://github.com/storra-host" },
      { label: "cloud console", href: "https://cloud.storra.host/" },
    ],
  },
  {
    id: "portfolio",
    name: "portfolio",
    tagline: "this site",
    description:
      "Next.js portfolio with quote flow, project catalog, and theme-aware chrome. Clone it or vendor pieces for your own folio.",
    license: "MIT",
    stack: ["next.js", "react", "typescript", "tailwind"],
    repoUrl: "https://github.com/huntiezz/portfolio",
    homepage: "https://lukky.rip/",
    defaultBranch: "main",
  },
  {
    id: "ignite-frontend",
    name: "ignite",
    tagline: "open-source chat",
    description:
      "Community chat frontend - voice, video, and text surfaces with a high-contrast marketing shell.",
    stack: ["javascript", "react"],
    repoUrl: "https://github.com/huntiezz/ignite-frontend",
    defaultBranch: "main",
  },
  {
    id: "cs2-offsets",
    name: "cs2-offsets",
    tagline: "auto-generated dumps",
    description:
      "CS2 offsets and schema dumps updated per game patch - built for tooling and radar workflows.",
    stack: ["c++"],
    repoUrl: "https://github.com/huntiezz/cs2-offsets",
    defaultBranch: "main",
  },
  {
    id: "cs2-assets",
    name: "cs2-assets",
    tagline: "radar asset pack",
    description: "Radar maps, kill feed icons, and UI assets for web radars and overlays.",
    stack: ["assets"],
    repoUrl: "https://github.com/huntiezz/cs2-assets",
    defaultBranch: "main",
  },
  {
    id: "ezboosts",
    name: "ezboosts",
    tagline: "discord boosts storefront",
    description:
      "Boosts marketplace wired around embed apis - routing, checkout affordances, and a deploy-ready vercel surface.",
    stack: ["typescript", "react", "vercel"],
    repoUrl: "https://github.com/huntiezz/ezboosts",
    homepage: "https://ezboosts.vercel.app/",
    defaultBranch: "main",
  },
  {
    id: "surgecheats",
    name: "surgecheats",
    tagline: "sellhub storefront",
    description: "Client storefront layering hosted checkout primitives into product grids.",
    stack: ["typescript", "react"],
    repoUrl: "https://github.com/huntiezz/surgecheats",
    homepage: "https://surgecheats.fun/",
    defaultBranch: "main",
  },
  {
    id: "cs2-dumper",
    name: "cs2-dumper",
    tagline: "inspection tooling",
    description: "Low-level offsets and dumper helpers aimed at inspection workflows.",
    license: "MIT",
    stack: ["c++"],
    repoUrl: "https://github.com/huntiezz/cs2-dumper",
    defaultBranch: "main",
  },
  {
    id: "device-mockups",
    name: "device-mockups",
    tagline: "presentation frames",
    description: "Device mockup frames for iPhone, Android, Mac, and Windows.",
    stack: ["assets", "design"],
    repoUrl: "https://github.com/huntiezz/device-mockups",
    defaultBranch: "main",
  },
];

export const OPEN_SOURCE_SECTIONS: readonly OpenSourceSection[] = [
  {
    id: "products",
    kicker: "products",
    heading: "platforms & apps",
    hint: "full products and surfaces you can run, fork, or learn from.",
    projectIds: ["storra", "portfolio", "ignite-frontend"],
  },
  {
    id: "storefronts",
    kicker: "storefronts",
    heading: "client builds",
    hint: "commerce and embed-driven frontends with real checkout paths.",
    projectIds: ["ezboosts", "surgecheats"],
  },
  {
    id: "tooling",
    kicker: "tooling",
    heading: "utilities & assets",
    hint: "downloadable helpers, dumps, and asset packs for adjacent workflows.",
    projectIds: ["cs2-offsets", "cs2-assets", "cs2-dumper", "device-mockups"],
  },
];

const projectById = new Map(OPEN_SOURCE_PROJECTS.map((project) => [project.id, project]));

export function getOpenSourceProject(id: string): OpenSourceProject | undefined {
  return projectById.get(id);
}

export function getOpenSourceSectionProjects(section: OpenSourceSection): OpenSourceProject[] {
  return section.projectIds
    .map((id) => projectById.get(id))
    .filter((project): project is OpenSourceProject => project !== undefined);
}

export function githubArchiveZipUrl(repoUrl: string, branch = "main"): string | null {
  try {
    const u = new URL(repoUrl);
    if (u.hostname !== "github.com") return null;
    const segments = u.pathname.split("/").filter(Boolean);
    if (segments.length < 2) return null;
    const [owner, repo] = segments;
    return `https://github.com/${owner}/${repo}/archive/refs/heads/${branch}.zip`;
  } catch {
    return null;
  }
}

export function gitCloneHttps(repoUrl: string): string | null {
  try {
    const u = new URL(repoUrl);
    if (u.hostname !== "github.com") return null;
    const segments = u.pathname.split("/").filter(Boolean);
    if (segments.length < 2) return null;
    return `git clone ${u.origin}/${segments[0]}/${segments[1]}.git`;
  } catch {
    return null;
  }
}

export const GITHUB_PROFILE_REPOS_URL = "https://github.com/huntiezz?tab=repositories&q=&type=public";
