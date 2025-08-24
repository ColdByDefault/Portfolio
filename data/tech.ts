/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import {
  SiReact,
  SiNextdotjs,
  SiVite,
  SiTailwindcss,
  SiJavascript,
  SiTypescript,
  SiN8N,
  SiNodedotjs,
  SiPython,
  SiPrisma,
  SiPostgresql,
  SiSupabase,
  SiOllama,
  SiDocker,
  SiGooglecloud,
  SiFirebase,
  SiVercel,
  SiNetlify,
  SiGithubactions,
  SiLangchain,
  SiGit,
  SiGithub,
  SiBitbucket,
  SiJira,
  SiNotion,
  SiMiro,
} from "react-icons/si";
import { FaBrain, FaHorse, FaRobot, FaFigma } from "react-icons/fa";
import { RiOpenaiFill, RiFlowChart } from "react-icons/ri";
import { BiLogoVisualStudio } from "react-icons/bi";
import { DiScrum } from "react-icons/di";
import { FiLayers, FiServer } from "react-icons/fi";
import { TbAutomation } from "react-icons/tb";
import { Box } from "lucide-react";
import { Database } from "lucide-react";

export interface TechItem {
  name: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
}

export interface TechGroup {
  category: string;
  categoryKey: string;
  items: TechItem[];
}

export const techGroups: TechGroup[] = [
  {
    category: "UI & Frontend",
    categoryKey: "uiFrontend",
    items: [
      { name: "React", Icon: SiReact },
      { name: "Next.js", Icon: SiNextdotjs },
      { name: "Vite", Icon: SiVite },
      { name: "TailwindCSS", Icon: SiTailwindcss },
      { name: "JavaScript", Icon: SiJavascript },
      { name: "TypeScript", Icon: SiTypescript },
      { name: "shadcn/ui", Icon: Box },
    ],
  },
  {
    category: "Backend & APIs",
    categoryKey: "backendApis",
    items: [
      { name: "Node.js", Icon: SiNodedotjs },
      { name: "Python", Icon: SiPython },
      { name: "Prisma", Icon: SiPrisma },
      { name: "REST APIs", Icon: FiServer },
      { name: "LangChain", Icon: SiLangchain },
      { name: "LangFlow", Icon: TbAutomation },
    ],
  },
  {
    category: "Databases & Storage",
    categoryKey: "databasesStorage",
    items: [
      { name: "PostgreSQL", Icon: SiPostgresql },
      { name: "Supabase", Icon: SiSupabase },
      { name: "Neon", Icon: Database },
    ],
  },
  {
    category: "Infrastructure & DevOps",
    categoryKey: "infrastructureDevops",
    items: [
      { name: "Docker", Icon: SiDocker },
      { name: "Google Cloud", Icon: SiGooglecloud },
      { name: "Firebase", Icon: SiFirebase },
      { name: "Vercel", Icon: SiVercel },
      { name: "Netlify", Icon: SiNetlify },
    ],
  },
  {
    category: "AI & LLM",
    categoryKey: "aiLlm",
    items: [
      { name: "ChatGPT", Icon: RiOpenaiFill },
      { name: "LLM (generic)", Icon: FaBrain },
      { name: "Ollama", Icon: SiOllama },
    ],
  },
  {
    category: "Automation & Workflow",
    categoryKey: "automationWorkflow",
    items: [
      { name: "n8n", Icon: SiN8N },
      { name: "GitHub Actions", Icon: SiGithubactions },
      { name: "Automations", Icon: FaRobot },
    ],
  },
  {
    category: "Tools & Productivity",
    categoryKey: "toolsProductivity",
    items: [
      { name: "Git", Icon: SiGit },
      { name: "GitHub", Icon: SiGithub },
      { name: "Bitbucket", Icon: SiBitbucket },
      { name: "VSCode", Icon: BiLogoVisualStudio },
      { name: "Figma", Icon: FaFigma },
      { name: "Jira", Icon: SiJira },
      { name: "Notion", Icon: SiNotion },
      { name: "Miro", Icon: SiMiro },
      { name: "SCRUM", Icon: DiScrum },
    ],
  },
  {
    category: "Architecture & Diagrams",
    categoryKey: "architectureDiagrams",
    items: [
      { name: "Software Architecture", Icon: FiLayers },
      { name: "Diagrams & Flowcharts", Icon: RiFlowChart },
    ],
  },
];
