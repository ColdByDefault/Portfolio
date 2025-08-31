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
    published = true,
    featured,
    search,
    language,
    sortBy = "publishedAt",
    sortOrder = "desc",
  } = query || {};

  // Build where clause
  const where: Prisma.BlogWhereInput = {};

  if (published) {
    where.isPublished = true;
    where.publishedAt = { not: null };
  }

  if (featured !== undefined) {
    where.isFeatured = featured;
  }

  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { excerpt: { contains: search, mode: "insensitive" } },
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
    throw new Error("Failed to fetch blogs");
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
        isPublished: true,
        publishedAt: { not: null },
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
      await prisma.blog.update({
        where: { id: blog.id },
        data: { readCount: { increment: 1 } },
      });

      // Return the blog with incremented read count
      return { ...blog, readCount: blog.readCount + 1 } as Blog;
    }

    return null;
  } catch (error) {
    console.error("Error fetching blog by slug:", error);
    throw new Error("Failed to fetch blog");
  }
}

/**
 * Get featured blogs
 */
export async function getFeaturedBlogs(limit: number = 3): Promise<Blog[]> {
  const response = await getBlogs({ featured: true, limit });
  return response.blogs;
}
