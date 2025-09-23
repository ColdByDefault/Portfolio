/**
 * Technology Component - About Portfolio Page
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import React from "react";
import { useTranslations } from "next-intl";
import { SectionCard, TechBadgeList } from "./shared";
import { technologyData } from "@/data/aboutPortfolioData";
import type { TechnologyProps } from "@/types/aboutPortfolioPage";

export function Technology({ className }: TechnologyProps) {
  const t = useTranslations();

  return (
    <div className={`space-y-6 ${className || ""}`}>
      {technologyData.categories.map((category) => (
        <SectionCard
          key={category.key}
          title={t(category.titleTranslationKey)}
          description={t(category.descriptionTranslationKey)}
        >
          <TechBadgeList technologies={category.technologies} />
          <div className="mt-4">
            <p className="text-sm text-muted-foreground">
              {t(category.detailTranslationKey)}
            </p>
          </div>
        </SectionCard>
      ))}
    </div>
  );
}
