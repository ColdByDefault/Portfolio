/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getBlogs } from "@/lib/blogs";
import type { BlogListQuery, BlogLanguage } from "@/types/blogs";
import { SUPPORTED_BLOG_LANGUAGES } from "@/types/blogs";
import { RateLimiter, sanitizeInput } from "@/lib/security";
import { generateBlogListSEO } from "@/lib/seo";

// Rate limiter for blog endpoints
const rateLimiter = new RateLimiter(60000, 20); // 20 requests per minute

// Zod schema for blog list query validation
const blogListQuerySchema = z.object({
  page: z
    .string()
    .nullable()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 1))
    .refine((val) => !isNaN(val) && val >= 1 && val <= 1000, {
      message: "Page must be between 1 and 1000",
    }),
  limit: z
    .string()
    .nullable()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 12))
    .refine((val) => !isNaN(val) && val >= 1 && val <= 50, {
      message: "Limit must be between 1 and 50",
    }),
  search: z
    .string()
    .nullable()
    .optional()
    .transform((val) => (val ? sanitizeInput(val).slice(0, 100) : undefined)),
  featured: z
    .string()
    .nullable()
    .optional()
    .transform((val) => val === "true"),
  language: z
    .string()
    .nullable()
    .optional()
    .refine(
      (val) => !val || SUPPORTED_BLOG_LANGUAGES.includes(val as BlogLanguage),
      {
        message: `Language must be one of: ${SUPPORTED_BLOG_LANGUAGES.join(
          ", "
        )}`,
      }
    ),
});

export async function GET(request: NextRequest) {
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
          },
        }
      );
    }

    const { searchParams } = new URL(request.url);

    // Parse and validate query parameters with Zod
    const parseResult = blogListQuerySchema.safeParse({
      page: searchParams.get("page"),
      limit: searchParams.get("limit"),
      search: searchParams.get("search"),
      featured: searchParams.get("featured"),
      language: searchParams.get("language"),
    });

    if (!parseResult.success) {
      console.log("Validation error:", parseResult.error.issues);
      return NextResponse.json(
        {
          error: "Invalid query parameters",
          details: parseResult.error.issues.map((issue) => issue.message),
        },
        { status: 400 }
      );
    }

    const { page, limit, search, featured, language } = parseResult.data;

    const query: BlogListQuery = {
      page,
      limit,
    };

    if (search) query.search = search;
    if (featured) query.featured = featured;
    if (language) query.language = language as BlogLanguage;

    const result = await getBlogs(query);

    // Add SEO metadata to the response
    const locale = request.headers.get("accept-language")?.includes("de")
      ? "de"
      : "en";

    let seoData;
    try {
      seoData = generateBlogListSEO(page, undefined, undefined, search, locale);
    } catch (seoError) {
      console.error("Error generating SEO data:", seoError);
      seoData = null;
    }

    return NextResponse.json(
      {
        ...result,
        ...(seoData && { seo: seoData }),
      },
      {
        headers: {
          "Cache-Control": "public, max-age=300, stale-while-revalidate=600", // 5 min cache, 10 min stale
        },
      }
    );
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
