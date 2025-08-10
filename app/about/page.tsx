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

export default function AboutPage() {
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
                  About Me
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                  {aboutData.personalInfo.name}
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {aboutData.personalInfo.title}
                </p>
                <p className="text-lg leading-relaxed">{aboutData.mainStory}</p>
                <div className="flex flex-wrap gap-3">
                  {aboutData.currentFocus.slice(0, 3).map((focus, index) => (
                    <Badge key={index} variant="secondary">
                      {focus}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-4">
                  <Button size="lg">Get In Touch</Button>
                  <Button variant="outline" size="lg">
                    Download CV
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square max-w-md mx-auto relative rounded-2xl overflow-hidden">
                  <Image
                    src="/profileLight.jpg"
                    alt={aboutData.personalInfo.name}
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
                Philosophy
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold">
                My Development Philosophy
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {aboutData.sections.find((s) => s.id === "philosophy")?.content}
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
                Current Focus
              </motion.h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {aboutData.currentFocus.map((focus, index) => (
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
                  Core Values
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold">
                  What Drives Me
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {aboutData.values.map((value, index) => (
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
                  Achievements
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold">
                  Milestones & Recognition
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {aboutData.achievements.map((achievement, index) => (
                  <AchievementCard
                    key={index}
                    title={achievement.title}
                    description={achievement.description}
                    icon={achievement.icon}
                    date={achievement.date}
                    category={achievement.category}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
