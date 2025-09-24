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
  TechnologyData,
  TechnologyCategory,
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
  {
    key: "pagespeed_insights",
    translationKey:
      "AboutPortfolio.Overview.portfolioFeatures.pageSpeedInsights",
  },
  {
    key: "admin_dashboard",
    translationKey: "AboutPortfolio.Overview.portfolioFeatures.adminDashboard",
  },
];

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
  {
    key: "edge_runtime",
    translationKey: "AboutPortfolio.Overview.architectureFeatures.edgeRuntime",
  },
  {
    key: "security_headers",
    translationKey:
      "AboutPortfolio.Overview.architectureFeatures.securityHeaders",
  },
];

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
  {
    key: "automation",
    titleTranslationKey:
      "AboutPortfolio.Overview.developmentGoals.automation.title",
    descriptionTranslationKey:
      "AboutPortfolio.Overview.developmentGoals.automation.description",
  },
];

const qualityHighlights: readonly PortfolioFeature[] = [
  {
    key: "codeql_security",
    translationKey: "AboutPortfolio.Overview.qualityHighlights.codeqlSecurity",
  },
  {
    key: "dependency_review",
    translationKey:
      "AboutPortfolio.Overview.qualityHighlights.dependencyReview",
  },
  {
    key: "vercel_cron_jobs",
    translationKey: "AboutPortfolio.Overview.qualityHighlights.vercelCronJobs",
  },
  {
    key: "typedoc_docs",
    translationKey: "AboutPortfolio.Overview.qualityHighlights.typedocDocs",
  },
];

const technologyCategories: readonly TechnologyCategory[] = [
  {
    key: "frontend",
    titleTranslationKey: "AboutPortfolio.Technology.categories.frontend.title",
    descriptionTranslationKey:
      "AboutPortfolio.Technology.categories.frontend.description",
    technologies: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Framer Motion",
      "next-intl",
    ],
    detailTranslationKey:
      "AboutPortfolio.Technology.categories.frontend.detail",
  },
  {
    key: "backend",
    titleTranslationKey: "AboutPortfolio.Technology.categories.backend.title",
    descriptionTranslationKey:
      "AboutPortfolio.Technology.categories.backend.description",
    technologies: [
      "Next.js API Routes",
      "Prisma ORM",
      "PostgreSQL",
      "Custom Authentication",
      "Zod Validation",
      "Rate Limiting",
    ],
    detailTranslationKey: "AboutPortfolio.Technology.categories.backend.detail",
  },
  {
    key: "devTools",
    titleTranslationKey: "AboutPortfolio.Technology.categories.devTools.title",
    descriptionTranslationKey:
      "AboutPortfolio.Technology.categories.devTools.description",
    technologies: [
      "ESLint",
      "Prettier",
      "GitHub Actions",
      "TypeScript Compiler",
    ],
    detailTranslationKey:
      "AboutPortfolio.Technology.categories.devTools.detail",
  },
  {
    key: "deployment",
    titleTranslationKey:
      "AboutPortfolio.Technology.categories.deployment.title",
    descriptionTranslationKey:
      "AboutPortfolio.Technology.categories.deployment.description",
    technologies: ["Vercel", "GitHub", "Cloudflare"],
    detailTranslationKey:
      "AboutPortfolio.Technology.categories.deployment.detail",
  },
];

export const overviewData: OverviewData = {
  portfolioFeatures,
  architectureFeatures,
  developmentGoals,
  qualityHighlights,
};

export const technologyData: TechnologyData = {
  categories: technologyCategories,
};

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
  qualityHighlights: {
    titleKey: "AboutPortfolio.Overview.sections.qualityHighlights.title",
    descriptionKey:
      "AboutPortfolio.Overview.sections.qualityHighlights.description",
  },
};
