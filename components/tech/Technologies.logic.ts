/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import { techGroups } from "@/data/tech";
import type { KeyboardEvent } from "react";

/**
 * Configuration object for carousel dimensions and layout
 */
interface CarouselConfig {
  /** Height of the carousel container in pixels */
  readonly height: number;
  /** CSS grid classes for responsive layout */
  readonly gridClasses: string;
}

/**
 * Handler functions for card interactions
 */
interface CardInteractionHandlers {
  /** Handle mouse enter event */
  readonly onMouseEnter: () => void;
  /** Handle mouse leave event */
  readonly onMouseLeave: () => void;
  /** Handle keyboard navigation */
  readonly onKeyDown: (e: KeyboardEvent<HTMLElement>) => void;
}

/**
 * Calculate carousel configuration based on responsive settings
 * @param cardsPerSlide - Number of cards to display per slide
 * @param maxItems - Maximum number of items in any tech group
 * @returns Carousel configuration object
 */
export function calculateCarouselConfig(
  cardsPerSlide: number,
  maxItems: number
): CarouselConfig {
  // Responsive carousel height - smaller on mobile devices
  const baseHeight =
    cardsPerSlide === 1 ? 240 : cardsPerSlide === 2 ? 260 : 280;
  const itemHeight = cardsPerSlide === 1 ? 20 : 25; // Even tighter on mobile
  const height = Math.max(baseHeight, baseHeight + (maxItems - 4) * itemHeight);

  // Grid classes based on cards per slide
  const gridClasses =
    cardsPerSlide === 1
      ? "grid-cols-1"
      : cardsPerSlide === 2
      ? "grid-cols-2"
      : "grid-cols-3";

  return { height, gridClasses };
}

/**
 * Generate slides by grouping tech groups based on cards per slide
 * @param cardsPerSlide - Number of cards to display per slide
 * @returns Array of tech group slides
 */
export function generateSlides(cardsPerSlide: number): (typeof techGroups)[] {
  const slides: (typeof techGroups)[] = [];
  for (let i = 0; i < techGroups.length; i += cardsPerSlide) {
    slides.push(techGroups.slice(i, i + cardsPerSlide));
  }
  return slides;
}

/**
 * Get the maximum number of items across all tech groups
 * @returns Maximum item count
 */
export function getMaxItemsCount(): number {
  return Math.max(...techGroups.map((group) => group.items.length));
}

/**
 * Create card interaction handlers for hover and keyboard navigation
 * @param categoryId - The category ID for the card
 * @param currentHoveredCard - Currently hovered card ID
 * @param setHoveredCard - Function to update hovered card state
 * @returns Object with interaction handlers
 */
export function createCardInteractionHandlers(
  categoryId: string,
  currentHoveredCard: string | null,
  setHoveredCard: (card: string | null) => void
): CardInteractionHandlers {
  const isCurrentCardHovered = currentHoveredCard === categoryId;

  return {
    onMouseEnter: () => setHoveredCard(categoryId),
    onMouseLeave: () => setHoveredCard(null),
    onKeyDown: (e: KeyboardEvent<HTMLElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setHoveredCard(isCurrentCardHovered ? null : categoryId);
      }
    },
  };
}
