/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

export interface LinkItem {
  href: string;
  label: string;
  icon?: string;
  ariaLabel?: string;
  isExternal?: boolean;
  variant?: "text" | "social" | "credit";
}

export const legalLinks: LinkItem[] = [
  { href: "/impressum", label: "Impressum" },
  { href: "/privacy", label: "Privacy" },
  {
    href: "https://docs.coldbydefault.com/",
    label: "Documentation",
    isExternal: true,
  },
];

export const footerNavLinks: LinkItem[][] = [
  [
    { href: "/media", label: "Media" },
    { href: "/about", label: "About Me" },
    { href: "/about-portfolio", label: "About Portfolio" },
    { href: "/blog", label: "Blogs" },
  ],
];

export const resourceLinks: LinkItem[][] = [
  [
    { href: "https://nextjs.org", label: "Next.js", isExternal: true },
    {
      href: "https://modelcontextprotocol.io",
      label: "MCP",
      isExternal: true,
    },
    { href: "https://vercel.com/", label: "Vercel", isExternal: true },
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
