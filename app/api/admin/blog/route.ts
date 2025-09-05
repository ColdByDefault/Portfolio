/**
 * Blog Admin API Route
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z, type ZodIssue } from "zod";
import type {
  BlogAdminResponse,
  BlogAdminAction,
  ApiErrorResponse,
} from "@/types/admin";
import type {
  CreateBlogRequest,
  UpdateBlogRequest,
  BlogListQuery,
} from "@/types/blogs";
import {
  getBlogAdminStats,
  getAdminBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  getAdminBlogById,
  checkAdminRateLimit,
  getAdminCategories,
  getAdminTags,
} from "@/lib/blog-admin";

// Enhanced authentication - same as contact admin
const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

function getClientIP(request: NextRequest): string {
  const headers = [
    "x-forwarded-for",
    "x-real-ip",
    "x-client-ip",
    "x-forwarded",
    "x-cluster-client-ip",
    "forwarded-for",
    "forwarded",
  ];

  for (const header of headers) {
    const value = request.headers.get(header);
    if (value) {
      const ip = value.split(",")[0]?.trim();
      if (ip && ip !== "unknown") {
        return ip;
      }
    }
  }

  return "unknown";
}

function isAuthorized(request: NextRequest): boolean {
  if (!ADMIN_TOKEN) {
    console.error("ADMIN_TOKEN environment variable not set");
    return false;
  }

  const authHeader = request.headers.get("authorization");
  if (!authHeader) {
    return false;
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.substring(7)
    : authHeader;

  // Use constant-time comparison to prevent timing attacks
  if (token.length !== ADMIN_TOKEN.length) {
    return false;
  }

  let isEqual = true;
  for (let i = 0; i < token.length; i++) {
    if (token[i] !== ADMIN_TOKEN[i]) {
      isEqual = false;
    }
  }

  return isEqual;
}

// Validation schemas
const createBlogSchema = z.object({
  title: z.string().min(3).max(200),
  slug: z.string().optional(),
  excerpt: z
    .string()
    .max(500)
    .optional()
    .or(z.literal(""))
    .transform((val) => (val === "" ? undefined : val)),
  content: z.string().min(10).max(50000),
  featuredImage: z
    .string()
    .optional()
    .or(z.literal(""))
    .transform((val) => (val === "" ? undefined : val)),
  language: z.enum(["en", "de", "es", "fr", "sv"]).optional(),
  categoryId: z.string().optional(),
  metaTitle: z
    .string()
    .max(60)
    .optional()
    .or(z.literal(""))
    .transform((val) => (val === "" ? undefined : val)),
  metaDescription: z
    .string()
    .max(160)
    .optional()
    .or(z.literal(""))
    .transform((val) => (val === "" ? undefined : val)),
  isPublished: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  credits: z
    .object({
      originalAuthor: z.string().optional(),
      originalSource: z.string().optional(),
      sourceUrl: z.string().url().optional().or(z.literal("")),
      licenseType: z.string().optional(),
      creditText: z.string().optional(),
      translatedFrom: z.string().optional(),
      adaptedFrom: z.string().optional(),
    })
    .optional(),
});

const updateBlogSchema = z.object({
  title: z.string().min(3).max(200).optional(),
  slug: z.string().optional(),
  excerpt: z
    .string()
    .max(500)
    .optional()
    .or(z.literal(""))
    .transform((val) => (val === "" ? undefined : val)),
  content: z.string().min(10).max(50000).optional(),
  featuredImage: z
    .string()
    .optional()
    .or(z.literal(""))
    .transform((val) => (val === "" ? undefined : val)),
  language: z.enum(["en", "de", "es", "fr", "sv"]).optional(),
  categoryId: z.string().optional(),
  metaTitle: z
    .string()
    .max(60)
    .optional()
    .or(z.literal(""))
    .transform((val) => (val === "" ? undefined : val)),
  metaDescription: z
    .string()
    .max(160)
    .optional()
    .or(z.literal(""))
    .transform((val) => (val === "" ? undefined : val)),
  isPublished: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  credits: z
    .object({
      originalAuthor: z.string().optional(),
      originalSource: z.string().optional(),
      sourceUrl: z.string().url().optional().or(z.literal("")),
      licenseType: z.string().optional(),
      creditText: z.string().optional(),
      translatedFrom: z.string().optional(),
      adaptedFrom: z.string().optional(),
    })
    .optional(),
});

export async function GET(
  request: NextRequest
): Promise<NextResponse<BlogAdminResponse | ApiErrorResponse>> {
  if (!isAuthorized(request)) {
    const clientIP = getClientIP(request);
    console.warn("Unauthorized blog admin access attempt", {
      ip: clientIP,
      userAgent: request.headers.get("user-agent"),
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Rate limiting
  const clientIP = getClientIP(request);
  if (!checkAdminRateLimit(clientIP)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");
  const blogId = searchParams.get("id");

  try {
    switch (action) {
      case "stats": {
        const stats = await getBlogAdminStats();
        return NextResponse.json({ success: true, data: stats });
      }

      case "list": {
        const page = parseInt(searchParams.get("page") || "1", 10);
        const limit = Math.min(
          parseInt(searchParams.get("limit") || "20", 10),
          50
        );
        const search = searchParams.get("search") || undefined;
        const language = searchParams.get("language") || undefined;
        const published =
          searchParams.get("published") === "true"
            ? true
            : searchParams.get("published") === "false"
            ? false
            : undefined;
        const featured =
          searchParams.get("featured") === "true"
            ? true
            : searchParams.get("featured") === "false"
            ? false
            : undefined;

        const queryParams: Partial<BlogListQuery> = {
          page,
          limit,
        };

        if (published !== undefined) queryParams.published = published;
        if (featured !== undefined) queryParams.featured = featured;
        if (search) queryParams.search = search;
        if (language)
          queryParams.language = language as "en" | "de" | "es" | "fr" | "sv";

        const result = await getAdminBlogs(queryParams as BlogListQuery);

        return NextResponse.json({ success: true, data: result });
      }

      case "get": {
        if (!blogId) {
          return NextResponse.json(
            { error: "Blog ID is required" },
            { status: 400 }
          );
        }

        const blog = await getAdminBlogById(blogId);
        if (!blog) {
          return NextResponse.json(
            { error: "Blog not found" },
            { status: 404 }
          );
        }

        return NextResponse.json({ success: true, data: blog });
      }

      case "categories": {
        const categories = await getAdminCategories();
        return NextResponse.json({ success: true, data: categories });
      }

      case "tags": {
        const tags = await getAdminTags();
        return NextResponse.json({ success: true, data: tags });
      }

      default:
        return NextResponse.json({
          message: "Blog Admin API",
          endpoints: {
            stats: "/api/admin/blog?action=stats",
            list: "/api/admin/blog?action=list&page=1&limit=20",
            get: "/api/admin/blog?action=get&id={blogId}",
            categories: "/api/admin/blog?action=categories",
            tags: "/api/admin/blog?action=tags",
          },
        });
    }
  } catch (error) {
    console.error("Blog Admin API error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<BlogAdminResponse | ApiErrorResponse>> {
  if (!isAuthorized(request)) {
    const clientIP = getClientIP(request);
    console.warn("Unauthorized blog admin POST attempt", {
      ip: clientIP,
      userAgent: request.headers.get("user-agent"),
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Rate limiting
  const clientIP = getClientIP(request);
  if (!checkAdminRateLimit(clientIP)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const contentType = request.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      return NextResponse.json(
        { error: "Content-Type must be application/json" },
        { status: 400 }
      );
    }

    let requestBody: BlogAdminAction;
    try {
      requestBody = (await request.json()) as BlogAdminAction;
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    const { action, blogId, data } = requestBody;

    switch (action) {
      case "create": {
        const parseResult = createBlogSchema.safeParse(data);
        if (!parseResult.success) {
          return NextResponse.json(
            {
              error: "Validation failed",
              details: parseResult.error.issues.map((issue) => issue.message),
            },
            { status: 400 }
          );
        }

        const blog = await createBlog(parseResult.data as CreateBlogRequest);

        console.info("Blog created by admin", {
          blogId: blog.id,
          title: blog.title,
          adminIP: clientIP,
          timestamp: new Date().toISOString(),
        });

        return NextResponse.json({
          success: true,
          data: blog,
          message: "Blog created successfully",
        });
      }

      case "update": {
        if (!blogId) {
          return NextResponse.json(
            { error: "Blog ID is required for update" },
            { status: 400 }
          );
        }

        const parseResult = updateBlogSchema.safeParse(data);
        if (!parseResult.success) {
          console.error("Update validation failed:", {
            data,
            errors: parseResult.error.issues,
            adminIP: clientIP,
            timestamp: new Date().toISOString(),
          });
          return NextResponse.json(
            {
              error: "Validation failed",
              details: parseResult.error.issues.map(
                (issue: ZodIssue) => `${issue.path.join(".")}: ${issue.message}`
              ),
            },
            { status: 400 }
          );
        }

        const blog = await updateBlog(
          blogId,
          parseResult.data as UpdateBlogRequest
        );

        console.info("Blog updated by admin", {
          blogId: blog.id,
          title: blog.title,
          adminIP: clientIP,
          timestamp: new Date().toISOString(),
        });

        return NextResponse.json({
          success: true,
          data: blog,
          message: "Blog updated successfully",
        });
      }

      case "delete": {
        if (!blogId) {
          return NextResponse.json(
            { error: "Blog ID is required for deletion" },
            { status: 400 }
          );
        }

        await deleteBlog(blogId);

        console.info("Blog deleted by admin", {
          blogId,
          adminIP: clientIP,
          timestamp: new Date().toISOString(),
        });

        return NextResponse.json({
          success: true,
          message: "Blog deleted successfully",
        });
      }

      case "publish": {
        if (!blogId) {
          return NextResponse.json(
            { error: "Blog ID is required" },
            { status: 400 }
          );
        }

        const blog = await updateBlog(blogId, {
          isPublished: true,
          isDraft: false,
        });

        return NextResponse.json({
          success: true,
          data: blog,
          message: "Blog published successfully",
        });
      }

      case "unpublish": {
        if (!blogId) {
          return NextResponse.json(
            { error: "Blog ID is required" },
            { status: 400 }
          );
        }

        const blog = await updateBlog(blogId, {
          isPublished: false,
          isDraft: true,
        });

        return NextResponse.json({
          success: true,
          data: blog,
          message: "Blog unpublished successfully",
        });
      }

      case "feature": {
        if (!blogId) {
          return NextResponse.json(
            { error: "Blog ID is required" },
            { status: 400 }
          );
        }

        const blog = await updateBlog(blogId, { isFeatured: true });

        return NextResponse.json({
          success: true,
          data: blog,
          message: "Blog featured successfully",
        });
      }

      case "unfeature": {
        if (!blogId) {
          return NextResponse.json(
            { error: "Blog ID is required" },
            { status: 400 }
          );
        }

        const blog = await updateBlog(blogId, { isFeatured: false });

        return NextResponse.json({
          success: true,
          data: blog,
          message: "Blog unfeatured successfully",
        });
      }

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    console.error("Blog Admin API error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
