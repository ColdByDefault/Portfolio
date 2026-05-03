/**
 * @author © ColdByDefault
 * @license Copyright (c) 2026 ColdByDefault. All rights reserved.
 * @version 6.x.x
 */

import { ProjectsShowcase } from "@/components/projects";

export default function LibraryPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <ProjectsShowcase className="py-8 px-4 sm:px-6 lg:px-8" />
    </div>
  );
}
