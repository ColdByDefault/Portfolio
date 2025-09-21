/**
 * About Portfolio Navigation Tabs Component
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import React from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import type { NavigationSection } from "./AboutPortfolioPage.logic";

interface NavigationTabsProps {
  readonly sections: readonly NavigationSection[];
  readonly activeSection: string;
  readonly onSectionChange: (sectionId: string) => void;
}

export function NavigationTabs({
  sections,
  activeSection,
  onSectionChange,
}: NavigationTabsProps) {
  const t = useTranslations("AboutPortfolio");
  const isMobile = useIsMobile();

  return (
    <div className={`mb-8 ${isMobile ? "overflow-x-auto" : ""}`}>
      <div className="flex gap-2 min-w-max">
        {sections.map((section) => (
          <Button
            key={section.id}
            variant={activeSection === section.id ? "default" : "outline"}
            size="sm"
            className="gap-2 whitespace-nowrap"
            onClick={() => onSectionChange(section.id)}
          >
            <section.icon className="h-4 w-4" />
            {t(`${section.id}.title`) || section.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
