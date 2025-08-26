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

    // Validate URL more thoroughly
    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "URL parameter is required" },
        { status: 400 }
      );
    }

    let validatedUrl: URL;
    try {
      validatedUrl = new URL(url);
      if (!["http:", "https:"].includes(validatedUrl.protocol)) {
        throw new Error("URL must use HTTP or HTTPS protocol");
      }
    } catch (urlError) {
      console.error("Invalid URL provided:", urlError);
      return NextResponse.json(
        { error: "Invalid URL format provided" },
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
      // Add timeout
      signal: AbortSignal.timeout(25000), // 25 second timeout
    });

    if (!response.ok) {
      let errorMessage = `PageSpeed API error: ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage =
          errorData.error?.message || errorData.message || errorMessage;
      } catch (parseError) {
        console.error("Error parsing PageSpeed API response:", parseError);
        try {
          const errorText = await response.text();
          if (errorText && errorText.trim()) {
            errorMessage = `PageSpeed API error: ${errorText.substring(
              0,
              200
            )}`;
          }
        } catch (textError) {
          console.log(textError);
        }
      }

      console.error("PageSpeed API error:", errorMessage);
      return NextResponse.json(
        {
          error: sanitizeErrorMessage(errorMessage),
        },
        { status: response.status >= 500 ? 500 : 400 }
      );
    }

    let data;
    try {
      data = await response.json();
    } catch (parseError) {
      console.error(
        "Failed to parse PageSpeed API response as JSON:",
        parseError
      );
      return NextResponse.json(
        { error: "Invalid JSON response from PageSpeed API" },
        { status: 500 }
      );
    }

    // Validate the response structure
    if (!data || typeof data !== "object") {
      return NextResponse.json(
        { error: "Invalid response format from PageSpeed API" },
        { status: 500 }
      );
    }

    // Check for API-level errors
    if (data.error) {
      const errorMessage =
        data.error.message || "PageSpeed API returned an error";
      console.error("PageSpeed API error:", data.error);
      return NextResponse.json(
        { error: sanitizeErrorMessage(errorMessage) },
        { status: 400 }
      );
    }

    // Extract the scores from the PageSpeed response
    const lighthouseResult = data.lighthouseResult;
    if (!lighthouseResult || !lighthouseResult.categories) {
      return NextResponse.json(
        { error: "Missing lighthouse results in PageSpeed response" },
        { status: 500 }
      );
    }

    const categories = lighthouseResult.categories;

    const metrics: PageSpeedMetrics = {
      performance: Math.round(
        Math.max(0, Math.min(100, (categories.performance?.score || 0) * 100))
      ),
      accessibility: Math.round(
        Math.max(0, Math.min(100, (categories.accessibility?.score || 0) * 100))
      ),
      bestPractices: Math.round(
        Math.max(
          0,
          Math.min(100, (categories["best-practices"]?.score || 0) * 100)
        )
      ),
      seo: Math.round(
        Math.max(0, Math.min(100, (categories.seo?.score || 0) * 100))
      ),
    };

    if (categories.pwa && typeof categories.pwa.score === "number") {
      metrics.pwa = Math.round(
        Math.max(0, Math.min(100, categories.pwa.score * 100))
      );
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
