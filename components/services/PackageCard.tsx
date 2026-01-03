/**
 * Package Card Component
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { ServicePackage } from "@/types/services";
import { motion } from "framer-motion";
import { Rocket, Cog, Brain, Check, Clock } from "lucide-react";
import { useTranslations } from "next-intl";

/** Icon mapping for dynamic rendering */
const iconMap: Record<string, React.ElementType> = {
  Rocket,
  Cog,
  Brain,
};

/** Animation variant for fade-in-up effect */
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

interface PackageCardProps {
  readonly pkg: ServicePackage;
}

/**
 * Displays a service package card with pricing, features, and CTA
 */
export function PackageCard({ pkg }: PackageCardProps) {
  const t = useTranslations("Services");
  const IconComponent = iconMap[pkg.icon];

  return (
    <motion.div variants={fadeInUp} className="w-full max-w-sm">
      <Card className="h-full relative overflow-hidden transition-all duration-300 hover:shadow-lg bg-background/80 backdrop-blur-sm border-border/50 hover:border-muted-foreground/30">
        <CardHeader className="space-y-4">
          <div className="flex items-center gap-3">
            {IconComponent && (
              <div className="p-2 rounded-lg bg-muted">
                <IconComponent className="h-5 w-5" />
              </div>
            )}
            <div>
              <h3 className="text-xl font-semibold">{t(pkg.nameKey)}</h3>
            </div>
          </div>
          <p className="text-2xl font-bold text-sky-500">
            {t(pkg.headlineKey)}
          </p>
          <p className="text-muted-foreground">{t(pkg.descriptionKey)}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Pricing & Timeline */}
          <div className="flex items-center justify-between pb-4 border-b">
            <div>
              <p className="text-2xl font-bold">{t(pkg.pricingKey)}</p>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{t(pkg.timelineKey)}</span>
            </div>
          </div>

          {/* Features List */}
          <ul className="space-y-3">
            {pkg.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <span className="text-sm">{t(feature.textKey)}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
}
