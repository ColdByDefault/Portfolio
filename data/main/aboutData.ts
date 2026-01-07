/**
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
*/

export interface AboutSection {
  id: string;
  title: string;
  content: string;
  order: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  category: "work" | "education" | "certification" | "project";
  icon?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: "beginner" | "intermediate" | "advanced" | "expert";
  category: "frontend" | "backend" | "fullstack" | "tools" | "soft-skills";
}

export interface AboutData {
  personalInfo: {
    name: string;
    title: string;
    currentPosition: string;
    company: string;
    location: string;
    experience: string;
  };
  mainStory: string;
  sections: AboutSection[];
  achievements: Achievement[];
  currentFocus: string[];
  goals: string[];
  values: string[];
}

export const aboutData: AboutData = {
  personalInfo: {
    name: "Yazan Abo-Ayash",
    title: "Web Developer & Automation Specialist",
    currentPosition: "Freelance Developer",
    company: "",
    location: "Germany",
    experience: "3+ years",
  },
  mainStory:
    "I help SMEs and agencies launch web MVPs faster, automate repetitive workflows, and integrate AI assistants that save hours of manual work. My clients typically see results within 4-8 weeks — not months. Whether you need a customer portal, an internal tool, or a way to streamline your team's processes, I deliver solutions that are reliable, maintainable, and built to scale with your business.",
  sections: [
    {
      id: "journey",
      title: "My Journey",
      content:
        "From self-taught developer to delivering production applications for businesses across Europe. Every project taught me what clients really need: not just code, but reliable solutions that solve real problems and drive measurable results.",
      order: 1,
    },
    {
      id: "philosophy",
      title: "How I Work",
      content:
        "Clear communication, transparent timelines, and delivering exactly what was promised. No technical jargon, no scope creep — just reliable development with regular updates so you always know where your project stands.",
      order: 2,
    },
    {
      id: "current-work",
      title: "What I Deliver",
      content:
        "Web MVPs in 4-8 weeks, workflow automation that saves hours weekly, AI assistants for internal processes, and long-term support to keep your systems running smoothly.",
      order: 3,
    },
    {
      id: "results",
      title: "Business Results",
      content:
        "Guaranteed 90+ performance scores for better SEO, scalable applications ready for international markets, and enterprise-grade security to protect your business data.",
      order: 4,
    },
  ],
  achievements: [
    {
      id: "mvp-delivery",
      title: "Fast MVP Delivery",
      description:
        "Consistently delivering production-ready web applications in 4-8 weeks",
      date: "Ongoing",
      category: "work",
      icon: "🚀",
    },
    {
      id: "automation",
      title: "Workflow Automation",
      description:
        "Building AI-powered automation solutions that save clients hours of manual work weekly",
      date: "2024-Present",
      category: "project",
      icon: "⚡",
    },
    {
      id: "performance",
      title: "Performance Excellence",
      description:
        "Achieving 90+ Lighthouse scores for all client projects, boosting SEO rankings",
      date: "Ongoing",
      category: "project",
      icon: "📈",
    },
  ],
  currentFocus: [
    "Web MVPs delivered in 4-8 weeks",
    "Workflow automation that saves hours weekly",
    "AI assistants for internal processes",
    "Guaranteed 90+ performance scores",
    "Clear communication & transparent process",
    "Long-term support & maintenance",
  ],
  goals: [
    "Help businesses launch faster with reliable web applications",
    "Automate repetitive processes to free up team capacity",
    "Deliver measurable ROI through performance optimization",
    "Build long-term partnerships with growing companies",
    "Enable international expansion with multi-language support",
  ],
  values: [
    "Clear communication and transparent timelines",
    "Delivering exactly what was promised",
    "Business goals drive technical decisions",
    "Long-term reliability over quick fixes",
    "Regular updates so you always know project status",
    "Solutions that scale with your business",
  ],
};
