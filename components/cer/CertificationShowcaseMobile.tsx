/**
 * @author © ColdByDefault
 * @license Copyright (c) 2026 ColdByDefault. All rights reserved.
 * @version 6.x.x
 */

import { useTranslations } from "next-intl";
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

interface CertificationShowcaseMobileProps {
  readonly certifications: readonly Certification[];
  readonly logic: CertificationShowcaseLogic;
  readonly className?: string | undefined;
}

export function CertificationShowcaseMobile({
  certifications,
  className,
}: CertificationShowcaseMobileProps) {
  const t = useTranslations("Certifications");
  const tDescriptions = useTranslations("Certifications.descriptions");
  const tIssuers = useTranslations("Certifications.issuers");

  return (
    <section className={className} id="cert">
      <h2 className="text-3xl font-light text-center mb-8 text-black dark:text-white">
        {t("title")}
      </h2>
      <div className="flex flex-col gap-8 px-2 sm:px-4">
        {certifications.map((cert, index) => (
          <div
            key={cert.id}
            className="bg-background/80 backdrop-blur-sm rounded-xl border border-border/50 shadow-lg hover:shadow-xl hover:border-muted-foreground/30 transition-all duration-300 overflow-hidden group"
          >
            <div className="pl-4 border-l-2 border-foreground/20 group-hover:border-foreground/60 transition-colors duration-300 p-5">
              <span className="text-4xl font-bold text-foreground/8 select-none leading-none block mb-2">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-lg font-semibold mb-1 text-foreground">
                {cert.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-1">
                {cert.issuerKey ? tIssuers(cert.issuerKey) : cert.issuer}
              </p>
              <p className="text-xs text-muted-foreground/60 mb-2 font-mono">
                {cert.date}
              </p>
              <p className="text-sm text-foreground/75 leading-relaxed">
                {tDescriptions(cert.descriptionKey)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
