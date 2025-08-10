/**
 * German Homepage
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */
"use client";

import CertificationShowcase from "@/components/cer/CertificationShowCase";
import Hero from "@/components/hero/Hero";
import LoadingScreen from "@/components/visuals/LoadingScreen";
import { Background } from "@/components/visuals/motion-background";
import Technologies from "@/components/tech/Technologies";
import { ProjectsShowcase } from "@/components/projects";
import { GitHubShowcase } from "@/components/github";
import { PageSpeedInsights } from "@/components/pagespeed";
import { useState, useEffect } from "react";

export default function GermanHomePage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  // Prevent hydration mismatch by not rendering loading screen on server
  const showLoadingScreen = mounted && isLoading;

  return (
    <div lang="de">
      {showLoadingScreen && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}
      <Background />
      <div className="relative z-10">
        <Hero />
        <ProjectsShowcase />
        <Technologies />
        <GitHubShowcase />
        <CertificationShowcase />
        <PageSpeedInsights />
      </div>
    </div>
  );
}
