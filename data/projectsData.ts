// projectsData.ts

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
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Portfolio Website v4",
    description:
      "A modern, responsive portfolio website built with Next.js 15, featuring dark/light theme toggle, smooth animations with Framer Motion, and optimized performance. Includes TypeScript for type safety and Tailwind CSS for styling.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "React Icons",
    ],
    githubUrl: "https://github.com/coldbydefault/portfolio-v3",
    liveUrl: "https://coldbydefault.com",
    featured: true,
    category: "Web Development",
  },
  {
    id: 2,
    title: "beRich.Hub",
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
    githubUrl: "https://github.com/coldbydefault/berichhub",
    liveUrl: "https://berich-hub.vercel.app/",
    featured: true,
    category: "Full Stack",
  },
  {
    id: 6,
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
    githubUrl: "https://github.com/coldbydefault/simple-llm-agent",
    featured: false,
    category: "AI/ML",
  },
];

export const projectCategories = [
  "All",
  "Web Development",
  "Full Stack",
  "AI/ML",
];
