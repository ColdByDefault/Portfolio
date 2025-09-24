/**
 * About Portfolio Page Types
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

export interface OverviewProps {
  readonly className?: string;
}

export interface TechnologyProps {
  readonly className?: string;
}

export interface PortfolioFeature {
  readonly key: string;
  readonly translationKey: string;
}

export interface ArchitectureFeature {
  readonly key: string;
  readonly translationKey: string;
}

export interface DevelopmentGoal {
  readonly key: string;
  readonly titleTranslationKey: string;
  readonly descriptionTranslationKey: string;
}

export interface TechnologyCategory {
  readonly key: string;
  readonly titleTranslationKey: string;
  readonly descriptionTranslationKey: string;
  readonly technologies: readonly string[];
  readonly detailTranslationKey: string;
}

export interface OverviewData {
  readonly portfolioFeatures: readonly PortfolioFeature[];
  readonly architectureFeatures: readonly ArchitectureFeature[];
  readonly developmentGoals: readonly DevelopmentGoal[];
  readonly qualityHighlights: readonly PortfolioFeature[];
}

export interface TechnologyData {
  readonly categories: readonly TechnologyCategory[];
}

export interface OverviewSectionData {
  readonly titleKey: string;
  readonly descriptionKey: string;
  readonly items: readonly string[];
}
