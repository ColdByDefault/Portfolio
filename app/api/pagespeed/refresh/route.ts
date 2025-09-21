/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */
import { NextRequest, NextResponse } from "next/server";
import type { PageSpeedResult, PageSpeedMetrics } from "@/types/pagespeed";

interface RefreshResult {
  strategy: "mobile" | "desktop";
  success: boolean;
  data?: PageSpeedResult;
  error?: string;
}

interface RefreshErrorResult {
  error: string;
  success: false;
}

const CRON_SECRET = process.env.CRON_SECRET;
const MAIN_URL = process.env.PORTFOLIO_URL || "https://www.coldbydefault.com";

export async function POST(request: NextRequest) {
  try {
    // Verify cron secret
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("Starting automated PageSpeed refresh...");

    // Use hardcoded base URL to prevent SSRF
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://www.coldbydefault.com";
    const strategies: ("mobile" | "desktop")[] = ["mobile", "desktop"];

    const refreshPromises: Promise<RefreshResult>[] = strategies.map(
      async (strategy) => {
        try {
          const response = await fetch(
            `${baseUrl}/api/pagespeed?url=${encodeURIComponent(
              MAIN_URL
            )}&strategy=${strategy}&refresh=true`,
            {
              method: "GET",
              headers: {
                "User-Agent": "Vercel-Cron/1.0",
              },
              signal: AbortSignal.timeout(60000), // 60 seconds timeout
            }
          );

          if (response.ok) {
            const data = (await response.json()) as PageSpeedResult;

            // Validate that we received the expected structure
            if (!data?.metrics || typeof data.metrics !== "object") {
              throw new Error("Invalid response structure from PageSpeed API");
            }

            const metrics: PageSpeedMetrics = data.metrics;
            console.log("✅ Refreshed %s data for %s:", strategy, MAIN_URL, {
              performance: metrics.performance,
              accessibility: metrics.accessibility,
              bestPractices: metrics.bestPractices,
              seo: metrics.seo,
            });
            return { strategy, success: true, data } satisfies RefreshResult;
          } else {
            console.error(
              "❌ Failed to refresh %s data:",
              strategy,
              response.status,
              response.statusText
            );
            return {
              strategy,
              success: false,
              error: `HTTP ${response.status}`,
            } satisfies RefreshResult;
          }
        } catch (error) {
          console.error("❌ Error refreshing %s data:", strategy, error);
          return {
            strategy,
            success: false,
            error: error instanceof Error ? error.message : "Unknown error",
          } satisfies RefreshResult;
        }
      }
    );

    const results = await Promise.allSettled(refreshPromises);

    const successCount = results.filter(
      (result) => result.status === "fulfilled" && result.value.success
    ).length;

    console.log(
      `Automated refresh completed: ${successCount}/${strategies.length} successful`
    );

    return NextResponse.json({
      success: true,
      message: `Refreshed ${successCount}/${strategies.length} PageSpeed datasets`,
      timestamp: new Date().toISOString(),
      results: results.map((result): RefreshResult | RefreshErrorResult =>
        result.status === "fulfilled"
          ? result.value
          : { error: "Promise rejected", success: false }
      ),
    });
  } catch (error) {
    console.error("Cron job error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Cron job failed",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

// GET method for manual testing
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  if (secret !== CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Create a new request with authorization header for POST method
  const newRequest = new NextRequest(request.url, {
    method: "POST",
    headers: {
      ...request.headers,
      authorization: `Bearer ${CRON_SECRET}`,
    },
  });

  return POST(newRequest);
}