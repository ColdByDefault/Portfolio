/**
 * About Portfolio Logic
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import { useState } from "react";
import { useTranslations } from "next-intl";

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

export function useAboutPorto(): UseAboutPortoReturn {
  const [currentSection, setCurrentSection] = useState<SectionId>("overview");
  const t = useTranslations("AboutPortfolio.navigation");

  const sections: readonly Section[] = [
    { id: "overview", label: t("overview") },
    { id: "technology", label: t("technology") },
    { id: "documentation", label: t("documentation") },
  ] as const;

  return {
    currentSection,
    setCurrentSection,
    sections,
  };
}
