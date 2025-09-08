/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Background } from "@/components/visuals/motion-background";
import { AchievementCard } from "@/components/about";
import type { Achievement, AboutTranslations } from "@/types/i18n";
import Image from "next/image";
import React from "react";
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

  // Type-safe accessors using the interface
  const getCurrentFocusItems = (): AboutTranslations["currentFocusItems"] => {
    return t.raw("currentFocusItems") as AboutTranslations["currentFocusItems"];
  };

  const getValues = (): AboutTranslations["values"] => {
    return t.raw("values") as AboutTranslations["values"];
  };

  const getAchievements = (): AboutTranslations["achievements"] => {
    return t.raw("achievements") as AboutTranslations["achievements"];
  };

  return (
    <div className="min-h-screen relative">
      <Background />
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge variant="outline" className="w-fit">
                  {t("aboutMe")}
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                  {t("personalInfo.name")}
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {t("personalInfo.title")}
                </p>
                <p className="text-lg leading-relaxed">{t("mainStory")}</p>
                <div className="flex flex-wrap gap-3">
                  {getCurrentFocusItems()
                    .slice(0, 3)
                    .map((focus: string, index: number) => (
                      <Badge key={index} variant="secondary">
                        {focus}
                      </Badge>
                    ))}
                </div>
{/*                 <div className="flex gap-4">
                  <Button size="lg">{t("getInTouch")}</Button>
                  <Button variant="outline" size="lg">
                    {t("downloadCV")}
                  </Button>
                </div> */}
              </div>
              <div className="relative">
                <div className="aspect-square max-w-md mx-auto relative rounded-2xl overflow-hidden">
                  <Image
                    src="/aboutMe.jpg"
                    alt={t("personalInfo.name")}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-20 px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
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
                {t("myDevelopmentPhilosophy")}
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {t("sections.philosophy")}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Current Focus Section */}
        <section className="py-20 px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="space-y-12"
            >
              <motion.h2
                variants={fadeInUp}
                className="text-3xl md:text-4xl font-bold text-center"
              >
                {t("currentFocus")}
              </motion.h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getCurrentFocusItems().map((focus: string, index: number) => (
                  <Card key={index} className="p-6">
                    <CardContent>
                      <p className="text-center">{focus}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 px-4 lg:px-8 bg-muted/50">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="space-y-12"
            >
              <div className="text-center space-y-4">
                <Badge variant="outline" className="w-fit mx-auto">
                  {t("coreValues")}
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold">
                  {t("whatDrivesMe")}
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {getValues().map((value: string, index: number) => (
                  <Card key={index} className="p-6">
                    <CardContent>
                      <p className="text-center">{value}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="py-20 px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="space-y-12"
            >
              <div className="text-center space-y-4">
                <Badge variant="outline" className="w-fit mx-auto">
                  {t("achievementsTitle")}
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold">
                  {t("milestonesRecognition")}
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {getAchievements().map(
                  (achievement: Achievement, index: number) => (
                    <AchievementCard
                      key={index}
                      title={achievement.title}
                      description={achievement.description}
                      icon="🚀"
                      date={achievement.date}
                      category={achievement.category}
                    />
                  )
                )}
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
