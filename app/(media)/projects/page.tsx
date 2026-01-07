/**
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
*/

'use client';
import {ProjectsShowcase} from "@/components/projects";


export default function LibraryPage() {

  return (
    <div className="container mx-auto px-4 py-8">
      <ProjectsShowcase className="py-12 px-4 sm:px-6 lg:px-8" />
    </div>
  );
}