/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getBlogBySlug } from "@/lib/hubs/blogs";
import { RateLimiter } from "@/lib/security";
import { generateBlogSEO } from "@/lib/configs/seo";

// Rate limiter for blog slug endpoint
const rateLimiter = new RateLimiter(60000, 30); // 30 requests per minute

// Zod schema for blog slug validation
const blogSlugSchema = z.object({
  slug: z
    .string()
    .min(1, "Slug cannot be empty")
    .max(200, "Slug too long")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format")
    .transform((slug) => slug.toLowerCase()),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    // Rate limiting check
    const clientIP =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";
    if (!rateLimiter.isAllowed(clientIP)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: {
            "Retry-After": "60",
            "X-Content-Type-Options": "nosniff",
          },
        },
      );
    }

    // Await params and validate slug parameter
    const { slug: rawSlug } = await params;
    const parseResult = blogSlugSchema.safeParse({ slug: rawSlug });

    if (!parseResult.success) {
      return NextResponse.json(
        {
          error: "Invalid blog slug",
          details: parseResult.error.issues.map((issue) => issue.message),
        },
        {
          status: 400,
          headers: {
            "X-Content-Type-Options": "nosniff",
          },
        },
      );
    }

    const { slug } = parseResult.data;
    const blog = await getBlogBySlug(slug);

    if (!blog) {
      return NextResponse.json(
        { error: "Blog not found" },
        {
          status: 404,
          headers: {
            "X-Content-Type-Options": "nosniff",
          },
        },
      );
    }

    // Generate SEO metadata for the blog
    const locale = request.headers.get("accept-language")?.includes("de")
      ? "de"
      : "en";

    let seoData;
    try {
      seoData = generateBlogSEO(blog, locale);
    } catch (seoError) {
      console.error("Error generating SEO data:", seoError);
      seoData = null;
    }

    return NextResponse.json(
      {
        blog,
        ...(seoData && { seo: seoData }),
      },
      {
        headers: {
          "Cache-Control": "public, max-age=600, stale-while-revalidate=1200", // 10 min cache, 20 min stale
          "X-Content-Type-Options": "nosniff",
        },
      },
    );
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog" },
      {
        status: 500,
        headers: {
          "X-Content-Type-Options": "nosniff",
        },
      },
    );
  }
}
