/**
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
 */
export interface TechStack {
  name: string;
}

export interface UseCaseProject {
  id: string;
  titleKey: string;
  descriptionKey: string;
  screenshots: string[]; // 1-4 images
  techStack: TechStack[];
  demoLink?: string;
  githubLink?: string;
  implementationAreasKey: string;
}
