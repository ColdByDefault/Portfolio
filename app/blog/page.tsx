/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import { BlogsList } from "@/components/blog";
import { getBlogs } from "@/lib/blogs";

export default async function BlogsPage() {
  const { blogs } = await getBlogs();

  return (
    <div className="flex flex-col min-h-full">
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-muted-foreground">
            Thoughts, tutorials, and insights about development and technology.
          </p>
        </div>

        <BlogsList blogs={blogs} />
      </div>
    </div>
  );
}

export const metadata = {
  title: "Blog",
  description:
    "Read the latest articles about development, technology, and more.",
};
