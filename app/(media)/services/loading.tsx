/**
 * Services Page Loading State
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
*/

import { CentralizedLoading } from "@/components/visuals";

export default function ServicesLoading() {
  return (
    <CentralizedLoading
      variant="page"
      title="Loading Services..."
      description="Preparing service packages for you"
    />
  );
}
