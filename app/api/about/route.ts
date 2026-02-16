/**
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
 */

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { aboutData } from "@/data/main/aboutData";
import aboutProfile from "@/data/main/aboutProfile.json";
import { RateLimiter } from "@/lib/security";

// Rate limiter instance: 30 requests per minute
const rateLimiter = new RateLimiter(60000, 30);

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const cfConnectingIp = request.headers.get("cf-connecting-ip");
  return cfConnectingIp || realIp || forwarded?.split(",")[0] || "127.0.0.1";
}

export function GET(request: NextRequest) {
  // Rate limiting check
  const clientIP = getClientIP(request);
  if (!rateLimiter.isAllowed(clientIP)) {
    return NextResponse.json(
      { error: "Too many requests" },
      {
        status: 429,
        headers: {
          "Retry-After": "60",
          "X-RateLimit-Limit": "30",
          "X-RateLimit-Remaining": "0",
        },
      },
    );
  }

  try {
    const combinedData = {
      ...aboutData,
      profile: aboutProfile.profile,
      skills: aboutProfile.skills,
      philosophy: aboutProfile.philosophy,
      interests: aboutProfile.interests,
      socialLinks: aboutProfile.socialLinks,
      meta: {
        ...aboutProfile.meta,
        endpoint: "/api/about",
        timestamp: new Date().toISOString(),
      },
    };

    return NextResponse.json(combinedData, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Error fetching about data:", error);
    return NextResponse.json(
      { error: "Failed to fetch about data" },
      {
        status: 500,
        headers: {
          "X-Content-Type-Options": "nosniff",
        },
      },
    );
  }
}
