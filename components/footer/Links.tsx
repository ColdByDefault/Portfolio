/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */
"use client";
import Link from "next/link";
import type { ReactNode } from "react";
import { FaGithub, FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin, FaInstagramSquare } from "react-icons/fa";
import type { LinkItem } from "@/data/footerLinks";

interface LinksProps {
  links: LinkItem[];
  className?: string;
  linkClassName?: string;
}

// Icon mapping for social media icons
const iconMap = {
  FaSquareXTwitter: <FaSquareXTwitter aria-hidden="true" />,
  FaInstagramSquare: <FaInstagramSquare aria-hidden="true" />,
  FaGithub: <FaGithub aria-hidden="true" />,
  FaLinkedin: <FaLinkedin aria-hidden="true" />,
};

export function Links({ links, className = "", linkClassName }: LinksProps) {
  const getDefaultClassName = (variant: LinkItem["variant"] = "text") => {
    switch (variant) {
      case "social":
        return "text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md p-1";
      case "credit":
        return "underline hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200";
      case "text":
      default:
        return "text-sm text-gray-600 dark:text-gray-300 hover:text-prime dark:hover:text-white transition-colors duration-200";
    }
  };

  const getIcon = (iconName?: string): ReactNode => {
    if (!iconName) return null;
    return iconMap[iconName as keyof typeof iconMap] || null;
  };

  return (
    <div className={className}>
      {links.map((link, index) => {
        const icon = getIcon(link.icon);

        return (
          <Link
            key={index}
            href={link.href}
            target={link.isExternal ? "_blank" : undefined}
            rel={link.isExternal ? "noopener noreferrer" : undefined}
            aria-label={link.ariaLabel}
            className={linkClassName || getDefaultClassName(link.variant)}
          >
            {icon && <span className="sr-only">{link.label}</span>}
            {icon || link.label}
          </Link>
        );
      })}
    </div>
  );
}

export default Links;
