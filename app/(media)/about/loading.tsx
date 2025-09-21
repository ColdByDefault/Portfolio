/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import { CentralizedLoading } from "@/components/visuals";

export default function AboutLoading() {
  return (
    <CentralizedLoading
      variant="profile"
      title="Loading About..."
      description="Fetching profile information"
    />
  );
}
