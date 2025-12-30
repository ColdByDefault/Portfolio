/**
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
 */
/** This component has types and data in portoCard.utils.ts 
 * NOT as other components in @/types @/data 
*/

"use client";

import React from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Code2, ExternalLink, CheckCircle } from "lucide-react";
import type { PortoCardProps } from "@/types/aboutPorto";
import {
  useResponsiveConfig,
  getFeatureGridClasses,
  getTechStackHighlights,
  PortoCardUtils,
} from "./portoCard.utils";
import { FeatureGrid, TechHighlights } from "@/components/aboutPorto";
import VersionDisplay from "@/components/VersionDisplay";

export default React.memo(function PortoCard({ className }: PortoCardProps) {
  const t = useTranslations("PortfolioAbout");
  const { deviceType, containerClasses, cardClasses, featuresConfig } =
    useResponsiveConfig();

  // Memoize responsive configurations to prevent recalculation
  const gridClasses = React.useMemo(
    () => getFeatureGridClasses(deviceType),
    [deviceType]
  );
  const techHighlights = React.useMemo(
    () => getTechStackHighlights(deviceType),
    [deviceType]
  );
  const headerLayout = React.useMemo(
    () => PortoCardUtils.getHeaderLayout(deviceType),
    [deviceType]
  );
  const shouldShowTechHighlights = React.useMemo(
    () => PortoCardUtils.shouldShowSection("techHighlights", deviceType),
    [deviceType]
  );
  const descriptionLength = React.useMemo(
    () => PortoCardUtils.getDescriptionLength(deviceType),
    [deviceType]
  );

  // Memoize description processing to avoid repeated string operations
  const description = React.useMemo(() => {
    const fullDescription = t("description");
    if (descriptionLength === "short") {
      // Truncate description for mobile
      const sentences = fullDescription.split(". ");
      return sentences.slice(0, 2).join(". ") + ".";
    }
    return fullDescription;
  }, [t, descriptionLength]);

  return (
    <section
      className={`${containerClasses} ${className}`}
      id="this-portfolio"
      aria-labelledby="portfolio-title"
      role="region"
    >
      <Card className={cardClasses}>
        <CardHeader
          className={`text-center ${deviceType === "mobile" ? "pb-2" : "pb-4"}`}
        >
          <div
            className={`flex items-center justify-center gap-2 mb-2 ${
              headerLayout === "vertical" ? "flex-col" : ""
            }`}
          >
            <Code2 className="h-6 w-6 text-primary" aria-hidden="true" />
            <CardTitle
              id="portfolio-title"
              className={`font-bold ${
                deviceType === "mobile" ? "text-xl" : "text-2xl"
              }`}
              role="heading"
              aria-level={2}
            >
              {t("title")}
            </CardTitle>
          </div>
          <CardDescription
            className={`${
              deviceType === "mobile" ? "text-sm" : "text-base"
            } max-w-2xl mx-auto`}
          >
            {description}
          </CardDescription>

          {/* Performance Badge */}
          <div
            className="flex items-center justify-center gap-2 mt-4"
            role="status"
            aria-live="polite"
          >
            <CheckCircle
              className="h-4 w-4 text-green-500"
              aria-hidden="true"
            />
            <Badge
              variant="outline"
              className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800"
              aria-label={`Performance status: ${t("performanceBadge")}`}
            >
              {t("performanceBadge")}
            </Badge>
          </div>
        </CardHeader>

        <CardContent>
          <section
            className={`${deviceType === "mobile" ? "mb-4" : "mb-6"}`}
            aria-labelledby="portfolio-features-title"
          >
            <h3
              id="portfolio-features-title"
              className="sr-only"
              aria-level={3}
            >
              {t("featuresTitle")}
            </h3>
            <FeatureGrid
              features={featuresConfig.features}
              deviceType={deviceType}
              gridClasses={gridClasses}
            />
          </section>

          {/* Tech Stack Highlights - Hidden on mobile */}
          {shouldShowTechHighlights && (
            <TechHighlights techs={techHighlights} deviceType={deviceType} />
          )}

          {/* Read More Section - Compact on mobile */}
          <section
            className={`border-t ${
              deviceType === "mobile" ? "pt-3 mt-3" : "pt-6 mt-4"
            }`}
            aria-labelledby="portfolio-actions-title"
          >
            <h3 id="portfolio-actions-title" className="sr-only" aria-level={3}>
              {t("actionsTitle")}
            </h3>
            <div className="text-center">
              <Button
                variant="outline"
                className={deviceType === "mobile" ? "text-sm mt-2" : "mt-2"}
                aria-describedby="read-more-note"
                asChild
              >
                <Link href="/about-portfolio">
                  <span>{t("readMore")}</span>
                  <ExternalLink className="ml-2 h-3 w-3" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </section>
        </CardContent>
        <CardFooter>
          <div className="flex items-center justify-center sm:justify-start">
            <span className="text-xs text-gray-400 dark:text-gray-600 pr-1">
              Portfolio{" "}
            </span>
            <VersionDisplay
              prefix="v"
              className="text-xs text-gray-400 dark:text-gray-600 font-mono"
            />
          </div>
        </CardFooter>
      </Card>
    </section>
  );
});
