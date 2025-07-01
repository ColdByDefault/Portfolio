"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Home, Building2, Menu } from "lucide-react";
import { ModeToggle } from "./theme-toggle";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);


  const navItems = [
    {
      name: "Home",
      href: "#home",
      icon: Home,
    },
    {
      name: "BerichHub",
      href: "https://berich-hub.vercel.app/",
      icon: Building2,
    },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex justify-center">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <a href="" className="text-sm tracking-tight">
              ColdByDefault
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  target="_blanck"
                  rel="noopener noreferrer"
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Desktop Theme Toggle */}
          <div className="hidden md:flex items-center">
            <ModeToggle />
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
                <div className="text-lg font-semibold mb-4">Navigation</div>
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-3 text-sm font-medium p-3 rounded-lg hover:bg-accent transition-colors"
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </a>
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
