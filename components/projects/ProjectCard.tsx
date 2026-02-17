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
import { FiGithub, FiExternalLink } from "react-icons/fi";
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
      className="group max-w-sm mx-auto w-full"
    >
      <Card
        className={`${getCardHoverClasses(isHovered)} h-full flex flex-col`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {isFeaturedProject(project) && (
          <div className="absolute top-0 w-full bg-linear-to-r from-blue-500 to-purple-600 text-white text-xs font-medium px-3 py-1 text-center z-1">
            {t("featuredProject")}
          </div>
        )}
        <CardHeader className="py-2 relative z-1">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-base font-semibold group-hover:text-primary transition-colors">
              {project.title}
            </CardTitle>
            <Badge variant="secondary" className="text-xs">
              {tCategories(project.category)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-2 py-2 grow flex flex-col relative z-1">
          <div className="shrink-0">
            <p
              ref={descriptionRef}
              className="text-xs text-muted-foreground leading-relaxed line-clamp-3"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
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

          {/* License Badge */}
          {project.license && (
            <div className="flex justify-start shrink-0">
              <Badge
                variant={project.license.variant || "default"}
                className={`text-xs font-medium ${getLicenseBadgeClasses(
                  project.license.type,
                )}`}
              >
                {getLicenseEmoji(project.license.type)}{" "}
                {tLicenses(project.license.text)}
              </Badge>
            </div>
          )}

          {/* Technologies */}
          <div className="h-12 overflow-y-auto overflow-x-hidden shrink-0">
            <div className="flex flex-wrap gap-1">
              {project.technologies.map((tech) => (
                <motion.div
                  key={tech}
                  className="px-2 py-0.5 bg-secondary/50 rounded text-xs font-medium cursor-default"
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="relative z-1 py-2 mt-auto">
          {/* Action Buttons */}
          <div className="flex gap-2 justify-between w-full">
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
