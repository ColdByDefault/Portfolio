/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import { notFound } from "next/navigation";
import { BlogView } from "@/components/blog";
import { getBlogBySlug } from "@/lib/blogs";

interface BlogPageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const blog = await getBlogBySlug(params.slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <BlogView blog={blog} />
    </div>
  );
}

export async function generateMetadata({ params }: BlogPageProps) {
  const blog = await getBlogBySlug(params.slug);

  if (!blog) {
    return {
      title: "Blog Not Found",
    };
  }

  return {
    title: blog.metaTitle || blog.title,
    description: blog.metaDescription || blog.excerpt,
    openGraph: {
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription || blog.excerpt,
      images: blog.featuredImage ? [blog.featuredImage] : undefined,
    },
  };
}
