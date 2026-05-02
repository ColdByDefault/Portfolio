/**
 * @author © ColdByDefault
 * @license Copyright (c) 2026 ColdByDefault. All rights reserved.
 * @version 6.x.x
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
