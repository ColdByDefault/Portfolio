/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type {
  PageSpeedMetrics,
  PageSpeedResult,
  PageSpeedApiRawResponse,
} from "@/types/pagespeed";

// In-memory cache with automatic expiration
interface CacheEntry {
  data: PageSpeedResult;
  timestamp: number;
  isRefreshing?: boolean;
}

class PageSpeedCache {
  private static instance: PageSpeedCache;
  private cache = new Map<string, CacheEntry>();
  private readonly CACHE_DURATION = 12 * 60 * 60 * 1000; // 12 hours
  private readonly STALE_WHILE_REVALIDATE = 24 * 60 * 60 * 1000; // 24 hours

  static getInstance(): PageSpeedCache {
    if (!PageSpeedCache.instance) {
      PageSpeedCache.instance = new PageSpeedCache();
    }
    return PageSpeedCache.instance;
  }

  getCacheKey(url: string, strategy: string): string {
    return `${url}_${strategy}`;
  }

  get(url: string, strategy: string): CacheEntry | null {
    const key = this.getCacheKey(url, strategy);
    const entry = this.cache.get(key);

    if (!entry) return null;

    const now = Date.now();
    const age = now - entry.timestamp;

    // If data is stale beyond revalidate time, remove it
    if (age > this.STALE_WHILE_REVALIDATE) {
      this.cache.delete(key);
      return null;
    }

    return entry;
  }

  set(url: string, strategy: string, data: PageSpeedResult): void {
    const key = this.getCacheKey(url, strategy);
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      isRefreshing: false,
    });
  }

  isStale(url: string, strategy: string): boolean {
    const entry = this.get(url, strategy);
    if (!entry) return true;

    const age = Date.now() - entry.timestamp;
    return age > this.CACHE_DURATION;
  }

  setRefreshing(url: string, strategy: string, refreshing: boolean): void {
    const key = this.getCacheKey(url, strategy);
    const entry = this.cache.get(key);
    if (entry) {
      entry.isRefreshing = refreshing;
    }
  }

  isRefreshing(url: string, strategy: string): boolean {
    const entry = this.get(url, strategy);
    return entry?.isRefreshing || false;
  }

  // Clean up old entries periodically
  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > this.STALE_WHILE_REVALIDATE) {
        this.cache.delete(key);
      }
    }
  }
}

const cache = PageSpeedCache.getInstance();

// Background refresh function
async function backgroundRefresh(
  url: string,
  strategy: "mobile" | "desktop"
): Promise<void> {
  if (cache.isRefreshing(url, strategy)) {
    return; // Already refreshing
  }

  cache.setRefreshing(url, strategy, true);

  try {
    const result = await fetchPageSpeedData(url, strategy);
    if (result) {
      cache.set(url, strategy, result);
      console.log("Background refresh completed for %s (%s)", url, strategy);
    }
  } catch (error) {
    console.error(
      "Background refresh failed for %s (%s):",
      url,
      strategy,
      error
    );
  } finally {
    cache.setRefreshing(url, strategy, false);
  }
}

// Extracted PageSpeed API fetch function
async function fetchPageSpeedData(
  url: string,
  strategy: "mobile" | "desktop"
): Promise<PageSpeedResult | null> {
  const apiKey = process.env.PAGESPEED_INSIGHTS_API_KEY;
  if (!apiKey) {
    throw new Error("PageSpeed Insights API key not configured");
  }

  const pageSpeedUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
    url
  )}&key=${apiKey}&strategy=${strategy}&category=performance&category=accessibility&category=best-practices&category=seo`;

  const response = await fetch(pageSpeedUrl, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "User-Agent": "Mozilla/5.0 (compatible; Portfolio/1.0)",
    },
    signal: AbortSignal.timeout(45000), // 45 seconds for production
  });

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error("Rate limit exceeded");
    }
    if (response.status >= 500) {
      throw new Error("PageSpeed service unavailable");
    }
    throw new Error(`PageSpeed API error: ${response.status}`);
  }

  const data = (await response.json()) as PageSpeedApiRawResponse;

  if (!data?.lighthouseResult?.categories) {
    throw new Error("Invalid response from PageSpeed API");
  }

  const categories = data.lighthouseResult.categories;
  const metrics: PageSpeedMetrics = {
    performance: Math.round((categories.performance?.score ?? 0) * 100),
    accessibility: Math.round((categories.accessibility?.score ?? 0) * 100),
    bestPractices: Math.round((categories["best-practices"]?.score ?? 0) * 100),
    seo: Math.round((categories.seo?.score ?? 0) * 100),
  };

  if (categories.pwa?.score !== undefined && categories.pwa?.score !== null) {
    metrics.pwa = Math.round(categories.pwa.score * 100);
  }

  return {
    url: data.id ?? url,
    strategy,
    metrics,
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get("url") || "https://www.coldbydefault.com";
    const strategy =
      (searchParams.get("strategy") as "mobile" | "desktop") || "mobile";
    const forceRefresh = searchParams.get("refresh") === "true";

    // Validate URL
    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "URL parameter is required" },
        { status: 400 }
      );
    }

    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: "Invalid URL format" },
        { status: 400 }
      );
    }

    // Check cache first
    const cachedEntry = cache.get(url, strategy);
    const isStale = cache.isStale(url, strategy);

    // If we have fresh data, return it immediately
    if (cachedEntry && !isStale && !forceRefresh) {
      return NextResponse.json(cachedEntry.data, {
        headers: {
          "Cache-Control": "public, max-age=43200", // 12 hours browser cache
          "X-Cache": "HIT",
        },
      });
    }

    // If we have stale data and not force refreshing, return stale data and trigger background refresh
    if (cachedEntry && !forceRefresh) {
      // Trigger background refresh (fire and forget)
      backgroundRefresh(url, strategy).catch(console.error);

      return NextResponse.json(cachedEntry.data, {
        headers: {
          "Cache-Control": "public, max-age=300", // 5 minutes browser cache for stale data
          "X-Cache": "STALE",
        },
      });
    }

    // If no cache or force refresh, fetch fresh data
    try {
      console.log("Fetching fresh PageSpeed data for %s (%s)", url, strategy);
      const result = await fetchPageSpeedData(url, strategy);

      if (result) {
        cache.set(url, strategy, result);

        return NextResponse.json(result, {
          headers: {
            "Cache-Control": "public, max-age=43200", // 12 hours
            "X-Cache": "MISS",
          },
        });
      }
    } catch (error) {
      console.error("Fresh fetch failed:", error);

      // If fresh fetch fails but we have stale data, return the stale data
      if (cachedEntry) {
        return NextResponse.json(cachedEntry.data, {
          headers: {
            "Cache-Control": "public, max-age=300",
            "X-Cache": "STALE-ERROR",
          },
        });
      }

      // No cache and fetch failed
      if (error instanceof Error) {
        if (error.name === "TimeoutError" || error.name === "AbortError") {
          return NextResponse.json(
            { error: "PageSpeed analysis timed out. Please try again later." },
            { status: 504 }
          );
        }

        if (error.message.includes("Rate limit")) {
          return NextResponse.json(
            { error: "Too many requests. Please wait before trying again." },
            { status: 429 }
          );
        }
      }

      return NextResponse.json(
        { error: "PageSpeed service is temporarily unavailable" },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: "Unable to analyze page speed" },
      { status: 500 }
    );
  } catch (error) {
    console.error("PageSpeed API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Cleanup old cache entries periodically
setInterval(() => {
  cache.cleanup();
}, 60 * 60 * 1000); // Every hour
