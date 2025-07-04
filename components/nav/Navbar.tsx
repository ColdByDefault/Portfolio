"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    {
      name: "Home",
      href: "#home",
      icon: Home,
    },
    {
      name: "Projects",
      href: "#projects",
      icon: FolderGit2,
    },
    {
      name: "GitHub MCP",
      href: "#github",
      icon: Antenna,
    },
    {
      name: "Technologies",
      href: "#tech",
      icon: Atom,
    },
    {
      name: "Certifications",
      href: "#cert",
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
            <Link href="/" className="text-sm tracking-tight">
              ColdByDefault
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
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
            <Link target="_blanck" href="https://berich-hub.vercel.app" rel="noreferrer">
              <Badge className="cursor-pointer">beRich.Hub</Badge>
            </Link>
          </div>

          {/* Desktop Theme Toggle */}
          <div className="hidden md:flex items-center gap-2">
            <div className="border-r-2 pr-2">
              <ModeToggle />
            </div>
            <div>
              <Link href="https://github.com/coldbydefault">
                <FaGithub />
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="flex md:hidden lg:hidden items-center space-x-2">
          {/* Mobile Theme Toggle */}
          <ModeToggle />
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
                  Navigation
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
                <Link
                  target="_blanck"
                  href="https://berich-hub.vercel.app"
                  rel="noreferrer"
                  className="pl-2 flex gap-2 items-center"
                >
                  <Telescope />
                  <Badge variant="secondary">beRich.Hub</Badge>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
