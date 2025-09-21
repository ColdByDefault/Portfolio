/**
 * About Portfolio Technical Stack Section Component
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
import { Database } from "lucide-react";
import { aboutPortfolioData } from "@/data/aboutPortfolioData";

export function TechnicalStackSection() {
  const t = useTranslations("AboutPortfolio");

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            {t("technicalStack.title")}
          </CardTitle>
          <CardDescription>{t("technicalStack.subtitle")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aboutPortfolioData.technicalStack.map((tech) => (
              <Card key={tech.name} className="border-muted">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Database className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{tech.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        {tech.version}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {tech.description}
                  </p>
                  <Badge variant="secondary" className="text-xs">
                    {t(
                      `technicalStack.categories.${tech.category}` as `technicalStack.categories.${string}`
                    ) || tech.category}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
