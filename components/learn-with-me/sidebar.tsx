/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */
"use client";

import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
} from "@/components/ui/sidebar";
import { FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface Resource {
  id: string;
  name: string;
  type: "pdf" | "doc" | "txt";
}

interface ResourceSidebarProps {
  className?: string;
  onResourceSelect?: (resource: Resource) => void;
}

const mockResources: Resource[] = [
  { id: "1", name: "Project Guidelines.pdf", type: "pdf" },
  { id: "2", name: "API Reference.pdf", type: "pdf" },
  { id: "3", name: "User Research.pdf", type: "pdf" },
  { id: "4", name: "Meeting Notes.txt", type: "txt" },
  { id: "5", name: "Design System.pdf", type: "pdf" },
  { id: "6", name: "Technical Specs.doc", type: "doc" },
];

export function ResourceSidebar({
  className,
  onResourceSelect,
}: ResourceSidebarProps) {
  const [selectedResource, setSelectedResource] = useState<string>("1");

  const handleResourceClick = (resource: Resource) => {
    setSelectedResource(resource.id);
    onResourceSelect?.(resource);
  };

  return (
    <Sidebar className={cn("border-r  mt-18", className)}>
      <SidebarHeader>Resources</SidebarHeader>
      <SidebarContent>
        <ScrollArea className="h-full">
          <ul className="space-y-1">
            {mockResources.map((resource) => (
              <li key={resource.id}>
                <button
                  onClick={() => handleResourceClick(resource)}
                  className={cn(
                    "w-full flex items-center gap-2 p-2 text-left text-sm rounded-md hover:bg-accent transition-colors",
                    selectedResource === resource.id && "bg-accent"
                  )}
                >
                  <FileText className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{resource.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  );
}
