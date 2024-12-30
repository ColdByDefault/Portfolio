'use client';
import { useState, useEffect } from "react";
import LoadingScreen from "@components/LoadingScreen";
import Hero from "@components/main/Hero";
import Timeline from "@components/main/Timeline";


export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

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
        <div>
          <div>
            <Hero /> 
          </div>
          <div>
            <Timeline />
          </div>
        </div>
    </>
  );
}
