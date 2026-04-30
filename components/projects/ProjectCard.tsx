/**
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
 */

"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { SiNpm } from "react-icons/si";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  getCardHoverClasses,
  getOverlayStyles,
} from "@/components/visuals/card-animations";
import type { ProjectCardProps } from "@/types/hubs/projects";
import {
  useTruncationDetection,
  isFeaturedProject,
  getLicenseBadgeClasses,
  getLicenseEmoji,
} from "./projects-showcase.utils";

export function ProjectCard({ project, index: _index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  const t = useTranslations("Projects");
  const tCategories = useTranslations("Projects.categories");
  const tLicenses = useTranslations("Projects.licenses");
  const tDescriptions = useTranslations("Projects.descriptions");

  // Business logic hooks
  const { isTruncated, descriptionRef } = useTruncationDetection(
    project.description,
  );

  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      className="group w-full h-full"
    >
      <Card
        className={`${getCardHoverClasses(isHovered)} h-full flex flex-col overflow-hidden`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {/* Top accent line — gradient for featured, subtle for the rest */}
        <div
          className={`h-0.5 shrink-0 ${
            isFeaturedProject(project)
              ? "bg-linear-to-r from-blue-500 to-purple-600"
              : "bg-border"
          }`}
        />

        <CardHeader className="px-4 pt-3 pb-2 shrink-0">
          {/* Meta row: category badge + featured badge (only when featured) */}
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="text-xs">
              {tCategories(project.category)}
            </Badge>
            {isFeaturedProject(project) && (
              <Badge className="text-xs">{t("featuredProject")}</Badge>
            )}
          </div>
          {/* Title — fixed h-10 so 1-line and 2-line titles occupy the same space */}
          <div className="h-14 overflow-hidden">
            <CardTitle className="text-base lg:text-xl md:text-base font-bold line-clamp-2 leading-snug group-hover:text-primary transition-colors">
              {project.title}
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col px-4 pt-0 pb-2 relative z-1">
          {/* Description — fixed 3-line height */}
          <div className="h-16 overflow-hidden shrink-0">
            <p
              ref={descriptionRef}
              className="text-xs text-muted-foreground leading-relaxed line-clamp-3"
            >
              {tDescriptions(project.description)}
              {isTruncated && (
                <Link
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-400 ml-1 cursor-pointer underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  {t("seeMoreOnGitHub")}
                </Link>
              )}
            </p>
          </div>

          <Separator className="my-3 shrink-0" />

          {/* License — fixed h-7, empty slot keeps tech tags aligned when no license */}
          <div className="h-7 flex items-center shrink-0 mb-2">
            {project.license && (
              <Badge
                variant={project.license.variant || "default"}
                className={`text-xs font-medium ${getLicenseBadgeClasses(project.license.type)}`}
              >
                {getLicenseEmoji(project.license.type)}{" "}
                {tLicenses(project.license.text)}
              </Badge>
            )}
          </div>

          {/* Stack label */}
          <p className="text-[10px] uppercase tracking-widest font-medium text-muted-foreground/50 mb-1.5 shrink-0">
            Stack
          </p>

          {/* Tech tags — fills remaining space, scrollable */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden min-h-8">
            <div className="flex flex-wrap gap-1">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 bg-secondary/50 rounded text-xs font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </CardContent>

        <Separator className="shrink-0" />

        <CardFooter className="relative z-1 px-4 py-3 shrink-0">
          <div className="flex flex-wrap gap-2 w-full">
            {project.githubUrl && (
              <Button
                variant="outline"
                size="sm"
                asChild
                className="flex-1 cursor-pointer hover:bg-primary/10 relative z-1"
              >
                <Link
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 cursor-pointer text-center w-full"
                >
                  <FiGithub className="h-4 w-4" />
                  {t("code")}
                </Link>
              </Button>
            )}

            {project.npmUrl && (
              <Button
                variant="outline"
                size="sm"
                asChild
                className="flex-1 cursor-pointer hover:bg-red-500/10 text-red-600 dark:text-red-400 border-red-300 dark:border-red-700 hover:border-red-500 relative z-1"
              >
                <Link
                  href={project.npmUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 cursor-pointer text-center w-full"
                >
                  <SiNpm className="h-4 w-4" />
                  {t("npmPackage")}
                </Link>
              </Button>
            )}

            {project.liveUrl && (
              <Button
                size="sm"
                asChild
                className="flex-1 cursor-pointer hover:bg-primary/90 relative z-1"
              >
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 cursor-pointer text-center w-full"
                >
                  <FiExternalLink className="h-4 w-4" />
                  {t("liveDemo")}
                </Link>
              </Button>
            )}
          </div>
        </CardFooter>

        <div
          className={`
            absolute inset-0 rounded-lg transition-opacity duration-500 pointer-events-none
            ${isHovered ? "opacity-100" : "opacity-0"}
          `}
          style={getOverlayStyles(isHovered)}
        />
      </Card>
    </motion.div>
  );
}
