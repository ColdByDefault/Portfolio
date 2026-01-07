/**
 * Services Page Static Data
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
*/

import type {
  ServicePackage,
  ProcessStep,
  TrustSignal,
  ServicesPageData,
} from "@/types/hubs/services";

/**
 * Service packages with translation keys
 */
export const servicePackages: readonly ServicePackage[] = [
  {
    id: "mvp",
    nameKey: "packages.mvp.name",
    headlineKey: "packages.mvp.headline",
    descriptionKey: "packages.mvp.description",
    pricingKey: "packages.mvp.pricing",
    timelineKey: "packages.mvp.timeline",
    icon: "Rocket",
    ctaKey: "packages.cta",
    features: [
      { textKey: "packages.mvp.features.fullStack", included: true },
      { textKey: "packages.mvp.features.responsive", included: true },
      { textKey: "packages.mvp.features.database", included: true },
      { textKey: "packages.mvp.features.auth", included: true },
      { textKey: "packages.mvp.features.deployment", included: true },
      { textKey: "packages.mvp.features.support", included: true },
    ],
  },
  {
    id: "automation",
    nameKey: "packages.automation.name",
    headlineKey: "packages.automation.headline",
    descriptionKey: "packages.automation.description",
    pricingKey: "packages.automation.pricing",
    timelineKey: "packages.automation.timeline",
    icon: "Cog",
    ctaKey: "packages.cta",
    features: [
      { textKey: "packages.automation.features.analysis", included: true },
      { textKey: "packages.automation.features.integration", included: true },
      { textKey: "packages.automation.features.workflows", included: true },
      { textKey: "packages.automation.features.documentation", included: true },
      { textKey: "packages.automation.features.training", included: true },
      { textKey: "packages.automation.features.support", included: true },
    ],
  },
  {
    id: "ai",
    nameKey: "packages.ai.name",
    headlineKey: "packages.ai.headline",
    descriptionKey: "packages.ai.description",
    pricingKey: "packages.ai.pricing",
    timelineKey: "packages.ai.timeline",
    icon: "Brain",
    ctaKey: "packages.cta",
    features: [
      { textKey: "packages.ai.features.chatbot", included: true },
      { textKey: "packages.ai.features.rag", included: true },
      { textKey: "packages.ai.features.integration", included: true },
      { textKey: "packages.ai.features.security", included: true },
      { textKey: "packages.ai.features.training", included: true },
      { textKey: "packages.ai.features.support", included: true },
    ],
  },
  {
    id: "custom",
    nameKey: "packages.custom.name",
    headlineKey: "packages.custom.headline",
    descriptionKey: "packages.custom.description",
    pricingKey: "packages.custom.pricing",
    timelineKey: "packages.custom.timeline",
    icon: "Settings",
    ctaKey: "packages.cta",
    features: [
      { textKey: "packages.custom.features.scoping", included: true },
      { textKey: "packages.custom.features.roadmap", included: true },
      { textKey: "packages.custom.features.development", included: true },
      { textKey: "packages.custom.features.flexibility", included: true },
      { textKey: "packages.custom.features.handover", included: true },
      { textKey: "packages.custom.features.support", included: true },
    ],
  },
] as const;

/**
 * Process workflow steps
 */
export const processSteps: readonly ProcessStep[] = [
  {
    step: 1,
    titleKey: "process.discovery.title",
    descriptionKey: "process.discovery.description",
    icon: "MessageSquare",
  },
  {
    step: 2,
    titleKey: "process.strategy.title",
    descriptionKey: "process.strategy.description",
    icon: "Target",
  },
  {
    step: 3,
    titleKey: "process.development.title",
    descriptionKey: "process.development.description",
    icon: "Code",
  },
  {
    step: 4,
    titleKey: "process.support.title",
    descriptionKey: "process.support.description",
    icon: "HeartHandshake",
  },
] as const;

/**
 * Trust signals / benefits
 */
export const trustSignals: readonly TrustSignal[] = [
  {
    id: "dynamic",
    titleKey: "trust.dynamic.title",
    descriptionKey: "trust.dynamic.description",
    icon: "Database",
  },
  {
    id: "scalable",
    titleKey: "trust.scalable.title",
    descriptionKey: "trust.scalable.description",
    icon: "TrendingUp",
  },
  {
    id: "reliable",
    titleKey: "trust.reliable.title",
    descriptionKey: "trust.reliable.description",
    icon: "Shield",
  },
  {
    id: "integrated",
    titleKey: "trust.integrated.title",
    descriptionKey: "trust.integrated.description",
    icon: "Plug",
  },
] as const;

/**
 * Complete services page data
 */
export const servicesPageData: ServicesPageData = {
  packages: servicePackages,
  processSteps: processSteps,
  trustSignals: trustSignals,
  bookingLink: "https://calendly.com/abo-ayash-yazan/intro-call",
} as const;

export default servicesPageData;
