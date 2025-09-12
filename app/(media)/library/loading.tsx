/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import { CentralizedLoading } from "@/components/visuals";

/**
 * Loading UI for library section
 * Displays card-based loading skeleton for library items
 */
export default function LibraryLoading() {
  return (
    <CentralizedLoading
      variant="list"
      title="Loading Library..."
      description="Organizing books and resources"
      count={6}
    />
  );
}
