'use client';
import { useState, useEffect } from "react";
import LoadingScreen from "@/components/main/LoadingScreen";
import Hero from "@/components/main/Hero";
import CertificationShowcase from "@/components/main/CertificationShowCase";
import ScrollToTopButton from "@/components/ui/ScrollTop";
import Technologies from "@/components/main/Technologies";
import {CarouselPlugin} from "@/components/main/CertiSliderSM"
import ProjectSection from "@/components/main/ProjectSection"
import { ParallaxProvider } from "react-scroll-parallax"





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
      <ParallaxProvider>
      <div className="overflow-hidden relative">
        <div className="">
          <Hero />
        </div>
        <div className="block min-h-screen"  id="projects-sect">
          <ProjectSection /> {/* parallax effect */}
        </div>
        <div className="flex flex-col items-center justify-center lg:flex-row pattern">
          <Technologies />
        </div>
        <div className="flex flex-col items-center justify-center lg:flex-row pattern" id="timeline">
        {/* <Projects /> */}
        </div>
        <div className="mt-12 pattern" id="cer">
          <div className="hidden lg:block md:block">
            <CertificationShowcase />
          </div>
          <div className="lg:hidden md:hidden flex flex-col w-full h-full justify-center items-center 
          mt-24 pattern z-50" id="projects-sect">
            <h2 className="text-3xl font-light text-gray-200 sm:text-4xl text-center mb-8 mt-8">
              My Certifications
            </h2>
            <CarouselPlugin autoPlayDelay={2000} maxWidth="max-w-xs"/>
          </div>
        </div>
        <div>
          <ScrollToTopButton />
        </div>
      </div>
      </ParallaxProvider>
    </>
  );
}