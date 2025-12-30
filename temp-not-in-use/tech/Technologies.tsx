/**
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
 */
"use client";

import { motion } from "framer-motion";
import { serviceGroups } from "@/data/tech";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";

export default function Technologies() {
  const t = useTranslations("Technologies");
  const tCategories = useTranslations("Technologies.categories");
  const tDescriptions = useTranslations("Technologies.descriptions");
  const tSubCategories = useTranslations("Technologies.subCategories");

  return (
    <section
      className="px-4 max-w-7xl mx-auto flex flex-col space-y-4 sm:space-y-6 lg:space-y-8"
      id="tech"
      aria-labelledby="tech-section-title"
      role="region"
    >
      <Card className="relative overflow-hidden bg-transparent border-0! shadow-none">
        <CardHeader className="text-center pb-4 sm:pb-6">
          <CardTitle
            id="tech-section-title"
            className="text-2xl sm:text-3xl lg:text-4xl font-light text-black dark:text-white"
          >
            {t("title")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8 sm:space-y-10">
          {serviceGroups.map((service, index) => (
            <motion.div
              key={service.categoryKey}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="space-y-4"
            >
              {/* Service Header */}
              <div className="text-center space-y-2">
                <h3 className="text-xl sm:text-2xl font-semibold text-black dark:text-white">
                  {tCategories(service.categoryKey)}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
                  {tDescriptions(service.descriptionKey)}
                </p>
              </div>

              {/* Subcategories Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto">
                {service.subCategories.map((subCategory) => (
                  <Card
                    key={subCategory.nameKey}
                    className="bg-card/50 backdrop-blur-sm border hover:shadow-md transition-shadow duration-200"
                  >
                    <CardHeader className="pb-2 sm:pb-3">
                      <CardTitle className="text-sm sm:text-base font-medium text-center text-muted-foreground">
                        {tSubCategories(subCategory.nameKey)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex flex-wrap gap-2 justify-center">
                        {subCategory.items.map(({ name, Icon }) => (
                          <motion.div
                            key={name}
                            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border bg-background/50 hover:bg-background hover:shadow-sm transition-all duration-200"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Icon
                              size={14}
                              className="shrink-0"
                              aria-hidden="true"
                            />
                            <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
                              {name}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Divider between services (except last) */}
              {index < serviceGroups.length - 1 && (
                <div className="pt-4 sm:pt-6">
                  <div className="h-px bg-border/50 max-w-md mx-auto" />
                </div>
              )}
            </motion.div>
          ))}
        </CardContent>
      </Card>
      <motion.div
        className="text-center pt-2 sm:pt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <p className="text-sm sm:text-base text-muted-foreground">
          {t("manyMoreTechnologies")}
        </p>
      </motion.div>
    </section>
  );
}
