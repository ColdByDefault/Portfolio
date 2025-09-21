/**
 * Blog Administration Service
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import { prisma } from "./prisma";
import type { Prisma } from "@prisma/client";
import type {
  Blog,
  CreateBlogRequest,
  UpdateBlogRequest,
  BlogListQuery,
  BlogListResponse,
} from "@/types/blogs";
import type { BlogAdminStats, BlogActivityItem } from "@/types/admin";
import { RateLimiter, sanitizeInput, sanitizeErrorMessage } from "./security";

// Rate limiter for admin operations
const adminRateLimiter = new RateLimiter(60000, 100);

// Authentication context interface
interface AdminContext {
  clientIP: string;
  isAuthenticated: boolean;
  userAgent?: string | undefined;
}

/**
 * Validate admin authentication and rate limits
 */
function validateAdminAccess(context: AdminContext): void {
  if (!context.isAuthenticated) {
    throw new Error("Unauthorized: Admin access required");
  }

  if (!adminRateLimiter.isAllowed(context.clientIP)) {
    throw new Error("Rate limit exceeded");
  }
}

/**
 * Sanitize blog content while preserving markdown formatting
 */
function sanitizeBlogContent(content: string): string {
  if (!content) return "";

  let sanitized = content;

  // Remove HTML tags completely (but preserve markdown)
  let prevSanitized;
  do {
    prevSanitized = sanitized;
    sanitized = sanitized.replace(/<[^>]*>/g, "");
  } while (sanitized !== prevSanitized);

  // Remove script tags and dangerous protocols
  sanitized = sanitized.replace(/javascript:/gi, "");
  sanitized = sanitized.replace(/data:/gi, "");
  sanitized = sanitized.replace(/vbscript:/gi, "");

  // Remove potentially dangerous attributes
  let prevAttrSanitized;
  do {
    prevAttrSanitized = sanitized;
    sanitized = sanitized.replace(/on\w+\s*=\s*[^>]*/gi, "");
  } while (sanitized !== prevAttrSanitized);

  // PRESERVE markdown formatting - DO NOT remove whitespace or newlines
  // Only remove NULL characters and other control characters that could be dangerous
  // eslint-disable-next-line no-control-regex
  sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");

  return sanitized;
}

/**
 * Common error handler with sanitized messages
 */
function handleBlogError(error: unknown, operation: string): never {
  console.error(`Blog ${operation} error:`, error);
  const sanitizedMessage = sanitizeErrorMessage(error);
  throw new Error(`Failed to ${operation}: ${sanitizedMessage}`);
}

/**
 * Generate a unique slug from title
 */
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .replace(/^-|-$/g, ""); // Remove leading/trailing hyphens
}

/**
 * Ensure unique slug by appending number if needed (simplified)
 */
async function ensureUniqueSlug(
  slug: string,
  excludeId?: string
): Promise<string> {
  const maxAttempts = 10;

  for (let counter = 0; counter < maxAttempts; counter++) {
    const testSlug = counter === 0 ? slug : `${slug}-${counter}`;

    const existing = await prisma.blog.findFirst({
      where: {
        slug: testSlug,
        ...(excludeId && { id: { not: excludeId } }),
      },
      select: { id: true },
    });

    if (!existing) {
      return testSlug;
    }
  }

  // Final fallback with timestamp
  const timestamp = Date.now();
  return `${slug}-${timestamp}`;
}

/**
 * Calculate reading time based on content
 */
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Validate blog data
 */
function validateBlogData(
  data: CreateBlogRequest | UpdateBlogRequest
): string[] {
  const errors: string[] = [];

  if ("title" in data && data.title) {
    if (data.title.length < 3) {
      errors.push("Title must be at least 3 characters long");
    }
    if (data.title.length > 200) {
      errors.push("Title must be less than 200 characters");
    }
  }

  if ("content" in data && data.content) {
    if (data.content.length < 10) {
      errors.push("Content must be at least 10 characters long");
    }
    if (data.content.length > 50000) {
      errors.push("Content must be less than 50,000 characters");
    }
  }

  if ("excerpt" in data && data.excerpt && data.excerpt.length > 500) {
    errors.push("Excerpt must be less than 500 characters");
  }

  if (
    "metaDescription" in data &&
    data.metaDescription &&
    data.metaDescription.length > 160
  ) {
    errors.push("Meta description must be less than 160 characters");
  }

  return errors;
}

