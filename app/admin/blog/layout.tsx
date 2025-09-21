/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Admin - Portfolio",
  description: "Blog management dashboard",
  robots: "noindex, nofollow", 
};

export default function AdminBlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-background">{children}</div>;
}
