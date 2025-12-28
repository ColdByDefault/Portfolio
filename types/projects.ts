/**
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
 */

import type { Project } from "@/data/projectsData";

export interface ProjectsShowcaseProps {
  className?: string;
}

export interface ProjectCardProps {
  project: Project;
  index: number;
}

export interface ProjectCardState {
  copied: boolean;
  isTruncated: boolean;
  isHovered: boolean;
}

export interface UseProjectLogicReturn {
  handleCopyCloneLink: (githubUrl: string) => Promise<void>;
  copied: boolean;
  setCopied: (copied: boolean) => void;
}

export interface UseProjectsFilterReturn {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  filteredProjects: Project[];
}

// Re-export for convenience
export type { Project };
