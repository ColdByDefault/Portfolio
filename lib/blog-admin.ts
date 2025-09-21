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
import { RateLimiter } from "./security";

// Rate limiter for admin operations
const adminRateLimiter = new RateLimiter(60000, 100);

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
 * Ensure unique slug by appending number if needed
 */
async function ensureUniqueSlug(
  slug: string,
  excludeId?: string
): Promise<string> {
  let uniqueSlug = slug;
  let counter = 1;
  const maxAttempts = 20;

  while (counter <= maxAttempts) {
    const existing = await prisma.blog.findFirst({
      where: {
        slug: uniqueSlug,
        ...(excludeId && { id: { not: excludeId } }),
      },
    });

    if (!existing) {
      return uniqueSlug;
    }

    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }

  // Fallback: Use timestamp-based unique identifier
  const timestamp = Date.now();
  const fallbackSlug = `${slug}-${timestamp}`;

  const existingFallback = await prisma.blog.findFirst({
    where: {
      slug: fallbackSlug,
      ...(excludeId && { id: { not: excludeId } }),
    },
  });

  if (!existingFallback) {
    return fallbackSlug;
  }

  const randomSuffix = Math.random().toString(36).substring(2, 8);
  return `${slug}-${timestamp}-${randomSuffix}`;
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
export async function getBlogAdminStats(): Promise<BlogAdminStats> {
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
    console.error("Error fetching blog admin stats:", error);
    throw new Error("Failed to fetch blog statistics");
  }
}

/**
 * Get all blogs for admin (including drafts)
 */
export async function getAdminBlogs(
  query?: BlogListQuery
): Promise<BlogListResponse> {
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
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { excerpt: { contains: search, mode: "insensitive" } },
        { content: { contains: search, mode: "insensitive" } },
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
    console.error("Error fetching admin blogs:", error);
    throw new Error("Failed to fetch blogs");
  }
}

/**
 * Create a new blog
 */
export async function createBlog(data: CreateBlogRequest): Promise<Blog> {
  // Validate input
  const errors = validateBlogData(data);
  if (errors.length > 0) {
    throw new Error(`Validation errors: ${errors.join(", ")}`);
  }

  try {
    // Generate slug if not provided
    let slug = data.slug || generateSlug(data.title);
    slug = await ensureUniqueSlug(slug);

    // Calculate reading time
    const readingTime = calculateReadingTime(data.content);

    const blog = await prisma.blog.create({
      data: {
        title: data.title,
        slug,
        excerpt: data.excerpt || null,
        content: data.content,
        featuredImage: data.featuredImage || null,
        language: data.language || "en",
        metaTitle: data.metaTitle || null,
        metaDescription: data.metaDescription || null,
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
              originalAuthor: data.credits.originalAuthor || "",
              originalSource: data.credits.originalSource || null,
              sourceUrl: data.credits.sourceUrl || null,
              licenseType: data.credits.licenseType || null,
              creditText: data.credits.creditText || null,
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
    console.error("Error creating blog:", error);
    throw new Error("Failed to create blog");
  }
}

/**
 * Update an existing blog
 */
export async function updateBlog(
  id: string,
  data: UpdateBlogRequest
): Promise<Blog> {
  // Validate input
  const errors = validateBlogData(data);
  if (errors.length > 0) {
    throw new Error(`Validation errors: ${errors.join(", ")}`);
  }

  try {
    // Check if blog exists
    const existingBlog = await prisma.blog.findUnique({ where: { id } });
    if (!existingBlog) {
      throw new Error("Blog not found");
    }

    // Handle slug update
    let slug = data.slug;
    if (slug && slug !== existingBlog.slug) {
      slug = await ensureUniqueSlug(slug, id);
    }

    // Calculate reading time if content changed
    let readingTime = existingBlog.readingTime;
    if (data.content) {
      readingTime = calculateReadingTime(data.content);
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
        ...(data.title && { title: data.title }),
        ...(slug && { slug }),
        ...(data.excerpt !== undefined && { excerpt: data.excerpt }),
        ...(data.content && { content: data.content }),
        ...(data.featuredImage !== undefined && {
          featuredImage: data.featuredImage,
        }),
        ...(data.language && { language: data.language }),
        ...(data.metaTitle !== undefined && { metaTitle: data.metaTitle }),
        ...(data.metaDescription !== undefined && {
          metaDescription: data.metaDescription,
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
      await prisma.blogCredit.upsert({
        where: { blogId: id },
        update: {
          originalAuthor: data.credits.originalAuthor || "",
          originalSource: data.credits.originalSource || null,
          sourceUrl: data.credits.sourceUrl || null,
          licenseType: data.credits.licenseType || null,
          creditText: data.credits.creditText || null,
          translatedFrom: data.credits.translatedFrom || null,
          adaptedFrom: data.credits.adaptedFrom || null,
        },
        create: {
          blogId: id,
          originalAuthor: data.credits.originalAuthor || "",
          originalSource: data.credits.originalSource || null,
          sourceUrl: data.credits.sourceUrl || null,
          licenseType: data.credits.licenseType || null,
          creditText: data.credits.creditText || null,
          translatedFrom: data.credits.translatedFrom || null,
          adaptedFrom: data.credits.adaptedFrom || null,
        },
      });
    }

    return blog as Blog;
  } catch (error) {
    console.error("Error updating blog:", error);
    throw new Error("Failed to update blog");
  }
}

/**
 * Delete a blog
 */
export async function deleteBlog(id: string): Promise<void> {
  try {
    // Check if blog exists
    const existingBlog = await prisma.blog.findUnique({ where: { id } });
    if (!existingBlog) {
      throw new Error("Blog not found");
    }

    // Delete related data first
    await prisma.blogTagRelation.deleteMany({ where: { blogId: id } });
    await prisma.blogCredit.deleteMany({ where: { blogId: id } });

    // Delete the blog
    await prisma.blog.delete({ where: { id } });
  } catch (error) {
    console.error("Error deleting blog:", error);
    throw new Error("Failed to delete blog");
  }
}

/**
 * Get a blog by ID for admin
 */
export async function getAdminBlogById(id: string): Promise<Blog | null> {
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
    console.error("Error fetching blog by ID:", error);
    throw new Error("Failed to fetch blog");
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
export async function getAdminCategories() {
  try {
    const categories = await prisma.blogCategory.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
    });
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories");
  }
}

/**
 * Get all tags for admin forms
 */
export async function getAdminTags() {
  try {
    const tags = await prisma.blogTag.findMany({
      orderBy: { name: "asc" },
    });
    return tags;
  } catch (error) {
    console.error("Error fetching tags:", error);
    throw new Error("Failed to fetch tags");
  }
}
