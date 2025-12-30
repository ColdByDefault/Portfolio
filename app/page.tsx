/**
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
 */
"use client";
import { Hero } from "@/components/hero";
import { useTranslations } from "next-intl";
import { CompanyBanner } from "@/components/companies";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { LoadingSkeleton } from "@/components/visuals";

// Dynamically import heavy components with loading states
const PortoCard = dynamic(() => import("@/components/aboutPorto"), {
  loading: () => <LoadingSkeleton />,
  ssr: false,
});

const Technologies = dynamic(
  () =>
    import("@/components/tech").then((mod) => ({ default: mod.Technologies })),
  {
    loading: () => <LoadingSkeleton />,
    ssr: false,
  }
);

const CertificationShowcase = dynamic(
  () =>
    import("@/components/cer").then((mod) => ({
      default: mod.CertificationShowcase,
    })),
  {
    loading: () => <LoadingSkeleton />,
    ssr: false,
  }
);

const PageSpeedInsights = dynamic(
  () =>
    import("@/components/pagespeed").then((mod) => ({
      default: mod.PageSpeedInsights,
    })),
  {
    loading: () => <LoadingSkeleton />,
    ssr: false,
  }
);

const ClientBackground = dynamic(
  () =>
    import("@/components/visuals").then((mod) => ({
      default: mod.ClientBackground,
    })),
  {
    loading: () => null,
    ssr: false,
  }
);

export default function Home() {
  const t = useTranslations("Home");

  return (
    <div>
      <ClientBackground />
      {/* Scroll Indicator */}
      <div className="hidden lg:block lg:absolute lg:bottom-24 lg:left-1/6 xl:left-1/5 xl:bottom-40 2xl:left-1/4 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
          <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2"></div>
        </div>
      </div>

      <div className="min-h-screen flex flex-col justify-evenly" id="home">
        <Hero />
        {/* Company Banner */}
        <span className="text-sm font-medium text-center text-black dark:text-white">
          {t("companiesContributing")}
        </span>
        <CompanyBanner />
      </div>

      {/* Main content section */}
      <div className="relative" id="main-content">
        {/* Content Container */}
        <div className="relative z-10">
          <Suspense fallback={<LoadingSkeleton />}>
            <Technologies />
          </Suspense>

          <Suspense fallback={<LoadingSkeleton />}>
            <CertificationShowcase className="py-12 px-4 sm:px-6 lg:px-8" />
          </Suspense>

          <Suspense fallback={<LoadingSkeleton />}>
            <div className="container mx-auto px-4 py-8">
              <PortoCard />
            </div>
          </Suspense>

          <Suspense fallback={<LoadingSkeleton />}>
            <div className="py-12 px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-light text-center mb-8 text-black dark:text-white">
                  Website Performance
                </h2>
                <PageSpeedInsights
                  url="https://www.coldbydefault.com"
                  showRefreshButton={true}
                  showBothStrategies={true}
                />
              </div>
            </div>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
