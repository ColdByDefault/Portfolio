/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import { CentralizedLoading } from "@/components/visuals";

/**
 * Loading UI for media section routes
 * Displayed when navigating to about, blog, or library sections
 */
export default function MediaLoading() {
  return (
    <CentralizedLoading
      variant="page"
      title="Loading Content..."
      description="Preparing media content for you"
    />
  );
}
