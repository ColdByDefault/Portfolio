/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

"use client";

import { Hero } from "@/components/hero";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { CompanyBanner } from "@/components/companies";
import PortoCard from "@/components/aboutPorto";
import { NoSSR } from "@/components/NoSSR";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { LoadingScreen } from "@/components/visuals";

// Dynamically import non-critical components to reduce initial bundle size
const PageSpeedInsights = dynamic(
  () =>
    import("@/components/pagespeed").then((mod) => ({
      default: mod.PageSpeedInsights,
    })),
  {
    loading: () => <div className="animate-pulse bg-muted h-48 rounded-lg" />,
  }
);

const ClientBackground = dynamic(
  () => import("@/components/visuals/ClientBackground")
);

const Technologies = dynamic(() => import("@/components/tech/Technologies"), {
  loading: () => <div className="animate-pulse bg-muted h-64 rounded-lg" />,
});

const CertificationShowcase = dynamic(
  () =>
    import("@/components/cer").then((mod) => ({
      default: mod.CertificationShowcase,
    })),
  {
    loading: () => <div className="animate-pulse bg-muted h-48 rounded-lg" />,
  }
);

const GitHubShowcase = dynamic(
  () =>
    import("@/components/github").then((mod) => ({
      default: mod.GitHubShowcase,
    })),
  {
    loading: () => <div className="animate-pulse bg-muted h-64 rounded-lg" />,
  }
);

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const t = useTranslations("Home");

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds duration as requested
    return () => clearTimeout(timer);
  }, []);

  // Control loading screen and main content visibility
  const showLoadingScreen = mounted && isLoading;
  const showMainContent = mounted && !isLoading;


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

      <NoSSR>
        {showMainContent && (
          <>
            {/* Client-side background component wrapped in NoSSR */}
            <ClientBackground />

            {/* Scroll Indicator */}
            <div className="hidden lg:block lg:absolute lg:bottom-24 lg:left-1/6 xl:left-1/5 xl:bottom-40 2xl:left-1/4 transform -translate-x-1/2 animate-bounce">
              <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
                <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2"></div>
              </div>
            </div>

            <div
              className="min-h-screen flex flex-col justify-evenly"
              id="home"
            >
              <Hero />
              {/* Company Banner */}
              <span className="text-sm font-medium text-center text-black dark:text-white">
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
                    priority={false}
                    quality={75}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                    sizes="100vw"
                    loading="lazy"
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
                <div className="container mx-auto px-4 py-8">
                  <PortoCard />
                </div>
                <div className="py-12 px-4 sm:px-6 lg:px-8" id="github">
                  <GitHubShowcase />
                </div>
                <Technologies />
                <CertificationShowcase className="py-12 px-4 sm:px-6 lg:px-8" />
                <div className="py-12 px-4 sm:px-6 lg:px-8">
                  <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-light text-center mb-8 text-black dark:text-white">
                      Website Performance
                    </h2>
                    <NoSSR>
                      <PageSpeedInsights
                        url="https://www.coldbydefault.com"
                        showRefreshButton={true}
                        showBothStrategies={true}
                      />
                    </NoSSR>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </NoSSR>
    </div>
  );
}
