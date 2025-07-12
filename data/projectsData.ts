// Copyright © [ColdByDefault] [AnotherProject]™.
// All Rights Reserved.

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
    description:
      "A modern, responsive portfolio website built with Next.js 15, featuring dark/light theme toggle, smooth animations with Framer Motion, and optimized performance. Includes TypeScript for type safety and Tailwind CSS for styling.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "React Icons",
    ],
    githubUrl: "See GitHub for source code",
    liveUrl: "https://coldbydefault.com",
    featured: true,
    category: "Web Development",
    license: {
      type: "copyright",
      text: "All Rights Reserved",
      variant: "destructive",
    },
  },
  {
    id: 2,
    title: "beRich.Hub v5",
    description:
      "Full-stack digital learning platform with user authentication, Profile pages, and Blog features. AI integration for personalized learning. Completly free and open-source. 4 different languages supported: English, German, Spanish, Swedish.",
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
    githubUrl: "git clone https://github.com/coldbydefault/berichhub.git",
    liveUrl: "https://berich-hub.vercel.app/",
    featured: true,
    category: "Full Stack",
    license: {
      type: "open-source",
      text: "Modified MIT License",
      variant: "secondary",
    },
  },
  {
    id: 3,
    title: "LLM AI Agent Chatbot",
    description:
      "Local ollama-based AI chatbot, customizable to use any LLM model, any Embed model, 2 Options for Vector DB; local postgres or DataStax Astra. Can read web pages, and answer questions based on the content. More coming soon.. Open source.",
    technologies: [
      "Next.js",
      "LangChain",
      "Ollama",
      "DataStax Astra",
      "PostgreSQL",
      "TypeScript",
    ],
    githubUrl:
      "git clone https://github.com/coldbydefault/simple-llm-agent.git",
    featured: false,
    category: "AI/ML",
    license: {
      type: "fully-open",
      text: "Fully Open Source",
      variant: "default",
    },
  },
  {
    id: 4,
    title: "Subscription Management API",
    description:
      "API for managing user subscriptions, including features for billing, invoicing, and payment processing. Built with Next.js and integrated with Stripe for secure payments.",
    technologies: ["Next.js", "PostgreSQL", "JavaScript", "Prisma"],
    githubUrl:
      "git clone https://github.com/ColdByDefault/subs-api-manager.git",
    featured: false,
    category: "Full Stack",
    license: {
      type: "fully-open",
      text: "Fully Open Source",
      variant: "default",
    },
  },
];

export const projectCategories = [
  "All",
  "Web Development",
  "Full Stack",
  "AI/ML",
];
