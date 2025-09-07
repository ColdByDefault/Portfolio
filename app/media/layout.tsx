/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Media Dashboard - Portfolio",
  description:
    "Central hub for navigating all content and resources including blogs, projects, and more.",
  keywords: [
    "media",
    "dashboard",
    "blog",
    "projects",
    "portfolio",
    "navigation",
  ],
};

export default function MediaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="bg-background min-h-screen">{children}</div>;
}
