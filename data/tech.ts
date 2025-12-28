/**
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
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
  SiWebstorm,
  SiPycharm,
  SiMarkdown,
  SiLatex,
  SiGoogleanalytics,
} from "react-icons/si";
import {
  FaBrain,
  FaRobot,
  FaFigma,
  FaUsers,
  FaLightbulb,
  FaSearch,
  FaVideo,
  FaImage,
  FaBook,
  FaDatabase,
  FaCode,
  FaNetworkWired,
  FaCogs,
  FaLayerGroup,
  FaPuzzlePiece,
  FaShieldAlt,
  FaLock,
  FaKey,
  FaUserShield,
} from "react-icons/fa";
import { RiOpenaiFill, RiFlowChart } from "react-icons/ri";
import { BiLogoVisualStudio } from "react-icons/bi";
import { DiScrum } from "react-icons/di";
import { FiServer } from "react-icons/fi";
import { TbAutomation, TbVectorTriangle, TbBinaryTree } from "react-icons/tb";
import {
  Box,
  Database,
  MessageCircle,
  Clock,
  FileText,
  Network,
  Monitor,
  MonitorSpeaker,
  Cpu,
  Workflow,
} from "lucide-react";

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
      { name: "shadcnUI", Icon: Box },
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
    ],
  },
  {
    category: "Core Programming Concepts",
    categoryKey: "coreProgrammingConcepts",
    items: [
      { name: "Object-Oriented Programming", Icon: FaLayerGroup },
      { name: "Data Structures", Icon: TbBinaryTree },
      { name: "Algorithms", Icon: Cpu },
      { name: "Design Patterns", Icon: FaPuzzlePiece },
    ],
  },
  {
    category: "Architecture & System Design",
    categoryKey: "architectureSystemDesign",
    items: [
      { name: "Software Architecture Patterns", Icon: Workflow },
      { name: "Basic Networking", Icon: FaNetworkWired },
      { name: "System Design", Icon: FaCogs },
      { name: "Code Quality & Clean Code", Icon: FaCode },
    ],
  },
  {
    category: "Databases & Storage",
    categoryKey: "databasesStorage",
    items: [
      { name: "PostgreSQL", Icon: SiPostgresql },
      { name: "Supabase", Icon: SiSupabase },
      { name: "Neon", Icon: Database },
      { name: "Vector Databases", Icon: TbVectorTriangle },
      { name: "Data Stack", Icon: FaDatabase },
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
      { name: "Windows OS", Icon: Monitor },
    ],
  },
  {
    category: "AI & Automation",
    categoryKey: "aiAutomation",
    items: [
      { name: "ChatGPT", Icon: RiOpenaiFill },
      { name: "LLM Integration", Icon: FaBrain },
      { name: "Ollama", Icon: SiOllama },
      { name: "RAG Systems", Icon: Network },
      { name: "MCPs", Icon: FileText },
      { name: "n8n", Icon: SiN8N },
      { name: "GitHub Actions", Icon: SiGithubactions },
      { name: "LangFlow", Icon: TbAutomation },
      { name: "Workflow Automation", Icon: FaRobot },
    ],
  },
  {
    category: "Development Workflow",
    categoryKey: "developmentWorkflow",
    items: [
      { name: "Git", Icon: SiGit },
      { name: "GitHub", Icon: SiGithub },
      { name: "Bitbucket", Icon: SiBitbucket },
      { name: "VSCode", Icon: BiLogoVisualStudio },
      { name: "WebStorm", Icon: SiWebstorm },
      { name: "PyCharm", Icon: SiPycharm },
    ],
  },
  {
    category: "Design & Creative",
    categoryKey: "designCreative",
    items: [
      { name: "Figma", Icon: FaFigma },
      { name: "Photo Editing", Icon: FaImage },
      { name: "Video Editing", Icon: FaVideo },
    ],
  },
  {
    category: "Business & Productivity Tools",
    categoryKey: "businessProductivity",
    items: [
      { name: "Jira", Icon: SiJira },
      { name: "Notion", Icon: SiNotion },
      { name: "Miro", Icon: SiMiro },
      { name: "SEO & Google Console", Icon: SiGoogleanalytics },
    ],
  },
  {
    category: "Documentation & Technical Writing",
    categoryKey: "documentationTechnicalWriting",
    items: [
      { name: "Diagrams & Flowcharts", Icon: RiFlowChart },
      { name: "LaTeX", Icon: SiLatex },
      { name: "Markdown", Icon: SiMarkdown },
      { name: "PowerPoint Presentations", Icon: MonitorSpeaker },
    ],
  },
  {
    category: "Professional Skills",
    categoryKey: "professionalSkills",
    items: [
      { name: "SCRUM/Agile", Icon: DiScrum },
      { name: "Research & Information Finding", Icon: FaSearch },
      { name: "Technical Documentation", Icon: FaBook },
    ],
  },
  {
    category: "Soft Skills",
    categoryKey: "softSkills",
    items: [
      { name: "Team Collaboration", Icon: FaUsers },
      { name: "Communication", Icon: MessageCircle },
      { name: "Problem Solving", Icon: FaLightbulb },
      { name: "Time Management", Icon: Clock },
    ],
  },
  {
    category: "Security & Privacy",
    categoryKey: "securityPrivacy",
    items: [
      { name: "Data Protection", Icon: FaShieldAlt },
      { name: "Authentication & Authorization", Icon: FaLock },
      { name: "API Security", Icon: FaKey },
      { name: "Privacy Compliance", Icon: FaUserShield },
    ],
  },
];
