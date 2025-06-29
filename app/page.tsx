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





export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2200);
    return () => clearTimeout(timer);
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
        <div className=""  id="projects-sect">
          <ProjectSection /> {/* parallax effect */}
        </div>
        <div className="flex flex-col items-center justify-center lg:flex-row pattern mt-6">
          <Technologies />
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