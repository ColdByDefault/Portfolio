/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { companiesData, type CompanyLogo } from "@/data/companiesData";

interface CompanyBannerProps {
  className?: string;
  speed?: "slow" | "normal" | "fast";
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  showTooltip?: boolean;
}

const speedMap = {
  slow: "animate-scroll-slow",
  normal: "animate-scroll",
  fast: "animate-scroll-fast",
};

const directionMap = {
  left: "",
  right: "animate-reverse",
};

export function CompanyBanner({
  className,
  speed = "normal",
  direction = "right",
  pauseOnHover = true,
  showTooltip = true,
}: CompanyBannerProps) {
  // Duplicate the array to create seamless loop
  const duplicatedLogos = [...companiesData, ...companiesData];

  const animationClass = cn(
    speedMap[speed],
    directionMap[direction],
    pauseOnHover && "hover:pause"
  );

  return (
    <div className={cn("w-full overflow-hidden bg-black/60 dark:bg-black/80", className)}>
      <div
        className={cn("flex whitespace-nowrap", animationClass)}
        style={{
          width: `${companiesData.length * 200}px`,
        }}
      >
        {duplicatedLogos.map((company, index) => (
          <CompanyLogoItem
            key={`${company.id}-${index}`}
            company={company}
            showTooltip={showTooltip}
          />
        ))}
      </div>
    </div>
  );
}

interface CompanyLogoItemProps {
  company: CompanyLogo;
  showTooltip: boolean;
}

function CompanyLogoItem({ company, showTooltip }: CompanyLogoItemProps) {
  const hasLogo = company.logo && company.logo.trim() !== "";

  const logoElement = (
    <div className="group relative mx-8 flex h-16 w-full items-center justify-center transition-all duration-300 hover:scale-110">
      {hasLogo ? (
        <div className="relative h-12 w-24 opacity-60 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0">
          <Image
            src={company.logo!}
            alt={`${company.name} logo`}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 80px, 96px"
          />
        </div>
      ) : (
        <div className="flex h-12 w-24 items-center justify-center opacity-60 transition-all duration-300 group-hover:opacity-100">
          <span className="text-sm font-semibold text-white group-hover:text-foreground">
            {company.name}
          </span>
        </div>
      )}

      {showTooltip && (
        <div className="absolute -top-12 left-1/2 z-10 -translate-x-1/2 transform opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="rounded-lg bg-popover px-3 py-2 text-sm text-popover-foreground shadow-lg">
            <div className="font-medium">{company.name}</div>
            {company.period && (
              <div className="text-xs text-muted-foreground">
                {company.period}
              </div>
            )}
            <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-popover"></div>
          </div>
        </div>
      )}
    </div>
  );

  if (company.url) {
    return (
      <a
        href={company.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block"
      >
        {logoElement}
      </a>
    );
  }

  return <div className="inline-block">{logoElement}</div>;
}

// Alternative variant with different styling
export function CompanyBannerMinimal({
  className,
  speed = "normal",
  direction = "left",
}: Omit<CompanyBannerProps, "pauseOnHover" | "showTooltip">) {
  const duplicatedLogos = [...companiesData, ...companiesData];

  const animationClass = cn(speedMap[speed], directionMap[direction]);

  return (
    <div className={cn("w-full overflow-hidden", className)}>
      <div
        className={cn(
          "flex whitespace-nowrap border-y border-border/20 py-4",
          animationClass
        )}
        style={{
          width: `${companiesData.length * 180}px`,
        }}
      >
        {duplicatedLogos.map((company, index) => {
          const hasLogo = company.logo && company.logo.trim() !== "";

          return (
            <div
              key={`${company.id}-${index}`}
              className="mx-6 flex h-12 w-28 items-center justify-center"
            >
              {hasLogo ? (
                <div className="relative h-8 w-20 opacity-40 transition-opacity duration-300 hover:opacity-80">
                  <Image
                    src={company.logo!}
                    alt={`${company.name} logo`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 64px, 80px"
                  />
                </div>
              ) : (
                <div className="flex h-8 w-20 items-center justify-center opacity-40 transition-opacity duration-300 hover:opacity-80">
                  <span className="text-xs font-medium text-foreground">
                    {company.name}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { type CompanyLogo, companiesData };
