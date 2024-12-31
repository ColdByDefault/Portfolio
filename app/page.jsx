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
      title: "NEXT.JS",
      src: "/assets/nextJs.png",
    },
    {
      title: "React",
      src: "/assets/react.png",
    },
    {
      title: "python",
      src: "/assets/python2.png",
    },
    {
      title: "Javascript",
      src: "/assets/js.png",
    },
    {
      title: "Tailwindcss",
      src: "/assets/tailwind.png",
    },
    {
      title: "Machine Learning",
      src: "/assets/pyTorch.png",
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
           <div className="flex flex-col gap-12 items-center justify-center lg:flex-row my-4">
            <div className="w-full">
              <Timeline />
            </div>  
            <div className="w-full">
              <FocusCards cards={cards}/>
            </div>          
          </div>
        </div>
    </>
  );
}
