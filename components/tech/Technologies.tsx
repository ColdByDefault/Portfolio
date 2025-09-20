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
import {
  getCardHoverClasses,
  getOverlayStyles,
  gradientShiftCSS,
} from "@/lib/card-animations";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

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
  const [api, setApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const t = useTranslations("Technologies");
  const tCategories = useTranslations("Technologies.categories");
  const { cardsPerSlide } = useResponsiveCarousel();

  // Calculate the maximum number of items in any tech group to determine carousel height
  const maxItems = Math.max(...techGroups.map((group) => group.items.length));
  // Estimate carousel height based on the tallest possible card
  const estimatedCardHeight = 180 + Math.ceil(maxItems / 3) * 45; // 180px base + 45px per row of badges
  const carouselHeight = Math.max(500, estimatedCardHeight + 120); // Further increased base height and padding

  // Create slides by grouping techGroups based on cardsPerSlide
  const slides = [];
  for (let i = 0; i < techGroups.length; i += cardsPerSlide) {
    slides.push(techGroups.slice(i, i + cardsPerSlide));
  }

  const totalSlides = slides.length;

  // Update carousel state when API is available
  useEffect(() => {
    if (!api) return;

    const updateCarouselState = () => {
      setCurrentSlide(api.selectedScrollSnap());
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    updateCarouselState();
    api.on("select", updateCarouselState);

    return () => {
      api.off("select", updateCarouselState);
    };
  }, [api]);

  const goToSlide = (slideIndex: number) => {
    if (api) {
      api.scrollTo(slideIndex);
    }
  };

  const renderTechCard = (group: (typeof techGroups)[0]) => {
    const isCurrentCardHovered = hoveredCard === group.category;

    return (
      <Card
        key={group.category}
        className={`${getCardHoverClasses(isCurrentCardHovered)} flex flex-col`}
        onMouseEnter={() => setHoveredCard(group.category)}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <CardHeader className="pb-3 sm:pb-4 flex-shrink-0">
          <CardTitle className="text-lg sm:text-xl font-semibold text-center">
            {tCategories(group.categoryKey)}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 sm:px-6 flex items-center justify-center">
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center items-center w-full">
            {group.items.map(({ name, Icon }) => (
              <motion.div
                key={name}
                className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border hover:shadow-sm transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={16} className="flex-shrink-0 sm:w-5 sm:h-5" />
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
        {/* Dark mode gradient overlay */}
        <div
          className={`
            absolute inset-0 rounded-lg transition-opacity duration-500 pointer-events-none dark:block hidden
            ${isCurrentCardHovered ? "opacity-100" : "opacity-0"}
          `}
          style={getOverlayStyles(isCurrentCardHovered, true)}
        />
      </Card>
    );
  };

  return (
    <section
      className="px-4 max-w-7xl mx-auto flex flex-col space-y-4 sm:space-y-6 lg:space-y-8"
      id="tech"
    >
      <Card className="relative overflow-hidden bg-transparent !border-0 shadow-none">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl sm:text-3xl lg:text-4xl font-light text-black dark:text-white">
            {t("title")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              setApi={setApi}
              className="w-full px-8 sm:px-12"
              style={{ height: `${carouselHeight}px` }}
            >
              <CarouselContent
                className="-ml-2 md:-ml-4"
                style={{ height: `${carouselHeight}px` }}
              >
                {slides.map((slide, slideIndex) => (
                  <CarouselItem key={slideIndex} className="pl-2 md:pl-4">
                    <div
                      className={`grid gap-4 sm:gap-6 items-start ${
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
              <CarouselPrevious className="-left-4 sm:-left-6 bg-background/95 border-border hover:bg-accent hover:text-accent-foreground shadow-lg backdrop-blur-sm transition-all duration-200 hover:shadow-xl disabled:opacity-50 disabled:hover:bg-background/95" />
              <CarouselNext className="-right-4 sm:-right-6 bg-background/95 border-border hover:bg-accent hover:text-accent-foreground shadow-lg backdrop-blur-sm transition-all duration-200 hover:shadow-xl disabled:opacity-50 disabled:hover:bg-background/95" />
            </Carousel>

            {/* Dot Indicators */}
            {totalSlides > 1 && (
              <div className="flex justify-center mt-6 space-x-2">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className={`w-3 h-3 rounded-full p-0 transition-all duration-200 ${
                      index === currentSlide
                        ? "bg-primary scale-110 shadow-sm"
                        : "bg-muted hover:bg-muted-foreground/20 border border-border"
                    }`}
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </CardContent>
        <div
          dangerouslySetInnerHTML={{
            __html: `<style>${gradientShiftCSS}</style>`,
          }}
        />
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
