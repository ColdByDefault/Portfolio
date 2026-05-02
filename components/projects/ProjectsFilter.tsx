/**
 * @author © ColdByDefault
 * @license Copyright (c) 2026 ColdByDefault. All rights reserved.
 * @version 6.x.x
 */

"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface ProjectsFilterProps {
  readonly categories: readonly string[];
  readonly selectedCategory: string;
  readonly onCategoryChange: (category: string) => void;
  readonly isInView: boolean;
}

export function ProjectsFilter({
  categories,
  selectedCategory,
  onCategoryChange,
  isInView,
}: ProjectsFilterProps) {
  const tCategories = useTranslations("Projects.categories");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="flex flex-wrap justify-center gap-2 mb-8"
    >
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          size="sm"
          onClick={() => onCategoryChange(category)}
          className={cn(
            "transition-all duration-200 cursor-pointer",
            selectedCategory === category
              ? "bg-foreground text-background hover:bg-foreground/90"
              : "hover:bg-primary/10",
          )}
        >
          {tCategories(category)}
        </Button>
      ))}
    </motion.div>
  );
}
