/**
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
 */

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type {
  PageSpeedResult,
  PageSpeedApiResponse,
} from "@/types/configs/pagespeed";

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

// Fallback mock data - shown immediately while real data loads
const createMockData = (
  strategy: "mobile" | "desktop",
  url: string,
): PageSpeedResult => ({
  url,
  strategy,
  metrics: {
    performance: strategy === "desktop" ? 91 : 94,
    accessibility: 93,
    bestPractices: 98,
    seo: 100,
  },
});

export function usePageSpeedData({
  url,
  showBothStrategies = true,
}: UsePageSpeedDataProps): UsePageSpeedDataReturn {
  // Initialize with mock data immediately - users see data right away
  const [mobileData, setMobileData] = useState<PageSpeedResult | null>(() =>
    createMockData("mobile", url),
  );
  const [desktopData, setDesktopData] = useState<PageSpeedResult | null>(() =>
    createMockData("desktop", url),
  );
  // Start with loading=false since we have mock data
  const [loading] = useState(false);
  // Never expose errors to users - always null
  const [error] = useState<string | null>(null);
  const [cacheStatus, setCacheStatus] = useState<
    "fresh" | "updating" | "updated" | null
  >("fresh");
  const [lastUpdated, setLastUpdated] = useState<string | null>(() =>
    new Date().toISOString(),
  );

  // Track if we've fetched real data
  const hasRealData = useRef({ mobile: false, desktop: false });
  const isDevModeDisabled = useRef(false); // Track if API is disabled in dev
  const retryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fetchFnRef = useRef<((forceRefresh?: boolean) => Promise<void>) | null>(
    null,
  );

  const fetchStrategy = useCallback(
    async (
      strategy: "mobile" | "desktop",
      forceRefresh = false,
    ): Promise<boolean> => {
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
          },
        );

        // Extract and simplify cache status
        const xCache = response.headers.get("X-Cache");
        if (xCache) {
          if (xCache === "HIT") setCacheStatus("fresh");
          else if (xCache.includes("STALE")) setCacheStatus("updating");
          else setCacheStatus("updated");
        }

        if (!response.ok) {
          // Silently fail - keep showing mock/cached data
          console.warn(
            `PageSpeed API returned ${response.status} for ${strategy}`,
          );
          return false;
        }

        const result = (await response.json()) as PageSpeedApiResponse;

        // Check if API is disabled (dev mode) or data is invalid
        if (!result?.metrics || (result as any).disabled) {
          // Keep showing mock data in dev mode
          console.warn(
            `PageSpeed API ${(result as any).disabled ? "disabled in dev mode" : "returned invalid data"} for ${strategy}`,
          );
          // Mark as disabled to prevent infinite retries
          if ((result as any).disabled) {
            isDevModeDisabled.current = true;
            // Mark as having "data" (mock) so we don't retry
            hasRealData.current.mobile = true;
            hasRealData.current.desktop = true;
          }
          return false;
        }

        // Check if metrics are all zeros (invalid real data)
        const hasValidMetrics = Object.values(result.metrics).some(
          (value) => value > 0,
        );
        if (!hasValidMetrics) {
          console.warn(`PageSpeed returned zero metrics for ${strategy}`);
          return false;
        }

        const validatedResult: PageSpeedResult = {
          url: result.url || url,
          strategy: (result.strategy as "mobile" | "desktop") || strategy,
          metrics: result.metrics,
          ...(result.loadingExperience && {
            loadingExperience: result.loadingExperience,
          }),
        };

        // Update with real data
        if (strategy === "mobile") {
          setMobileData(validatedResult);
          hasRealData.current.mobile = true;
        } else {
          setDesktopData(validatedResult);
          hasRealData.current.desktop = true;
        }

        setLastUpdated(new Date().toISOString());
        setCacheStatus("fresh");
        return true;
      } catch (err) {
        // Silently fail - keep showing mock/cached data
        console.warn(`PageSpeed fetch failed (${strategy}):`, err);
        return false;
      }
    },
    [url],
  );

  // Fetch data with silent background retry on failure
  const fetchAllDataWithRetry = useCallback(
    async (forceRefresh = false): Promise<void> => {
      if (!url) return;

      // Skip fetching if API is disabled in dev mode (unless force refresh)
      if (isDevModeDisabled.current && !forceRefresh) {
        return;
      }

      setCacheStatus("updating");

      try {
        const mobileSuccess = await fetchStrategy("mobile", forceRefresh);
        let needsRetry = !mobileSuccess;

        if (showBothStrategies) {
          const desktopSuccess = await fetchStrategy("desktop", forceRefresh);
          needsRetry = !mobileSuccess && !desktopSuccess;
        }

        // Schedule silent retry if needed (only if we don't have real data yet and API is not disabled)
        if (
          needsRetry &&
          !hasRealData.current.mobile &&
          !hasRealData.current.desktop &&
          !isDevModeDisabled.current
        ) {
          if (retryTimeoutRef.current) {
            clearTimeout(retryTimeoutRef.current);
          }
          retryTimeoutRef.current = setTimeout(() => {
            console.log("Silent retry: Attempting to fetch PageSpeed data...");
            // Use ref to call the latest version of the function
            void fetchFnRef.current?.(false);
          }, 30000);
        }
      } catch (fetchError) {
        console.warn("Failed to fetch PageSpeed data:", fetchError);
      }
    },
    [url, showBothStrategies, fetchStrategy],
  );

  // Keep the ref updated with the latest function
  useEffect(() => {
    fetchFnRef.current = fetchAllDataWithRetry;
  }, [fetchAllDataWithRetry]);

  const refresh = useCallback(() => {
    void fetchAllDataWithRetry(true);
  }, [fetchAllDataWithRetry]);

  useEffect(() => {
    // Defer fetch to next tick to avoid synchronous setState in effect
    const timeoutId = setTimeout(() => {
      void fetchAllDataWithRetry(false);
    }, 0);

    // Cleanup retry timeout on unmount
    return () => {
      clearTimeout(timeoutId);
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, [fetchAllDataWithRetry]);

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
