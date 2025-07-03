/**
 * The `Home` component serves as the main entry point for the Portfolio.
 * It includes various sections such as the hero section, project showcase,
 * technologies, certifications, and a scroll-to-top button. The component
 * also handles loading state and fetches posts from an API.
 * typedef {Object} Post
 * property {string} id - The unique identifier for the post.
 * property {string} title - The title of the post.
 * property {string} excerpt - A short excerpt or summary of the post.
 * property {string} date - The publication date of the post.
 * property {string} slug - The slug used for the post's URL.
 *
 * @ returns {JSX.Element} The rendered `Home` component.
 *
 * remarks
 * - The `isLoading` state is used to display a loading screen for 2.2 seconds
 *   when the component is first mounted.
 * - Posts are fetched from the `/api/posts` endpoint and stored in the `posts` state.
 * - The component uses the `ParallaxProvider` to enable parallax effects in child components.
 */
"use client";
import CertificationShowcase from "@/components/cer/CertificationShowCase";
import { CarouselPlugin } from "@/components/cer/CertiSliderSM";
import Hero from "@/components/hero/Hero";
import LoadingScreen from "@/components/visuals/LoadingScreen";
import { Background } from "@/components/visuals/motion-background";
import Technologies from "@/components/tech/Technologies";
import { ProjectsShowcase } from "@/components/projects";
import { useState, useEffect } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {mounted && isLoading && (
        <div className="fixed top-0 left-0 w-full h-full z-50">
          <LoadingScreen
            onComplete={() => setIsLoading(false)}
            text="ColdByDefault"
          />
        </div>
      )}
      <Background />
      {/* Scroll Indicator */}
      <div className="hidden lg:block lg:absolute lg:bottom-8 lg:left-1/6 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
          <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2"></div>
        </div>
      </div>
      <Hero />
      <ProjectsShowcase className="py-12 px-4 sm:px-6 lg:px-8" />
      <Technologies />
      <CertificationShowcase className="hidden py-12 px-4 sm:px-6 lg:px-8 lg:block md:block" />
      <CarouselPlugin className="block lg:hidden md:hidden" />
    </div>
  );
}
