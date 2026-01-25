/**
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
*/

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import type {
  PageSpeedMetrics,
  PageSpeedResult,
  PageSpeedApiRawResponse,
} from "@/types/configs/pagespeed";

// Zod schema for SSRF protection
const pageSpeedRequestSchema = z.object({
  url: z
    .string()
    .url("Invalid URL format")
    .refine((url) => {
      try {
        const parsed = new URL(url);

        // Only allow HTTP/HTTPS protocols
        if (!["http:", "https:"].includes(parsed.protocol)) {
          return false;
        }

        // Block localhost and private IP ranges to prevent SSRF
        const hostname = parsed.hostname.toLowerCase();

        // Block localhost variants
        if (["localhost", "127.0.0.1", "::1"].includes(hostname)) {
          return false;
        }

        // Block private IP ranges (simplified check)
        if (
          hostname.match(/^10\.|^172\.(1[6-9]|2[0-9]|3[0-1])\.|^192\.168\./)
        ) {
          return false;
        }

        // Block link-local addresses
        if (hostname.match(/^169\.254\.|^fe80:/)) {
          return false;
        }

        // Block internal domains
        if (hostname.includes(".local") || hostname.includes(".internal")) {
          return false;
        }

        return true;
      } catch {
        return false;
      }
    }, "URL not allowed for security reasons"),
  strategy: z.enum(["mobile", "desktop"]).default("mobile"),
  refresh: z.boolean().default(false),
});

// In-memory cache with automatic expiration
interface CacheEntry {
  data: PageSpeedResult;
  timestamp: number;
  isRefreshing?: boolean;
  timeoutCount?: number; // Track consecutive timeout failures
}

class PageSpeedCache {
  private static instance: PageSpeedCache;
  private cache = new Map<string, CacheEntry>();
  private readonly CACHE_DURATION = 12 * 60 * 60 * 1000; // 12 hours
  private readonly STALE_WHILE_REVALIDATE = 24 * 60 * 60 * 1000; // 24 hours
  private readonly MAX_TIMEOUT_COUNT = 3; // Max consecutive timeouts before circuit breaker

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
      timeoutCount: 0, // Reset timeout count on successful fetch
    });
  }

  incrementTimeoutCount(url: string, strategy: string): void {
    const key = this.getCacheKey(url, strategy);
    const entry = this.cache.get(key);
    if (entry) {
      entry.timeoutCount = (entry.timeoutCount || 0) + 1;
    }
  }

  shouldSkipFetch(url: string, strategy: string): boolean {
    const entry = this.get(url, strategy);
    return !!entry && (entry.timeoutCount || 0) >= this.MAX_TIMEOUT_COUNT;
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

  // Use conservative timeout to prevent Vercel function timeout
  // Desktop analysis typically takes longer than mobile
  const timeoutMs = process.env.NODE_ENV === "production" ? 40000 : 45000; // 40s for prod, 45s for dev

  const response = await fetch(pageSpeedUrl, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "User-Agent": "Mozilla/5.0 (compatible; Portfolio/1.0)",
    },
    signal: AbortSignal.timeout(timeoutMs),
  });

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error("Rate limit exceeded");
    }
    if (response.status === 403) {
      throw new Error(
        "PageSpeed API access denied - API key may be invalid, restricted, or the API not enabled in Google Cloud Console"
      );
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
    // Skip PageSpeed API calls in development
    if (process.env.NODE_ENV !== "production") {
      return NextResponse.json(
        {
          url: "https://www.coldbydefault.com",
          strategy: "mobile",
          metrics: {
            performance: 0,
            accessibility: 0,
            bestPractices: 0,
            seo: 0,
          },
          disabled: true,
          message: "PageSpeed API is disabled in development mode",
        },
        { status: 200 }
      );
    }

    const { searchParams } = new URL(request.url);

    // Parse and validate request parameters with Zod
    const parseResult = pageSpeedRequestSchema.safeParse({
      url: searchParams.get("url") || "https://www.coldbydefault.com",
      strategy: searchParams.get("strategy") || "mobile",
      refresh: searchParams.get("refresh") === "true",
    });

    if (!parseResult.success) {
      return NextResponse.json(
        {
          error: "Invalid request parameters",
          details: parseResult.error.issues.map((issue) => issue.message),
        },
        { status: 400 }
      );
    }

    const { url, strategy, refresh: forceRefresh } = parseResult.data;

    // Check cache first
    const cachedEntry = cache.get(url, strategy);
    const isStale = cache.isStale(url, strategy);

    const desktopStaleTolerance =
      strategy === "desktop" &&
      cachedEntry &&
      Date.now() - cachedEntry.timestamp < 24 * 60 * 60 * 1000; // 24 hours for desktop

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
    // For desktop, should act more aggressive about returning stale data
    if (cachedEntry && (!forceRefresh || desktopStaleTolerance)) {
      // Trigger background refresh (fire and forget) only if not too recent
      if (isStale) {
        backgroundRefresh(url, strategy).catch(console.error);
      }

      return NextResponse.json(cachedEntry.data, {
        headers: {
          "Cache-Control": "public, max-age=300", // 5 minutes browser cache for stale data
          "X-Cache": desktopStaleTolerance ? "STALE-DESKTOP" : "STALE",
        },
      });
    }

    // Check if we should skip fetching due to circuit breaker
    if (cache.shouldSkipFetch(url, strategy) && cachedEntry) {
      return NextResponse.json(cachedEntry.data, {
        headers: {
          "Cache-Control": "public, max-age=1800", // 30 minutes for circuit breaker
          "X-Cache": "CIRCUIT-BREAKER",
        },
      });
    }

    // If no cache or force refresh, fetch fresh data
    try {
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

      // Track timeout for circuit breaker
      if (error instanceof Error) {
        const isTimeout =
          error.name === "TimeoutError" ||
          error.name === "AbortError" ||
          error.message.includes("timeout") ||
          error.message.includes("timed out");

        if (isTimeout) {
          cache.incrementTimeoutCount(url, strategy);
        }
      }

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
        const isTimeout =
          error.name === "TimeoutError" ||
          error.name === "AbortError" ||
          error.message.includes("timeout") ||
          error.message.includes("timed out");

        if (isTimeout) {
          // Start background refresh for next time
          backgroundRefresh(url, strategy).catch(console.error);

          return NextResponse.json(
            {
              error:
                "PageSpeed analysis timed out. The website may be slow to load. Try refreshing in a few minutes.",
              retryAfter: 300,
            },
            {
              status: 504,
              headers: {
                "Retry-After": "300",
              },
            }
          );
        }

        if (error.message.includes("Rate limit")) {
          return NextResponse.json(
            {
              error: "Too many requests. Please wait before trying again.",
              retryAfter: 60,
            },
            {
              status: 429,
              headers: {
                "Retry-After": "60",
              },
            }
          );
        }

        if (error.message.includes("not configured")) {
          return NextResponse.json(
            { error: "PageSpeed API key is not configured" },
            { status: 500 }
          );
        }

        if (error.message.includes("service unavailable")) {
          return NextResponse.json(
            { error: "Google PageSpeed service is temporarily unavailable" },
            { status: 503 }
          );
        }
      }

      return NextResponse.json(
        {
          error: "PageSpeed service is temporarily unavailable",
          details:
            error instanceof Error ? error.message : "Unknown error occurred",
        },
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
