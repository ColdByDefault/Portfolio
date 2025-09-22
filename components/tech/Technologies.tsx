/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */
"use client";

import { motion } from "framer-motion";
import { techGroups } from "@/data/tech";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { getCardHoverClasses, getOverlayStyles } from "@/lib/card-animations";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Custom hook for responsive breakpoints
function useResponsiveCarousel() {
  const [cardsPerSlide, setCardsPerSlide] = useState(3);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
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

export default function Technologies() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const t = useTranslations("Technologies");
  const tCategories = useTranslations("Technologies.categories");
  const { cardsPerSlide } = useResponsiveCarousel();

  // Calculate the maximum number of items in any tech group to determine carousel height
  const maxItems = Math.max(...techGroups.map((group) => group.items.length));
  // Responsive carousel height - smaller on mobile devices
  const baseHeight =
    cardsPerSlide === 1 ? 240 : cardsPerSlide === 2 ? 260 : 280;
  const itemHeight = cardsPerSlide === 1 ? 20 : 25; // Even tighter on mobile
  const carouselHeight = Math.max(
    baseHeight,
    baseHeight + (maxItems - 4) * itemHeight
  );

  // Create slides by grouping techGroups based on cardsPerSlide
  const slides = [];
  for (let i = 0; i < techGroups.length; i += cardsPerSlide) {
    slides.push(techGroups.slice(i, i + cardsPerSlide));
  }

  const renderTechCard = (group: (typeof techGroups)[0]) => {
    const isCurrentCardHovered = hoveredCard === group.category;

    return (
      <Card
        key={group.category}
        className={`${getCardHoverClasses(isCurrentCardHovered)} flex flex-col`}
        onMouseEnter={() => setHoveredCard(group.category)}
        onMouseLeave={() => setHoveredCard(null)}
        role="article"
        aria-labelledby={`card-title-${group.categoryKey}`}
        aria-describedby={`card-content-${group.categoryKey}`}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setHoveredCard(isCurrentCardHovered ? null : group.category);
          }
        }}
      >
        <CardHeader className="pb-3 sm:pb-4 flex-shrink-0">
          <CardTitle
            id={`card-title-${group.categoryKey}`}
            className="text-lg sm:text-xl font-semibold text-center"
          >
            {tCategories(group.categoryKey)}
          </CardTitle>
        </CardHeader>
        <CardContent
          className="px-3 sm:px-6 flex items-center justify-center"
          id={`card-content-${group.categoryKey}`}
          role="list"
          aria-label={`${tCategories(group.categoryKey)} technologies`}
        >
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center items-center w-full">
            {group.items.map(({ name, Icon }) => (
              <motion.div
                key={name}
                className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border hover:shadow-sm transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                role="listitem"
                aria-label={`${name} technology`}
                tabIndex={0}
              >
                <Icon
                  size={16}
                  className="flex-shrink-0 sm:w-5 sm:h-5"
                  aria-hidden="true"
                />
                <span className="text-xs sm:text-sm font-medium whitespace-nowrap cursor-default">
                  {name}
                </span>
              </motion.div>
            ))}
          </div>
        </CardContent>
        <div
          className={`
            absolute inset-0 rounded-lg transition-opacity duration-500 pointer-events-none
            ${isCurrentCardHovered ? "opacity-100" : "opacity-0"}
          `}
          style={getOverlayStyles(isCurrentCardHovered)}
        />
      </Card>
    );
  };

  return (
    <section
      className="px-4 max-w-7xl mx-auto flex flex-col space-y-4 sm:space-y-6 lg:space-y-8"
      id="tech"
      aria-labelledby="tech-section-title"
      role="region"
    >
      <Card className="relative overflow-hidden bg-transparent !border-0 shadow-none">
        <CardHeader className="text-center pb-2">
          <CardTitle
            id="tech-section-title"
            className="text-2xl sm:text-3xl lg:text-4xl font-light text-black dark:text-white"
          >
            {t("title")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Hidden instructions for screen readers */}
          <div
            id="carousel-instructions"
            className="sr-only"
            aria-hidden="true"
          >
            Use arrow keys or navigation buttons to browse through technology
            categories. Press Enter or Space on cards to view details.
          </div>
          <div className="relative">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full px-8 sm:px-12"
              style={{ height: `${carouselHeight}px` }}
              role="region"
              aria-label={`${t("title")} carousel with ${slides.length} slides`}
              aria-describedby="carousel-instructions"
            >
              <CarouselContent
                className="-ml-2 md:-ml-4"
                style={{ height: `${carouselHeight}px` }}
                role="tablist"
                aria-live="polite"
              >
                {slides.map((slide, slideIndex) => (
                  <CarouselItem
                    key={slideIndex}
                    className="pl-2 md:pl-4"
                    role="tabpanel"
                    aria-label={`Slide ${slideIndex + 1} of ${slides.length}`}
                    tabIndex={0}
                  >
                    <div
                      className={`grid gap-4 sm:gap-6 items-center justify-items-center h-full ${
                        cardsPerSlide === 1
                          ? "grid-cols-1"
                          : cardsPerSlide === 2
                          ? "grid-cols-2"
                          : "grid-cols-3"
                      }`}
                    >
                      {slide.map((group) => renderTechCard(group))}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* Custom Navigation Buttons - Enhanced for better theming */}
              <CarouselPrevious
                className="-left-4 sm:-left-6 bg-background/95 border-border hover:bg-accent hover:text-accent-foreground shadow-lg backdrop-blur-sm transition-all duration-200 hover:shadow-xl disabled:opacity-50 disabled:hover:bg-background/95"
                aria-label="Previous slide - View previous technology categories"
              />
              <CarouselNext
                className="-right-4 sm:-right-6 bg-background/95 border-border hover:bg-accent hover:text-accent-foreground shadow-lg backdrop-blur-sm transition-all duration-200 hover:shadow-xl disabled:opacity-50 disabled:hover:bg-background/95"
                aria-label="Next slide - View next technology categories"
              />
            </Carousel>
          </div>
        </CardContent>
      </Card>
      <motion.div
        className="text-center pt-2 sm:pt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 10, delay: 2 }}
      >
        <p className="text-sm sm:text-base text-black dark:text-white">
          {t("manyMoreTechnologies")}
        </p>
      </motion.div>
    </section>
  );
}
