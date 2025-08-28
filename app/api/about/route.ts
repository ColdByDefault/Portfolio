/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import { NextResponse } from "next/server";
import { aboutData } from "@/data/aboutData";
import aboutProfile from "@/data/aboutProfile.json";

export function GET() {
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
      },
    });
  } catch (error) {
    console.error("Error fetching about data:", error);
    return NextResponse.json(
      { error: "Failed to fetch about data" },
      { status: 500 }
    );
  }
}
