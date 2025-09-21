/**
 * About Portfolio Performance Section Component
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import React from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { TrendingUp } from "lucide-react";
import { aboutPortfolioData } from "@/data/aboutPortfolioData";

export function PerformanceSection() {
  const t = useTranslations("AboutPortfolio");

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            {t("performance.title")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">{t("performance.lighthouse")}</h4>
              {Object.entries(aboutPortfolioData.performance.lighthouse).map(
                ([key, value]) => {
                  if (key === "lastChecked") return null;
                  return (
                    <div key={key} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="capitalize">
                          {key.replace(/([A-Z])/g, " $1")}
                        </span>
                        <span className="font-semibold">{value}/100</span>
                      </div>
                      <Progress value={Number(value)} className="h-2" />
                    </div>
                  );
                }
              )}
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">
                {t("performance.coreWebVitals")}
              </h4>
              <div className="space-y-3">
                {Object.entries(
                  aboutPortfolioData.performance.coreWebVitals
                ).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground uppercase">
                      {key}
                    </span>
                    <Badge
                      variant="default"
                      className="text-green-700 bg-green-100"
                    >
                      {value}
                    </Badge>
                  </div>
                ))}
              </div>
              <Separator />
              <div className="space-y-3">
                <h5 className="font-medium text-sm">
                  {t("performance.bundleSize")}
                </h5>
                {Object.entries(aboutPortfolioData.performance.bundleSize).map(
                  ([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between items-center"
                    >
                      <span className="text-sm text-muted-foreground capitalize">
                        {key.replace(/([A-Z])/g, " $1")}
                      </span>
                      <span className="text-sm font-medium">{value}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
