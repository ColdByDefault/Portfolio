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
  npmUrl?: string;
  featured: boolean;
  category: string;
  license?: {
    type: "copyright" | "open-source" | "fully-open" | "mit" | "agpl";
    text: string;
    variant?: "default" | "secondary" | "destructive" | "outline";
  };
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Portfolio Website v6",
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
    featured: false,
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
    featured: false,
    category: "fullStack",
    license: {
      type: "open-source",
      text: "openSource",
      variant: "secondary",
    },
  },
  {
    id: 3,
    title: "Voice-to-Notion Automation",
    description: "voiceToNotion",
    image: "/assets/use-cases/use-case1-1.png",
    technologies: ["Next.js", "TypeScript", "Groq AI (Whisper)", "Notion API"],
    githubUrl: "https://github.com/ColdByDefault/meeting-intelligence",
    featured: false,
    category: "aiMl",
    license: {
      type: "copyright",
      text: "copyright",
      variant: "destructive",
    },
  },
  {
    id: 4,
    title: "AI Email Automation Demo",
    description: "aiEmailAutomation",
    image: "/assets/use-cases/use-case3-1.png",
    technologies: ["Next.js", "TypeScript", "Groq AI", "RAG"],
    githubUrl: "",
    liveUrl: "https://coldbydefault.com/polite-email",
    featured: false,
    category: "aiMl",
    license: {
      type: "copyright",
      text: "copyright",
      variant: "destructive",
    },
  },
  {
    id: 5,
    title: "next-seo-lite",
    description: "nextJsSeoOptimization",
    image: "",
    technologies: ["Next.js", "TypeScript", "npm package", "SEO", "JSON-LD"],
    githubUrl: "https://github.com/ColdByDefault/next-seo-lite",
    npmUrl: "https://www.npmjs.com/package/@coldbydefault/next-seo-lite",
    featured: false,
    category: "fullStack",
    license: {
      type: "mit",
      text: "mit",
      variant: "secondary",
    },
  },
  {
    id: 6,
    title: "Customizable Better-Auth Demo",
    description: "customizableBetterAuth",
    image: "",
    technologies: ["Next.js", "TypeScript", "BetterAuth", "Customizable Auth"],
    githubUrl: "https://github.com/ColdByDefault/ready-to-use-auth",
    liveUrl: "",
    featured: false,
    category: "fullStack",
    license: {
      type: "mit",
      text: "mit",
      variant: "secondary",
    },
  },
  {
    id: 7,
    title: "Princeps",
    description: "princeps",
    technologies: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "pgvector",
      "Prisma",
      "Better Auth",
      "Stripe",
      "Ollama",
      "Docker",
    ],
    githubUrl: "https://github.com/ColdByDefault/princeps",
    featured: true,
    category: "aiMl",
    license: {
      type: "agpl",
      text: "agpl",
      variant: "secondary",
    },
  },
];

export const projectCategories = ["all", "webDevelopment", "fullStack", "aiMl"];
