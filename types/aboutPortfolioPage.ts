/**
 * About Portfolio Page Types
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

export interface OverviewProps {
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

export interface OverviewData {
  readonly portfolioFeatures: readonly PortfolioFeature[];
  readonly architectureFeatures: readonly ArchitectureFeature[];
  readonly developmentGoals: readonly DevelopmentGoal[];
}

export interface OverviewSectionData {
  readonly titleKey: string;
  readonly descriptionKey: string;
  readonly items: readonly string[];
}
