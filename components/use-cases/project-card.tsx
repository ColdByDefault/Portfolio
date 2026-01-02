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
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle className="text-balance">{project.title}</CardTitle>
        <CardDescription className="text-pretty">
          {project.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 flex-1">
        <ScreenshotGallery
          screenshots={project.screenshots}
          projectTitle={project.title}
        />

        <Separator />

        <TechStackGrid techStack={project.techStack} />

        <ImplementationAreas areas={project.implementationAreas} />
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
