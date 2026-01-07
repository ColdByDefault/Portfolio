/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import { notFound } from "next/navigation";
import { BlogView, BlogBreadcrumb } from "@/components/blog";
import { getBlogBySlug } from "@/lib/hubs/blogs";

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;

  let blog;
  try {
    blog = await getBlogBySlug(slug);
  } catch (error) {
    console.error("Failed to load blog:", error);
    notFound();
  }

  if (!blog) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb Navigation */}
      <div className="mb-6">
        <BlogBreadcrumb blog={blog} />
      </div>

      <BlogView blog={blog} />
    </div>
  );
}

export async function generateMetadata({ params }: BlogPageProps) {
  try {
    const { slug } = await params;
    const blog = await getBlogBySlug(slug);

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
  } catch (error) {
    console.error("Failed to generate metadata:", error);
    return {
      title: "Blog",
      description: "Blog content",
    };
  }
}
