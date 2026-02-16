/**
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
 */

import React from "react";
import Image from "next/image";
import { Card, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { ImageZoomDialog } from "@/components/visuals";
import type { CertificationShowcaseLogic } from "@/components/cer/CertificationShowcase.logic";

interface Certification {
  readonly id: number;
  readonly title: string;
  readonly issuer: string;
  readonly issuerKey?: string;
  readonly date: string;
  readonly description: string;
  readonly descriptionKey: string;
  readonly image: string;
}

interface CertificationShowcaseDesktopProps {
  readonly certifications: readonly Certification[];
  readonly logic: CertificationShowcaseLogic;
  readonly className?: string | undefined;
}

export function CertificationShowcaseDesktop({
  certifications,
  className,
}: CertificationShowcaseDesktopProps) {
  const t = useTranslations("Certifications");
  const tDescriptions = useTranslations("Certifications.descriptions");
  const tIssuers = useTranslations("Certifications.issuers");

  const renderDesktopCard = (cert: Certification) => {
    return (
      <Card
        key={cert.id}
        className="px-3 py-4 h-full flex flex-col bg-background/80 backdrop-blur-sm border-border/50 shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <CardTitle className="mb-3">
          <h3 className="text-lg font-semibold text-center min-h-12 flex items-center justify-center">
            {cert.title}
          </h3>
        </CardTitle>
        <div className="flex w-full justify-center items-center pt-2 mb-4">
          <ImageZoomDialog src={cert.image} alt={cert.title} title={cert.title}>
            <Image
              src={cert.image}
              alt={cert.title}
              width={400}
              height={280}
              className="object-cover rounded-md w-full max-w-100 h-70"
              style={{ width: "100%", maxWidth: "400px", height: "280px" }}
              priority={cert.id <= 4}
            />
          </ImageZoomDialog>
        </div>
        <div className="flex-1 space-y-2">
          <p className="text-sm">
            {t("issuedBy")}{" "}
            {cert.issuerKey ? tIssuers(cert.issuerKey) : cert.issuer}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t("date")} {cert.date}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            {tDescriptions(cert.descriptionKey)}
          </p>
        </div>
      </Card>
    );
  };

  return (
    <section className={className} id="cert">
      <Card className="max-w-7xl mx-auto bg-transparent dark:bg-transparent shadow-none border-0!">
        <CardTitle className="text-3xl font-light sm:text-4xl text-center mb-8 text-black dark:text-white">
          {t("title")}
        </CardTitle>
        <div className="z-40 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {certifications.map((cert) => renderDesktopCard(cert))}
        </div>
      </Card>
    </section>
  );
}
