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
    screenshots: ["/aboutMe.jpg", "/aboutMe.jpg", "/aboutMe.jpg"],
    techStack: [
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "Groq AI (Whisper)" },
      { name: "Notion API" },
    ],
    demoLink: "https://demo.example.com/meeting-intelligence",
    githubLink: "https://github.com/example/meeting-intelligence",
    implementationAreasKey: "Usecases.projects.project-1.implementationAreas",
  },
];
