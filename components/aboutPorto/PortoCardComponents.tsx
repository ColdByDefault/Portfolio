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

export const FeatureItem = React.memo(function FeatureItem({
  icon,
  title,
  description,
  badges,
  compact = false,
}: FeatureItemProps) {
  if (compact) {
    return (
      <article
        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors focus-within:ring-2 focus-within:ring-primary/50"
        role="listitem"
      >
        <div className="flex-shrink-0 text-primary" aria-hidden="true">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h4
            className="font-medium text-sm truncate"
            role="heading"
            aria-level={4}
          >
            {title}
          </h4>
          <div
            className="flex flex-wrap gap-1 mt-1"
            role="list"
            aria-label={`Technologies for ${title}`}
          >
            {badges?.slice(0, 2).map((badge, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs px-1.5 py-0.5"
                role="listitem"
              >
                {badge}
              </Badge>
            ))}
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors focus-within:ring-2 focus-within:ring-primary/50"
      role="listitem"
    >
      <div className="flex-shrink-0 mt-1 text-primary" aria-hidden="true">
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-sm mb-1" role="heading" aria-level={4}>
          {title}
        </h4>
        <p className="text-xs text-muted-foreground mb-2">{description}</p>
        {badges && (
          <div
            className="flex flex-wrap gap-1"
            role="list"
            aria-label={`Technologies for ${title}`}
          >
            {badges.map((badge, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs px-2 py-0.5"
                role="listitem"
              >
                {badge}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </article>
  );
});

interface FeatureGridProps {
  features: PortoCardFeature[];
  deviceType: DeviceType;
  gridClasses: string;
}

export const FeatureGrid = React.memo(function FeatureGrid({
  features,
  deviceType,
  gridClasses,
}: FeatureGridProps) {
  const t = useTranslations("PortfolioAbout.features");
  const isCompact = deviceType === "mobile";

  return (
    <div
      className={gridClasses}
      role="list"
      aria-label="Portfolio features and technologies"
    >
      {features.map((feature, index) => (
        <FeatureItem
          key={`${feature.key}-${index}`}
          icon={feature.icon}
          title={t(`${feature.key}.title`)}
          description={t(`${feature.key}.description`)}
          badges={feature.badges}
          compact={isCompact}
        />
      ))}
    </div>
  );
});

interface TechHighlightsProps {
  techs: string[];
  deviceType: DeviceType;
}

export const TechHighlights = React.memo(function TechHighlights({
  techs,
  deviceType,
}: TechHighlightsProps) {
  const t = useTranslations("PortfolioAbout");

  if (deviceType === "mobile") {
    return null; // Don't show on mobile to save space
  }

  return (
    <section className="border-t pt-4" aria-labelledby="tech-highlights-title">
      <div className="text-center">
        <h4
          id="tech-highlights-title"
          className="font-semibold text-sm mb-3 text-muted-foreground uppercase tracking-wide"
          role="heading"
          aria-level={4}
        >
          {t("techHighlights")}
        </h4>
        <div
          className="flex flex-wrap justify-center gap-2"
          role="list"
          aria-label="Additional technologies used"
        >
          {techs.map((tech, index) => (
            <Badge
              key={`tech-${index}`}
              variant="outline"
              className="text-xs"
              role="listitem"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
});