/**
 * Get admin statistics
 */
export async function getBlogAdminStats(
  context: AdminContext
): Promise<BlogAdminStats> {
  validateAdminAccess(context);

  try {
    const [totalBlogs, publishedBlogs, draftBlogs, featuredBlogs, recentBlogs] =
      await Promise.all([
        prisma.blog.count(),
        prisma.blog.count({ where: { isPublished: true } }),
        prisma.blog.count({ where: { isDraft: true } }),
        prisma.blog.count({ where: { isFeatured: true } }),
        prisma.blog.findMany({
          orderBy: { updatedAt: "desc" },
          take: 10,
          select: {
            id: true,
            title: true,
            slug: true,
            isPublished: true,
            updatedAt: true,
          },
        }),
      ]);

    // Calculate total views (sum of readCount)
    const totalViews = await prisma.blog.aggregate({
      _sum: {
        readCount: true,
      },
    });

    const recentActivity: BlogActivityItem[] = recentBlogs.map((blog) => ({
      id: blog.id,
      action: blog.isPublished ? "published" : "updated",
      blogTitle: blog.title,
      blogSlug: blog.slug,
      timestamp: blog.updatedAt,
    }));

    return {
      totalBlogs,
      publishedBlogs,
      draftBlogs,
      featuredBlogs,
      totalViews: totalViews._sum.readCount || 0,
      recentActivity,
    };
  } catch (error) {
    handleBlogError(error, "fetch blog statistics");
  }
}

/**
 * Get all blogs for admin (including drafts)
 */
export async function getAdminBlogs(
  context: AdminContext,
  query?: BlogListQuery
): Promise<BlogListResponse> {
  validateAdminAccess(context);

  const {
    page = 1,
    limit = 20,
    search,
    language,
    published,
    featured,
    sortBy = "updatedAt",
    sortOrder = "desc",
  } = query || {};

  try {
    const where: Prisma.BlogWhereInput = {};

    if (published !== undefined) {
      where.isPublished = published;
    }

    if (featured !== undefined) {
      where.isFeatured = featured;
    }

    if (search) {
      // Sanitize search input
      const sanitizedSearch = sanitizeInput(search);
      where.OR = [
        { title: { contains: sanitizedSearch, mode: "insensitive" } },
        { excerpt: { contains: sanitizedSearch, mode: "insensitive" } },
        { content: { contains: sanitizedSearch, mode: "insensitive" } },
      ];
    }

    if (language) {
      where.language = language;
    }

    const [total, blogs] = await Promise.all([
      prisma.blog.count({ where }),
      prisma.blog.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          category: true,
          tags: {
            include: {
              tag: true,
            },
          },
          credits: true,
        },
      }),
    ]);

    return {
      blogs: blogs as Blog[],
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page * limit < total,
        hasPrevPage: page > 1,
      },
      filters: {
        categories: [],
        tags: [],
      },
    };
  } catch (error) {
    handleBlogError(error, "fetch blogs");
  }
}

/**
 * Create a new blog
 */
