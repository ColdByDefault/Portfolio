/**
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
 */

import { CentralizedLoading } from "@/components/visuals";

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
