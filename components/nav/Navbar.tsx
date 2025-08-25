/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Home,
  FolderGit2,
  Menu,
  Antenna,
  Atom,
  BookOpenCheck,
  Telescope,
} from "lucide-react";
import { ModeToggle } from "../theme/theme-toggle";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { FaGithub } from "react-icons/fa";
import LanguageSwitcher from "@/components/languages/language-switcher";
import { useTranslations } from "next-intl";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState({
    theme: false,
    language: false,
    github: false,
    berich: false,
    mobileTheme: false,
    mobileBerich: false,
  });
  const t = useTranslations("Navigation");

  const closeTooltip = (key: keyof typeof tooltipOpen) => {
    setTooltipOpen((prev) => ({ ...prev, [key]: false }));
  };

  const navItems = [
    {
      name: t("home"),
      href: "/#home",
      icon: Home,
    },
    {
      name: t("projects"),
      href: "/#projects",
      icon: FolderGit2,
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
  ];

  const lightLink = "text-gray-500 hover:text-gray-900";
  const darkLink = "dark:text-gray-600 dark:hover:text-gray-200";

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex justify-center">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <Link href="/" className="text-sm tracking-tight pl-4">
              ColdByDefault
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                  flex items-center space-x-2 text-sm font-medium transition-colors
                  ${lightLink} ${darkLink}
                `}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            <Tooltip
              open={tooltipOpen.berich}
              onOpenChange={(open) =>
                setTooltipOpen((prev) => ({ ...prev, berich: open }))
              }
            >
              <TooltipTrigger asChild>
                <Link
                  target="_blanck"
                  href="https://berich-hub.vercel.app"
                  rel="noreferrer"
                  onClick={() => closeTooltip("berich")}
                >
                  <Badge className="cursor-pointer">beRich.Hub</Badge>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Visit beRich.Hub - Digital Learning Platform</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Desktop Theme Toggle */}
          <div className="hidden lg:flex items-center gap-2">
            <div className="border-r-2 pr-2">
              <Tooltip
                open={tooltipOpen.theme}
                onOpenChange={(open) =>
                  setTooltipOpen((prev) => ({ ...prev, theme: open }))
                }
              >
                <TooltipTrigger asChild>
                  <div onClick={() => closeTooltip("theme")}>
                    <ModeToggle />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Toggle theme</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="border-r-2 pr-2">
              <Tooltip
                open={tooltipOpen.language}
                onOpenChange={(open) =>
                  setTooltipOpen((prev) => ({ ...prev, language: open }))
                }
              >
                <TooltipTrigger asChild>
                  <div onClick={() => closeTooltip("language")}>
                    <LanguageSwitcher />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Change language</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div>
              <Tooltip
                open={tooltipOpen.github}
                onOpenChange={(open) =>
                  setTooltipOpen((prev) => ({ ...prev, github: open }))
                }
              >
                <TooltipTrigger asChild>
                  <Link
                    href="https://github.com/coldbydefault"
                    onClick={() => closeTooltip("github")}
                  >
                    <FaGithub />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Visit my GitHub profile</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="flex lg:hidden items-center space-x-2 px-4">
          {/* Mobile Theme Toggle */}
          <Tooltip
            open={tooltipOpen.mobileTheme}
            onOpenChange={(open) =>
              setTooltipOpen((prev) => ({ ...prev, mobileTheme: open }))
            }
          >
            <TooltipTrigger asChild>
              <div onClick={() => closeTooltip("mobileTheme")}>
                <ModeToggle />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle theme</p>
            </TooltipContent>
          </Tooltip>
          <div>
            <LanguageSwitcher />
          </div>
          {/* Mobile Menu Trigger */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-8">
                <div className="text-lg font-semibold mb-4 pl-2">
                  {t("navigation")}
                </div>
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      rel="noopener noreferrer"
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-3 text-sm font-medium p-3 rounded-lg hover:bg-accent transition-colors"
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
                <Tooltip
                  open={tooltipOpen.mobileBerich}
                  onOpenChange={(open) =>
                    setTooltipOpen((prev) => ({ ...prev, mobileBerich: open }))
                  }
                >
                  <TooltipTrigger asChild>
                    <Link
                      target="_blanck"
                      href="https://berich-hub.vercel.app"
                      rel="noreferrer"
                      className="pl-2 flex gap-2 items-center"
                      onClick={() => closeTooltip("mobileBerich")}
                    >
                      <Telescope />
                      <Badge variant="secondary">beRich.Hub</Badge>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Visit beRich.Hub - My Financial Platform</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
