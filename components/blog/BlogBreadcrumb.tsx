/**
 * Blog Breadcrumb Navigation Component
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SquareLibrary } from "lucide-react";
import type { Blog } from "@/types/blogs";

interface BlogBreadcrumbProps {
  /**
   * Current blog data when viewing a specific blog
   */
  blog?: Blog;
  /**
   * Additional CSS classes
   */
  className?: string;
}

export function BlogBreadcrumb({ blog, className }: BlogBreadcrumbProps) {
  const pathname = usePathname();
  const isBlogList = pathname === "/blog";
  const isBlogPost = pathname.startsWith("/blog/") && blog;

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {/* Media */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link
              href="/media"
              className="flex items-center gap-1.5"
              aria-label="Go to home page"
            >
              <SquareLibrary className="h-4 w-4" />
              Media
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator />

        {/* Blog Section */}
        {isBlogList ? (
          <BreadcrumbItem>
            <BreadcrumbPage>Blogs</BreadcrumbPage>
          </BreadcrumbItem>
        ) : (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/blog" aria-label="Go to all blogs">
                  Blogs
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            {isBlogPost && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage
                    className="max-w-[200px] truncate"
                    title={blog.title}
                  >
                    {blog.title}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
