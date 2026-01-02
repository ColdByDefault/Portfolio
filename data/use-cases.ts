/**
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
 */
import type { UseCaseProject } from "@/types/use-cases";

export const useCaseProjects: UseCaseProject[] = [
  {
    id: "project-1",
    titleKey: "Usecases.projects.project-1.title",
    descriptionKey: "Usecases.projects.project-1.description",
    screenshots: ["/assets/use-cases/use-case1-1.png", "/assets/use-cases/use-case1-2.png", "/assets/use-cases/use-case1-3.png", "/assets/use-cases/use-case1-4.png"],
    techStack: [
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "Groq AI (Whisper)" },
      { name: "Notion API" },
    ],
    demoLink: "",
    githubLink: "",
    implementationAreasKey: "Usecases.projects.project-1.implementationAreas",
  },
];
