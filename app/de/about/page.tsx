/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

"use client";

import { aboutData } from "@/data/aboutData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Background } from "@/components/visuals/motion-background";
import { AchievementCard } from "@/components/about";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

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

export default function AboutPageDE() {
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
                  Über Mich
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                  {aboutData.personalInfo.name}
                </h1>
                <h2 className="text-2xl text-muted-foreground">
                  {aboutData.personalInfo.title}
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {aboutData.mainStory}
                </p>
                <div className="flex flex-wrap gap-2">
                  {aboutData.currentFocus.map((focus, index) => (
                    <Badge key={index} variant="secondary">
                      {focus}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-4">
                  <Button size="lg">Kontakt</Button>
                  <Button variant="outline" size="lg">
                    Lebenslauf herunterladen
                  </Button>
                </div>
              </div>
              <div className="relative">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeInUp}
                  className="relative h-[400px] w-full max-w-md mx-auto"
                >
                  <Image
                    src="/profileLight.jpg"
                    alt="ColdByDefault Profile"
                    fill
                    className="object-cover rounded-2xl shadow-2xl dark:hidden"
                    priority
                  />
                  <Image
                    src="/profileDark.jpg"
                    alt="ColdByDefault Profile"
                    fill
                    className="object-cover rounded-2xl shadow-2xl hidden dark:block"
                    priority
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* About Sections */}
        <section className="py-20 px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="space-y-12"
            >
              <div className="text-center space-y-4">
                <Badge variant="outline" className="w-fit mx-auto">
                  Meine Geschichte
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold">Über mich</h2>
              </div>
              <div className="grid gap-8">
                {aboutData.sections.map((section) => (
                  <motion.div key={section.id} variants={fadeInUp}>
                    <Card className="p-6">
                      <CardContent className="p-0">
                        <h3 className="text-xl font-semibold mb-4">
                          {section.title}
                        </h3>
                        <p className="leading-relaxed text-muted-foreground">
                          {section.content}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="py-20 px-4 lg:px-8 bg-muted/50">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="space-y-12"
            >
              <div className="text-center space-y-4">
                <Badge variant="outline" className="w-fit mx-auto">
                  Erfolge
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold">
                  Errungenschaften & Meilensteine
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {aboutData.achievements.map((achievement) => (
                  <AchievementCard key={achievement.id} {...achievement} />
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Goals & Values Section */}
        <section className="py-20 px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Badge variant="outline" className="w-fit mb-6">
                  Ziele
                </Badge>
                <h3 className="text-2xl font-bold mb-6">Meine Ziele</h3>
                <ul className="space-y-3">
                  {aboutData.goals.map((goal, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-muted-foreground">{goal}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Badge variant="outline" className="w-fit mb-6">
                  Werte
                </Badge>
                <h3 className="text-2xl font-bold mb-6">Meine Werte</h3>
                <ul className="space-y-3">
                  {aboutData.values.map((value, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-muted-foreground">{value}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
