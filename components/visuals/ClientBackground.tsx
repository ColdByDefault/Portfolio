/**
 * @author © ColdByDefault
 * @license Copyright (c) 2026 ColdByDefault. All rights reserved.
 * @version 6.x.x
 */

"use client";

import dynamic from "next/dynamic";

const Background = dynamic(
  () =>
    import("@/components/visuals/motion-background").then((mod) => ({
      default: mod.Background,
    })),
  { loading: () => null, ssr: false },
);

export default function ClientBackground() {
  return <Background />;
}
