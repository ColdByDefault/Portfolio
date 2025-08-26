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
import { Separator } from "@/components/ui/separator";
import { SiGooglecloud } from "react-icons/si";
import { HiDesktopComputer } from "react-icons/hi";
import { HiDevicePhoneMobile } from "react-icons/hi2";

interface PageSpeedMetrics {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
  pwa?: number;
}

interface PageSpeedResult {
  url: string;
  strategy: "mobile" | "desktop";
  metrics: PageSpeedMetrics;
  loadingExperience?: {
    metrics: {
      FIRST_CONTENTFUL_PAINT_MS?: { percentile: number };
      FIRST_INPUT_DELAY_MS?: { percentile: number };
      LARGEST_CONTENTFUL_PAINT_MS?: { percentile: number };
      CUMULATIVE_LAYOUT_SHIFT_SCORE?: { percentile: number };
    };
  };
}

interface PageSpeedInsightsProps {
  url?: string;
  showRefreshButton?: boolean;
  showBothStrategies?: boolean;
}

const getScoreBadgeColor = (score: number): string => {
  if (score >= 90) {
    return "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800";
  }
  if (score >= 50) {
    return "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800";
  }
  return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800";
};

export default function PageSpeedInsights({
  url = "https://www.coldbydefault.com",
  showRefreshButton = true,
  showBothStrategies = true,
}: PageSpeedInsightsProps) {
  const [mobileData, setMobileData] = useState<PageSpeedResult | null>(null);
  const [desktopData, setDesktopData] = useState<PageSpeedResult | null>(null);
  const [activeStrategy, setActiveStrategy] = useState<"mobile" | "desktop">(
    "mobile"
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchPageSpeedData = async (
    strategy: "mobile" | "desktop",
    retries = 2
  ) => {
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const response = await fetch(
          `/api/pagespeed?url=${encodeURIComponent(url)}&strategy=${strategy}`,
          {
            headers: {
              "X-Client-ID": "pagespeed-component",
            },
            // Add a timeout
            signal: AbortSignal.timeout(30000), // 30 second timeout
          }
        );

        if (!response.ok) {
          let errorMessage = "Failed to fetch PageSpeed data";
          try {
            const errorData = await response.json();
            errorMessage = errorData.error || errorMessage;
          } catch (parseError) {
            // If we can't parse the response as JSON, try to get the text
            try {
              const errorText = await response.text();
              errorMessage =
                errorText || `HTTP ${response.status}: ${response.statusText}`;
            } catch (textError) {
              errorMessage = `HTTP ${response.status}: ${response.statusText}`;
            }
          }

          // If it's a rate limit or server error, retry
          if (
            attempt < retries &&
            (response.status === 429 || response.status >= 500)
          ) {
            console.warn(
              `Attempt ${attempt + 1} failed, retrying in ${
                (attempt + 1) * 2
              } seconds...`
            );
            await new Promise((resolve) =>
              setTimeout(resolve, (attempt + 1) * 2000)
            );
            continue;
          }

          throw new Error(errorMessage);
        }

        let result;
        try {
          result = await response.json();
        } catch (parseError) {
          if (attempt < retries) {
            console.warn(`Parse error on attempt ${attempt + 1}, retrying...`);
            await new Promise((resolve) =>
              setTimeout(resolve, (attempt + 1) * 1000)
            );
            continue;
          }
          throw new Error("Invalid response format from PageSpeed API");
        }

        // Validate the result structure
        if (!result || typeof result !== "object" || !result.metrics) {
          if (attempt < retries) {
            console.warn(
              `Invalid result structure on attempt ${attempt + 1}, retrying...`
            );
            await new Promise((resolve) =>
              setTimeout(resolve, (attempt + 1) * 1000)
            );
            continue;
          }
          throw new Error("Invalid data structure received from PageSpeed API");
        }

        if (strategy === "mobile") {
          setMobileData(result);
        } else {
          setDesktopData(result);
        }
        return; // Success, exit the retry loop
      } catch (err) {
        if (attempt === retries) {
          // Last attempt failed
          console.error(
            `PageSpeed fetch error (${strategy}) after ${
              retries + 1
            } attempts:`,
            err
          );
          setError(err instanceof Error ? err.message : "An error occurred");
        }
      }
    }
  };

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    setRetryCount((prev) => prev + 1);

    try {
      if (showBothStrategies) {
        // Fetch both mobile and desktop data with some delay between requests
        await fetchPageSpeedData("mobile");
        await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 second delay
        await fetchPageSpeedData("desktop");
      } else {
        // Fetch only mobile data
        await fetchPageSpeedData("mobile");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, [url]); // eslint-disable-line react-hooks/exhaustive-deps

  const getCurrentData = () => {
    return activeStrategy === "mobile" ? mobileData : desktopData;
  };

  const data = getCurrentData();

  const LoadingSkeleton = () => (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded" />
            <Skeleton className="h-6 w-40 rounded" />
          </div>
          <div className="flex items-center gap-1">
            <Skeleton className="h-5 w-5 rounded" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
        </div>
        <Skeleton className="h-4 w-64 rounded" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Skeleton className="h-4 w-32 rounded" />
          <div className="grid gap-3">
            <div className="flex items-center justify-between py-3 px-3 rounded-lg bg-muted/30">
              <Skeleton className="h-4 w-24 rounded" />
              <Skeleton className="h-7 w-12 rounded-full" />
            </div>
            <div className="flex items-center justify-between py-3 px-3 rounded-lg bg-muted/30">
              <Skeleton className="h-4 w-28 rounded" />
              <Skeleton className="h-7 w-12 rounded-full" />
            </div>
            <div className="flex items-center justify-between py-3 px-3 rounded-lg bg-muted/30">
              <Skeleton className="h-4 w-32 rounded" />
              <Skeleton className="h-7 w-12 rounded-full" />
            </div>
            <div className="flex items-center justify-between py-3 px-3 rounded-lg bg-muted/30">
              <Skeleton className="h-4 w-16 rounded" />
              <Skeleton className="h-7 w-12 rounded-full" />
            </div>
          </div>
        </div>
        <Separator />
        <Skeleton className="h-10 w-full rounded-md" />
      </CardContent>
      <CardFooter className="pt-4">
        <Skeleton className="h-4 w-48 rounded" />
      </CardFooter>
    </Card>
  );

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="text-center space-y-4">
            <div className="text-destructive text-lg">⚠️</div>
            <p className="text-destructive font-medium">
              Error loading PageSpeed data
            </p>
            <p className="text-sm text-muted-foreground max-w-md">{error}</p>
            {retryCount > 0 && (
              <p className="text-xs text-muted-foreground">
                Attempt #{retryCount}
              </p>
            )}
            {showRefreshButton && (
              <Button
                onClick={fetchAllData}
                variant="outline"
                size="sm"
                disabled={loading}
              >
                {loading ? "Retrying..." : "Try Again"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
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

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-xl flex gap-2 items-center">
            <SiGooglecloud className="text-blue-600" />
            <span className="truncate">PageSpeed Insights</span>
            <span className="text-xs text-muted-foreground">Powered by Google</span>
          </CardTitle>
          {showBothStrategies && (
            <div className="flex items-center gap-1 bg-muted rounded-lg p-1 self-start sm:self-auto">
              <Button
                variant={activeStrategy === "mobile" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveStrategy("mobile")}
                className="h-8 px-2 sm:px-3 text-xs"
              >
                <HiDevicePhoneMobile className="h-4 w-4 sm:mr-1" />
                <span className="hidden sm:inline">Mobile</span>
              </Button>
              <Button
                variant={activeStrategy === "desktop" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveStrategy("desktop")}
                className="h-8 px-2 sm:px-3 text-xs"
              >
                <HiDesktopComputer className="h-4 w-4 sm:mr-1" />
                <span className="hidden sm:inline">Desktop</span>
              </Button>
            </div>
          )}
          {!showBothStrategies && (
            <div className="flex items-center gap-1 self-start sm:self-auto">
              {data?.strategy === "desktop" ? (
                <HiDesktopComputer className="h-5 w-5 text-muted-foreground" />
              ) : (
                <HiDevicePhoneMobile className="h-5 w-5 text-muted-foreground" />
              )}
              <Badge variant="outline" className="text-xs">
                {data?.strategy}
              </Badge>
            </div>
          )}
        </div>
        <p className="text-sm text-muted-foreground truncate">{data?.url}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Core Metrics */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Performance Metrics
          </h4>
          <div className="grid gap-3">
            {Object.entries(data?.metrics || {}).map(([key, score]) => (
              <div
                key={key}
                className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <span className="text-sm font-medium capitalize">
                  {key === "bestPractices" ? "Best Practices" : key}
                </span>
                <Badge
                  variant="outline"
                  className={`${getScoreBadgeColor(
                    score as number
                  )} font-semibold`}
                >
                  {score as number}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {showRefreshButton && (
          <>
            <Separator />
            <Button
              onClick={fetchAllData}
              variant="outline"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Refreshing..." : "Refresh Data"}
            </Button>
          </>
        )}
      </CardContent>
      <CardFooter className="pt-4">
        <p className="text-xs text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()} at{" "}
          {new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </CardFooter>
    </Card>
  );
}
