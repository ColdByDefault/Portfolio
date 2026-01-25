/**
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
*/

import type React from "react";

export type DeviceType = "mobile" | "tablet" | "desktop";

export interface ResponsiveConfig {
  deviceType: DeviceType;
  containerClasses: string;
  cardClasses: string;
  featuresConfig: {
    features: PortoCardFeature[];
    showAll: boolean;
  };
}

export interface PortoCardFeature {
  key: string;
  icon: React.ReactNode;
  badges: string[];
  priority: number;
}

export interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  badges?: string[];
  compact?: boolean;
}

export interface PortoCardProps {
  className?: string;
}
