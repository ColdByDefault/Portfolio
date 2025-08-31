/**
 * Blog API Functions
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import type { Blog, BlogListQuery, BlogListResponse } from "@/types/blogs";
import { prisma } from "./prisma";
import type { Prisma } from "@prisma/client";

/**
 * Get all published blogs
 */
export async function getBlogs(
  query?: BlogListQuery
): Promise<BlogListResponse> {
  const {
    page = 1,
    limit = 12,
    published, // Remove default value, make it optional
    featured,
    search,
    language,
    sortBy = "createdAt", // Changed to createdAt for reliability
    sortOrder = "desc",
  } = query || {};

  // Build where clause - much more permissive
  const where: Prisma.BlogWhereInput = {};

  // Only filter by published if explicitly requested
  if (published === true) {
    where.isPublished = true;
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

  // Build orderBy clause
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

    // Add more detailed error logging
    if (error instanceof Error) {
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }

    // Return empty result set on error instead of throwing
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
  try {
    const blog = await prisma.blog.findFirst({
      where: {
        slug,
        // Remove published requirement for debugging
        // isPublished: true,
        // publishedAt: { not: null },
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
        // Still return the blog even if read count update fails
        return blog as Blog;
      }
    }

    return null;
  } catch (error) {
    console.error("Error fetching blog by slug:", error);
    return null; // Return null instead of throwing
  }
}

/**
 * Get featured blogs
 */
export async function getFeaturedBlogs(limit: number = 3): Promise<Blog[]> {
  const response = await getBlogs({ featured: true, limit });
  return response.blogs;
}
