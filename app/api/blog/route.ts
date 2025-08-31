/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getBlogs } from "@/lib/blogs";
import type { BlogListQuery } from "@/types/blogs";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const search = searchParams.get("search");
    const featuredParam = searchParams.get("featured");

    const query: BlogListQuery = {
      page,
      limit,
    };

    if (search) query.search = search;
    if (featuredParam === "true") query.featured = true;

    const result = await getBlogs(query);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
