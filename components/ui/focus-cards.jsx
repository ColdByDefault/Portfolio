"use client";
import Image from "next/image";
import React, { useState } from "react";
import { cn } from "@lib/utilsSpot";

export const Card = React.memo(({ card, index, hovered, setHovered }) => (
  <div
    onMouseEnter={() => setHovered(index)}
    onMouseLeave={() => setHovered(null)}
    className={cn(
      "rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden transition-transform duration-300 ease-out",
      "h-40 sm:h-48 md:h-56 lg:h-64 w-full", // Responsive heights
      hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
    )}
  >
    <div className="relative h-full w-full">
      <Image
        src={card.src}
        alt={card.title}
        fill
        className="object-cover absolute inset-0"
      />
    </div>
    <div
      className={cn(
        "absolute inset-0 bg-black/50 flex items-end p-4 transition-opacity duration-300",
        hovered === index ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="text-lg sm:text-xl md:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200">
        {card.title}
      </div>
    </div>
  </div>
));


Card.displayName = "Card";

export function FocusCards({ cards }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 w-full max-w-4xl px-4 sm:px-6 md:px-8"
    >
      {cards.map((card, index) => (
        <Card
          key={card.title}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
}
