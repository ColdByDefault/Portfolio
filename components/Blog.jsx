'use client';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';

export default function BlogSection({ posts }) {
  return (
    <section id="blog" className="py-16 lg:w-1/2 lg:mx-auto sm:w-[90%] sm:px-4 md:w-[90%] md:px-4
      bg-zinc-900/30 backdrop-blur-sm rounded-xl p-6 border border-zinc-800 text-white">
      <h1 className="text-3xl font-bold mb-8">My Blog</h1>
      
      {posts.map((post) => (
        <div key={post.fileName} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{post.fileName.replace('.md', '')}</h2>
          <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm, remarkBreaks]}>
            {post.content}
          </ReactMarkdown>
        </div>
      ))}
    </section>
  );
}
