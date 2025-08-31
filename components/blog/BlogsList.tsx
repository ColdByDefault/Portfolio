/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */
"use client";

import React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import type { Blog } from "@/types/blogs";

interface BlogsListProps {
  blogs: Blog[];
  className?: string;
}

export function BlogsList({ blogs, className }: BlogsListProps) {
  if (blogs.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No blogs found.</p>
      </div>
    );
  }

  return (
    <div className={`grid gap-6 md:grid-cols-2 lg:grid-cols-3 ${className}`}>
      {blogs.map((blog) => (
        <Link key={blog.id} href={`/blog/${blog.slug}`}>
          <Card className="h-full hover:shadow-lg transition-shadow">
            {blog.featuredImage && (
              <div className="w-full h-48 bg-muted rounded-t-lg overflow-hidden">
                <img
                  src={blog.featuredImage}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <CardHeader>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Calendar className="h-4 w-4" />
                {blog.publishedAt
                  ? new Date(blog.publishedAt).toLocaleDateString()
                  : "Draft"}
                {blog.readingTime && (
                  <>
                    <Clock className="h-4 w-4 ml-2" />
                    {blog.readingTime} min read
                  </>
                )}
              </div>
              <CardTitle className="line-clamp-2">{blog.title}</CardTitle>
              {blog.excerpt && (
                <CardDescription className="line-clamp-3">
                  {blog.excerpt}
                </CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {blog.isFeatured && <Badge variant="secondary">Featured</Badge>}
                {blog.category && (
                  <Badge
                    variant="outline"
                    style={{ borderColor: blog.category.color }}
                  >
                    {blog.category.name}
                  </Badge>
                )}
                {blog.tags?.slice(0, 2).map((tagRelation) => (
                  <Badge key={tagRelation.id} variant="outline">
                    {tagRelation.tag?.name}
                  </Badge>
                ))}
                {blog.tags && blog.tags.length > 2 && (
                  <Badge variant="outline">+{blog.tags.length - 2}</Badge>
                )}
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
