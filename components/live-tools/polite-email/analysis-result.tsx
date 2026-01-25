/**
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
 */
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Copy, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import type { ResponseOption } from "@/types/live-tools/email-rewriter";
import { useTranslations } from "next-intl";

interface AnalysisResultProps {
  summary: string;
  sentiment: "positive" | "neutral" | "negative" | "urgent";
  keyPoints: string[];
  responseOptions: ResponseOption[];
}

const sentimentColors = {
  positive: "bg-green-500/10 text-green-600 border-green-500/20",
  neutral: "bg-gray-500/10 text-gray-600 border-gray-500/20",
  negative: "bg-red-500/10 text-red-600 border-red-500/20",
  urgent: "bg-orange-500/10 text-orange-600 border-orange-500/20",
};

export function AnalysisResult({
  summary,
  sentiment,
  keyPoints,
  responseOptions,
}: AnalysisResultProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const t = useTranslations("LiveTools.rewriter");

  const handleCopy = async (content: string, id: string) => {
    await navigator.clipboard.writeText(content);
    setCopiedId(id);
    setSelectedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Analysis Summary */}
      <Card className="border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-medium">
              {t("title")}
            </CardTitle>
            <Badge variant="outline" className={sentimentColors[sentiment]}>
              {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-1">{t("summary")}</h4>
            <p className="text-sm text-muted-foreground">{summary}</p>
          </div>
          {keyPoints.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2">{t("keyPoints")}</h4>
              <ul className="space-y-1">
                {keyPoints.map((point, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Response Options */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium">{t("chooseResponse")}</h3>
        {responseOptions.map((option) => (
          <Card
            key={option.id}
            className={`border-2 transition-colors cursor-pointer ${
              selectedId === option.id
                ? "border-primary bg-primary/5"
                : "border-border hover:border-muted-foreground"
            }`}
            onClick={() => setSelectedId(option.id)}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {option.tone}
                </Badge>
                {selectedId === option.id && (
                  <Badge variant="default" className="text-xs">
                    {t("selected")}
                  </Badge>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopy(option.content, option.id);
                }}
                className="h-8 gap-2"
              >
                {copiedId === option.id ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                {copiedId === option.id ? t("copied") : t("copy")}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="whitespace-pre-wrap rounded-md bg-muted p-3 text-sm leading-relaxed">
                {option.content}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
