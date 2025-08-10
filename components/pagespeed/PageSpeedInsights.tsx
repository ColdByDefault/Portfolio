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
  strategy?: "mobile" | "desktop";
  showRefreshButton?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getScoreBadgeVariant = (
  score: number
): "default" | "secondary" | "destructive" => {
  if (score >= 90) return "default";
  if (score >= 50) return "secondary";
  return "destructive";
};

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
  strategy = "mobile",
  showRefreshButton = true,
}: PageSpeedInsightsProps) {
  const [data, setData] = useState<PageSpeedResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPageSpeedData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/pagespeed?url=${encodeURIComponent(url)}&strategy=${strategy}`,
        {
          headers: {
            "X-Client-ID": "pagespeed-component",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch PageSpeed data");
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPageSpeedData();
  }, [url, strategy]); // eslint-disable-line react-hooks/exhaustive-deps

  const MetricSkeleton = () => (
    <div className="flex items-center justify-between py-2">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-6 w-12 rounded-full" />
    </div>
  );

  const LoadingSkeleton = () => (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-16" />
        </div>
        <Skeleton className="h-4 w-48" />
      </CardHeader>
      <CardContent className="space-y-4">
        <MetricSkeleton />
        <MetricSkeleton />
        <MetricSkeleton />
        <MetricSkeleton />
        <Separator />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Skeleton className="h-4 w-20 mb-2" />
            <Skeleton className="h-8 w-16" />
          </div>
          <div>
            <Skeleton className="h-4 w-20 mb-2" />
            <Skeleton className="h-8 w-16" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <p className="text-red-500 mb-4">Error: {error}</p>
          {showRefreshButton && (
            <Button onClick={fetchPageSpeedData} variant="outline">
              Try Again
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <p className="text-muted-foreground">No data available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl flex gap-2 items-center">
            <SiGooglecloud />
            PageSpeed Insights
          </CardTitle>
        </div>
        <p className="text-sm text-muted-foreground truncate">{data.url}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Core Metrics */}
        <div className="space-y-3">
          {Object.entries(data.metrics).map(([key, score]) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-sm font-medium capitalize">
                {key === "bestPractices" ? "Best Practices" : key}
              </span>
              <Badge variant="outline" className={getScoreBadgeColor(score)}>
                {score}
              </Badge>
            </div>
          ))}
        </div>

        <Separator />

        {/* Core Web Vitals if available */}
        {data.loadingExperience?.metrics ? (
          <div>
            <h4 className="text-sm font-semibold mb-3">
              Core Web Vitals (Real User Data)
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {data.loadingExperience.metrics.LARGEST_CONTENTFUL_PAINT_MS && (
                <div>
                  <p className="text-muted-foreground">LCP</p>
                  <p className="font-medium">
                    {Math.round(
                      data.loadingExperience.metrics.LARGEST_CONTENTFUL_PAINT_MS
                        .percentile
                    )}
                    ms
                  </p>
                </div>
              )}
              {data.loadingExperience.metrics.FIRST_INPUT_DELAY_MS && (
                <div>
                  <p className="text-muted-foreground">FID</p>
                  <p className="font-medium">
                    {Math.round(
                      data.loadingExperience.metrics.FIRST_INPUT_DELAY_MS
                        .percentile
                    )}
                    ms
                  </p>
                </div>
              )}
              {data.loadingExperience.metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE && (
                <div>
                  <p className="text-muted-foreground">CLS</p>
                  <p className="font-medium">
                    {(
                      data.loadingExperience.metrics
                        .CUMULATIVE_LAYOUT_SHIFT_SCORE.percentile / 100
                    ).toFixed(3)}
                  </p>
                </div>
              )}
              {data.loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS && (
                <div>
                  <p className="text-muted-foreground">FCP</p>
                  <p className="font-medium">
                    {Math.round(
                      data.loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS
                        .percentile
                    )}
                    ms
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            <h4 className="text-sm font-semibold mb-3">Core Web Vitals</h4>
            <div className="p-4 bg-muted/50 rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-2">
                📊 No real user data available
              </p>
              <p className="text-xs text-muted-foreground">
                Core Web Vitals require sufficient traffic from Chrome users.
                Data may take 28 days to appear for new sites.
              </p>
            </div>
          </div>
        )}

        {showRefreshButton && (
          <>
            <Separator />
            <Button
              onClick={fetchPageSpeedData}
              variant="outline"
              className="w-full cursor-pointer"
              disabled={loading}
            >
              Refresh Data
            </Button>
          </>
        )}
      </CardContent>
      <CardFooter className="text-xs">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
      </CardFooter>
    </Card>
  );
}
