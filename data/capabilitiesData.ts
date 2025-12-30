/**
 * Capabilities Section Static Data
 * Business-outcome focused (per freelancer.instructions)
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import type { Capability, CapabilitiesData } from "@/types/capabilities";

/**
 * Capabilities with business outcome focus
 * Translation keys map to Capabilities section in messages/*.json
 * Tech icons are subtle indicators (react-icons/si identifiers)
 */
export const capabilities: readonly Capability[] = [
  {
    id: "launch",
    icon: "Rocket",
    titleKey: "launch.title",
    headlineKey: "launch.headline",
    descriptionKey: "launch.description",
    techIcons: ["SiNextdotjs", "SiReact", "SiVercel"],
  },
  {
    id: "scale",
    icon: "TrendingUp",
    titleKey: "scale.title",
    headlineKey: "scale.headline",
    descriptionKey: "scale.description",
    techIcons: ["SiVercel", "SiDocker", "SiPostgresql"],
  },
  {
    id: "security",
    icon: "Shield",
    titleKey: "security.title",
    headlineKey: "security.headline",
    descriptionKey: "security.description",
    techIcons: ["SiTypescript", "SiPrisma", "SiPostgresql"],
  },
  {
    id: "global",
    icon: "Globe",
    titleKey: "global.title",
    headlineKey: "global.headline",
    descriptionKey: "global.description",
    techIcons: ["SiNextdotjs", "SiReact"],
  },
] as const;

/**
 * Complete capabilities data
 */
export const capabilitiesData: CapabilitiesData = {
  capabilities,
} as const;

export default capabilitiesData;
