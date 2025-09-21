/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */
"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

function Hero() {
  const t = useTranslations("Hero");
  const light = "from-black/90 to-gray-500";

  return (
    <main
      id="home2"
      className="w-full flex items-center justify-center scroll-mt-16"
      role="main"
      aria-label="Hero section"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-8 text-center">
          {/* Profile Picture */}
          <div className="relative">
            <div className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden border-4 border-border shadow-2xl aspect-square">
              <Image
                src="/profileDark.jpg"
                alt="Yazan Abo-Ayash - Full Stack Developer profile picture"
                width={400}
                height={400}
                className="w-full h-full object-cover"
                priority
                quality={90}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                sizes="(max-width: 640px) 192px, (max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
              />
            </div>
            {/* <div className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4">
              <Badge
                variant="secondary"
                className="px-3 py-1 text-sm font-medium"
                role="status"
                aria-label="Available for collaboration"
              >
                {t("availableForCollaboration")}
              </Badge>
            </div> */}
          </div>

          {/* Content */}
          <div className="space-y-6 max-w-4xl">
            <div className="space-y-4">
              <h1
                className={`bg-gradient-to-r text-transparent flex justify-center text-3xl sm:text-3xl md:text-4xl lg:text-5xl
                            ${light} bg-clip-text font-extrabold
                          dark:from-gray-900 dark:to-gray-200`}
              >
                Yazan Abo-Ayash
              </h1>
              <div className="space-y-2">
                <h2 className="text-xl md:text-2xl lg:text-2xl font-medium text-muted-foreground">
                  {t("fullStackDeveloper")}
                </h2>
              </div>
            </div>
            <p className="text-md text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t("description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-2 items-center justify-center">
              <Button
                variant="outline"
                asChild
                className="gap-2 cursor-pointer hover:bg-primary/10"
              >
                <Link href="/about" className="flex items-center gap-2">
                  {t("learnMoreAboutMe")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Hero;
