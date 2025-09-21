/**
 * About Portfolio Overview Section Component
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

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
import { Code2, CheckCircle2 } from "lucide-react";
import { aboutPortfolioData } from "@/data/aboutPortfolioData";

export function OverviewSection() {
  const t = useTranslations("AboutPortfolio");

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Code2 className="h-6 w-6 text-primary" />
            <div>
              <CardTitle>{t("overview.title")}</CardTitle>
              <CardDescription>{t("overview.description")}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">
                  {t("overview.projectDetails")}
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {t("overview.labels.author")}
                    </span>
                    <span>{t("overview.author")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {t("overview.labels.version")}
                    </span>
                    <span>{aboutPortfolioData.overview.version}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {t("overview.labels.status")}
                    </span>
                    <Badge variant="default" className="h-5">
                      {t("overview.statusValues.active")}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {t("overview.labels.developmentTime")}
                    </span>
                    <span>{t("overview.developmentTime")}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">
                  {t("overview.keyAchievements")}
                </h4>
                <div className="space-y-2">
                  {aboutPortfolioData.achievements
                    .slice(0, 3)
                    .map((achievement) => (
                      <div
                        key={achievement.id}
                        className="flex items-center gap-2 text-sm"
                      >
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>
                          {t(`overview.achievements.${achievement.id}`)}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
