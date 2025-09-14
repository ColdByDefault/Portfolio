/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import { CentralizedLoading } from "@/components/visuals";

/**
 * Loading UI for impressum page
 * Displays simple page loading skeleton
 */
export default function ImpressumLoading() {
  return (
    <CentralizedLoading
      variant="page"
      title="Loading Legal Information..."
      description="Preparing impressum content"
    />
  );
}
