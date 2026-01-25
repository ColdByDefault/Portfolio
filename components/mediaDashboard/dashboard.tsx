/**
 * Media Dashboard - Navigation hub for all media content
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
*/

"use client";

import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { FileText, BookOpen, ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";

interface NavigationCard {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  isExternal?: boolean;
  isComingSoon?: boolean;
}

export function MediaDashboard() {
  const t = useTranslations("MediaDashboard");

  const navigationCards: NavigationCard[] = [
    {
      title: t("cards.blogs.title"),
      description: t("cards.blogs.description"),
      href: "/blog",
      icon: FileText,
    },
    {
      title: t("cards.library.title"),
      description: t("cards.library.description"),
      href: "/library",
      icon: BookOpen,
    },
  ];
  return (
    <div className="flex flex-col pt-20">
      <div className="container mx-auto px-4 py-8 flex-1">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            {t("title")}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {navigationCards.map((card) => {
            const Icon = card.icon;
            const isDisabled = card.isComingSoon;

            const CardWrapper = ({
              children,
            }: {
              children: React.ReactNode;
            }) => {
              if (isDisabled) {
                return (
                  <Card className="h-full relative overflow-hidden transition-all duration-300 hover:shadow-lg opacity-60 cursor-not-allowed">
                    {children}
                  </Card>
                );
              }

              return (
                <Link href={card.href} className="block group h-full">
                  <Card className="h-full relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105 group-hover:border-primary/50">
                    {children}
                  </Card>
                </Link>
              );
            };

            return (
              <CardWrapper key={card.title}>
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${
                          isDisabled
                            ? "bg-muted"
                            : "bg-primary/10 group-hover:bg-primary/20"
                        } transition-colors`}
                      >
                        <Icon
                          className={`h-5 w-5 ${
                            isDisabled
                              ? "text-muted-foreground"
                              : "text-primary"
                          }`}
                        />
                      </div>
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          {card.title}
                          {card.isExternal && (
                            <ExternalLink className="h-4 w-4 text-muted-foreground" />
                          )}
                          {card.isComingSoon && (
                            <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                              {t("comingSoon")}
                            </span>
                          )}
                        </CardTitle>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-sm leading-relaxed">
                    {card.description}
                  </CardDescription>
                </CardHeader>
              </CardWrapper>
            );
          })}
        </div>
      </div>
    </div>
  );
}
