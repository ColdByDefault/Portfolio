/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */
"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { SiGooglecloud } from "react-icons/si";
import { HiDesktopComputer } from "react-icons/hi";
import { HiDevicePhoneMobile } from "react-icons/hi2";
import type {
  PageSpeedResult,
  PageSpeedInsightsProps,
} from "@/types/pagespeed";
import { usePageSpeedData } from "@/hooks/use-pageSpeed-data";

const getScoreBadgeColor = (score: number): string => {
  if (score >= 90)
    return "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800";
  if (score >= 50)
    return "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800";
  return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800";
};

const getCacheStatusInfo = (
  status: "fresh" | "updating" | "updated" | null
) => {
  switch (status) {
    case "fresh":
      return {
        label: "Fresh",
        className:
          "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400",
      };
    case "updating":
      return {
        label: "Updating",
        className:
          "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400",
      };
    case "updated":
      return {
        label: "Updated",
        className:
          "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400",
      };
    default:
      return null;
  }
};

const MetricsSkeleton = () => (
  <div className="grid gap-3">
    {Array.from({ length: 4 }).map((_, i) => (
      <div
        key={i}
        className="flex items-center justify-between py-3 px-3 rounded-lg bg-muted/30"
      >
        <Skeleton className="h-4 w-24 rounded" />
        <Skeleton className="h-7 w-12 rounded-full" />
      </div>
    ))}
  </div>
);

const LoadingSkeleton = ({
  progress,
  progressLabel,
}: {
  progress: number;
  progressLabel: string;
}) => (
  <Card className="w-full">
    <CardHeader className="pb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-6 rounded" />
          <Skeleton className="h-6 w-40 rounded" />
        </div>
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
      <Skeleton className="h-4 w-64 rounded" />
    </CardHeader>
    <CardContent className="space-y-6">
      <div className="space-y-4">
        <Skeleton className="h-4 w-32 rounded" />
        <MetricsSkeleton />
      </div>
      <Separator />
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">{progressLabel}</span>
          <span className="text-muted-foreground">{progress}%</span>
        </div>
        <Progress
          value={progress}
          className="w-full"
          aria-label={`PageSpeed analysis progress: ${progress}% - ${progressLabel}`}
        />
      </div>
      <Skeleton className="h-10 w-full rounded-md" />
    </CardContent>
    <CardFooter className="pt-4">
      <Skeleton className="h-4 w-48 rounded" />
    </CardFooter>
  </Card>
);

const ErrorDisplay = ({
  error,
  onRetry,
}: {
  error: string;
  onRetry: () => void;
}) => (
  <Card className="w-full">
    <CardContent className="flex flex-col items-center justify-center py-12">
      <div className="text-center space-y-4">
        <div className="text-destructive text-lg">⚠️</div>
        <p className="text-destructive font-medium">
          Error loading PageSpeed data
        </p>
        <p className="text-sm text-muted-foreground max-w-md">{error}</p>
        <Button onClick={onRetry} variant="outline" size="sm">
          Try Again
        </Button>
      </div>
    </CardContent>
  </Card>
);

const MetricsDisplay = ({ data }: { data: PageSpeedResult }) => (
  <div className="space-y-4">
    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
      Performance Metrics
    </h4>
    <div className="grid gap-3">
      {Object.entries(data.metrics).map(([key, score]) => (
        <div
          key={key}
          className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
        >
          <span className="text-sm font-medium capitalize">
            {key === "bestPractices" ? "Best Practices" : key}
          </span>
          <Badge
            variant="outline"
            className={`${getScoreBadgeColor(score as number)} font-semibold`}
          >
            {score as number}
          </Badge>
        </div>
      ))}
    </div>
  </div>
);

