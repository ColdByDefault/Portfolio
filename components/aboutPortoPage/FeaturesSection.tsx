/**
 * About Portfolio Features Section Component
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
import { Zap, CheckCircle2 } from "lucide-react";
import { aboutPortfolioData } from "@/data/aboutPortfolioData";

export function FeaturesSection() {
  const t = useTranslations("AboutPortfolio");

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            {t("features.title")}
          </CardTitle>
          <CardDescription>{t("features.subtitle")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aboutPortfolioData.features.map((feature) => (
              <Card key={feature.id} className="border-muted">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center mt-1">
                      <Zap className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        {feature.description}
                      </p>
                      <Badge
                        variant={feature.completed ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {feature.completed ? "Completed" : "In Progress"}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h5 className="text-xs font-medium text-muted-foreground">
                      Key Benefits:
                    </h5>
                    <ul className="text-xs space-y-1">
                      {feature.benefits.slice(0, 3).map((benefit, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle2 className="h-3 w-3 text-green-500" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
