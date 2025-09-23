/**
 * Overview Component - About Portfolio Page
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import React from "react";
import { useTranslations } from "next-intl";
import { SectionCard, FeatureList } from "./shared";
import { overviewData, overviewSections } from "@/data/aboutPortfolioData";
import type { OverviewProps } from "@/types/aboutPortfolioPage";

export function Overview({ className }: OverviewProps) {
  const t = useTranslations();

  return (
    <div className={`space-y-6 ${className || ""}`}>
      <SectionCard
        title={t(overviewSections.portfolioFeatures.titleKey)}
        description={t(overviewSections.portfolioFeatures.descriptionKey)}
      >
        <FeatureList
          items={overviewData.portfolioFeatures.map((feature) =>
            t(feature.translationKey)
          )}
        />
      </SectionCard>

      <SectionCard
        title={t(overviewSections.architectureFeatures.titleKey)}
        description={t(overviewSections.architectureFeatures.descriptionKey)}
      >
        <FeatureList
          items={overviewData.architectureFeatures.map((feature) =>
            t(feature.translationKey)
          )}
        />
      </SectionCard>

      <SectionCard
        title={t(overviewSections.developmentGoals.titleKey)}
        description={t(overviewSections.developmentGoals.descriptionKey)}
      >
        <div className="grid md:grid-cols-2 gap-4">
          {overviewData.developmentGoals.map((goal) => (
            <div key={goal.key}>
              <h4 className="font-semibold mb-2">
                {t(goal.titleTranslationKey)}
              </h4>
              <p className="text-sm text-muted-foreground">
                {t(goal.descriptionTranslationKey)}
              </p>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
