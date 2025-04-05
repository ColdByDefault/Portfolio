'use client';
import React from "react";

import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import { useTheme } from "next-themes";

interface Post {
  fileName: string;
  content: string;
}

interface BlogSectionProps {
  posts: Post[];
}

export default function BlogSection({ posts }: BlogSectionProps) {
  const { theme } = useTheme()
  return (
    <section id="blog"
      className={`flex flex-col flex-grow min-w-full p-4 ${theme === "dark" ? "dark" : "light"}`}>
      <h1 className="text-3xl font-bold mb-12 text-center">My Blog</h1>
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div
            key={post.fileName}
            className="border rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">
              {post.fileName.replace('.md', '')}
            </h2>
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              remarkPlugins={[remarkGfm, remarkBreaks]}>
              {post.content}
            </ReactMarkdown>
          </div>
        ))}
      </div>
    </section>
  );
}
