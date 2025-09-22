/**
 * Legals Route Group Layout - Layout for legal pages (privacy, impressum, terms)
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { generateLegalPageSEO } from "@/lib/seo";
import { Background } from "@/components/visuals";
import { NoSSR } from "@/components/NoSSR";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

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
      <NoSSR>
        <Background />
      </NoSSR>
    </div>
  );
}
