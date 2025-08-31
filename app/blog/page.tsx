/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import { BlogPageClient } from "@/components/blog";
import { getBlogs } from "@/lib/blogs";

export default async function BlogsPage() {
  try {
    // Add production debugging
    if (process.env.NODE_ENV === "production") {
      console.log("BlogsPage: Starting to fetch blogs");
    }

    const { blogs } = await getBlogs();

    if (process.env.NODE_ENV === "production") {
      console.log(`BlogsPage: Fetched ${blogs.length} blogs`);
    }

    return <BlogPageClient initialBlogs={blogs} />;
  } catch (error) {
    console.error("Failed to load blogs:", error);
    // Return empty blogs array as fallback
    return <BlogPageClient initialBlogs={[]} />;
  }
}

export const metadata = {
  title: "Blog",
  description:
    "Read the latest articles about development, technology, and more.",
};