export async function createBlog(
  context: AdminContext,
  data: CreateBlogRequest
): Promise<Blog> {
  validateAdminAccess(context);

  // Validate input
  const errors = validateBlogData(data);
  if (errors.length > 0) {
    throw new Error(`Validation errors: ${errors.join(", ")}`);
  }

  try {
    // Sanitize all text content
    const sanitizedData = {
      ...data,
      title: sanitizeInput(data.title),
      content: sanitizeBlogContent(data.content),
      excerpt: data.excerpt ? sanitizeInput(data.excerpt) : null,
      metaTitle: data.metaTitle ? sanitizeInput(data.metaTitle) : null,
      metaDescription: data.metaDescription
        ? sanitizeInput(data.metaDescription)
        : null,
    };

    // Generate slug if not provided
    let slug = sanitizedData.slug || generateSlug(sanitizedData.title);
    slug = await ensureUniqueSlug(slug);

    // Calculate reading time
    const readingTime = calculateReadingTime(sanitizedData.content);

    const blog = await prisma.blog.create({
      data: {
        title: sanitizedData.title,
        slug,
        excerpt: sanitizedData.excerpt,
        content: sanitizedData.content,
        featuredImage: data.featuredImage || null,
        language: data.language || "en",
        metaTitle: sanitizedData.metaTitle,
        metaDescription: sanitizedData.metaDescription,
        isPublished: data.isPublished || false,
        isFeatured: data.isFeatured || false,
        isDraft: !data.isPublished,
        readingTime,
        publishedAt: data.isPublished ? new Date() : null,
        // Handle relations if needed
        ...(data.categoryId && {
          category: {
            connect: { id: data.categoryId },
          },
        }),
        ...(data.credits && {
          credits: {
            create: {
              originalAuthor: sanitizeInput(data.credits.originalAuthor || ""),
              originalSource: data.credits.originalSource
                ? sanitizeInput(data.credits.originalSource)
                : null,
              sourceUrl: data.credits.sourceUrl || null,
              licenseType: data.credits.licenseType || null,
              creditText: data.credits.creditText
                ? sanitizeInput(data.credits.creditText)
                : null,
              translatedFrom: data.credits.translatedFrom || null,
              adaptedFrom: data.credits.adaptedFrom || null,
            },
          },
        }),
      },
      include: {
        category: true,
        tags: {
          include: {
            tag: true,
          },
        },
        credits: true,
      },
    });

    return blog as Blog;
  } catch (error) {
    handleBlogError(error, "create blog");
  }
}

/**
 * Update an existing blog
 */
export async function updateBlog(
  context: AdminContext,
  id: string,
  data: UpdateBlogRequest
): Promise<Blog> {
  validateAdminAccess(context);

  // Validate input
  const errors = validateBlogData(data);
  if (errors.length > 0) {
    throw new Error(`Validation errors: ${errors.join(", ")}`);
  }

  try {
    // Check if blog exists
    const existingBlog = await prisma.blog.findUnique({
      where: { id },
      select: {
        id: true,
        slug: true,
        readingTime: true,
        isPublished: true,
        publishedAt: true,
      },
    });
    if (!existingBlog) {
      throw new Error("Blog not found");
    }

    // Sanitize all text content
    const sanitizedData = {
      ...data,
      title: data.title ? sanitizeInput(data.title) : undefined,
      content: data.content ? sanitizeBlogContent(data.content) : undefined,
      excerpt:
        data.excerpt !== undefined
          ? data.excerpt
            ? sanitizeInput(data.excerpt)
            : null
          : undefined,
      metaTitle:
        data.metaTitle !== undefined
          ? data.metaTitle
            ? sanitizeInput(data.metaTitle)
            : null
          : undefined,
      metaDescription:
        data.metaDescription !== undefined
          ? data.metaDescription
            ? sanitizeInput(data.metaDescription)
            : null
          : undefined,
    };

    // Handle slug update
    let slug = data.slug;
    if (slug && slug !== existingBlog.slug) {
      slug = await ensureUniqueSlug(slug, id);
    }

    // Calculate reading time if content changed
    let readingTime = existingBlog.readingTime;
    if (sanitizedData.content) {
      readingTime = calculateReadingTime(sanitizedData.content);
    }

    // Handle publish status change
    let publishedAt = existingBlog.publishedAt;
    if (data.isPublished && !existingBlog.isPublished) {
      publishedAt = new Date();
    } else if (data.isPublished === false) {
      publishedAt = null;
    }

    const blog = await prisma.blog.update({
      where: { id },
      data: {
        ...(sanitizedData.title && { title: sanitizedData.title }),
        ...(slug && { slug }),
        ...(sanitizedData.excerpt !== undefined && {
          excerpt: sanitizedData.excerpt,
        }),
        ...(sanitizedData.content && { content: sanitizedData.content }),
        ...(data.featuredImage !== undefined && {
          featuredImage: data.featuredImage,
        }),
        ...(data.language && { language: data.language }),
        ...(sanitizedData.metaTitle !== undefined && {
          metaTitle: sanitizedData.metaTitle,
        }),
        ...(sanitizedData.metaDescription !== undefined && {
          metaDescription: sanitizedData.metaDescription,
        }),
        ...(data.isPublished !== undefined && {
          isPublished: data.isPublished,
        }),
        ...(data.isFeatured !== undefined && { isFeatured: data.isFeatured }),
        ...(data.isDraft !== undefined && { isDraft: data.isDraft }),
        ...(data.categoryId !== undefined && {
          category: data.categoryId
            ? { connect: { id: data.categoryId } }
            : { disconnect: true },
        }),
        readingTime,
        publishedAt,
        updatedAt: new Date(),
      },
      include: {
        category: true,
        tags: {
          include: {
            tag: true,
          },
        },
        credits: true,
      },
    });

    // Handle credits separately due to upsert complexity
    if (data.credits) {
      const sanitizedCredits = {
        originalAuthor: sanitizeInput(data.credits.originalAuthor || ""),
        originalSource: data.credits.originalSource
          ? sanitizeInput(data.credits.originalSource)
          : null,
        sourceUrl: data.credits.sourceUrl || null,
        licenseType: data.credits.licenseType || null,
        creditText: data.credits.creditText
          ? sanitizeInput(data.credits.creditText)
          : null,
        translatedFrom: data.credits.translatedFrom || null,
        adaptedFrom: data.credits.adaptedFrom || null,
      };

      await prisma.blogCredit.upsert({
        where: { blogId: id },
        update: sanitizedCredits,
        create: {
          blogId: id,
          ...sanitizedCredits,
        },
      });
    }

    return blog as Blog;
  } catch (error) {
    handleBlogError(error, "update blog");
  }
}

