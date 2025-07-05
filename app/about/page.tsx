// Copyright © [ColdByDefault] [AnotherProject]™.
// All Rights Reserved.

"use client";

import { aboutData } from "@/data/aboutData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Background } from "@/components/visuals/motion-background";
import { AboutSection, AchievementCard, InfoCard } from "@/components/about";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Target,
  Heart,
  Lightbulb,
  Code,
  Rocket,
  Home,
  FolderGit2,
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

function AboutPage() {
  const {
    personalInfo,
    mainStory,
    sections,
    achievements,
    currentFocus,
    goals,
    values,
  } = aboutData;

  return (
    <div className="min-h-screen relative w-full">
      <Background />

      {/* Hero Section */}
      <section className="w-full pt-24 pb-12 md:pt-32 md:pb-16 flex flex-col items-center justify-start">
        <div className="container px-4 md:px-6">
          <motion.div
            className="flex flex-col items-center space-y-8 text-center max-w-4xl mx-auto"
            initial="initial"
            animate="animate"
            variants={staggerChildren}
          >
            <motion.div variants={fadeInUp} className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-border shadow-xl">
                <Image
                  src="/profileDark.jpg"
                  alt="Yazan Abo-Ayash"
                  width={160}
                  height={160}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                About Me
              </h1>
              <div className="flex flex-wrap gap-2 justify-center">
                <Badge variant="secondary">{personalInfo.title}</Badge>
                <Badge variant="outline">
                  {personalInfo.currentPosition} at {personalInfo.company}
                </Badge>
                <Badge variant="outline">
                  {personalInfo.experience} experience
                </Badge>
              </div>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed"
            >
              {mainStory}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full py-12 flex flex-col items-center justify-start">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Story Sections */}
            <motion.div
              className="grid gap-8"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerChildren}
            >
              {sections.map((section, index) => {
                let icon = Lightbulb;
                if (section.id === "journey") icon = Rocket;
                if (section.id === "philosophy") icon = Lightbulb;
                if (section.id === "current-work") icon = Code;
                if (section.id === "open-source") icon = Heart;

                return (
                  <AboutSection
                    key={section.id}
                    id={section.id}
                    title={section.title}
                    content={section.content}
                    icon={icon}
                    delay={index * 0.1}
                  />
                );
              })}
            </motion.div>

            <Separator />

            {/* Achievements Timeline */}
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerChildren}
            >
              <motion.h2
                variants={fadeInUp}
                className="text-3xl font-bold mb-8 flex items-center gap-2"
              >
                <CalendarDays className="h-8 w-8" />
                Key Achievements
              </motion.h2>
              <div className="grid gap-4 md:gap-6">
                {achievements.map((achievement, index) => (
                  <AchievementCard
                    key={achievement.id}
                    title={achievement.title}
                    description={achievement.description}
                    date={achievement.date}
                    category={achievement.category}
                    icon={achievement.icon}
                    delay={index * 0.1}
                  />
                ))}
              </div>
            </motion.div>

            <Separator />

            {/* Current Focus & Goals */}
            <div className="grid md:grid-cols-2 gap-8">
              <InfoCard
                title="Current Focus"
                description="Technologies and concepts I'm actively learning and improving"
                icon={Code}
                items={currentFocus}
                variant="badges"
                delay={0}
              />

              <InfoCard
                title="Future Goals"
                description="Where I see myself heading in the near future"
                icon={Target}
                items={goals}
                variant="list"
                delay={0.1}
              />
            </div>

            {/* Values */}
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-6 w-6" />
                    Core Values
                  </CardTitle>
                  <CardDescription>
                    The principles that guide my work and development approach
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {values.map((value, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                      >
                        <span className="text-primary mt-1">✓</span>
                        <span className="text-sm">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <Separator />

            {/* Call to Action */}
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center"
            >
              <Card className="border-2 border-primary/20">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">
                    Let's Build Something Amazing
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    I'm always excited to collaborate on new projects and
                    connect with fellow developers. Whether you have a project
                    idea, want to discuss technology, or just say hello, I'd
                    love to hear from you.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/#home">
                      <Button size="lg" className="gap-2">
                        <Home className="h-4 w-4" />
                        Back to Portfolio
                      </Button>
                    </Link>
                    <Link href="/#projects">
                      <Button variant="outline" size="lg" className="gap-2">
                        <FolderGit2 className="h-4 w-4" />
                        View My Projects
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
