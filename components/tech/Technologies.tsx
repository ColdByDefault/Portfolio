/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */
"use client";

import { motion } from "framer-motion";
import { techGroups } from "@/data/tech";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  getCardHoverClasses,
  getOverlayStyles,
  gradientShiftCSS,
} from "@/lib/card-animations";

export default function Technologies() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const t = useTranslations("Technologies");
  const tCategories = useTranslations("Technologies.categories");

  return (
    <section
      className="px-4 max-w-7xl mx-auto flex flex-col space-y-4 sm:space-y-6 lg:space-y-8"
      id="tech"
    >
      <Card className="relative overflow-hidden bg-transparent !border-0 shadow-none">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl sm:text-3xl lg:text-4xl font-light text-white">
            {t("title")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 z-10 p-4 sm:p-6 h-full border-0">
            {techGroups.map((group) => {
              const isCurrentCardHovered = hoveredCard === group.category;

              return (
                <Card
                  key={group.category}
                  className={getCardHoverClasses(isCurrentCardHovered)}
                  onMouseEnter={() => setHoveredCard(group.category)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <CardHeader className="pb-3 sm:pb-4">
                    <CardTitle className="text-lg sm:text-xl font-semibold text-center">
                      {tCategories(group.categoryKey)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-3 sm:px-6">
                    <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
                      {group.items.map(({ name, Icon }) => (
                        <motion.div
                          key={name}
                          className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border hover:shadow-sm transition-all duration-200"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Icon
                            size={16}
                            className="flex-shrink-0 sm:w-5 sm:h-5"
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
            })}
          </div>
        </CardContent>
        <style jsx>{gradientShiftCSS}</style>
      </Card>
      <motion.div
        className="text-center pt-2 sm:pt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 10, delay: 2 }}
      >
        <p className="text-sm sm:text-base text-white">
          {t("manyMoreTechnologies")}
        </p>
      </motion.div>
    </section>
  );
}
