/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import React from "react";
import Image from "next/image";
import { Card, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { ImageZoomDialog } from "@/components/visuals";
import type { CertificationShowcaseLogic } from "@/components/cer/CertificationShowcase.logic";

interface Certification {
  readonly id: number;
  readonly title: string;
  readonly issuer: string;
  readonly date: string;
  readonly description: string;
  readonly descriptionKey: string;
  readonly image: string;
}

interface CertificationShowcaseMobileProps {
  readonly certifications: readonly Certification[];
  readonly logic: CertificationShowcaseLogic;
  readonly className?: string | undefined;
}

export function CertificationShowcaseMobile({
  certifications,
  logic,
  className,
}: CertificationShowcaseMobileProps) {
  const t = useTranslations("Certifications");
  const tDescriptions = useTranslations("Certifications.descriptions");

  const renderTabletCard = (cert: Certification) => {
    const isExpanded = logic.expandedCards.has(cert.id);

    return (
      <Card
        key={cert.id}
        className="shadow-md overflow-hidden relative transition-all duration-300 ease-in-out hover:shadow-lg"
      >
        <div
          className="p-5 cursor-pointer flex items-center justify-between active:bg-gray-50 dark:active:bg-gray-800 transition-colors duration-150"
          onClick={() => logic.toggleCard(cert.id)}
        >
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <ImageZoomDialog
                src={cert.image}
                alt={cert.title}
                title={cert.title}
              >
                <Image
                  src={cert.image}
                  alt={cert.title}
                  width={80}
                  height={80}
                  className="object-cover rounded-md"
                  style={{ width: "auto", height: "auto" }}
                  priority={cert.id <= 3}
                />
              </ImageZoomDialog>
            </div>
            <div className="min-w-0">
              <h3 className="text-lg font-semibold truncate">{cert.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                {cert.issuer} • {cert.date}
              </p>
            </div>
          </div>
          <div className="flex-shrink-0 ml-3">
            {isExpanded ? (
              <ChevronUp className="w-6 h-6 text-gray-400 transition-transform duration-300" />
            ) : (
              <ChevronDown className="w-6 h-6 text-gray-400 transition-transform duration-300" />
            )}
          </div>
        </div>

        {isExpanded && (
          <div className="px-5 pb-5 border-t border-gray-200 dark:border-gray-700 animate-in slide-in-from-top-2 duration-300">
            <div className="pt-4 space-y-4">
              <div className="flex justify-center">
                <ImageZoomDialog
                  src={cert.image}
                  alt={cert.title}
                  title={cert.title}
                >
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    width={280}
                    height={240}
                    className="object-cover rounded-md"
                    style={{ width: "auto", height: "auto" }}
                    priority={cert.id <= 3}
                  />
                </ImageZoomDialog>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{t("issuedBy")}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {cert.issuer}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{t("date")}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {cert.date}
                  </span>
                </div>
                <div className="pt-2">
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {tDescriptions(cert.descriptionKey)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>
    );
  };

  const renderMobileCard = (cert: Certification) => {
    const isExpanded = logic.expandedCards.has(cert.id);

    return (
      <Card
        key={cert.id}
        className="shadow-md overflow-hidden relative transition-all duration-300 ease-in-out hover:shadow-lg"
      >
        <div
          className="p-4 cursor-pointer flex items-center justify-between active:bg-gray-50 dark:active:bg-gray-800 transition-colors duration-150"
          onClick={() => logic.toggleCard(cert.id)}
        >
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <ImageZoomDialog
                src={cert.image}
                alt={cert.title}
                title={cert.title}
              >
                <Image
                  src={cert.image}
                  alt={cert.title}
                  width={60}
                  height={60}
                  className="object-cover rounded-md"
                  style={{ width: "auto", height: "auto" }}
                  priority={cert.id <= 3}
                />
              </ImageZoomDialog>
            </div>
            <div className="min-w-0">
              <h3 className="text-base font-semibold truncate">{cert.title}</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                {cert.issuer} • {cert.date}
              </p>
            </div>
          </div>
          <div className="flex-shrink-0 ml-2">
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-400 transition-transform duration-300" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400 transition-transform duration-300" />
            )}
          </div>
        </div>

        {isExpanded && (
          <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-700 animate-in slide-in-from-top-2 duration-300">
            <div className="pt-4 space-y-3">
              <div className="flex justify-center">
                <ImageZoomDialog
                  src={cert.image}
                  alt={cert.title}
                  title={cert.title}
                >
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    width={240}
                    height={200}
                    className="object-cover rounded-md"
                    style={{ width: "auto", height: "auto" }}
                    priority={cert.id <= 3}
                  />
                </ImageZoomDialog>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{t("issuedBy")}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {cert.issuer}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{t("date")}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {cert.date}
                  </span>
                </div>
                <div className="pt-2">
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {tDescriptions(cert.descriptionKey)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>
    );
  };

  const getContainerClasses = () => {
    if (logic.isMobile) {
      return "flex flex-col gap-4 px-2 sm:px-4";
    } else if (logic.isTablet) {
      return "flex flex-col gap-4 px-4";
    }
    return "flex flex-col gap-4 px-4"; // fallback
  };

  const renderCard = (cert: Certification) => {
    if (logic.isMobile) {
      return renderMobileCard(cert);
    } else if (logic.isTablet) {
      return renderTabletCard(cert);
    }
    return renderMobileCard(cert); // fallback
  };

  return (
    <section className={className} id="cert">
      <Card className="max-w-7xl mx-auto bg-transparent dark:bg-transparent shadow-none !border-0">
        <CardTitle className="text-3xl font-light sm:text-4xl text-center mb-8 text-black dark:text-white">
          {t("title")}
        </CardTitle>
        <div className={`z-40 ${getContainerClasses()}`}>
          {certifications.map((cert) => renderCard(cert))}
        </div>
      </Card>
    </section>
  );
}
