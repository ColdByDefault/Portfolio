/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ResourceSidebar } from "@/components/learn-with-me/sidebar";
/* import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { generateMediaSectionSEO } from "@/lib/seo"; */

/* export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return generateMediaSectionSEO("dashboard", locale);
} */

export default function MediaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <ResourceSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
