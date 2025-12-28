/**
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
 */

import { CentralizedLoading } from "@/components/visuals";


export default function MediaLoading() {
  return (
    <CentralizedLoading
      variant="page"
      title="Loading Content..."
      description="Preparing media content for you"
    />
  );
}
