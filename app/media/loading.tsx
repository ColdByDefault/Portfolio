/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import { CentralizedLoading } from "@/components/visuals";

/**
 * Loading UI for media page
 * Displays page-level loading skeleton
 */
export default function MediaPageLoading() {
  return (
    <CentralizedLoading
      variant="page"
      title="Loading Media..."
      description="Preparing media dashboard"
    />
  );
}
