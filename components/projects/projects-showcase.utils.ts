/**
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
 */

import { useState, useEffect, useCallback, useRef } from "react";
import { projects, projectCategories } from "@/data/projectsData";
import type {
  UseProjectLogicReturn,
  UseProjectsFilterReturn,
  Project,
} from "@/types/projects";

/**
 * Custom hook for handling project card logic
 */
export function useProjectLogic(): UseProjectLogicReturn {
  const [copied, setCopied] = useState(false);

  const handleCopyCloneLink = useCallback(async (githubUrl: string) => {
    const cloneLink = `git clone ${githubUrl}.git`;
    try {
      await navigator.clipboard.writeText(cloneLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  }, []);

  return {
    handleCopyCloneLink,
    copied,
    setCopied,
  };
}

/**
 * Custom hook for handling projects filtering
 */
export function useProjectsFilter(): UseProjectsFilterReturn {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProjects = projects.filter(
    (project) =>
      selectedCategory === "all" || project.category === selectedCategory
  );

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  return {
    selectedCategory,
    setSelectedCategory: handleCategoryChange,
    filteredProjects,
  };
}

/**
 * Custom hook for handling text truncation detection
 */
export function useTruncationDetection(description: string) {
  const [isTruncated, setIsTruncated] = useState(false);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const checkTruncation = () => {
      if (descriptionRef.current) {
        const element = descriptionRef.current;
        setIsTruncated(element.scrollHeight > element.clientHeight);
      }
    };

    checkTruncation();
    window.addEventListener("resize", checkTruncation);

    return () => window.removeEventListener("resize", checkTruncation);
  }, [description]);

  return {
    isTruncated,
    descriptionRef,
  };
}

/**
 * Utility to get all project categories
 */
export function getAllCategories() {
  return projectCategories;
}

/**
 * Utility to check if a project is featured
 */
export function isFeaturedProject(project: Project): boolean {
  return project.featured;
}

/**
 * Utility to get license badge variant classes
 */
export function getLicenseBadgeClasses(licenseType?: string): string {
  if (licenseType === "fully-open") {
    return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800";
  }
  return "";
}

/**
 * Utility to get license emoji
 */
export function getLicenseEmoji(licenseType?: string): string {
  switch (licenseType) {
    case "copyright":
      return "©";
    case "fully-open":
      return "🌟";
    default:
      return "🔓";
  }
}
