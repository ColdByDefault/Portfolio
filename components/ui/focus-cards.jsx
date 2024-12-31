"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { cn } from "@lib/utilsSpot";

export const Card = React.memo(({ card, index, hovered, setHovered }) => (
  <div
    onMouseEnter={() => setHovered(index)}
    onMouseLeave={() => setHovered(null)}
    className={cn(
      "rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden transition-all duration-300 ease-out",
      "h-28 sm:h-32 md:h-36 lg:h-40 w-full max-w-[10rem] sm:max-w-[12rem] md:max-w-[14rem] lg:max-w-[16rem]",
      hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
    )}>
    <div className="relative h-full w-full">
      <Image
        src={card.src}
        alt={card.title}
        width={175}
        height={175}
        className="object-cover absolute inset-0 m-auto"
      />
    </div>
    <div
      className={cn(
        "absolute inset-0 bg-black/50 flex items-end p-4 transition-opacity duration-300",
        hovered === index ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="text-sm sm:text-base md:text-lg font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200">
        {card.title}
      </div>
    </div>
  </div>
));

Card.displayName = "Card";

export function FocusCards({ cards }) {
  const [hovered, setHovered] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleTouchStart = (index) => {
    if (isMobile) {
      setHovered(index);
    }
  };

  const handleTouchEnd = () => {
    if (isMobile) {
      setHovered(null);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-2 items-center w-full max-w-4xl mx-auto px-4">
      {cards.map((card, index) => (
        <Card
          key={card.title}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
          onTouchStart={() => handleTouchStart(index)}
          onTouchEnd={handleTouchEnd}
        />
      ))}
    </div>
  );
}