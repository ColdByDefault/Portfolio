/**
 * @author © ColdByDefault
 * @license Copyright (c) 2026 ColdByDefault. All rights reserved.
 * @version 6.x.x
 */

import { CentralizedLoading } from "@/components/visuals";

export default function MediaPageLoading() {
  return (
    <CentralizedLoading
      variant="page"
      title="Loading Booking Confirmation..."
      description="Preparing booking confirmation"
    />
  );
}
