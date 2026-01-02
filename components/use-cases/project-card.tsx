/**
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
 */
"use client";

import { useTranslations } from "next-intl";
import type { UseCaseProject } from "@/types/use-cases";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScreenshotGallery } from "./screenshot-gallery";
import { TechStackGrid } from "./tech-stack-grid";
import { ImplementationAreas } from "./implementation-areas";
import { ProjectLinks } from "./project-links";
import { Separator } from "@/components/ui/separator";

interface ProjectCardProps {
  project: UseCaseProject;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const t = useTranslations();

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle className="text-balance">{t(project.titleKey)}</CardTitle>
        <CardDescription className="text-pretty">
          {t(project.descriptionKey)}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 flex-1">
        <ScreenshotGallery
          screenshots={project.screenshots}
          projectTitle={t(project.titleKey)}
        />

        <Separator />

        <TechStackGrid techStack={project.techStack} />

        <ImplementationAreas
          implementationAreasKey={project.implementationAreasKey}
        />
      </CardContent>

      <CardFooter>
        <ProjectLinks
          demoLink={project.demoLink}
          githubLink={project.githubLink}
        />
      </CardFooter>
    </Card>
  );
}
