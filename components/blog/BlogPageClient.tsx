/**
 * Client-side Blog Page with Language Filtering
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */
"use client";

import { useState } from "react";
import { BlogsList, LanguageFilter } from "@/components/blog";
import type { Blog, BlogLanguage } from "@/types/blogs";

interface BlogApiResponse {
  blogs: Blog[];
}

interface BlogPageClientProps {
  initialBlogs: Blog[];
}

export function BlogPageClient({ initialBlogs }: BlogPageClientProps) {
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
  const [selectedLanguage, setSelectedLanguage] = useState<
    BlogLanguage | "all"
  >("all");
  const [isLoading, setIsLoading] = useState(false);

  const handleLanguageChange = (language: BlogLanguage | "all") => {
    setSelectedLanguage(language);
    setIsLoading(true);

    const fetchBlogs = async () => {
      try {
        const params = new URLSearchParams();
        if (language !== "all") {
          params.append("language", language);
        }

        const apiUrl = `/api/blog?${params.toString()}`;
        console.log("Fetching blogs from:", apiUrl);

        const response = await fetch(apiUrl);
        console.log("Blog API response status:", response.status);

        if (response.ok) {
          const data = (await response.json()) as BlogApiResponse;
          console.log("Blog API returned:", data.blogs.length, "blogs");
          setBlogs(data.blogs);
        } else {
          console.error(
            "Blog API error:",
            response.status,
            response.statusText
          );
          // Fallback to client-side filtering
          if (language === "all") {
            setBlogs(initialBlogs);
          } else {
            setBlogs(initialBlogs.filter((blog) => blog.language === language));
          }
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        // Fallback to client-side filtering
        if (language === "all") {
          setBlogs(initialBlogs);
        } else {
          setBlogs(initialBlogs.filter((blog) => blog.language === language));
        }
      } finally {
        setIsLoading(false);
      }
    };

    void fetchBlogs();
  };

  return (
    <div className="flex flex-col min-h-full">
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-muted-foreground mb-6">
            Thoughts, tutorials, and insights about development and technology.
          </p>

          {/* Language Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3">Filter by Language:</h3>
            <LanguageFilter
              selectedLanguage={selectedLanguage}
              onLanguageChange={handleLanguageChange}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading blogs...</p>
            </div>
          </div>
        ) : (
          <BlogsList blogs={blogs} />
        )}
      </div>
    </div>
  );
}
