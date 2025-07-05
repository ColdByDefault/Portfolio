// Copyright © [ColdByDefault] [AnotherProject]™.
// All Rights Reserved.

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
    title: "Full Stack Junior Developer",
    currentPosition: "Intern",
    company: "Avarno GmbH",
    location: "Germany",
    experience: "3+ years",
  },
  mainStory:
    "I'm currently an intern at Avarno GmbH, where I've built everything from bespoke digital solutions to AI-powered applications. I specialize in Next.js, React, JavaScript, HTML/CSS and maintain an active presence on GitHub. When tackling new challenges, I dive straight into the docs and experiment until I've mastered the tools. Driven by a passion for a cleaner, more open web, I contribute to open-source projects and aim to streamline user experiences free of unnecessary ads and paywalls. My goal is to grow into a full-stack expert—particularly in Next.js, LLM integrations, and end-to-end web application development. I believe hard work and discipline always pay off, and I bring that focus to every project, big or small.",
  sections: [
    {
      id: "journey",
      title: "My Journey",
      content:
        "My development journey began with a curiosity about how websites work. What started as simple HTML and CSS experiments quickly evolved into a deep passion for creating meaningful digital experiences. Through self-directed learning and hands-on projects, I've developed expertise in modern web technologies while maintaining a focus on clean, efficient code.",
      order: 1,
    },
    {
      id: "philosophy",
      title: "Development Philosophy",
      content:
        "I believe in writing code that not only works but is maintainable, scalable, and accessible. My approach combines technical excellence with user-centered design principles. I'm passionate about creating web experiences that are fast, intuitive, and free from unnecessary complexity.",
      order: 2,
    },
    {
      id: "current-work",
      title: "Current Work",
      content:
        "At Avarno GmbH, I've had the opportunity to work on diverse projects ranging from custom CMS solutions to complex digital platforms. Each project has taught me valuable lessons about scalable architecture, user experience design, and the importance of collaborative development.",
      order: 3,
    },
    {
      id: "open-source",
      title: "Open Source Contribution",
      content:
        "I'm actively involved in the open-source community, contributing to projects that align with my vision of a cleaner, more accessible web. I believe in the power of collaborative development and sharing knowledge to advance the entire developer ecosystem.",
      order: 4,
    },
  ],
  achievements: [
    {
      id: "avarno-intern",
      title: "Software Development Intern",
      description:
        "Building bespoke digital solutions and AI-powered applications at Avarno GmbH",
      date: "2024",
      category: "work",
      icon: "💼",
    },
    {
      id: "portfolio-v4",
      title: "Portfolio Website v4",
      description:
        "Modern, responsive portfolio built with Next.js 15 and TypeScript",
      date: "2024",
      category: "project",
      icon: "🚀",
    },
    {
      id: "github-active",
      title: "Active GitHub Contributor",
      description:
        "Maintaining an active presence with open-source contributions",
      date: "Ongoing",
      category: "project",
      icon: "🔧",
    },
  ],
  currentFocus: [
    "Next.js advanced patterns and optimization",
    "LLM integrations and AI-powered applications",
    "End-to-end web application development",
    "Modern React patterns and performance",
    "TypeScript best practices",
    "User experience and accessibility",
  ],
  goals: [
    "Become a full-stack expert specializing in Next.js ecosystem",
    "Master LLM integrations and AI-powered web applications",
    "Contribute significantly to open-source projects",
    "Build applications that prioritize user experience",
    "Advance sustainable and accessible web development practices",
  ],
  values: [
    "Hard work and discipline always pay off",
    "Code should be clean, maintainable, and accessible",
    "Learning through documentation and experimentation",
    "Contributing to a cleaner, more open web",
    "Collaboration and knowledge sharing",
    "User-centered design and development",
  ],
};
