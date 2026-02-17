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
    title: "Portfolio Website v5",
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
    featured: true,
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
    featured: true,
    category: "aiMl",
    license: {
      type: "copyright",
      text: "copyright",
      variant: "destructive",
    },
  },
];

export const projectCategories = ["all", "webDevelopment", "fullStack", "aiMl"];
