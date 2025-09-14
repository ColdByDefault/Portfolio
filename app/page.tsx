/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 *
 * Renders the main client-side homepage for the portfolio, including loading screen,
 * hero section, company banner, sticky background image (dark mode), project showcase,
 * GitHub showcase, technologies, certifications, and website performance insights.
 *
 * Handles initial loading state with a timed loading screen and prevents hydration mismatch.
 * Utilizes internationalization for text content.
 *
 * @component
 * @returns {JSX.Element} The rendered homepage component.
 */

"use client";
import { CertificationShowcase } from "@/components/cer";
import { Hero } from "@/components/hero";
import LoadingScreen from "@/components/visuals/LoadingScreen";
import { Technologies } from "@/components/tech";
import { GitHubShowcase } from "@/components/github";
import { PageSpeedInsights } from "@/components/pagespeed";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { CompanyBanner } from "@/components/companies";
import { Background } from "@/components/visuals";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);
  const t = useTranslations("Home");

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
    <div>
      {showLoadingScreen && (
        <div className="fixed top-0 left-0 w-full h-full z-50">
          <LoadingScreen
            onComplete={() => setIsLoading(false)}
            text="ColdByDefault"
          />
        </div>
      )}
      <div>
        <Background />
      </div>
      {/* Scroll Indicator */}
      <div className="hidden lg:block lg:absolute lg:bottom-24 lg:left-1/6 xl:left-1/5 xl:bottom-40 2xl:left-1/4 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
          <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2"></div>
        </div>
      </div>
      <div className="min-h-screen flex flex-col justify-evenly" id="home">
        <Hero />
        {/* Company Banner */}
        <span className="text-md font-light text-center text-black dark:text-white">
          {t("companiesContributing")}
        </span>
        <CompanyBanner />
      </div>

      {/* Main content section with sticky background */}
      <div className="relative" id="main-content">
        {/* Sticky Background Image - Only in dark mode */}
        <div className="dark:block hidden sticky top-0 h-screen z-0">
          <div className="relative w-full h-full">
            <Image
              src="/bg.jpg"
              fill
              alt="Background image of Birmingham Museums Trust"
              className="object-cover object-center"
              priority
              quality={100}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40 dark:bg-black/60"></div>

            {/* Photo Credit - Hidden on small screens, visible on medium+ screens */}
            <div className="hidden md:block absolute bottom-4 right-4 text-xs text-white/70 hover:text-white/90 transition-colors duration-200">
              <span>
                Photo by{" "}
                <a
                  href="https://unsplash.com/@birminghammuseumstrust"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-white"
                >
                  Birmingham Museums Trust
                </a>{" "}
                on{" "}
                <a
                  href="https://unsplash.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-white"
                >
                  Unsplash
                </a>
              </span>
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 dark:-mt-[100vh]">
          <div className="py-12 px-4 sm:px-6 lg:px-8" id="github">
            <GitHubShowcase />
          </div>
          <Technologies />
          <CertificationShowcase className="py-12 px-4 sm:px-6 lg:px-8" />
          <div className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-light text-center mb-8 text-black dark:text-white">
                {t("WebsitePerformance")}
              </h2>
              <PageSpeedInsights
                url="https://www.coldbydefault.com"
                showRefreshButton={true}
                showBothStrategies={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
