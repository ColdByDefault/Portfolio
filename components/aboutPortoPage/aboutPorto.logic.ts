/**
 * About Portfolio Logic
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import { useState } from "react";

type SectionId = "overview" | "technology" | "documentation";

interface Section {
  readonly id: SectionId;
  readonly label: string;
}

interface UseAboutPortoReturn {
  readonly currentSection: SectionId;
  readonly setCurrentSection: (section: SectionId) => void;
  readonly sections: readonly Section[];
}

const sections: readonly Section[] = [
  { id: "overview", label: "Overview" },
  { id: "technology", label: "Technology" },
  { id: "documentation", label: "Documentation" },
] as const;

export function useAboutPorto(): UseAboutPortoReturn {
  const [currentSection, setCurrentSection] = useState<SectionId>("overview");

  return {
    currentSection,
    setCurrentSection,
    sections,
  };
}
