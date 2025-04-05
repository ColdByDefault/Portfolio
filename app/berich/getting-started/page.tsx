'use client'
import BlogSection from "@/components/berich/Blog"
import FeatureCard from "@/components/ui/feature-card";
import React , { useEffect, useState } from 'react';


export default function GettingStarted() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/posts');
      const data = await res.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);
  return (
    <main className="w-full mx-auto">
      <h1 className="">How to build like this page:</h1>
      {/* <BlogSection posts={posts} /> */}
      <FeatureCard title="hello" description="test" link="link" linkText="linkText"/>
    </main>
  )
}

