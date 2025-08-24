/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { sanitizeErrorMessage, RateLimiter } from "@/lib/security";

// Rate limiter instance
const rateLimiter = new RateLimiter(60000, 5); // 5 requests per minute for PageSpeed

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
  originLoadingExperience?: {
    metrics: {
      FIRST_CONTENTFUL_PAINT_MS?: { percentile: number };
      FIRST_INPUT_DELAY_MS?: { percentile: number };
      LARGEST_CONTENTFUL_PAINT_MS?: { percentile: number };
      CUMULATIVE_LAYOUT_SHIFT_SCORE?: { percentile: number };
    };
  };
}

export async function GET(request: NextRequest) {
  try {
    const clientId = request.headers.get("X-Client-ID");
    if (!clientId || !rateLimiter.isAllowed(clientId)) {
      return NextResponse.json(
        { error: "Rate limit exceeded" },
        { status: 429 }
      );
    }

    const { searchParams } = new URL(request.url);
    const url =
      searchParams.get("url") ||
      process.env.SITE_URL ||
      "https://www.coldbydefault.com";
    const strategy =
      (searchParams.get("strategy") as "mobile" | "desktop") || "mobile";
    const category =
      searchParams.get("category") ||
      "performance,accessibility,best-practices,seo";

    if (!url || typeof url !== "string" || !url.startsWith("http")) {
      return NextResponse.json(
        { error: "Invalid URL provided" },
        { status: 400 }
      );
    }

    const apiKey = process.env.PAGESPEED_INSIGHTS_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "PageSpeed Insights API key not configured" },
        { status: 500 }
      );
    }

    const pageSpeedUrl = new URL(
      "https://www.googleapis.com/pagespeedonline/v5/runPagespeed"
    );
    pageSpeedUrl.searchParams.set("url", url);
    pageSpeedUrl.searchParams.set("key", apiKey);
    pageSpeedUrl.searchParams.set("strategy", strategy);

    // Add each category as separate parameter
    const categoryList = category.split(",");
    categoryList.forEach((cat) => {
      pageSpeedUrl.searchParams.append("category", cat.trim());
    });

    const response = await fetch(pageSpeedUrl.toString(), {
      headers: {
        Accept: "application/json",
        Referer: "https://www.coldbydefault.com",
        "User-Agent": "Mozilla/5.0 (compatible; Portfolio-PageSpeed/1.0)",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("PageSpeed API error:", errorText);
      return NextResponse.json(
        {
          error: sanitizeErrorMessage(
            `PageSpeed API error: ${response.status}`
          ),
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Extract the scores from the PageSpeed response
    const lighthouseResult = data.lighthouseResult;
    const categories = lighthouseResult?.categories || {};

    const metrics: PageSpeedMetrics = {
      performance: Math.round((categories.performance?.score || 0) * 100),
      accessibility: Math.round((categories.accessibility?.score || 0) * 100),
      bestPractices: Math.round(
        (categories["best-practices"]?.score || 0) * 100
      ),
      seo: Math.round((categories.seo?.score || 0) * 100),
    };

    if (categories.pwa) {
      metrics.pwa = Math.round((categories.pwa.score || 0) * 100);
    }

    const result: PageSpeedResult = {
      url: data.id,
      strategy,
      metrics,
    };

    // Add loading experience data if available
    if (data.loadingExperience) {
      result.loadingExperience = data.loadingExperience;
    }

    if (data.originLoadingExperience) {
      result.originLoadingExperience = data.originLoadingExperience;
    }

    return NextResponse.json(result, {
      headers: {
        "Cache-Control": "public, max-age=3600", // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error("PageSpeed Insights API error:", error);
    return NextResponse.json(
      { error: sanitizeErrorMessage("Failed to fetch PageSpeed data") },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const clientId = request.headers.get("X-Client-ID");
    if (!clientId || !rateLimiter.isAllowed(clientId)) {
      return NextResponse.json(
        { error: "Rate limit exceeded" },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { urls, strategy = "mobile" } = body;

    if (!urls || typeof urls !== "object" || !Array.isArray(urls)) {
      return NextResponse.json(
        { error: "Invalid URLs array provided" },
        { status: 400 }
      );
    }

    if (urls.length > 5) {
      return NextResponse.json(
        { error: "Maximum 5 URLs allowed per request" },
        { status: 400 }
      );
    }

    const apiKey = process.env.PAGESPEED_INSIGHTS_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "PageSpeed Insights API key not configured" },
        { status: 500 }
      );
    }

    const results: PageSpeedResult[] = [];

    for (const url of urls) {
      if (!url || typeof url !== "string" || !url.startsWith("http")) {
        continue;
      }

      try {
        const pageSpeedUrl = new URL(
          "https://www.googleapis.com/pagespeedonline/v5/runPagespeed"
        );
        pageSpeedUrl.searchParams.set("url", url);
        pageSpeedUrl.searchParams.set("key", apiKey);
        pageSpeedUrl.searchParams.set("strategy", strategy);

        // Add each category as separate parameter
        const categoryList =
          "performance,accessibility,best-practices,seo".split(",");
        categoryList.forEach((cat) => {
          pageSpeedUrl.searchParams.append("category", cat.trim());
        });

        const response = await fetch(pageSpeedUrl.toString(), {
          headers: {
            Accept: "application/json",
            Referer: "https://www.coldbydefault.com",
            "User-Agent": "Mozilla/5.0 (compatible; Portfolio-PageSpeed/1.0)",
          },
        });

        if (response.ok) {
          const data = await response.json();
          const lighthouseResult = data.lighthouseResult;
          const categories = lighthouseResult?.categories || {};

          const metrics: PageSpeedMetrics = {
            performance: Math.round((categories.performance?.score || 0) * 100),
            accessibility: Math.round(
              (categories.accessibility?.score || 0) * 100
            ),
            bestPractices: Math.round(
              (categories["best-practices"]?.score || 0) * 100
            ),
            seo: Math.round((categories.seo?.score || 0) * 100),
          };

          results.push({
            url: data.id,
            strategy: strategy as "mobile" | "desktop",
            metrics,
          });
        }
      } catch (error) {
        console.error("Error fetching PageSpeed for %s:", url, error);
      }

      // Add delay between requests to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    return NextResponse.json(
      { results },
      {
        headers: {
          "Cache-Control": "public, max-age=3600",
        },
      }
    );
  } catch (error) {
    console.error("PageSpeed Insights bulk API error:", error);
    return NextResponse.json(
      { error: sanitizeErrorMessage("Failed to fetch bulk PageSpeed data") },
      { status: 500 }
    );
  }
}
