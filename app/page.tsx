/**
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
 */

"use client";
import { Hero } from "@/components/hero";
import { useTranslations } from "next-intl";
import { CompanyBanner } from "@/components/companies";
import { PackageCard } from "@/components/services";
import { servicePackages } from "@/data/hubs/servicesData";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { LoadingSkeleton } from "@/components/visuals";
import { ShowcaseSection } from "@/components/use-cases";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Dynamically import heavy components with loading states
const Capabilities = dynamic(
  () =>
    import("@/components/tech").then((mod) => ({ default: mod.Capabilities })),
  {
    loading: () => <LoadingSkeleton />,
    ssr: false,
  },
);

const CertificationShowcase = dynamic(
  () =>
    import("@/components/cer").then((mod) => ({
      default: mod.CertificationShowcase,
    })),
  {
    loading: () => <LoadingSkeleton />,
    ssr: false,
  },
);

const ClientBackground = dynamic(
  () =>
    import("@/components/visuals").then((mod) => ({
      default: mod.ClientBackground,
    })),
  {
    loading: () => null,
    ssr: false,
  },
);

const SpeedInsight = dynamic(
  () =>
    import("@/components/speed-insight").then((mod) => ({
      default: mod.SpeedInsight,
    })),
  {
    loading: () => <LoadingSkeleton />,
    ssr: false,
  },
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
          {/* PageSpeed Insights Section */}
          <Suspense
            fallback={
              <div className="min-h-80">
                <LoadingSkeleton />
              </div>
            }
          >
            <SpeedInsight className="py-12 px-4 sm:px-6 lg:px-8" />
          </Suspense>

          <Suspense
            fallback={
              <div className="min-h-100">
                <LoadingSkeleton />
              </div>
            }
          >
            <Capabilities />
          </Suspense>

          {/* Service Packages Section */}
          <Suspense
            fallback={
              <div className="min-h-150">
                <LoadingSkeleton />
              </div>
            }
          >
            <section className="py-16 px-4 sm:px-6 lg:px-8">
              <div className="max-w-8xl mx-auto">
                <h2 className="lg:text-4xl text-xl font-medium text-center mb-8 text-black dark:text-white">
                  {t("services.title")}
                </h2>
                <div className="flex justify-center mt-10">
                  <Link
                    href="/services"
                    className="inline-flex items-center z-50 gap-2 px-6 py-3 rounded-lg border border-black bg-black 
                    text-white dark:border-white dark:bg-white dark:text-black hover:bg-gray-800 
                    dark:hover:bg-gray-200 transition-all duration-300 font-medium text-sm group"
                  >
                    {tt("cta.viewAllLink")}
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
                <div className="flex flex-wrap justify-center gap-6 mt-10">
                  {servicePackages.map((pkg) => (
                    <PackageCard key={pkg.id} pkg={pkg} variant="compact" />
                  ))}
                </div>
              </div>
            </section>
          </Suspense>

          {/* Project Showcase Section */}
          <Suspense
            fallback={
              <div className="min-h-125">
                <LoadingSkeleton />
              </div>
            }
          >
            <section className="py-12 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <ShowcaseSection />
              </div>
            </section>
          </Suspense>

          <Suspense
            fallback={
              <div className="min-h-100">
                <LoadingSkeleton />
              </div>
            }
          >
            <CertificationShowcase className="py-12 px-4 sm:px-6 lg:px-8" />
          </Suspense>

          <Suspense fallback={<LoadingSkeleton />}></Suspense>
        </div>
      </div>
    </div>
  );
}
