/**
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
 */

import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiPrisma,
  SiPostgresql,
  SiDocker,
  SiVercel,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiMiro,
  SiLatex,
  SiCanva,
  SiN8N,
} from "react-icons/si";
import { FaPuzzlePiece, FaRobot } from "react-icons/fa";
import { TbAutomation } from "react-icons/tb";
import { FileText, Network, MonitorSpeaker, Workflow } from "lucide-react";

export interface TechItem {
  name: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
}

export interface SubCategory {
  name: string;
  nameKey: string;
  items: TechItem[];
}

export interface ServiceGroup {
  category: string;
  categoryKey: string;
  descriptionKey: string;
  subCategories: SubCategory[];
}

export const serviceGroups: ServiceGroup[] = [
  {
    category: "Web Development",
    categoryKey: "webDevelopment",
    descriptionKey: "webDevelopmentDesc",
    subCategories: [
      {
        name: "Frontend",
        nameKey: "frontend",
        items: [
          { name: "TypeScript", Icon: SiTypescript },
          { name: "JavaScript", Icon: SiJavascript },
          { name: "React", Icon: SiReact },
          { name: "Next.js", Icon: SiNextdotjs },
          { name: "TailwindCSS", Icon: SiTailwindcss },
        ],
      },
      {
        name: "Backend & Database",
        nameKey: "backend",
        items: [
          { name: "Node.js", Icon: SiNodedotjs },
          { name: "Prisma", Icon: SiPrisma },
          { name: "PostgreSQL", Icon: SiPostgresql },
        ],
      },
      {
        name: "DevOps",
        nameKey: "devops",
        items: [
          { name: "Docker", Icon: SiDocker },
          { name: "Vercel", Icon: SiVercel },
          { name: "Git", Icon: SiGit },
          { name: "GitHub", Icon: SiGithub },
        ],
      },
    ],
  },
  {
    category: "AI & Automation",
    categoryKey: "aiAutomation",
    descriptionKey: "aiAutomationDesc",
    subCategories: [
      {
        name: "AI Agents",
        nameKey: "aiAgents",
        items: [
          { name: "AI Agents", Icon: FaRobot },
          { name: "RAG Systems", Icon: Network },
          { name: "MCP", Icon: FileText },
        ],
      },
      {
        name: "Workflow Automation",
        nameKey: "workflowAutomation",
        items: [
          { name: "n8n", Icon: SiN8N },
          { name: "LangFlow", Icon: TbAutomation },
          { name: "GitHub Actions", Icon: SiGithubactions },
        ],
      },
    ],
  },
  {
    category: "Visuals & Documentation",
    categoryKey: "visualsDocs",
    descriptionKey: "visualsDocsDesc",
    subCategories: [
      {
        name: "Documentation",
        nameKey: "documentation",
        items: [
          { name: "LaTeX", Icon: SiLatex },
          { name: "Design Patterns", Icon: FaPuzzlePiece },
          { name: "System Design", Icon: Workflow },
        ],
      },
      {
        name: "Visual Design",
        nameKey: "visualDesign",
        items: [
          { name: "Canva", Icon: SiCanva },
          { name: "Miro", Icon: SiMiro },
          { name: "PowerPoint", Icon: MonitorSpeaker },
        ],
      },
    ],
  },
];

// Keep for backwards compatibility if needed
export interface TechGroup {
  category: string;
  categoryKey: string;
  items: TechItem[];
}

export const techGroups: TechGroup[] = serviceGroups.map((service) => ({
  category: service.category,
  categoryKey: service.categoryKey,
  items: service.subCategories.flatMap((sub) => sub.items),
}));
