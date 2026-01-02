export interface TechStack {
  name: string;
}

export interface UseCaseProject {
  id: string;
  title: string;
  description: string;
  screenshots: string[]; // 1-4 images
  techStack: TechStack[];
  demoLink?: string;
  githubLink?: string;
  implementationAreas: string[];
}
