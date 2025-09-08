/**
 * Media Dashboard - Navigation hub for all media content
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */
"use client";

import { Home, FileText, User, FolderOpen, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface QuickAction {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "destructive";
}

export function QuickActions() {
  const pathname = usePathname();

  // Don't show on /media routes
  if (pathname.startsWith("/media")) {
    return null;
  }

  // Define actions based on current route
  const getActionsForRoute = (): QuickAction[] => {
    if (pathname.startsWith("/about")) {
      return [
        { href: "/media", icon: Home, label: "All Media", variant: "default" },
        {
          href: "/blog",
          icon: FileText,
          label: "Latest Posts",
          variant: "outline",
        },
        {
          href: "/#projects",
          icon: FolderOpen,
          label: "Projects",
          variant: "outline",
        },
      ];
    }

    if (pathname.startsWith("/blog")) {
      return [
        { href: "/media", icon: Home, label: "All Media", variant: "default" },
        {
          href: "/library",
          icon: BookOpen,
          label: "Library",
          variant: "outline",
        },
        { href: "/about", icon: User, label: "About Me", variant: "outline" },
      ];
    }

    if (pathname.startsWith("/library")) {
      return [
        { href: "/media", icon: Home, label: "All Media", variant: "default" },
        {
          href: "/blog",
          icon: FileText,
          label: "Latest Blog",
          variant: "outline",
        },
        { href: "/about", icon: User, label: "About Me", variant: "outline" },
      ];
    }

    // Default actions for other routes
    return [
      { href: "/media", icon: Home, label: "All Media", variant: "default" },
      {
        href: "/blog",
        icon: FileText,
        label: "Latest Posts",
        variant: "outline",
      },
      { href: "/about", icon: User, label: "About Me", variant: "outline" },
    ];
  };

  const actions = getActionsForRoute();

  return (
    <div className="mt-16 text-center">
      <h2 className="text-2xl font-semibold mb-6">Quick Actions</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {actions.map((action) => {
          const IconComponent = action.icon;
          return (
            <Button
              key={action.href}
              asChild
              variant={action.variant || "outline"}
            >
              <Link href={action.href}>
                <IconComponent className="h-4 w-4 mr-2" />
                {action.label}
              </Link>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
