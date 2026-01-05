/**
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
 */

"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Background } from "@/components/visuals/motion-background";
import { GitHubShowcase } from "@/components/github";
import type { AboutTranslations } from "@/types/i18n";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

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

export default function AboutPage() {
  const t = useTranslations("About");
  const light = "from-black/90 to-gray-500";
  const getCurrentFocusItems = (): AboutTranslations["currentFocusItems"] => {
    return t.raw("currentFocusItems") as AboutTranslations["currentFocusItems"];
  };

  return (
    <div className="min-h-screen relative">
      <Background />
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <Card className="p-8 lg:p-12 bg-background/80 backdrop-blur-sm border-border/50 shadow-lg">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <Badge variant="outline" className="w-fit">
                    {t("badge")}
                  </Badge>
                  <h1
                    className={`bg-linear-to-r text-transparent flex text-3xl sm:text-3xl md:text-4xl lg:text-5xl
                            ${light} bg-clip-text font-extrabold
                          dark:from-gray-900 dark:to-gray-200`}
                  >
                    {t("personalInfo.name")}
                  </h1>
                  <p className="text-xl text-primary font-semibold leading-relaxed">
                    {t("personalInfo.title")}
                  </p>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    {t("mainStory")}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {getCurrentFocusItems()
                      .slice(0, 3)
                      .map((focus: string, index: number) => (
                        <Badge key={index} variant="secondary">
                          {focus}
                        </Badge>
                      ))}
                  </div>
                </div>
                <div className="relative">
                  <div className="aspect-square max-w-md mx-auto relative rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src="/aboutMe.jpg"
                      alt={t("personalInfo.name")}
                      fill
                      className="object-cover"
                      priority={false}
                      quality={85}
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                      sizes="(max-width: 768px) 300px, (max-width: 1024px) 400px, 500px"
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-20 px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="p-10 bg-background/80 backdrop-blur-sm border-border/50 shadow-lg">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerChildren}
                className="text-center space-y-6"
              >
                <Badge variant="outline" className="w-fit mx-auto">
                  {t("philosophy")}
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold">
                  {t("myApproach")}
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {t("sections.philosophy")}
                </p>
              </motion.div>
            </Card>
          </div>
        </section>

        {/* What I Deliver Section */}
        <section className="py-20 px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="space-y-12"
            >
              <Card className="p-6 bg-background/80 backdrop-blur-sm border-border/50 shadow-lg text-center">
                <motion.h2
                  variants={fadeInUp}
                  className="text-l md:text-xl font-bold"
                >
                  {t("whatIDeliver")}
                </motion.h2>
              </Card>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getCurrentFocusItems().map((focus: string, index: number) => (
                  <Card
                    key={index}
                    className="p-6 bg-background/80 backdrop-blur-sm border-border/50 shadow-md hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-0">
                      <p className="text-center font-light">{focus}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* GitHub Showcase Section */}
        <section className="py-20 px-4 lg:px-8" id="github">
          <div className="max-w-6xl mx-auto">
            <GitHubShowcase />
          </div>
        </section>
      </div>
    </div>
  );
}
