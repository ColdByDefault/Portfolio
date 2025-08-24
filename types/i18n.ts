/**
 * Internationalization Types
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

export interface Achievement {
  title: string;
  description: string;
  date: string;
  category: "work" | "project" | "education" | "certification";
}

export interface SkillItem {
  id: string;
  name: string;
  level: "beginner" | "intermediate" | "advanced" | "expert";
  category: "frontend" | "backend" | "fullstack" | "tools" | "soft-skills";
}

export interface AboutTranslations {
  title: string;
  subtitle: string;
  mainDescription: string;
  techStackTitle: string;
  achievementsTitle: string;
  milestonesRecognition: string;
  achievements: Achievement[];
  skills: SkillItem[];
  currentFocus: string[];
  goals: string[];
  values: string[];
}

export interface Translations {
  Hero: {
    availableForCollaboration: string;
    fullStackDeveloper: string;
    description: string;
    learnMoreAboutMe: string;
    moreAboutMe: string;
  };
  Navigation: {
    home: string;
    about: string;
    projects: string;
    mcp: string;
    technologies: string;
    certifications: string;
    navigation: string;
    impressum: string;
    legal: string;
  };
  About: AboutTranslations;
  [key: string]: unknown;
}
