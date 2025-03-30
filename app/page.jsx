'use client';
import { useState, useEffect } from "react";
import LoadingScreen from "@components/LoadingScreen";
import Hero from "@components/main/Hero";
import CertificationShowcase from "@components/main/CertificationShowCase";
import ScrollToTopButton from "@components/ui/ScrollTop";


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
          <LoadingScreen onComplete={() => setIsLoading(false)} text="ColdByDefault" />
        </div>
      )}
      <div className="overflow-hidden">
        <div>
          <Hero />
        </div>
        <div className="flex flex-col gap-12 items-center justify-center lg:flex-row my-4">
        </div>
        <div className="mt-12">
          <CertificationShowcase />
        </div>
        <div>
          <ScrollToTopButton />
        </div>
      </div>
    </>
  );
}