export default function PageSpeedInsights({
  url = "https://www.coldbydefault.com",
  showRefreshButton = true,
  showBothStrategies = true,
}: PageSpeedInsightsProps) {
  const [activeStrategy, setActiveStrategy] = useState<"mobile" | "desktop">(
    "desktop"
  );
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState("Initializing...");

  const {
    mobileData,
    desktopData,
    loading,
    error,
    cacheStatus,
    lastUpdated,
    refresh,
  } = usePageSpeedData({ url, showBothStrategies });

  // Progress simulation based on loading state
  useEffect(() => {
    if (loading) {
      // Start progress
      setProgress(0);
      setProgressLabel("Connecting to PageSpeed API...");

      const progressTimer = setTimeout(() => {
        setProgress(25);
        setProgressLabel("Analyzing website performance...");

        const midTimer = setTimeout(() => {
          setProgress(60);
          setProgressLabel("Processing metrics...");
        }, 800);

        return () => clearTimeout(midTimer);
      }, 300);

      return () => clearTimeout(progressTimer);
    } else {
      // Complete progress when data is loaded
      setProgress(100);
      setProgressLabel("Analysis complete!");
      return undefined;
    }
  }, [loading]);

  const getCurrentData = () => {
    return activeStrategy === "mobile" ? mobileData : desktopData;
  };

  const data = getCurrentData();

  if (loading) {
    return (
      <LoadingSkeleton progress={progress} progressLabel={progressLabel} />
    );
  }

  if (error) {
    return <ErrorDisplay error={error} onRetry={refresh} />;
  }

  if (!data) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center space-y-2">
            <div className="text-muted-foreground text-lg">📊</div>
            <p className="text-muted-foreground">No data available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const cacheInfo = getCacheStatusInfo(cacheStatus);

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-xl flex gap-2 items-center">
            <SiGooglecloud className="text-blue-600" />
            <span className="truncate">PageSpeed Insights</span>
            <span className="text-xs text-muted-foreground" role="note">
              Powered by Google
            </span>
          </CardTitle>
          {showBothStrategies && (
            <div className="flex items-center gap-1 bg-muted rounded-lg p-1 self-start sm:self-auto">
              <Button
                variant={activeStrategy === "mobile" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveStrategy("mobile")}
                className="h-8 px-2 sm:px-3 text-xs"
                aria-label="Switch to mobile PageSpeed analysis"
              >
                <HiDevicePhoneMobile className="h-4 w-4 sm:mr-1" />
                <span className="hidden sm:inline">Mobile</span>
              </Button>
              <Button
                variant={activeStrategy === "desktop" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveStrategy("desktop")}
                className="h-8 px-2 sm:px-3 text-xs"
                aria-label="Switch to desktop PageSpeed analysis"
              >
                <HiDesktopComputer className="h-4 w-4 sm:mr-1" />
                <span className="hidden sm:inline">Desktop</span>
              </Button>
            </div>
          )}
          {!showBothStrategies && (
            <div className="flex items-center gap-1 self-start sm:self-auto">
              {data.strategy === "desktop" ? (
                <HiDesktopComputer className="h-5 w-5 text-muted-foreground" />
              ) : (
                <HiDevicePhoneMobile className="h-5 w-5 text-muted-foreground" />
              )}
              <Badge variant="outline" className="text-xs">
                {data.strategy}
              </Badge>
            </div>
          )}
        </div>
        <p className="text-sm text-muted-foreground truncate">{data.url}</p>
      </CardHeader>

      <CardContent className="space-y-6">
        <MetricsDisplay data={data} />

        {showRefreshButton && (
          <>
            <Separator />
            <div className="space-y-3">
              {cacheInfo && (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Cache Status:</span>
                  <Badge variant="outline" className={cacheInfo.className}>
                    {cacheInfo.label}
                  </Badge>
                </div>
              )}
              <Button
                onClick={refresh}
                variant="outline"
                className="w-full cursor-pointer"
                disabled={loading}
              >
                {loading ? "Refreshing..." : "Force Refresh"}
              </Button>
            </div>
          </>
        )}
      </CardContent>

      <CardFooter className="pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-2">
          <div className="text-xs text-muted-foreground flex items-center gap-2">
            <div className="flex items-center relative">
              {/* Green status dot with inline styles as fallback */}
              <div
                className="w-2 h-2 rounded-full animate-pulse"
                style={{
                  backgroundColor: "#22c55e",
                  minWidth: "8px",
                  minHeight: "8px",
                }}
              ></div>
              <div
                className="absolute inset-0 w-2 h-2 rounded-full animate-ping opacity-50"
                style={{
                  backgroundColor: "#4ade80",
                }}
              ></div>
            </div>
            {lastUpdated ? (
              <>
                API Online • Last updated:{" "}
                {new Date(lastUpdated).toLocaleDateString()} at{" "}
                {new Date(lastUpdated).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </>
            ) : (
              "Loading..."
            )}
          </div>
          <div className="flex flex-col sm:items-end gap-1">
            {cacheStatus === "updating" && (
              <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                📡 Auto-refreshing in background
              </p>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
