/**
 * @author ColdByDefault
 * @copyright 2026 ColdByDefault. All Rights Reserved.
 */

"use client";

import { useTranslations } from "next-intl";
import {
  Monitor,
  Smartphone,
  RefreshCw,
  AlertCircle,
  Globe,
} from "lucide-react";
import { SiGoogle } from "react-icons/si";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import type { SpeedInsightScore } from "@/types/configs/speed-insight";
import { useSpeedInsight } from "./SpeedInsight.logic";
import { RING, SCORE_THRESHOLDS } from "./SpeedInsight.constants";

/** Calculate stroke-dashoffset for the ring gauge */
function getOffset(score: number): number {
  return RING.circumference - (score / 100) * RING.circumference;
}

/** Map score to ring color */
function getRingColor(score: number): string {
  if (score >= SCORE_THRESHOLDS.good) return "stroke-green-500";
  if (score >= SCORE_THRESHOLDS.average) return "stroke-yellow-500";
  return "stroke-red-500";
}

/** Single score ring gauge */
function ScoreRing({ category }: { category: SpeedInsightScore }) {
  const offset = getOffset(category.score);

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative" style={{ width: RING.size, height: RING.size }}>
        <svg
          width={RING.size}
          height={RING.size}
          className="-rotate-90"
          aria-label={`${category.label}: ${category.score}%`}
          role="img"
        >
          {/* Background ring */}
          <circle
            cx={RING.size / 2}
            cy={RING.size / 2}
            r={RING.radius}
            fill="none"
            strokeWidth={RING.strokeWidth}
            className="stroke-muted"
          />
          {/* Score ring */}
          <circle
            cx={RING.size / 2}
            cy={RING.size / 2}
            r={RING.radius}
            fill="none"
            strokeWidth={RING.strokeWidth}
            strokeLinecap="round"
            strokeDasharray={RING.circumference}
            strokeDashoffset={offset}
            className={`${getRingColor(category.score)} transition-all duration-1000 ease-out`}
          />
        </svg>
        {/* Score number */}
        <span
          className={`absolute inset-0 flex items-center justify-center text-sm font-bold ${category.color}`}
          aria-hidden="true"
        >
          {category.score}
        </span>
      </div>
      <span className="text-xs text-muted-foreground text-center font-medium max-w-20 leading-tight">
        {category.label}
      </span>
    </div>
  );
}

/** Loading skeleton for a strategy tab */
function StrategySkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-items-center py-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex flex-col items-center gap-1.5">
          <Skeleton
            className="rounded-full"
            style={{ width: RING.size, height: RING.size }}
          />
          <Skeleton className="h-3 w-16" />
        </div>
      ))}
    </div>
  );
}

export default function SpeedInsight({ className }: { className?: string }) {
  const t = useTranslations("Home.speedInsight");
  const { desktop, mobile, loading, error, refetch } = useSpeedInsight();

  return (
    <section className={className} aria-label={t("title")}>
      <Card className="max-w-3xl mx-auto bg-background/80 backdrop-blur-sm border-border/50 shadow-lg hover:shadow-xl hover:border-muted-foreground/30 transition-all duration-300">
        <CardHeader className="pb-3">
          {/* Header row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <SiGoogle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg sm:text-xl">
                  {t("title")}
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  {t("subtitle")}
                </CardDescription>
              </div>
            </div>

            {/* Live indicator */}
            {!error && !loading && (
              <Badge
                variant="outline"
                className="gap-1.5 border-green-500/30 bg-green-500/5 text-green-600 dark:text-green-400"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                {t("liveLabel")}
              </Badge>
            )}
          </div>

          {/* Portfolio URL indicator */}
          <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
            <Globe className="h-3 w-3" />
            <span>{t("analyzingPortfolio")}</span>
          </div>
        </CardHeader>

        <CardContent>
          {/* Error state */}
          {error && !loading && (
            <div className="flex flex-col items-center gap-3 py-8 text-center">
              <AlertCircle className="w-8 h-8 text-destructive" />
              <p className="text-sm text-muted-foreground">{t("error")}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => void refetch()}
              >
                <RefreshCw className="w-4 h-4 mr-1" />
                {t("retry")}
              </Button>
            </div>
          )}

          {/* Data / Loading */}
          {!error && (
            <Tabs defaultValue="desktop" className="w-full">
              <div className="flex items-center justify-between mb-2">
                <TabsList>
                  <TabsTrigger value="desktop" className="gap-1.5">
                    <Monitor className="w-4 h-4" />
                    {t("desktop")}
                  </TabsTrigger>
                  <TabsTrigger value="mobile" className="gap-1.5">
                    <Smartphone className="w-4 h-4" />
                    {t("mobile")}
                  </TabsTrigger>
                </TabsList>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => void refetch()}
                  disabled={loading}
                  aria-label={t("retry")}
                  className="h-8 w-8"
                >
                  <RefreshCw
                    className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                  />
                </Button>
              </div>

              <TabsContent value="desktop">
                {loading ? (
                  <StrategySkeleton />
                ) : desktop ? (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-items-center py-3">
                    {desktop.categories.map((cat) => (
                      <ScoreRing key={cat.label} category={cat} />
                    ))}
                  </div>
                ) : null}
              </TabsContent>

              <TabsContent value="mobile">
                {loading ? (
                  <StrategySkeleton />
                ) : mobile ? (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-items-center py-3">
                    {mobile.categories.map((cat) => (
                      <ScoreRing key={cat.label} category={cat} />
                    ))}
                  </div>
                ) : null}
              </TabsContent>
            </Tabs>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t mt-2">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <SiGoogle className="h-3 w-3" />
              <span>{t("poweredBy")}</span>
            </div>
            {desktop?.fetchedAt && (
              <span className="text-xs text-muted-foreground">
                {t("lastUpdated")}:{" "}
                {new Date(desktop.fetchedAt).toLocaleTimeString()}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
