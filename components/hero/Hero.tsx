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
            <div className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden border-4 border-border shadow-2xl">
              <Image
                src="/profileDark.jpg"
                alt="Yazan Abo-Ayash - Full Stack Developer profile picture"
                width={400}
                height={400}
                className="w-full h-full object-cover"
                priority
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
              <h1 className="text-3xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
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
              {/* <ContactForm /> */}
            </div>
{/*             <div className="flex flex-col sm:flex-row gap-4 items-center">
              <SocialLinks />
            </div> */}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Hero;
