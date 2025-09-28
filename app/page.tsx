/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */
"use client";
import { Hero } from "@/components/hero";
import { useTranslations } from "next-intl";
import { CompanyBanner } from "@/components/companies";
import PortoCard from "@/components/aboutPorto";

import { GitHubShowcase } from "@/components/github";
import { Technologies } from "@/components/tech";
import { CertificationShowcase } from "@/components/cer";
import { PageSpeedInsights } from "@/components/pagespeed";
import { ClientBackground } from "@/components/visuals";

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
