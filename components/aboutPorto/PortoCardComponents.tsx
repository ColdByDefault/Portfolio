/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import React from "react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import type {
  FeatureItemProps,
  DeviceType,
  PortoCardFeature,
} from "@/types/aboutPorto";

export function FeatureItem({
  icon,
  title,
  description,
  badges,
  compact = false,
}: FeatureItemProps) {
  if (compact) {
    return (
      <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
        <div className="flex-shrink-0 text-primary">{icon}</div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm truncate">{title}</h3>
          <div className="flex flex-wrap gap-1 mt-1">
            {badges?.slice(0, 2).map((badge, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs px-1.5 py-0.5"
              >
                {badge}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
      <div className="flex-shrink-0 mt-1 text-primary">{icon}</div>
      <div className="flex-1">
        <h3 className="font-medium text-sm mb-1">{title}</h3>
        <p className="text-xs text-muted-foreground mb-2">{description}</p>
        {badges && (
          <div className="flex flex-wrap gap-1">
            {badges.map((badge, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs px-2 py-0.5"
              >
                {badge}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface FeatureGridProps {
  features: PortoCardFeature[];
  deviceType: DeviceType;
  gridClasses: string;
}

export function FeatureGrid({
  features,
  deviceType,
  gridClasses,
}: FeatureGridProps) {
  const t = useTranslations("PortfolioAbout.features");
  const isCompact = deviceType === "mobile";

  return (
    <div className={gridClasses}>
      {features.map((feature, index) => (
        <FeatureItem
          key={index}
          icon={feature.icon}
          title={t(`${feature.key}.title`)}
          description={t(`${feature.key}.description`)}
          badges={feature.badges}
          compact={isCompact}
        />
      ))}
    </div>
  );
}

interface TechHighlightsProps {
  techs: string[];
  deviceType: DeviceType;
}

export function TechHighlights({ techs, deviceType }: TechHighlightsProps) {
  const t = useTranslations("PortfolioAbout");

  if (deviceType === "mobile") {
    return null; // Don't show on mobile to save space
  }

  return (
    <div className="border-t pt-4">
      <div className="text-center">
        <h3 className="font-semibold text-sm mb-3 text-muted-foreground uppercase tracking-wide">
          {t("techHighlights")}
        </h3>
        <div className="flex flex-wrap justify-center gap-2">
          {techs.map((tech, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
