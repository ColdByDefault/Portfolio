/**
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
*/

import { BlogPageClient } from "@/components/blog";
import { getBlogs } from "@/lib/hubs/blogs";

export default async function BlogsPage() {
  let blogs: Awaited<ReturnType<typeof getBlogs>>["blogs"] = [];

  try {
    const result = await getBlogs();
    blogs = result.blogs;
  } catch (error) {
    console.error("Failed to load blogs:", error);
  }

  return <BlogPageClient initialBlogs={blogs} />;
}

export const metadata = {
  title: "Blog",
  description:
    "Read the latest articles about development, technology, and more.",
};
