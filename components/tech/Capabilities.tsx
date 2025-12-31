/**
 * Capabilities Section - Business outcome focused
 * Replaces tech-focused Technologies section per freelancer.instructions
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */
"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { capabilities } from "@/data/capabilitiesData";
import type { Capability } from "@/types/capabilities";
import { Rocket, TrendingUp, Shield, Globe } from "lucide-react";
import {
  SiNextdotjs,
  SiReact,
  SiVercel,
  SiDocker,
  SiPostgresql,
  SiTypescript,
  SiPrisma,
} from "react-icons/si";
import { useTranslations } from "next-intl";

// Icon mapping for dynamic rendering (lucide icons)
const iconMap: Record<string, React.ElementType> = {
  Rocket,
  TrendingUp,
  Shield,
  Globe,
};

// Tech icon mapping (react-icons/si)
const techIconMap: Record<string, React.ElementType> = {
  SiNextdotjs,
  SiReact,
  SiVercel,
  SiDocker,
  SiPostgresql,
  SiTypescript,
  SiPrisma,
};

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

/**
 * Individual Capability Card
 */
function CapabilityCard({
  capability,
  t,
}: {
  capability: Capability;
  t: ReturnType<typeof useTranslations>;
}) {
  const IconComponent = iconMap[capability.icon];

  return (
    <motion.div variants={fadeInUp}>
      <Card className="h-full bg-background/80 backdrop-blur-sm border-border/50 shadow-lg hover:shadow-xl hover:border-muted-foreground/30 transition-all duration-300">
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-start gap-4">
            {IconComponent && (
              <div className="p-3 rounded-xl bg-muted text-foreground">
                <IconComponent className="h-6 w-6" aria-hidden="true" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold mb-1">
                {t(capability.titleKey)}
              </h3>
              <p className="text-sm font-medium text-muted-foreground">
                {t(capability.headlineKey)}
              </p>
            </div>
          </div>
          <p className="text-sm text-foreground/80 dark:text-white/90 leading-relaxed">
            {t(capability.descriptionKey)}
          </p>
          {/* Tech Icons - subtle indicators */}
          {capability.techIcons && capability.techIcons.length > 0 && (
            <div className="flex items-center gap-3 pt-2 border-t border-border/50">
              {capability.techIcons.map((iconName) => {
                const TechIcon = techIconMap[iconName];
                return TechIcon ? (
                  <TechIcon
                    key={iconName}
                    className="h-4 w-4 text-foreground/50 dark:text-white/70 hover:text-foreground dark:hover:text-white transition-colors"
                    aria-hidden="true"
                  />
                ) : null;
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

/**
 * Capabilities Section Component
 */
export default function Capabilities() {
  const t = useTranslations("Capabilities");

  return (
    <section
      className="px-4 max-w-6xl mx-auto py-16"
      id="capabilities"
      aria-labelledby="capabilities-section-title"
      role="region"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerChildren}
        className="space-y-12"
      >
        {/* Section Header */}
        <motion.div variants={fadeInUp} className="text-center space-y-4">
          <h2
            id="capabilities-section-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold"
          >
            {t("title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Capabilities Grid */}
        <motion.div
          variants={staggerChildren}
          className="grid sm:grid-cols-2 gap-6"
        >
          {capabilities.map((capability) => (
            <CapabilityCard key={capability.id} capability={capability} t={t} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
