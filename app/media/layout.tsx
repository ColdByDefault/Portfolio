/**
 * Media Dashboard Layout - Layout for the main media dashboard page
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { generateMediaSectionSEO } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return generateMediaSectionSEO("dashboard", locale);
}

export default function MediaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen">{children}</div>;
}