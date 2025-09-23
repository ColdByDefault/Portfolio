/**
 * About Portfolio Data
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import type {
  OverviewData,
  PortfolioFeature,
  ArchitectureFeature,
  DevelopmentGoal,
} from "@/types/aboutPortfolioPage";

const portfolioFeatures: readonly PortfolioFeature[] = [
  {
    key: "responsive_design",
    translationKey:
      "AboutPortfolio.Overview.portfolioFeatures.responsiveDesign",
  },
  {
    key: "multi_language",
    translationKey: "AboutPortfolio.Overview.portfolioFeatures.multiLanguage",
  },
  {
    key: "blog_system",
    translationKey: "AboutPortfolio.Overview.portfolioFeatures.blogSystem",
  },
  {
    key: "project_showcase",
    translationKey: "AboutPortfolio.Overview.portfolioFeatures.projectShowcase",
  },
  {
    key: "interactive_chatbot",
    translationKey:
      "AboutPortfolio.Overview.portfolioFeatures.interactiveChatbot",
  },
  {
    key: "performance_optimized",
    translationKey:
      "AboutPortfolio.Overview.portfolioFeatures.performanceOptimized",
  },
  {
    key: "seo_optimized",
    translationKey: "AboutPortfolio.Overview.portfolioFeatures.seoOptimized",
  },
  {
    key: "security_first",
    translationKey: "AboutPortfolio.Overview.portfolioFeatures.securityFirst",
  },
] as const;

const architectureFeatures: readonly ArchitectureFeature[] = [
  {
    key: "component_architecture",
    translationKey:
      "AboutPortfolio.Overview.architectureFeatures.componentArchitecture",
  },
  {
    key: "typescript_strict",
    translationKey:
      "AboutPortfolio.Overview.architectureFeatures.typescriptStrict",
  },
  {
    key: "server_side_rendering",
    translationKey:
      "AboutPortfolio.Overview.architectureFeatures.serverSideRendering",
  },
  {
    key: "database_integration",
    translationKey:
      "AboutPortfolio.Overview.architectureFeatures.databaseIntegration",
  },
  {
    key: "authentication_system",
    translationKey:
      "AboutPortfolio.Overview.architectureFeatures.authenticationSystem",
  },
  {
    key: "api_routes_security",
    translationKey:
      "AboutPortfolio.Overview.architectureFeatures.apiRoutesSecurity",
  },
] as const;

const developmentGoals: readonly DevelopmentGoal[] = [
  {
    key: "performance",
    titleTranslationKey:
      "AboutPortfolio.Overview.developmentGoals.performance.title",
    descriptionTranslationKey:
      "AboutPortfolio.Overview.developmentGoals.performance.description",
  },
  {
    key: "accessibility",
    titleTranslationKey:
      "AboutPortfolio.Overview.developmentGoals.accessibility.title",
    descriptionTranslationKey:
      "AboutPortfolio.Overview.developmentGoals.accessibility.description",
  },
  {
    key: "security",
    titleTranslationKey:
      "AboutPortfolio.Overview.developmentGoals.security.title",
    descriptionTranslationKey:
      "AboutPortfolio.Overview.developmentGoals.security.description",
  },
  {
    key: "maintainability",
    titleTranslationKey:
      "AboutPortfolio.Overview.developmentGoals.maintainability.title",
    descriptionTranslationKey:
      "AboutPortfolio.Overview.developmentGoals.maintainability.description",
  },
] as const;

export const overviewData: OverviewData = {
  portfolioFeatures,
  architectureFeatures,
  developmentGoals,
} as const;

// Section metadata for easy access
export const overviewSections = {
  portfolioFeatures: {
    titleKey: "AboutPortfolio.Overview.sections.portfolioFeatures.title",
    descriptionKey:
      "AboutPortfolio.Overview.sections.portfolioFeatures.description",
  },
  architectureFeatures: {
    titleKey: "AboutPortfolio.Overview.sections.architectureFeatures.title",
    descriptionKey:
      "AboutPortfolio.Overview.sections.architectureFeatures.description",
  },
  developmentGoals: {
    titleKey: "AboutPortfolio.Overview.sections.developmentGoals.title",
    descriptionKey:
      "AboutPortfolio.Overview.sections.developmentGoals.description",
  },
} as const;
