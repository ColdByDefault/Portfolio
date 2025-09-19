/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */
"use client";

import { Button } from "@/components/ui/button";
import { SheetContent, SheetTitle, SheetHeader } from "@/components/ui/sheet";
import {
  Home,
  FolderGit2,
  Antenna,
  Atom,
  BookOpenCheck,
  SquareLibrary,
  Contact,
  Brush,
} from "lucide-react";
import { ModeToggle } from "@/components/theme/theme-toggle";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import LanguageSwitcher from "@/components/languages/language-switcher";
import { ContactSheet } from "@/components/contact";
import { useTranslations } from "next-intl";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface DesktopNavigationProps {
  navItems: NavItem[];
  lightLink: string;
  darkLink: string;
}

interface MobileNavigationProps {
  navItems: NavItem[];
  onLinkClick: () => void;
}

interface MobileControlsProps {
  onMenuToggle?: () => void;
}

interface DesktopControlsProps {}

export function useNavItems(): NavItem[] {
  const t = useTranslations("Navigation");

  return [
    {
      name: t("home"),
      href: "/",
      icon: Home,
    },
    {
      name: t("aboutSite"),
      href: "/#this-portfolio",
      icon: Brush,
    },
    {
      name: t("mcp"),
      href: "/#github",
      icon: Antenna,
    },
    {
      name: t("technologies"),
      href: "/#tech",
      icon: Atom,
    },
    {
      name: t("certifications"),
      href: "/#cert",
      icon: BookOpenCheck,
    },
    {
      name: t("projects"),
      href: "/projects",
      icon: FolderGit2,
    },
    {
      name: t("media"),
      href: "/media",
      icon: SquareLibrary,
    },
  ];
}

export function DesktopNavigation({
  navItems,
  lightLink,
  darkLink,
}: DesktopNavigationProps) {
  return (
    <div className="hidden lg:flex items-center space-x-6" role="menubar">
      {navItems.map((item, index) => {
        const Icon = item.icon;
        const isLastItem = index === navItems.length - 2;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`
              group flex items-center space-x-2 text-sm font-medium transition-colors
              ${lightLink} ${darkLink}
              ${isLastItem ? "border-x pl-6 ml-2" : ""}
              focus:outline-none px-2 py-1
            `}
            role="menuitem"
            aria-label={`Navigate to ${item.name} section`}
          >
            <div className="relative overflow-hidden">
              <div className="flex items-center space-x-2 group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                <Icon className="h-4 w-4" aria-hidden={true} />
                <span>{item.name}</span>
              </div>
              <div className="absolute top-7 left-0 flex items-center space-x-2 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                <Icon className="h-4 w-4" aria-hidden={true} />
                <span>{item.name}</span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export function DesktopControls({}: DesktopControlsProps) {
  return (
    <div className="hidden lg:flex items-center gap-2">
      <div className="border-r-2 pr-2">
        <ContactSheet>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open contact information"
            className="cursor-pointer"
          >
            <Contact className="h-4 w-4" aria-hidden={true} />
          </Button>
        </ContactSheet>
      </div>
      <div className="border-r-2 pr-2">
        <ModeToggle />
      </div>
      <div className="border-r-2 pr-2">
        <LanguageSwitcher />
      </div>
      <div>
        <Link
          href="https://github.com/coldbydefault"
          aria-label="Visit ColdByDefault GitHub profile (opens in new tab)"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub aria-hidden={true} />
        </Link>
      </div>
    </div>
  );
}

export function MobileControls({ onMenuToggle }: MobileControlsProps) {
  return (
    <div className="flex lg:hidden items-center space-x-2 px-4">
      <ContactSheet>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open contact information"
          className="cursor-pointer"
        >
          <Contact className="h-4 w-4" aria-hidden={true} />
        </Button>
      </ContactSheet>
      <ModeToggle />
      <div>
        <LanguageSwitcher />
      </div>
    </div>
  );
}

export function MobileNavigation({
  navItems,
  onLinkClick,
}: MobileNavigationProps) {
  const t = useTranslations("Navigation");

  return (
    <SheetContent
      side="right"
      className="w-[300px] sm:w-[400px]"
      id="mobile-menu"
      aria-label="Mobile navigation menu"
    >
      <SheetHeader>
        <SheetTitle className="text-lg font-semibold mb-4 pl-2">
          {t("navigation")}
        </SheetTitle>
      </SheetHeader>
      <div className="flex flex-col space-y-4 mt-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              rel="noopener noreferrer"
              key={item.name}
              href={item.href}
              onClick={onLinkClick}
              className="flex items-center space-x-3 text-sm font-medium p-3 rounded-lg hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label={`Navigate to ${item.name} section`}
            >
              <Icon className="h-5 w-5" aria-hidden={true} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </SheetContent>
  );
}

export function BrandLogo() {
  return (
    <div className="flex items-center">
      <Link
        href="/"
        className="text-sm tracking-tight pl-4"
        aria-label="ColdByDefault - Home"
      >
        ColdByDefault
      </Link>
    </div>
  );
}
