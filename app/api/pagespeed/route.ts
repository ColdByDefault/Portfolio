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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get("url") || "https://www.coldbydefault.com";
    const strategy =
      (searchParams.get("strategy") as "mobile" | "desktop") || "mobile";

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

    const apiKey = process.env.PAGESPEED_INSIGHTS_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "PageSpeed Insights API key not configured" },
        { status: 500 }
      );
    }

    // Build PageSpeed API URL - simplified approach
    const pageSpeedUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
      url
    )}&key=${apiKey}&strategy=${strategy}&category=performance&category=accessibility&category=best-practices&category=seo`;

    console.log(`Fetching PageSpeed data for ${url} (${strategy})`);

    // Simple fetch with timeout
    const response = await fetch(pageSpeedUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0 (compatible; Portfolio/1.0)",
      },
      // Use AbortSignal.timeout for simplicity
      signal: AbortSignal.timeout(60000), // 60 seconds
    });

    if (!response.ok) {
      console.error(
        `PageSpeed API error: ${response.status} ${response.statusText}`
      );

      if (response.status === 429) {
        return NextResponse.json(
          { error: "Too many requests. Please wait a moment and try again." },
          { status: 429 }
        );
      }

      if (response.status === 400) {
        return NextResponse.json(
          { error: "Invalid request to PageSpeed API" },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { error: "PageSpeed API is currently unavailable" },
        { status: 503 }
      );
    }

    const data: PageSpeedApiRawResponse =
      (await response.json()) as PageSpeedApiRawResponse;

    // Check if we have valid data
    if (!data?.lighthouseResult?.categories) {
      return NextResponse.json(
        { error: "Invalid response from PageSpeed API" },
        { status: 500 }
      );
    }

    const categories = data.lighthouseResult.categories;

    // Extract scores
    const metrics: PageSpeedMetrics = {
      performance: Math.round((categories.performance?.score ?? 0) * 100),
      accessibility: Math.round((categories.accessibility?.score ?? 0) * 100),
      bestPractices: Math.round(
        (categories["best-practices"]?.score ?? 0) * 100
      ),
      seo: Math.round((categories.seo?.score ?? 0) * 100),
    };

    // Add PWA score if available
    if (categories.pwa?.score !== undefined && categories.pwa?.score !== null) {
      metrics.pwa = Math.round(categories.pwa.score * 100);
    }

    const result: PageSpeedResult = {
      url: data.id ?? url,
      strategy,
      metrics,
    };

    return NextResponse.json(result, {
      headers: {
        "Cache-Control": "public, max-age=3600", // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error("PageSpeed API error:", error);

    // Handle specific error types
    if (error instanceof Error) {
      if (error.name === "TimeoutError" || error.name === "AbortError") {
        return NextResponse.json(
          {
            error: "Request timed out. PageSpeed analysis is taking too long.",
          },
          { status: 504 }
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to analyze page speed" },
      { status: 500 }
    );
  }
}
