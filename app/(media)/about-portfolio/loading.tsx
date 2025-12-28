/**
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
 */

import { CentralizedLoading } from "@/components/visuals";

export default function AboutLoading() {
  return (
    <CentralizedLoading
      variant="profile"
      title="Loading About-Portfolio..."
      description="Fetching About-Portfolio information"
    />
  );
}
