/**
 * Services Page
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PackageCard } from "@/components/services";
import { Background } from "@/components/visuals/motion-background";
import {
  servicePackages,
  processSteps,
  trustSignals,
  servicesPageData,
} from "@/data/servicesData";
import type { ProcessStep, TrustSignal } from "@/types/services";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Target,
  Code,
  HeartHandshake,
  Database,
  TrendingUp,
  Shield,
  Plug,
  ArrowRight,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

// Icon mapping for dynamic rendering
const iconMap: Record<string, React.ElementType> = {
  MessageSquare,
  Target,
  Code,
  HeartHandshake,
  Database,
  TrendingUp,
  Shield,
  Plug,
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
      staggerChildren: 0.1,
    },
  },
};

/**
 * Process Step Component
 */
function ProcessStepCard({
  step,
  t,
  isLast,
}: {
  step: ProcessStep;
  t: ReturnType<typeof useTranslations>;
  isLast: boolean;
}) {
  const IconComponent = iconMap[step.icon];

  return (
    <motion.div variants={fadeInUp} className="relative w-full max-w-xl">
      <div className="flex items-start gap-4">
        <div className="flex flex-col items-center shrink-0">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-sky-500/10 text-sky-500 font-bold text-lg">
            {step.step}
          </div>
          {!isLast && (
            <div className="w-px h-full min-h-15 bg-linear-to-b from-sky-500/30 to-transparent mt-2" />
          )}
        </div>
        <div className="flex-1 pb-8 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            {IconComponent && (
              <IconComponent className="h-5 w-5 text-black dark:text-muted-foreground shrink-0" />
            )}
            <h3 className="text-lg font-semibold">{t(step.titleKey)}</h3>
          </div>
          <p className="text-black dark:text-muted-foreground">
            {t(step.descriptionKey)}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Trust Signal Card Component
 */
function TrustCard({
  signal,
  t,
}: {
  signal: TrustSignal;
  t: ReturnType<typeof useTranslations>;
}) {
  const IconComponent = iconMap[signal.icon];

  return (
    <motion.div variants={fadeInUp}>
      <Card className="h-full hover:border-muted-foreground/30 transition-colors bg-background/80 backdrop-blur-sm border-border/50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            {IconComponent && (
              <div className="p-2 rounded-lg bg-sky-500/10 text-sky-500 shrink-0">
                <IconComponent className="h-5 w-5" />
              </div>
            )}
            <div>
              <h3 className="font-semibold mb-1">{t(signal.titleKey)}</h3>
              <p className="text-sm text-muted-foreground">
                {t(signal.descriptionKey)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

/**
 * Services Page Main Component
 */
export default function ServicesPage() {
  const t = useTranslations("Services");

  return (
    <div className="min-h-screen relative">
      <Background />
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerChildren}
              className="space-y-6"
            >
              <motion.div variants={fadeInUp}>
                <Badge variant="outline" className="mb-4">
                  Services
                </Badge>
              </motion.div>
              <motion.h1
                variants={fadeInUp}
                className="text-4xl md:text-5xl lg:text-6xl font-bold"
              >
                {t("hero.title")}
              </motion.h1>
              <motion.div variants={fadeInUp}>
                <p className="text-l text-black dark:text-muted-foreground max-w-3xl mx-auto bg-background/70 backdrop-blur-sm rounded-lg px-4 py-2 inline-block">
                  {t("hero.subtitle")}
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Packages Section - ON TOP as per user requirement */}
        <section className="py-16 px-4 lg:px-8">
          <div className="max-w-8xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerChildren}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2"
            >
              {servicePackages.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerChildren}
            >
              <motion.div variants={fadeInUp} className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {t("process.title")}
                </h2>
                <p className="text-l text-black dark:text-muted-foreground max-w-2xl mx-auto bg-background/70 backdrop-blur-sm rounded-lg px-4 py-2 inline-block">
                  {t("process.subtitle")}
                </p>
              </motion.div>
              <Card className="p-6 md:p-8 bg-background/80 backdrop-blur-sm border-border/50 shadow-lg">
                <div className="flex flex-col items-center space-y-2">
                  {processSteps.map((step, index) => (
                    <ProcessStepCard
                      key={step.step}
                      step={step}
                      t={t}
                      isLast={index === processSteps.length - 1}
                    />
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Trust Signals Section */}
        <section className="py-16 px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerChildren}
            >
              <motion.div variants={fadeInUp} className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {t("trust.title")}
                </h2>
                <p className="text-l text-black dark:text-muted-foreground max-w-2xl mx-auto bg-background/70 backdrop-blur-sm rounded-lg px-4 py-2 inline-block">
                  {t("trust.subtitle")}
                </p>
              </motion.div>
              <div className="grid md:grid-cols-2 gap-4">
                {trustSignals.map((signal) => (
                  <TrustCard key={signal.id} signal={signal} t={t} />
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerChildren}
            >
              <Card className="bg-background/80 backdrop-blur-sm border-border/50 shadow-lg">
                <CardContent className="py-12 text-center space-y-6">
                  <motion.h2
                    variants={fadeInUp}
                    className="text-3xl md:text-4xl font-bold"
                  >
                    {t("cta.title")}
                  </motion.h2>
                  <motion.p
                    variants={fadeInUp}
                    className="text-muted-foreground max-w-xl mx-auto"
                  >
                    {t("cta.subtitle")}
                  </motion.p>
                  <motion.div variants={fadeInUp}>
                    <Button
                      asChild
                      size="lg"
                      className="bg-sky-600 hover:bg-sky-700"
                    >
                      <Link
                        href={servicesPageData.bookingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Calendar className="h-5 w-5 mr-2" />
                        {t("cta.button")}
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </Link>
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
