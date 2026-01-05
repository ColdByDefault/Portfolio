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
    screenshots: [
      "/assets/use-cases/use-case1-1.png",
      "/assets/use-cases/use-case1-2.png",
      "/assets/use-cases/use-case1-3.png",
      "/assets/use-cases/use-case1-4.png",
    ],
    techStack: [
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "Groq AI (Whisper)" },
      { name: "Notion API" },
    ],
    demoLink: "",
    githubLink: "https://github.com/ColdByDefault/meeting-intelligence",
    implementationAreasKey: "Usecases.projects.project-1.implementationAreas",
  },
  {
    id: "project-2",
    titleKey: "Usecases.comingSoon",
    descriptionKey: "Usecases.comingSoon",
    screenshots: ["/default.png", "/default.png"],
    techStack: [{ name: "Coming Soon" }],
    demoLink: "",
    githubLink: "",
    implementationAreasKey: "Usecases.comingSoon",
  },
  /*   {
    id: "project-3",
    titleKey: "Usecases.projects.project-2.title",
    descriptionKey: "Usecases.projects.project-2.description",
    screenshots: [
      "/assets/use-cases/use-case2-1.png",
      "/assets/use-cases/use-case2-2.png",
    ],
    techStack: [{ name: "Next.js" }, { name: "TypeScript" }],
    demoLink: "https://coldbydefault.com/rio-calculator",
    githubLink: "",
    implementationAreasKey: "Usecases.projects.project-2.implementationAreas",
  }, */
];
