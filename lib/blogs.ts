/**
 * Blog API Functions
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import type { Blog, BlogListQuery, BlogListResponse } from "@/types/blogs";
import { prisma } from "./prisma";
import type { Prisma } from "@prisma/client";
import { sanitizeInput } from "./security";

/**
 * Get all published blogs
 */
export async function getBlogs(
  query?: BlogListQuery
): Promise<BlogListResponse> {
  const {
    page = 1,
    limit = 12,
    published,
    featured,
    search,
    language,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = query || {};

  const where: Prisma.BlogWhereInput = {};

  if (published === true) {
    where.isPublished = true;
  }

  if (featured !== undefined) {
    where.isFeatured = featured;
  }

  if (search) {
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

  const orderBy: Prisma.BlogOrderByWithRelationInput = {
    [sortBy]: sortOrder,
  };

  try {
    // Get total count for pagination
    const total = await prisma.blog.count({ where });

    // Get blogs with relations
    const blogs = await prisma.blog.findMany({
      where,
      orderBy,
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
    });

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
    console.error("Error fetching blogs:", error);

    return {
      blogs: [],
      pagination: {
        page,
        limit,
        total: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPrevPage: false,
      },
      filters: {
        categories: [],
        tags: [],
      },
    };
  }
}

/**
 * Get a single blog by slug
 */
export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  if (!slug || typeof slug !== "string") {
    return null;
  }

  // Basic slug validation - only allow letters, numbers, hyphens
  const sanitizedSlug = slug.replace(/[^a-zA-Z0-9-]/g, "").toLowerCase();
  if (!sanitizedSlug || sanitizedSlug.length === 0) {
    return null;
  }

  try {
    const blog = await prisma.blog.findFirst({
      where: {
        slug: sanitizedSlug,
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

    if (blog) {
      // Increment read count
      try {
        await prisma.blog.update({
          where: { id: blog.id },
          data: { readCount: { increment: 1 } },
        });

        // Return the blog with incremented read count
        return { ...blog, readCount: blog.readCount + 1 } as Blog;
      } catch (updateError) {
        console.error("Error updating read count:", updateError);
        return blog as Blog;
      }
    }

    return null;
  } catch (error) {
    console.error("Error fetching blog by slug:", error);
    return null;
  }
}

/**
 * Get featured blogs
 */
export async function getFeaturedBlogs(limit: number = 3): Promise<Blog[]> {
  const response = await getBlogs({ featured: true, limit });
  return response.blogs;
}
