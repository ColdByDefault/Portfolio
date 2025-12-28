/**
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
 */

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getBlogs } from "@/lib/blogs";
import type { BlogListQuery, BlogLanguage } from "@/types/blogs";


export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Very simple parameter parsing
    const page = parseInt(searchParams.get("page") || "1", 10) || 1;
    const limit = parseInt(searchParams.get("limit") || "12", 10) || 12;
    const search = searchParams.get("search") || undefined;
    const featured = searchParams.get("featured") === "true" || undefined;
    const language = searchParams.get("language") || undefined;

    const query: BlogListQuery = {
      page,
      limit,
    };

    if (search) query.search = search;
    if (featured) query.featured = featured;
    if (language) query.language = language as BlogLanguage;

    const result = await getBlogs(query);

    return NextResponse.json(result, {
      headers: {
        "Cache-Control": "no-cache",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
        stack:
          process.env.NODE_ENV === "development"
            ? error instanceof Error
              ? error.stack
              : undefined
            : undefined,
      },
      { status: 500 }
    );
  }
}
