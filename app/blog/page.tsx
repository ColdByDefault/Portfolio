/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import { BlogPageClient } from "@/components/blog";
import { getBlogs } from "@/lib/blogs";

export default async function BlogsPage() {
  const { blogs } = await getBlogs();

  return <BlogPageClient initialBlogs={blogs} />;
}

export const metadata = {
  title: "Blog",
  description:
    "Read the latest articles about development, technology, and more.",
};
