'use client';
import { useState, useEffect } from "react";
import LoadingScreen from "@components/LoadingScreen";
import Hero from "@components/main/Hero";
import Timeline from "@components/main/Timeline";
import {FocusCards} from "@components/ui/focus-cards";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const cards = [
    {
      title: "Forest Adventure",
      src: "/assets/tailwind.png",
    },
    {
      title: "Valley of life",
      src: "/assets/tailwind.png",
    },
    {
      title: "Sala behta hi jayega",
      src: "/assets/tailwind.png",
    },
    {
      title: "Camping is for pros",
      src: "/assets/tailwind.png",
    },
    {
      title: "The road not taken",
      src: "/assets/tailwind.png",
    },
    {
      title: "The First Rule",
      src: "/assets/tailwind.png",
    },
  ];

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
          <LoadingScreen onComplete={() => setIsLoading(false)}
          text="ColdByDefault" />
        </div>
      )}
        <div className="overflow-hidden">
          <div>
            <Hero /> 
          </div>
          <div className="flex flex-col lg:flex-row 
          items-center justify-evenly gap-4 
          lg:my-0 my-8">
            <Timeline />            
            <FocusCards cards={cards}/>
          </div>
        </div>
    </>
  );
}
