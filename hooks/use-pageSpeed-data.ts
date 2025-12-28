/**
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
 */
"use client";

import { useState, useEffect, useCallback } from "react";
import type { PageSpeedResult, PageSpeedApiResponse } from "@/types/pagespeed";

interface UsePageSpeedDataProps {
  url: string;
  showBothStrategies?: boolean;
}

interface UsePageSpeedDataReturn {
  mobileData: PageSpeedResult | null;
  desktopData: PageSpeedResult | null;
  loading: boolean;
  error: string | null;
  cacheStatus: "fresh" | "updating" | "updated" | null;
  lastUpdated: string | null;
  refresh: () => void;
}

export function usePageSpeedData({
  url,
  showBothStrategies = true,
}: UsePageSpeedDataProps): UsePageSpeedDataReturn {
  const [mobileData, setMobileData] = useState<PageSpeedResult | null>(null);
  const [desktopData, setDesktopData] = useState<PageSpeedResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cacheStatus, setCacheStatus] = useState<
    "fresh" | "updating" | "updated" | null
  >(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const fetchStrategy = useCallback(
    async (
      strategy: "mobile" | "desktop",
      forceRefresh = false
    ): Promise<void> => {
      try {
        const queryParams = new URLSearchParams({
          url,
          strategy,
        });

        if (forceRefresh) {
          queryParams.append("refresh", "true");
        }

        const response = await fetch(
          `/api/pagespeed?${queryParams.toString()}`,
          {
            headers: { "X-Client-ID": "pagespeed-component" },
            signal: AbortSignal.timeout(50000),
          }
        );

        // Extract and simplify cache status
        const xCache = response.headers.get("X-Cache");
        if (xCache) {
          if (xCache === "HIT") setCacheStatus("fresh");
          else if (xCache.includes("STALE")) setCacheStatus("updating");
          else setCacheStatus("updated");
        }

        if (!response.ok) {
          let errorMessage = "Failed to fetch PageSpeed data";

          if (response.status === 504) {
            errorMessage =
              "Analysis timed out. The website may be slow to load.";
          } else if (response.status === 429) {
            errorMessage =
              "Rate limit reached. Please wait before trying again.";
          } else if (response.status === 503) {
            errorMessage = "PageSpeed API is temporarily unavailable.";
            try {
              const contentType = response.headers.get("content-type");
              if (contentType?.includes("application/json")) {
                const errorData =
                  (await response.json()) as PageSpeedApiResponse;
                if (errorData.details) {
                  errorMessage = `${errorMessage} (${errorData.details})`;
                }
              }
            } catch {
              // Keep the default message
            }
          } else {
            try {
              const contentType = response.headers.get("content-type");
              if (contentType?.includes("application/json")) {
                const errorData =
                  (await response.json()) as PageSpeedApiResponse;
                errorMessage = errorData.error || errorMessage;
              }
            } catch {
              errorMessage = `HTTP ${response.status}: ${
                response.statusText || "Unknown error"
              }`;
            }
          }
          throw new Error(errorMessage);
        }

        const result = (await response.json()) as PageSpeedApiResponse;

        if (!result?.metrics) {
          throw new Error("Invalid data received from PageSpeed API");
        }

        const validatedResult: PageSpeedResult = {
          url: result.url || url,
          strategy: (result.strategy as "mobile" | "desktop") || strategy,
          metrics: result.metrics,
          ...(result.loadingExperience && {
            loadingExperience: result.loadingExperience,
          }),
        };

        if (strategy === "mobile") {
          setMobileData(validatedResult);
        } else {
          setDesktopData(validatedResult);
        }

        setLastUpdated(new Date().toISOString());
      } catch (err) {
        console.error(`PageSpeed fetch error (${strategy}):`, err);
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    },
    [url]
  );

  const fetchAllData = useCallback(
    async (forceRefresh = false): Promise<void> => {
      if (!url) return;

      setLoading(true);
      setError(null);
      setCacheStatus(null);

      try {
        // Fetch strategies sequentially to reduce API load and improve reliability
        await fetchStrategy("mobile", forceRefresh);

        if (showBothStrategies) {
          await fetchStrategy("desktop", forceRefresh);
        }
      } catch (fetchError) {
        console.error("Failed to fetch PageSpeed data:", fetchError);
        // Only set error if no data was fetched at all
        setError(
          fetchError instanceof Error
            ? fetchError.message
            : "Failed to fetch data"
        );
      } finally {
        setLoading(false);
      }
    },
    [url, showBothStrategies, fetchStrategy]
  );

  const refresh = useCallback(() => {
    void fetchAllData(true);
  }, [fetchAllData]);

  useEffect(() => {
    void fetchAllData(false);
  }, [fetchAllData]);

  return {
    mobileData,
    desktopData,
    loading,
    error,
    cacheStatus,
    lastUpdated,
    refresh,
  };
}
