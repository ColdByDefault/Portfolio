/**
 * Dynamic Sitemap Generation
 * Automatically generates sitemap with all static and dynamic routes
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
 */

import type { MetadataRoute } from "next";
import { getBlogs } from "@/lib/blogs";

const baseUrl = "https://www.coldbydefault.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/library`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/media`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/impressum`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  try {
    // Fetch all published blogs for dynamic routes
    const blogsResponse = await getBlogs({
      published: true,
      limit: 1000, // Get all blogs
      sortBy: "updatedAt",
      sortOrder: "desc",
    });

    // Generate blog post routes
    const blogRoutes: MetadataRoute.Sitemap = blogsResponse.blogs.map(
      (blog) => ({
        url: `${baseUrl}/blog/${blog.slug}`,
        lastModified: new Date(blog.updatedAt),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })
    );

    // Combine static and dynamic routes
    return [...staticRoutes, ...blogRoutes];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    // Return static routes if blog fetching fails
    return staticRoutes;
  }
}

export const revalidate = 3600; // Revalidate every hour
