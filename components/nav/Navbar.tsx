/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader,
} from "@/components/ui/sheet";
import {
  Home,
  FolderGit2,
  Menu,
  Antenna,
  Atom,
  BookOpenCheck,
  NotebookText,
} from "lucide-react";
import { ModeToggle } from "@/components/theme/theme-toggle";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import LanguageSwitcher from "@/components/languages/language-switcher";
import { useTranslations } from "next-intl";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("Navigation");

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
    {
      name: "Blogs",
      href: "/blog",
      icon: NotebookText,
    },
  ];

  const lightLink = "text-gray-500 hover:text-gray-900";
  const darkLink = "dark:text-gray-600 dark:hover:text-gray-200";

  return (
    <nav
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex justify-center"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-sm tracking-tight pl-4"
              aria-label="ColdByDefault - Home"
            >
              ColdByDefault
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6" role="menubar">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isLastItem = index === navItems.length - 1;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                  flex items-center space-x-2 text-sm font-medium transition-colors
                  ${lightLink} ${darkLink}
                  ${isLastItem ? "border-l pl-6 ml-2" : ""}
                  focus:outline-none px-2 py-1
                `}
                  role="menuitem"
                  aria-label={`Navigate to ${item.name} section`}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            {/* <Link
              target="_blank"
              href="https://berich-hub.vercel.app"
              rel="noopener noreferrer"
              aria-label="Visit beRich.Hub project (opens in new tab)"
            >
              <Badge className="cursor-pointer">beRich.Hub</Badge>
            </Link> */}
          </div>

          {/* Desktop Theme Toggle */}
          <div className="hidden lg:flex items-center gap-2">
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
                <FaGithub aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="flex lg:hidden items-center space-x-2 px-4">
          {/* Mobile Theme Toggle */}
          <ModeToggle />
          <div>
            <LanguageSwitcher />
          </div>
          {/* Mobile Menu Trigger */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open navigation menu"
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
              >
                <Menu className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
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
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-3 text-sm font-medium p-3 rounded-lg hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
                      aria-label={`Navigate to ${item.name} section`}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
