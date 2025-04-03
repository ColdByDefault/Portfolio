'use client';
import { useState, useEffect } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Hero from "@/components/Hero";
import CertificationShowcase from "@/components/CertificationShowCase";
import ScrollToTopButton from "@/components/ui/ScrollTop";
import Technologies from "@/components/Technologies";

import {CarouselPlugin} from "@/components/CertiSliderSM"




interface Post {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  // Add other post properties as needed
}

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Fetch posts from the API route
    async function loadPosts() {
      try {
        const response = await fetch('/api/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error loading posts:", error);
      }
    }
    loadPosts();
  }, []);

  return (
    <>
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full z-50 bg-black">
          <LoadingScreen onComplete={() => setIsLoading(false)} text="ColdByDefault" />
        </div>
      )}
      <div className="overflow-hidden relative">
        <div>
          <Hero />
        </div>
        <div className="flex flex-col items-center justify-center lg:flex-row pattern" id="projects-sect">
          <Technologies />
        </div>
        <div className="flex flex-col items-center justify-center lg:flex-row pattern" id="timeline">
        {/* <Projects /> */}
        </div>
        <div className="mt-12 pattern" id="cer">
          <div className="hidden lg:block">
            <CertificationShowcase />
          </div>
          <div className="lg:hidden flex w-full h-full pattern z-50 translate-x-7" id="projects-sect">
            <CarouselPlugin autoPlayDelay={2000} maxWidth="max-w-xs"/>
          </div>
        </div>
        <div>
          <ScrollToTopButton />
        </div>
      </div>
    </>
  );
}