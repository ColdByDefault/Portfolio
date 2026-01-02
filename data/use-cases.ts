import type { UseCaseProject } from "@/types/use-cases";

export const useCaseProjects: UseCaseProject[] = [
  {
    id: "project-1",
    title: "E-Commerce Dashboard",
    description:
      "A comprehensive admin dashboard for managing online stores. Track sales, inventory, customers, and analytics in real-time. Perfect for small to medium-sized businesses looking to streamline their operations.",
    screenshots: [
      "/aboutMe.jpg",
      "/aboutMe.jpg",
      "/aboutMe.jpg",
    ],
    techStack: [
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "Supabase" },
      { name: "Tailwind CSS" },
    ],
    demoLink: "https://demo.example.com/ecommerce",
    githubLink: "https://github.com/example/ecommerce-dashboard",
    implementationAreas: [
      "E-commerce Platforms",
      "Retail Management",
      "Inventory Systems",
      "Order Processing",
    ],
  },
  {
    id: "project-2",
    title: "AI Content Generator",
    description:
      "Generate high-quality content using advanced AI models. Create blog posts, social media content, and marketing copy in seconds. Ideal for content creators, marketers, and businesses.",
    screenshots: [
      "/aboutMe.jpg",
      "/aboutMe.jpg",
    ],
    techStack: [
      { name: "Next.js" },
      { name: "React" },
      { name: "OpenAI" },
      { name: "Vercel" },
    ],
    demoLink: "https://demo.example.com/ai-content",
    implementationAreas: [
      "Content Marketing",
      "Social Media Management",
      "Blog Writing",
      "Email Campaigns",
    ],
  },
  {
    id: "project-3",
    title: "Real-Time Collaboration Tool",
    description:
      "Enable teams to work together seamlessly with live updates, shared workspaces, and instant messaging. Built for remote teams who need powerful collaboration features.",
    screenshots: [
      "/aboutMe.jpg",
      "/aboutMe.jpg",
      "/aboutMe.jpg",
      "/aboutMe.jpg",
    ],
    techStack: [
      { name: "Next.js" },
      { name: "WebSocket" },
      { name: "Redis" },
      { name: "PostgreSQL" },
    ],
    demoLink: "https://demo.example.com/collaboration",
    githubLink: "https://github.com/example/collaboration-tool",
    implementationAreas: [
      "Remote Work",
      "Project Management",
      "Team Communication",
      "Document Collaboration",
    ],
  },
];
