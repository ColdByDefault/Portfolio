/**
 * Blog API Functions
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import type { Blog, BlogListQuery, BlogListResponse } from "@/types/blogs";

// Mock data for development - replace with actual API calls
const mockBlogs: Blog[] = [
  {
    id: "1",
    title: "Getting Started with Next.js",
    slug: "getting-started-nextjs",
    excerpt:
      "Learn the basics of Next.js and how to build modern web applications.",
    content:
      "<h2>Introduction</h2><p>Next.js is a React framework that enables functionality such as server-side rendering and generating static websites.</p><h2>Installation</h2><p>To get started with Next.js, you can use create-next-app...</p>",
    featuredImage: "/assets/nextjs-blog.jpg",
    isPublished: true,
    isFeatured: true,
    isDraft: false,
    readCount: 150,
    readingTime: 5,
    publishedAt: new Date("2025-08-01"),
    createdAt: new Date("2025-07-30"),
    updatedAt: new Date("2025-08-01"),
    category: {
      id: "1",
      name: "Development",
      slug: "development",
      color: "#3b82f6",
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    tags: [
      {
        id: "1",
        blogId: "1",
        tagId: "1",
        tag: {
          id: "1",
          name: "React",
          slug: "react",
          color: "#61dafb",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
      {
        id: "2",
        blogId: "1",
        tagId: "2",
        tag: {
          id: "2",
          name: "Next.js",
          slug: "nextjs",
          color: "#000000",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
    ],
  },
  {
    id: "2",
    title: "Understanding TypeScript",
    slug: "understanding-typescript",
    excerpt:
      "A comprehensive guide to TypeScript and its benefits for modern web development.",
    content:
      "<h2>What is TypeScript?</h2><p>TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.</p><h2>Benefits</h2><p>TypeScript provides better IDE support, early error detection, and improved code maintainability...</p>",
    isPublished: true,
    isFeatured: false,
    isDraft: false,
    readCount: 89,
    readingTime: 8,
    publishedAt: new Date("2025-07-25"),
    createdAt: new Date("2025-07-20"),
    updatedAt: new Date("2025-07-25"),
    category: {
      id: "1",
      name: "Development",
      slug: "development",
      color: "#3b82f6",
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    tags: [
      {
        id: "3",
        blogId: "2",
        tagId: "3",
        tag: {
          id: "3",
          name: "TypeScript",
          slug: "typescript",
          color: "#3178c6",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
    ],
  },
];

/**
 * Get all published blogs
 */
export async function getBlogs(
  query?: BlogListQuery
): Promise<BlogListResponse> {
  // In a real app, this would be an API call to your backend
  const {
    page = 1,
    limit = 12,
    published = true,
    featured,
    search,
    sortBy = "publishedAt",
    sortOrder = "desc",
  } = query || {};

  let filteredBlogs = mockBlogs.filter((blog) =>
    published ? blog.isPublished : true
  );

  if (featured !== undefined) {
    filteredBlogs = filteredBlogs.filter(
      (blog) => blog.isFeatured === featured
    );
  }

  if (search) {
    filteredBlogs = filteredBlogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(search.toLowerCase()) ||
        blog.excerpt?.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Sort blogs
  filteredBlogs.sort((a, b) => {
    const aValue = a[sortBy] || 0;
    const bValue = b[sortBy] || 0;

    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1;
    }
    return aValue < bValue ? 1 : -1;
  });

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedBlogs = filteredBlogs.slice(startIndex, endIndex);

  return {
    blogs: paginatedBlogs,
    pagination: {
      page,
      limit,
      total: filteredBlogs.length,
      totalPages: Math.ceil(filteredBlogs.length / limit),
      hasNextPage: endIndex < filteredBlogs.length,
      hasPrevPage: page > 1,
    },
    filters: {
      categories: [],
      tags: [],
    },
  };
}

/**
 * Get a single blog by slug
 */
export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  // In a real app, this would be an API call to your backend
  const blog = mockBlogs.find((b) => b.slug === slug && b.isPublished);

  if (blog) {
    // Increment read count (in a real app, this would be handled server-side)
    blog.readCount += 1;
  }

  return blog || null;
}

/**
 * Get featured blogs
 */
export async function getFeaturedBlogs(limit: number = 3): Promise<Blog[]> {
  const response = await getBlogs({ featured: true, limit });
  return response.blogs;
}
