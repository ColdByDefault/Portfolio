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
import Hero from "@/components/Hero";
import LoadingScreen from "@/components/LoadingScreen";
import { useState, useEffect } from "react";






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
        <div className="fixed top-0 left-0 w-full h-full z-50">
          <LoadingScreen onComplete={() => setIsLoading(false)} text="ColdByDefault" />
        </div>
      )}
      <Hero />
    </>
  );
}