// Copyright © [ColdByDefault] [AnotherProject]™.
// All Rights Reserved.
"use client";

import { motion } from "framer-motion";
import { techGroups } from "@/data/tech";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

export default function Technologies() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section
      className="px-4 max-w-7xl mx-auto flex flex-col space-y-8"
      id="tech"
    >
      <Card className="relative overflow-hidden bg-transparent border-0">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-4xl font-light">
            Technologies I Use
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 z-10 p-6 h-full ">
            {techGroups.map((group) => {
              const isCurrentCardHovered = hoveredCard === group.category;

              return (
                <Card
                  key={group.category}
                  className={`
                  relative overflow-hidden transition-all duration-500 ease-out cursor-pointer group
                  ${
                    isCurrentCardHovered
                      ? "border-gray-500/50 bg-white shadow-2xl"
                      : ""
                  }
                  ${
                    isCurrentCardHovered
                      ? "dark:bg-black dark:shadow-blue-500/20 bg-white shadow-blue-200/20"
                      : ""
                  }
                  `}
                  onMouseEnter={() => setHoveredCard(group.category)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-semibold text-center">
                      {group.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-3 justify-center">
                      {group.items.map(({ name, Icon }) => (
                        <motion.div
                          key={name}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg border hover:shadow-sm transition-all duration-200"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Icon size={20} className="flex-shrink-0" />
                          <span className="text-sm font-medium whitespace-nowrap cursor-default">
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
                    style={{
                      backgroundImage: isCurrentCardHovered
                        ? `linear-gradient(45deg, transparent 30%, rgba(59, 130, 246, 0.1) 50%, transparent 70%),
                         linear-gradient(-45deg, transparent 30%, rgba(147, 197, 253, 0.1) 50%, transparent 70%)`
                        : "none",
                      backgroundSize: "200% 200%",
                      animation: isCurrentCardHovered
                        ? "gradient-shift 3s ease infinite"
                        : "none",
                    }}
                  />
                </Card>
              );
            })}
          </div>
        </CardContent>
        <style jsx>{`
          @keyframes gradient-shift {
            0%,
            100% {
              background-position: 0% 0%;
            }
            50% {
              background-position: 100% 100%;
            }
          }
        `}</style>
      </Card>
      <motion.div
        className="text-center pt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 10, delay: 2 }}
      >
        <p className="text-muted-foreground">
          ...and many more technologies in my toolkit
        </p>
      </motion.div>
    </section>
  );
}
