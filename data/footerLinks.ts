/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

export interface LinkItem {
  href: string;
  label: string;
  icon?: string; // Icon component name instead of JSX
  ariaLabel?: string;
  isExternal?: boolean;
  variant?: "text" | "social" | "credit";
}

export const legalLinks: LinkItem[] = [
  { href: "/impressum", label: "Impressum" },
];

export const resourceLinks: LinkItem[][] = [
  [
    { href: "https://nextjs.org", label: "Next.js", isExternal: true },
    { href: "https://react.dev", label: "React", isExternal: true },
    {
      href: "https://www.typescriptlang.org",
      label: "TypeScript",
      isExternal: true,
    },
  ],
  [
    {
      href: "https://tailwindcss.com",
      label: "Tailwind CSS",
      isExternal: true,
    },
    { href: "https://ui.shadcn.com", label: "Shadcn-UI", isExternal: true },
    { href: "https://www.radix-ui.com", label: "Radix UI", isExternal: true },
  ],
  [
    {
      href: "https://docs.github.com",
      label: "GitHub Docs",
      isExternal: true,
    },
    { href: "https://vercel.com/", label: "Vercel", isExternal: true },
    { href: "https://eslint.org", label: "ESLint", isExternal: true },
  ],
  [
    {
      href: "https://modelcontextprotocol.io",
      label: "MCP",
      isExternal: true,
    },
  ],
];

export const socialLinks: LinkItem[] = [
  {
    href: "https://x.com/ccoldbydefault",
    label: "X",
    icon: "FaSquareXTwitter",
    ariaLabel: "Follow ColdByDefault on X (Twitter)",
    isExternal: true,
    variant: "social" as const,
  },
  {
    href: "https://www.instagram.com/cold.by.default",
    label: "Instagram",
    icon: "FaInstagramSquare",
    ariaLabel: "Follow ColdByDefault on Instagram",
    isExternal: true,
    variant: "social" as const,
  },
  {
    href: "https://github.com/ColdByDefault",
    label: "GitHub",
    icon: "FaGithub",
    ariaLabel: "Visit ColdByDefault GitHub profile",
    isExternal: true,
    variant: "social" as const,
  },
  {
    href: "https://www.linkedin.com/in/yazan-a-a-465b44312/",
    label: "LinkedIn",
    icon: "FaLinkedin",
    ariaLabel: "Connect with ColdByDefault on LinkedIn",
    isExternal: true,
    variant: "social" as const,
  },
  {
    href: "https://open.spotify.com/user/q7s1djy4b0ed0dp435mz2bfho",
    label: "Spotify",
    icon: "FaSpotify",
    ariaLabel: "My Playlist on Spotify",
    isExternal: true,
    variant: "social" as const,
  },
];

export const creditLinks: LinkItem[] = [
  {
    href: "https://unsplash.com/@birminghammuseumstrust",
    label: "Birmingham Museums Trust",
    isExternal: true,
    variant: "credit" as const,
  },
  {
    href: "https://unsplash.com",
    label: "Unsplash",
    isExternal: true,
    variant: "credit" as const,
  },
];
