import type React from "react";

export interface TechStackItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  technologies: string[];
  metrics?: string;
  level?: number;
}

export interface ProjectItem {
  title: string;
  description: string;
  tech: string[];
  metrics: string;
  category: string;
  status: "completed" | "in-progress" | "planned";
}

export interface ArchitectureNode {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  color: string;
}

export interface WorkflowStep {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  color: string;
}

export interface CodeExample {
  title: string;
  language: string;
  code: string;
}

export interface PerformanceMetric {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  items: string[];
  score: number;
}
