/**
 * About Page Layout - Layout for the about page with comprehensive SEO metadata
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { generateMediaSectionSEO } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return generateMediaSectionSEO("about", locale);
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
