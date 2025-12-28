/**
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
 */

"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { LucideIcon } from "lucide-react";

interface AboutSectionProps {
  id: string;
  title: string;
  content: string;
  icon: LucideIcon;
  delay?: number;
}

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export function AboutSection({
  title,
  content,
  icon: Icon,
  delay = 0,
}: AboutSectionProps) {
  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={fadeInUp}
      transition={{ delay }}
    >
      <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Icon className="h-6 w-6 text-primary" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">{content}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface AchievementCardProps {
  title: string;
  description: string;
  date: string;
  category: "work" | "education" | "certification" | "project";
  icon?: string;
  delay?: number;
}

export function AchievementCard({
  title,
  description,
  date,
  category,
  icon,
  delay = 0,
}: AchievementCardProps) {
  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={fadeInUp}
      transition={{ delay }}
    >
      <Card className="border-l-4 border-l-primary hover:shadow-md transition-shadow duration-300">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{icon}</span>
              <div>
                <CardTitle className="text-lg">{title}</CardTitle>
                <CardDescription>{date}</CardDescription>
              </div>
            </div>
            <Badge variant="outline" className="capitalize">
              {category}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface InfoCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  items: string[];
  variant?: "badges" | "list";
  delay?: number;
}

export function InfoCard({
  title,
  description,
  icon: Icon,
  items,
  variant = "badges",
  delay = 0,
}: InfoCardProps) {
  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={fadeInUp}
      transition={{ delay }}
    >
      <Card className="h-full hover:shadow-md transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon className="h-6 w-6 text-primary" />
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          {variant === "badges" ? (
            <div className="flex flex-wrap gap-2">
              {items.map((item, index) => (
                <Badge key={index} variant="secondary">
                  {item}
                </Badge>
              ))}
            </div>
          ) : (
            <ul className="space-y-2">
              {items.map((item, index) => (
                <li
                  key={index}
                  className="text-sm text-muted-foreground flex items-start gap-2"
                >
                  <span className="text-primary mt-1">•</span>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
