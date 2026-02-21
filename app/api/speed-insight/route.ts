/**
 * @author ColdByDefault
 * @copyright 2026 ColdByDefault. All Rights Reserved.
 */

import { NextResponse } from "next/server";
import { sanitizeErrorMessage } from "@/lib/security";
import type {
  RawPageSpeedResponse,
  SpeedInsightResult,
  SpeedInsightScore,
  SpeedInsightApiResponse,
} from "@/types/configs/speed-insight";

const PAGESPEED_API_URL =
  "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";
const TARGET_URL =
  process.env.PAGESPEED_TARGET_URL || "https://coldbydefault.com";
const API_KEY = process.env.GOOGLE_PAGESPEED_API_KEY;

/** Map a 0–1 score to a Tailwind color class */
function getScoreColor(score: number): string {
  if (score >= 90) return "text-green-500";
  if (score >= 50) return "text-yellow-500";
  return "text-red-500";
}

/** Parse the raw Google API response into our clean type */
function parseResult(
  raw: RawPageSpeedResponse,
  strategy: "mobile" | "desktop",
): SpeedInsightResult {
  const cats = raw.lighthouseResult.categories;

  const categories: SpeedInsightScore[] = Object.values(cats).map((cat) => {
    const pct = Math.round((cat.score ?? 0) * 100);
    return {
      label: cat.title,
      score: pct,
      color: getScoreColor(pct),
    };
  });

  return {
    url: raw.id,
    strategy,
    categories,
    fetchedAt: raw.lighthouseResult.fetchTime,
  };
}

/** Fetch PageSpeed data for a given strategy */
async function fetchPageSpeed(
  strategy: "mobile" | "desktop",
  forceRefresh = false,
): Promise<SpeedInsightResult> {
  const params = new URLSearchParams({
    url: TARGET_URL,
    strategy,
    category: "performance",
  });

  // Add all categories
  ["accessibility", "best-practices", "seo"].forEach((cat) =>
    params.append("category", cat),
  );

  if (API_KEY) {
    params.set("key", API_KEY);
  }

  const response = await fetch(`${PAGESPEED_API_URL}?${params.toString()}`, {
    headers: {
      Referer: TARGET_URL,
    },
    ...(forceRefresh
      ? { cache: "no-store" as const }
      : { next: { revalidate: 3600 } }), // Cache for 1 hour unless force refresh
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `PageSpeed API error (${strategy}): ${response.status} – ${errorText}`,
    );
  }

  const data = (await response.json()) as RawPageSpeedResponse;
  return parseResult(data, strategy);
}

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const forceRefresh = searchParams.has("refresh");

  try {
    const [desktop, mobile] = await Promise.all([
      fetchPageSpeed("desktop", forceRefresh),
      fetchPageSpeed("mobile", forceRefresh),
    ]);

    const body: SpeedInsightApiResponse = { desktop, mobile };

    return NextResponse.json(body, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "DENY",
        "X-XSS-Protection": "1; mode=block",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
    });
  } catch (error) {
    console.error("PageSpeed API Error:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch PageSpeed data",
        message: sanitizeErrorMessage(error),
        desktop: null,
        mobile: null,
      } satisfies SpeedInsightApiResponse & { message: string },
      {
        status: 500,
        headers: {
          "X-Content-Type-Options": "nosniff",
          "X-Frame-Options": "DENY",
        },
      },
    );
  }
}
