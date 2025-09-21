/**
 * About Portfolio Security Section Component
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
import { Shield, Lock } from "lucide-react";
import { aboutPortfolioData } from "@/data/aboutPortfolioData";

export function SecuritySection() {
  const t = useTranslations("AboutPortfolio");

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            {t("security.title")}
          </CardTitle>
          <CardDescription>{t("security.subtitle")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aboutPortfolioData.security.map((item) => (
              <Card key={item.name} className="border-muted">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-lg bg-green-100 flex items-center justify-center">
                      <Lock className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-sm">{item.name}</h4>
                        <Badge
                          variant={
                            item.severity === "critical"
                              ? "destructive"
                              : item.severity === "high"
                              ? "default"
                              : "secondary"
                          }
                          className="text-xs"
                        >
                          {item.severity}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {item.description}
                      </p>
                      <p className="text-xs">{item.implementation}</p>
                    </div>
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
