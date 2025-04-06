/* USAGE

const [posts, setPosts] = useState([]);
useEffect(() => {
  const fetchPosts = async () => {
    const res = await fetch('/api/posts');
    const data = await res.json();
    setPosts(data);
  };
  fetchPosts();
}, []);


<BlogSection posts={posts} />

OR
one single file
const posts = [
  { fileName: 'post1.md', path: '/publicPosts/new.md' }, content is optional
]
*/

/* 'use client';
import React, { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import { useTheme } from "next-themes";

interface Post {
  fileName: string;
  content?: string;
  path?: string;
}

interface BlogSectionProps {
  posts: Post[];
}

export default function BlogSection({ posts }: BlogSectionProps) {
  const { theme } = useTheme();
  const [loadedPosts, setLoadedPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchContent = async () => {
      const updatedPosts = await Promise.all(posts.map(async (post) => {
        // If content is already present, no need to fetch
        if (post.content) return post;

        // Fetch content from the provided path
        try {
          const res = await fetch(post.path || '');
          if (!res.ok) throw new Error(`Failed to load ${post.path}`);
          const text = await res.text();
          return { ...post, content: text };
        } catch (err) {
          console.error(err);
          return { ...post, content: "Failed to load content." };
        }
      }));

      setLoadedPosts(updatedPosts);
    };

    fetchContent();
  }, [posts]);

  return (
    <section
      id="blog"
      className={`relative flex flex-col flex-grow min-w-full p-4 ${theme === "dark" ? "dark" : "light"}`}>
      <h1 className="text-3xl font-bold mb-12 text-center">My Blog</h1>
      <div className="">
        {loadedPosts.map((post) => (
          <div
            key={post.fileName}
            className="relative w-full rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">
              {post.fileName.replace('.md', '')}
            </h2>
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              remarkPlugins={[remarkGfm, remarkBreaks]}>
              {post.content || 'Loading...'}
            </ReactMarkdown>
          </div>
        ))}
      </div>
    </section>
  );
}

 */