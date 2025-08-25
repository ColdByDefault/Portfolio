/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */
"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { projects, projectCategories, type Project } from "@/data/projectsData";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FiGithub, FiExternalLink, FiCopy, FiCheck } from "react-icons/fi";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface ProjectsShowcaseProps {
  className?: string;
}

const ProjectCard = ({
  project,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  index,
}: {
  project: Project;
  index: number;
}) => {
  const [copied, setCopied] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const cardRef = useRef(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  const t = useTranslations("Projects");
  const tCategories = useTranslations("Projects.categories");
  const tLicenses = useTranslations("Projects.licenses");
  const tDescriptions = useTranslations("Projects.descriptions");

  // Check if text is truncated
  useEffect(() => {
    const checkTruncation = () => {
      if (descriptionRef.current) {
        const element = descriptionRef.current;
        setIsTruncated(element.scrollHeight > element.clientHeight);
      }
    };

    checkTruncation();
    window.addEventListener("resize", checkTruncation);

    return () => window.removeEventListener("resize", checkTruncation);
  }, [project.description]);

  const handleCopyCloneLink = async () => {
    console.log("Copy button clicked for project:", project.title);
    const cloneLink = `git clone ${project.githubUrl}.git`;
    try {
      await navigator.clipboard.writeText(cloneLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      console.log("Clone link copied successfully:", cloneLink);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      className="group"
    >
      <Card
        className={`
                  relative overflow-hidden transition-all duration-500 ease-out group
                  ${isHovered ? "border-gray-500/50 bg-white shadow-2xl" : ""}
                  ${
                    isHovered
                      ? "dark:bg-black dark:shadow-blue-500/20 bg-white shadow-blue-200/20"
                      : ""
                  }
                  `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {project.featured && (
          <div className="absolute top-0 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-medium px-3 py-1 text-center z-30">
            {t("featuredProject")}
          </div>
        )}

        <CardHeader className="py-4 relative z-20">
          <div className="flex items-start justify-between">
            <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">
              {project.title}
            </CardTitle>
            <Badge variant="secondary" className="text-xs">
              {tCategories(project.category)}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 relative z-20">
          <div className="h-24 overflow-hidden">
            <p
              ref={descriptionRef}
              className="text-sm text-muted-foreground leading-relaxed line-clamp-4"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 4,
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
            <div className="flex justify-start">
              <Badge
                variant={project.license.variant || "default"}
                className={`text-xs font-medium ${
                  project.license.type === "fully-open"
                    ? "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
                    : ""
                }`}
              >
                {project.license.type === "copyright"
                  ? "©"
                  : project.license.type === "fully-open"
                  ? "🌟"
                  : "🔓"}{" "}
                {tLicenses(project.license.text)}
              </Badge>
            </div>
          )}

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <motion.div
                key={tech}
                className="px-2 py-1 bg-secondary/50 rounded text-xs font-medium  cursor-default"
              >
                {tech}
              </motion.div>
            ))}
          </div>

          {/* Clone Command */}
          <div className="bg-muted/50 rounded-lg p-3 border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground">
                {t("cloneRepository")}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopyCloneLink}
                className="h-6 w-6 p-0 cursor-pointer hover:bg-muted relative z-10"
              >
                {copied ? (
                  <FiCheck className="h-3 w-3 text-green-500" />
                ) : (
                  <FiCopy className="h-3 w-3" />
                )}
              </Button>
            </div>
            <code className="text-xs bg-background px-2 py-1 rounded block break-all font-mono">
              git clone {project.githubUrl}.git
            </code>
          </div>
        </CardContent>
        <CardFooter className="relative z-20">
          {/* Action Buttons */}
          <div className="flex gap-2 pt-2 justify-between w-full">
            <Button
              variant="outline"
              size="sm"
              asChild
              className="flex-1 cursor-pointer hover:bg-primary/10 relative z-10"
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
                className="flex-1 cursor-pointer hover:bg-primary/90 relative z-10"
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
          style={{
            backgroundImage: isHovered
              ? `linear-gradient(45deg, transparent 30%, rgba(59, 130, 246, 0.1) 50%, transparent 70%),
                 linear-gradient(-45deg, transparent 30%, rgba(147, 197, 253, 0.1) 50%, transparent 70%)`
              : "none",
            backgroundSize: "200% 200%",
            animation: isHovered ? "gradient-shift 3s ease infinite" : "none",
          }}
        />
      </Card>
    </motion.div>
  );
};

export default function ProjectsShowcase({ className }: ProjectsShowcaseProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const t = useTranslations("Projects");
  const tCategories = useTranslations("Projects.categories");

  const filteredProjects = projects.filter(
    (project) =>
      selectedCategory === "all" || project.category === selectedCategory
  );

  return (
    <section className={className} id="projects" ref={sectionRef}>
      <Card className="max-w-7xl mx-auto !border-0 bg-transparent dark:bg-transparent shadow-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <CardTitle className="text-3xl font-light sm:text-4xl text-center mb-8 text-white">
            {t("title")}
          </CardTitle>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {projectCategories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => {
                console.log("Category clicked:", category);
                setSelectedCategory(category);
              }}
              className="transition-all duration-200 cursor-pointer hover:bg-primary/10"
            >
              {tCategories(category)}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground">{t("noProjectsFound")}</p>
          </motion.div>
        )}
      </Card>
      <style jsx>{`
        @keyframes gradient-shift {
          0%,
          100% {
            background-position: 0% 0%;
          }
          50% {
            background-position: 100% 100%;
          }
        }
      `}</style>
    </section>
  );
}
