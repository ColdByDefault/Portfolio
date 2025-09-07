/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Media - Portfolio",
  description: "Media dashboard",
};

export default function MediaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-background">{children}</div>;
}
