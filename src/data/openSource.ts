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
  defaultBranch?: string;
  extras?: readonly OpenSourceExtraLink[];
};

export const OPEN_SOURCE_PROJECTS: readonly OpenSourceProject[] = [
  {
    id: "portfolio",
    name: "portfolio",
    tagline: "this site",
    description:
      "Next.js portfolio - chamfered ui bits, project catalog, theme-aware chrome. Clone or vendor slices for your own folio.",
    license: "MIT",
    stack: ["next.js", "react", "typescript", "tailwind"],
    repoUrl: "https://github.com/huntiezz/portfolio",
    defaultBranch: "main",
  },
  {
    id: "ezboosts",
    name: "ezboosts",
    tagline: "discord boosts storefront",
    description:
      "Frontend for a boosts marketplace wired around embed apis - routing, checkout affordances, and deploy-ready vercel surface.",
    stack: ["typescript", "react", "vercel"],
    repoUrl: "https://github.com/huntiezz/ezboosts",
    defaultBranch: "main",
  },
  {
    id: "surgecheats",
    name: "surgecheats",
    tagline: "sellhub storefront shell",
    description:
      "Client storefront experiment layering hosted checkout primitives into product grids.",
    stack: ["typescript", "react"],
    repoUrl: "https://github.com/huntiezz/surgecheats",
    defaultBranch: "main",
  },
  {
    id: "bytehackv3",
    name: "bytehackv3",
    tagline: "forum stack prototype",
    description:
      "Typescript-era footprint around moderation dashboards + forum ergonomics (historical ship trace - fork/read-only curiosity).",
    stack: ["typescript", "next.js"],
    repoUrl: "https://github.com/huntiezz/bytehackv3",
    defaultBranch: "main",
  },
  {
    id: "cs2-dumper",
    name: "cs2-dumper",
    tagline: "game asset tooling",
    description:
      "Low-level offsets/dumper helpers aimed at inspection workflows - downloadable tooling rather than ui polish.",
    stack: ["c++"],
    repoUrl: "https://github.com/huntiezz/cs2-dumper",
    defaultBranch: "main",
  },
];

export function githubArchiveZipUrl(
  repoUrl: string,
  branch = "main",
): string | null {
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
