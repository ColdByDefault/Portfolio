/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */
"use client";

import React from "react";
import { certifications } from "@/data/certificationsData";
import { CertificationShowcaseDesktop } from "./CertificationShowcaseDesktop";
import { CertificationShowcaseMobile } from "./CertificationShowcaseMobile";
import { useCertificationShowcaseLogic } from "./CertificationShowcase.logic";

interface CertificationShowcaseProps {
  readonly className?: string;
}

function CertificationShowcase({ className }: CertificationShowcaseProps) {
  const logic = useCertificationShowcaseLogic();

  // Render appropriate UI based on device type
  const shouldShowDesktop = !logic.isMobile && !logic.isTablet;

  if (shouldShowDesktop) {
    return (
      <CertificationShowcaseDesktop
        certifications={certifications}
        logic={logic}
        className={className}
      />
    );
  }

  return (
    <CertificationShowcaseMobile
      certifications={certifications}
      logic={logic}
      className={className}
    />
  );
}

export default CertificationShowcase;
