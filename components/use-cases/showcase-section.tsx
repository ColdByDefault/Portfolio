/**
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
 */
"use client";

import { useTranslations } from "next-intl";
import { useCaseProjects } from "@/data/use-cases";
import { ProjectCard } from "./project-card";

export function ShowcaseSection() {
  const t = useTranslations("Usecases");

  return (
    <section className="w-full py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6">
        <div className="space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-balance">
            {t("title")}
          </h2>
          <p className="mx-auto max-w-175 text-muted-foreground md:text-xl text-pretty">
            {t("subtitle")}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {useCaseProjects.map((project) => (
            <div
              key={project.id}
              className="w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
