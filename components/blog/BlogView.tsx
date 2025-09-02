/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */
"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, Eye, Languages } from "lucide-react";
import type { Blog } from "@/types/blogs";
import { BLOG_LANGUAGE_NAMES } from "@/types/blogs";
import { LanguageBadge } from "./LanguageBadge";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

interface BlogViewProps {
  blog: Blog;
  className?: string;
}

export function BlogView({ blog, className }: BlogViewProps) {
  const [imageSrc, setImageSrc] = useState(
    blog.featuredImage || "/assets/blogsFallback.png"
  );
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    if (!imageError && imageSrc !== "/assets/blogsFallback.png") {
      setImageError(true);
      setImageSrc("/assets/blogsFallback.png");
    }
  };
  return (
    <article className={`max-w-4xl mx-auto ${className}`}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
          {blog.publishedAt && (
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(blog.publishedAt).toLocaleDateString()}
            </div>
          )}
          {blog.readingTime && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {blog.readingTime} min read
            </div>
          )}
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            {blog.readCount} views
          </div>
          {blog.language && (
            <div className="flex items-center gap-1">
              <Languages className="h-4 w-4" />
              {BLOG_LANGUAGE_NAMES[
                blog.language as keyof typeof BLOG_LANGUAGE_NAMES
              ] || blog.language.toUpperCase()}
            </div>
          )}
        </div>

        {/* Tags and Category */}
        <div className="flex flex-wrap gap-2 mb-6">
          {blog.isFeatured && <Badge variant="secondary">Featured</Badge>}
          {blog.language && blog.language !== "en" && (
            <LanguageBadge language={blog.language} showIcon={true} />
          )}
          {blog.category && (
            <Badge variant="outline">{blog.category.name}</Badge>
          )}
          {blog.tags?.map((tagRelation) => (
            <Badge key={tagRelation.id} variant="outline">
              {tagRelation.tag?.name}
            </Badge>
          ))}
        </div>

        {/* Featured Image */}
        {(blog.featuredImage || imageSrc) && (
          <div className="w-full h-64 md:h-80 bg-muted rounded-lg overflow-hidden mb-6">
            <Image
              src={imageSrc}
              alt={blog.title}
              width={500}
              height={500}
              className="w-full h-full object-cover"
              onError={handleImageError}
              priority={false}
            />
          </div>
        )}

        <Separator />
      </div>

      {/* Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none text-lg leading-relaxed mb-8">
        <ReactMarkdown
          components={{
            // Custom styling for markdown elements
            h1: ({ children }) => (
              <h1 className="text-3xl font-bold mb-4 mt-8">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-2xl font-semibold mb-3 mt-6">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-xl font-semibold mb-2 mt-4">{children}</h3>
            ),
            p: ({ children }) => (
              <p className="mb-4 leading-relaxed">{children}</p>
            ),
            code: ({ children }) => (
              <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
                {children}
              </code>
            ),
            pre: ({ children }) => (
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4">
                {children}
              </pre>
            ),
            ul: ({ children }) => (
              <ul className="list-disc list-inside mb-4 space-y-2">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal list-inside mb-4 space-y-2">
                {children}
              </ol>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-muted-foreground pl-4 italic my-4">
                {children}
              </blockquote>
            ),
            a: ({ children, href }) => (
              <a
                href={href}
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </a>
            ),
          }}
        >
          {blog.content}
        </ReactMarkdown>
      </div>

      {/* Credits */}
      {blog.credits && (
        <>
          <Separator className="mb-6" />
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Credits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {blog.credits.originalAuthor && (
                <p>
                  <strong>Original Author:</strong>{" "}
                  {blog.credits.originalAuthor}
                </p>
              )}
              {blog.credits.originalSource && (
                <p>
                  <strong>Source:</strong> {blog.credits.originalSource}
                </p>
              )}
              {blog.credits.sourceUrl && (
                <p>
                  <strong>URL:</strong>{" "}
                  <a
                    href={blog.credits.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {blog.credits.sourceUrl}
                  </a>
                </p>
              )}
              {blog.credits.licenseType && (
                <p>
                  <strong>License:</strong> {blog.credits.licenseType}
                </p>
              )}
              {blog.credits.translatedFrom && (
                <p>
                  <strong>Translated from:</strong>{" "}
                  {blog.credits.translatedFrom}
                </p>
              )}
              {blog.credits.adaptedFrom && (
                <p>
                  <strong>Adapted from:</strong> {blog.credits.adaptedFrom}
                </p>
              )}
              {blog.credits.creditText && (
                <p className="text-sm text-muted-foreground">
                  {blog.credits.creditText}
                </p>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </article>
  );
}
