/**
 * About Portfolio AI Integration Section Component
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import React from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, CheckCircle2 } from "lucide-react";
import { aboutPortfolioData } from "@/data/aboutPortfolioData";

export function AIIntegrationSection() {
  const t = useTranslations("AboutPortfolio");

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            {t("ai.title")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {aboutPortfolioData.aiIntegrations.map((ai) => (
            <Card key={ai.name} className="border-muted">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                    <Bot className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{ai.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {ai.provider} • {ai.model}
                    </p>
                  </div>
                </div>
                <p className="text-sm mb-4">{ai.purpose}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-sm mb-2">Features:</h5>
                    <ul className="text-sm space-y-1">
                      {ai.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle2 className="h-3 w-3 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-sm mb-2">Rate Limits:</h5>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Per Minute:
                        </span>
                        <span>{ai.rateLimits.perMinute}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Per Hour:</span>
                        <span>{ai.rateLimits.perHour}</span>
                      </div>
                      {ai.rateLimits.perDay && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Per Day:
                          </span>
                          <span>{ai.rateLimits.perDay}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
