/**
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
 */
"use client";
import { Hero } from "@/components/hero";
import { useTranslations } from "next-intl";
import { CompanyBanner } from "@/components/companies";
import { PackageCard } from "@/components/services";
import { servicePackages } from "@/data/servicesData";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { LoadingSkeleton } from "@/components/visuals";
import { ShowcaseSection } from "@/components/use-cases";
import { CTAButton } from "@/components/ui/cta-button";

// Dynamically import heavy components with loading states
const Capabilities = dynamic(
  () =>
    import("@/components/tech").then((mod) => ({ default: mod.Capabilities })),
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
  const tt = useTranslations("Services");


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
            <Capabilities />
          </Suspense>

          {/* Service Packages Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-8xl mx-auto">
              <h2 className="lg:text-4xl text-xl font-medium text-center mb-8 text-black dark:text-white">
                {t("services.title")}
              </h2>
              <div className="flex flex-wrap justify-center gap-6">
                {servicePackages.map((pkg) => (
                  <PackageCard key={pkg.id} pkg={pkg} />
                ))}
              </div>
              {/*  CTA */}
              <div className="mt-10 flex flex-col items-center gap-1.5 justify-center
              border max-w-xl mx-auto p-6 rounded-lg bg-background/70 backdrop-blur-sm">
                <h2 className="font-bold">{tt("cta.title")}</h2>
                <p className="text-gray-500">{tt("cta.subtitle")}</p>
                <CTAButton
                  label={tt("cta.button")}
                  variant="default"
                  className="border-gray-300 dark:border-gray-600 hover:bg-sky-600 hover:text-white hover:border-sky-600 text-sm px-4 py-2 h-auto cursor-pointer transition-colors duration-300"
                />
              </div>
            </div>
          </section>

          {/* Project Showcase Section */}
          <section className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <ShowcaseSection />
            </div>
          </section>

          <Suspense fallback={<LoadingSkeleton />}>
            <CertificationShowcase className="py-12 px-4 sm:px-6 lg:px-8" />
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
