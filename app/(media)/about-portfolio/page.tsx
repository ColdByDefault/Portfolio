/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import { Background } from "@/components/visuals/motion-background";
import { AboutPortfolioPage } from "@/components/aboutPortoPage";
import React from "react";

export default function AboutPortfolioPageRoute() {
  return (
    <div className="min-h-screen relative">
      <Background />
      <div className="relative z-10">
        <AboutPortfolioPage />
      </div>
    </div>
  );
}
