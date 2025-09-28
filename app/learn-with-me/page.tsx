/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

"use client";

import { ResourceSidebar } from "@/components/learn-with-me/sidebar";
import { TextViewer } from "@/components/learn-with-me/text-viewer";

export default function ResourcesPage() {
  return (
    <div className="flex h-screen bg-background">
      <ResourceSidebar className="w-64 flex-shrink-0" />
      <TextViewer />
    </div>
  );
}