/**
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
 */

export interface Project {
  id: number;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  category: string;
  license?: {
    type: "copyright" | "open-source" | "fully-open";
    text: string;
    variant?: "default" | "secondary" | "destructive" | "outline";
  };
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Portfolio Website v4",
    description: "portfolioWebsite",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "React Icons",
    ],
    githubUrl: "https://github.com/ColdByDefault/portfolio",
    liveUrl: "https://coldbydefault.com",
    featured: true,
    category: "webDevelopment",
    license: {
      type: "copyright",
      text: "copyright",
      variant: "destructive",
    },
  },
  {
    id: 2,
    title: "beRich.Hub v5",
    description: "berichHub",
    technologies: [
      "Next.js",
      "React",
      "PostgreSQL",
      "Kinde Auth",
      "NeonDB",
      "LLM",
      "LangChain",
      "next-internationalization",
    ],
    githubUrl: "https://github.com/coldbydefault/berichhub",
    liveUrl: "https://berich-hub.vercel.app/",
    featured: true,
    category: "fullStack",
    license: {
      type: "open-source",
      text: "openSource",
      variant: "secondary",
    },
  },
  {
    id: 3,
    title: "LLM AI Agent Chatbot",
    description: "llmAgent",
    technologies: [
      "Next.js",
      "LangChain",
      "Ollama",
      "DataStax Astra",
      "PostgreSQL",
      "TypeScript",
    ],
    githubUrl: "https://github.com/coldbydefault/simple-llm-agent",
    featured: false,
    category: "aiMl",
    license: {
      type: "fully-open",
      text: "fullyOpen",
      variant: "default",
    },
  },
  {
    id: 4,
    title: "Subscription Management API",
    description: "subsApi",
    technologies: ["Next.js", "PostgreSQL", "JavaScript", "Prisma"],
    githubUrl: "https://github.com/ColdByDefault/subs-api-manager",
    featured: false,
    category: "fullStack",
    license: {
      type: "fully-open",
      text: "fullyOpen",
      variant: "default",
    },
  },
];

export const projectCategories = ["all", "webDevelopment", "fullStack", "aiMl"];