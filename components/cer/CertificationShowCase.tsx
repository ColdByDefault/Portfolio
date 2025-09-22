/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { certifications } from "@/data/certificationsData";
import { Card, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { getCardHoverClasses, getOverlayStyles } from "@/lib/card-animations";
import { ImageZoomDialog } from "@/components/ui/image-zoom-dialog";

interface CertificationShowcaseProps {
  className?: string;
}

function CertificationShowcase({ className }: CertificationShowcaseProps) {
  const isMobile = useIsMobile();
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());
  const [isTablet, setIsTablet] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const t = useTranslations("Certifications");
  const tDescriptions = useTranslations("Certifications.descriptions");

  React.useEffect(() => {
    const checkIsTablet = () => {
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    checkIsTablet();
    window.addEventListener("resize", checkIsTablet);

    return () => window.removeEventListener("resize", checkIsTablet);
  }, []);

  const toggleCard = (id: number) => {
    setExpandedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  interface Certification {
    id: number;
    title: string;
    issuer: string;
    date: string;
    description: string;
    descriptionKey: string;
    image: string;
  }

  const renderDesktopCard = (cert: Certification) => {
    const isCurrentCardHovered = hoveredCard === cert.id;

    return (
      <Card
        key={cert.id}
        className={`px-3 py-4 h-full flex flex-col ${getCardHoverClasses(
          isCurrentCardHovered
        )}`}
        onMouseEnter={() => setHoveredCard(cert.id)}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <CardTitle className="mb-3">
          <h3 className="text-lg font-semibold text-center min-h-[3rem] flex items-center justify-center">
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
              className="object-cover rounded-md w-full max-w-[400px] h-[280px]"
              style={{ width: "100%", maxWidth: "400px", height: "280px" }}
              priority={cert.id <= 3}
            />
          </ImageZoomDialog>
        </div>
        <div className="flex-1 space-y-2">
          <p className="text-sm">
            {t("issuedBy")} {cert.issuer}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t("date")} {cert.date}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            {tDescriptions(cert.descriptionKey)}
          </p>
        </div>
        <div
          className={`
            absolute inset-0 rounded-lg transition-opacity duration-500 pointer-events-none
            ${isCurrentCardHovered ? "opacity-100" : "opacity-0"}
          `}
          style={getOverlayStyles(isCurrentCardHovered)}
        />
      </Card>
    );
  };

  const renderTabletCard = (cert: Certification) => {
    const isExpanded = expandedCards.has(cert.id);

    return (
      <Card
        key={cert.id}
        className="shadow-md overflow-hidden relative transition-all duration-300 ease-in-out hover:shadow-lg"
      >
        <div
          className="p-5 cursor-pointer flex items-center justify-between active:bg-gray-50 dark:active:bg-gray-800 transition-colors duration-150"
          onClick={() => toggleCard(cert.id)}
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
    const isExpanded = expandedCards.has(cert.id);

    return (
      <Card
        key={cert.id}
        className="shadow-md overflow-hidden relative transition-all duration-300 ease-in-out hover:shadow-lg"
      >
        <div
          className="p-4 cursor-pointer flex items-center justify-between active:bg-gray-50 dark:active:bg-gray-800 transition-colors duration-150"
          onClick={() => toggleCard(cert.id)}
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
    if (isMobile) {
      return "flex flex-col gap-4 px-2 sm:px-4";
    } else if (isTablet) {
      return "flex flex-col gap-4 px-4";
    } else {
      return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start";
    }
  };

  const renderCard = (cert: Certification) => {
    if (isMobile) {
      return renderMobileCard(cert);
    } else if (isTablet) {
      return renderTabletCard(cert);
    } else {
      return renderDesktopCard(cert);
    }
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

export default CertificationShowcase;
