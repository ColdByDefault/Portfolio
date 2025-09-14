/**
 * Legals Route Group Layout - Layout for legal pages (privacy, impressum, terms)
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { generateLegalPageSEO } from "@/lib/seo";
import { Background } from "@/components/visuals";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  // Default to privacy policy metadata for the legal section
  // Individual pages will override this with their specific metadata
  return generateLegalPageSEO("privacy", locale);
}

export default function LegalsGroupLayout({
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
