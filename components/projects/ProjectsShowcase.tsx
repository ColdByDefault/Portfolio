"use client";

import React, { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
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
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  const handleCopyCloneLink = async () => {
    const cloneLink = `git clone ${project.githubUrl}.git`;
    try {
      await navigator.clipboard.writeText(cloneLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      className="group"
    >
      <Card
        className="h-full overflow-hidden border flex flex-col justify-between relative
      border-border/50 hover:border-border transition-all duration-300 hover:shadow-lg "
      >
        {project.featured && (
          <div className="absolute top-0 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-medium px-3 py-1 text-center">
            Featured Project
          </div>
        )}

        <CardHeader className="py-4">
          <div className="flex items-start justify-between">
            <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">
              {project.title}
            </CardTitle>
            <Badge variant="secondary" className="text-xs">
              {project.category}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="h-24 overflow-hidden">
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-5">
              {project.description.length > 120 ? (
                <>
                  {project.description.substring(0, 190)}
                  <span className="text-red-200"> see more on GitHub...</span>
                </>
              ) : (
                project.description
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
                {project.license.text}
              </Badge>
            </div>
          )}

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <motion.div
                key={tech}
                whileHover={{ scale: 1.05 }}
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
                Clone Repository
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopyCloneLink}
                className="h-6 w-6 p-0 cursor-pointer"
              >
                {copied ? (
                  <FiCheck className="h-3 w-3 text-green-500" />
                ) : (
                  <FiCopy className="h-3 w-3" />
                )}
              </Button>
            </div>
            <code className="text-xs bg-background px-2 py-1 rounded block break-all font-mono">
              {project.githubUrl}
            </code>
          </div>
        </CardContent>
        <CardFooter>
          {/* Action Buttons */}
          <div className="flex gap-2 pt-2 justify-between w-full">
            <Button variant="outline" size="sm" asChild className="flex-1">
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <FiGithub className="h-4 w-4" />
                Code
              </Link>
            </Button>

            {project.liveUrl && (
              <Button size="sm" asChild className="flex-1">
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <FiExternalLink className="h-4 w-4" />
                  Live Demo
                </Link>
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default function ProjectsShowcase({ className }: ProjectsShowcaseProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const filteredProjects = projects.filter(
    (project) =>
      selectedCategory === "All" || project.category === selectedCategory
  );

  return (
    <section className={className} id="projects" ref={sectionRef}>
      <Card className="max-w-7xl mx-auto border-0 bg-transparent dark:bg-transparent ">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <CardTitle className="text-3xl font-light sm:text-4xl text-center mb-8">
            My Projects
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
              onClick={() => setSelectedCategory(category)}
              className="transition-all duration-200"
            >
              {category}
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
            <p className="text-muted-foreground">
              No projects found in this category.
            </p>
          </motion.div>
        )}
      </Card>
    </section>
  );
}
