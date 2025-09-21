/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

"use client";

import React from "react";
import { useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardDescription,
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
import { FeatureGrid, TechHighlights } from "./PortoCardComponents";

export default function PortoCard({ className }: PortoCardProps) {
  const t = useTranslations("PortfolioAbout");
  const { deviceType, containerClasses, cardClasses, featuresConfig } =
    useResponsiveConfig();

  // Get responsive configurations
  const gridClasses = getFeatureGridClasses(deviceType);
  const techHighlights = getTechStackHighlights(deviceType);
  const headerLayout = PortoCardUtils.getHeaderLayout(deviceType);
  const shouldShowTechHighlights = PortoCardUtils.shouldShowSection(
    "techHighlights",
    deviceType
  );
  const descriptionLength = PortoCardUtils.getDescriptionLength(deviceType);

  // Get description based on device type
  const getDescription = () => {
    const fullDescription = t("description");
    if (descriptionLength === "short") {
      // Truncate description for mobile
      const sentences = fullDescription.split(". ");
      return sentences.slice(0, 2).join(". ") + ".";
    }
    return fullDescription;
  };

  return (
    <div className={`${containerClasses} ${className}`} id="this-portfolio">
      <Card className={cardClasses}>
        <CardHeader
          className={`text-center ${deviceType === "mobile" ? "pb-2" : "pb-4"}`}
        >
          <div
            className={`flex items-center justify-center gap-2 mb-2 ${
              headerLayout === "vertical" ? "flex-col" : ""
            }`}
          >
            <Code2 className="h-6 w-6 text-primary" />
            <CardTitle
              className={`font-bold ${
                deviceType === "mobile" ? "text-xl" : "text-2xl"
              }`}
            >
              {t("title")}
            </CardTitle>
          </div>
          <CardDescription
            className={`${
              deviceType === "mobile" ? "text-sm" : "text-base"
            } max-w-2xl mx-auto`}
          >
            {getDescription()}
          </CardDescription>

          {/* Performance Badge */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <Badge
              variant="outline"
              className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800"
            >
              {t("performanceBadge")}
            </Badge>
          </div>
        </CardHeader>

        <CardContent>
          <div className={`${deviceType === "mobile" ? "mb-4" : "mb-6"}`}>
            <FeatureGrid
              features={featuresConfig.features}
              deviceType={deviceType}
              gridClasses={gridClasses}
            />
          </div>

          {/* Tech Stack Highlights - Hidden on mobile */}
          {shouldShowTechHighlights && (
            <TechHighlights techs={techHighlights} deviceType={deviceType} />
          )}

          {/* Read More Section - Compact on mobile */}
          <div
            className={`border-t ${
              deviceType === "mobile" ? "pt-3 mt-3" : "pt-6 mt-4"
            }`}
          >
            <div className="text-center">
              <Button
                variant="outline"
                className={deviceType === "mobile" ? "text-sm mt-2" : "mt-2"}
                disabled
              >
                <span>{t("readMore")}</span>
                <ExternalLink className="ml-2 h-3 w-3" />
              </Button>
              <p
                className={`text-xs text-muted-foreground ${
                  deviceType === "mobile" ? "mt-2" : "mt-2"
                }`}
              >
                {t("readMoreNote")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
