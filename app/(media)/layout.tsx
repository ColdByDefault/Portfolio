/**
 * Media Route Group Layout - Layout for media section pages (about, blog, projects, library)
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
*/

import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { generateMediaSectionSEO } from "@/lib/configs/seo";
import { Background } from "@/components/visuals";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  return generateMediaSectionSEO("dashboard", locale);
}

export default function MediaGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {children}
      <Background />
    </div>
  );
}