/**
 * Delete a blog
 */
export async function deleteBlog(
  context: AdminContext,
  id: string
): Promise<void> {
  validateAdminAccess(context);

  try {
    // Check if blog exists
    const existingBlog = await prisma.blog.findUnique({
      where: { id },
      select: { id: true },
    });
    if (!existingBlog) {
      throw new Error("Blog not found");
    }

    // Delete related data first (using transaction for consistency)
    await prisma.$transaction([
      prisma.blogTagRelation.deleteMany({ where: { blogId: id } }),
      prisma.blogCredit.deleteMany({ where: { blogId: id } }),
      prisma.blog.delete({ where: { id } }),
    ]);
  } catch (error) {
    handleBlogError(error, "delete blog");
  }
}

/**
 * Get a blog by ID for admin
 */
export async function getAdminBlogById(
  context: AdminContext,
  id: string
): Promise<Blog | null> {
  validateAdminAccess(context);

  try {
    const blog = await prisma.blog.findUnique({
      where: { id },
      include: {
        category: true,
        tags: {
          include: {
            tag: true,
          },
        },
        credits: true,
      },
    });

    return blog as Blog | null;
  } catch (error) {
    handleBlogError(error, "fetch blog");
  }
}

/**
 * Check rate limit for admin operations
 */
export function checkAdminRateLimit(clientIP: string): boolean {
  return adminRateLimiter.isAllowed(clientIP);
}

/**
 * Get all categories for admin forms
 */
export async function getAdminCategories(context: AdminContext) {
  validateAdminAccess(context);

  try {
    const categories = await prisma.blogCategory.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        isActive: true,
      },
    });
    return categories;
  } catch (error) {
    handleBlogError(error, "fetch categories");
  }
}

/**
 * Get all tags for admin forms
 */
export async function getAdminTags(context: AdminContext) {
  validateAdminAccess(context);

  try {
    const tags = await prisma.blogTag.findMany({
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        slug: true,
      },
    });
    return tags;
  } catch (error) {
    handleBlogError(error, "fetch tags");
  }
}

// Export the AdminContext interface for use in API routes
export type { AdminContext };
