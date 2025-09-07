/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import { BlogPageClient } from "@/components/blog";
import { getBlogs } from "@/lib/blogs";

export default async function BlogsPage() {
  try {
    const { blogs } = await getBlogs();

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
