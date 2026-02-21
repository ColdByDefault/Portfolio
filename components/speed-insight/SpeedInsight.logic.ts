/**
 * @author ColdByDefault
 * @copyright 2026 ColdByDefault. All Rights Reserved.
 */

import { useState, useEffect, useCallback, useRef } from "react";
import type {
  SpeedInsightApiResponse,
  SpeedInsightResult,
} from "@/types/configs/speed-insight";
import { SPEED_INSIGHT_API, CACHE_DURATION_MS } from "./SpeedInsight.constants";

/** State shape for the SpeedInsight hook */
interface SpeedInsightState {
  desktop: SpeedInsightResult | null;
  mobile: SpeedInsightResult | null;
  loading: boolean;
  error: string | null;
}

/** Return type for the useSpeedInsight hook */
interface UseSpeedInsightReturn extends SpeedInsightState {
  refetch: () => Promise<void>;
}

/** Cached response to avoid redundant API calls */
let cachedData: SpeedInsightApiResponse | null = null;
let cacheTimestamp = 0;

/** Check if cached data is still valid */
function isCacheValid(): boolean {
  return cachedData !== null && Date.now() - cacheTimestamp < CACHE_DURATION_MS;
}

/**
 * Hook to fetch and manage PageSpeed Insights data
 * Includes caching, error handling, and refetch capability
 */
export function useSpeedInsight(): UseSpeedInsightReturn {
  const [state, setState] = useState<SpeedInsightState>({
    desktop: null,
    mobile: null,
    loading: true,
    error: null,
  });

  const abortRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async (force = false): Promise<void> => {
    // Return cached data if valid and not forced
    if (!force && isCacheValid() && cachedData) {
      setState({
        desktop: cachedData.desktop,
        mobile: cachedData.mobile,
        loading: false,
        error: null,
      });
      return;
    }

    // Abort any in-flight request
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const response = await fetch(SPEED_INSIGHT_API, {
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = (await response.json()) as SpeedInsightApiResponse;

      if (data.error) {
        throw new Error(data.error);
      }

      // Update cache
      cachedData = data;
      cacheTimestamp = Date.now();

      setState({
        desktop: data.desktop,
        mobile: data.mobile,
        loading: false,
        error: null,
      });
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;

      setState((prev) => ({
        ...prev,
        loading: false,
        error: err instanceof Error ? err.message : "Unknown error",
      }));
    }
  }, []);

  const refetch = useCallback(async (): Promise<void> => {
    await fetchData(true);
  }, [fetchData]);

  useEffect(() => {
    void fetchData();

    return () => {
      abortRef.current?.abort();
    };
  }, [fetchData]);

  return { ...state, refetch };
}
