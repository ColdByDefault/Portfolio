/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */
"use client";

import { useState, useEffect } from "react";

/**
 * Responsive breakpoint configuration for carousel display
 */
interface ResponsiveCarouselConfig {
  /** Number of cards to display per slide */
  readonly cardsPerSlide: number;
  /** Whether the current view is mobile */
  readonly isMobile: boolean;
}

/**
 * Hook to manage responsive carousel behavior based on screen size
 * @returns Configuration object with cardsPerSlide and isMobile flags
 */
export function useResponsiveCarousel(): ResponsiveCarouselConfig {
  const [cardsPerSlide, setCardsPerSlide] = useState<number>(3);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkScreenSize = (): void => {
      const width = window.innerWidth;
      if (width < 640) {
        // mobile
        setCardsPerSlide(1);
        setIsMobile(true);
      } else if (width < 1024) {
        // tablet
        setCardsPerSlide(2);
        setIsMobile(false);
      } else {
        // desktop
        setCardsPerSlide(3);
        setIsMobile(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return { cardsPerSlide, isMobile };
}
