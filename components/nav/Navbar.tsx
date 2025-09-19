/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import {
  useNavItems,
  DesktopNavigation,
  DesktopControls,
  MobileControls,
  MobileNavigation,
  BrandLogo,
} from "./navbarItems";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = useNavItems();

  // CSS classes for navigation links
  const lightLink = "text-gray-500 hover:text-gray-900";
  const darkLink = "dark:text-gray-600 dark:hover:text-gray-200";

  // Event handlers
  const handleMobileMenuToggle = () => setIsOpen(!isOpen);
  const handleMobileLinkClick = () => setIsOpen(false);

  return (
    <nav
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex justify-center"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center justify-between w-full">
          <BrandLogo />

          {/* Desktop Navigation */}
          <DesktopNavigation
            navItems={navItems}
            lightLink={lightLink}
            darkLink={darkLink}
          />

          {/* Desktop Controls */}
          <DesktopControls />
        </div>

        {/* Mobile Menu */}
        <div className="flex lg:hidden items-center space-x-2 px-4">
          {/* Mobile Controls */}
          <MobileControls onMenuToggle={handleMobileMenuToggle} />

          {/* Mobile Menu Trigger */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open navigation menu"
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                onClick={handleMobileMenuToggle}
              >
                <Menu className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <MobileNavigation
              navItems={navItems}
              onLinkClick={handleMobileLinkClick}
            />
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
