/**
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
 */
"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Mail, MessageSquare } from "lucide-react";
import {
  FaGithub,
  FaLinkedin,
  FaSquareInstagram,
  FaSquareXTwitter,
  FaSpotify,
  FaGitlab,
  FaCodepen,
  FaDev,
} from "react-icons/fa6";
import { SiRoadmapdotsh, SiDailydotdev } from "react-icons/si";
import { socialLinks } from "@/data/footerLinks";
import { useTranslations } from "next-intl";

interface ContactInfo {
  email: string;
  location: string;
  availability: string;
}

interface ContactSheetProps {
  children: React.ReactNode;
  contactInfo?: ContactInfo;
}

const defaultContactInfo: ContactInfo = {
  email: "contact@coldbydefault.com",
  location: "Germany",
  availability: "Available for hobby projects",
};

const iconMap = {
  FaGithub,
  FaLinkedin,
  FaInstagramSquare: FaSquareInstagram,
  FaSquareXTwitter,
  FaSpotify,
  FaGitlab,
  FaCodepen,
  FaDev,
  SiRoadmapdotsh,
  SiDailydotdev,
};

export default function ContactSheet({
  children,
  contactInfo = defaultContactInfo,
}: ContactSheetProps) {
  const t = useTranslations("Contact");

  const handleEmailClick = () => {
    window.location.href = `mailto:${contactInfo.email}`;
  };

  const handleSocialClick = (href: string, _label: string) => {
    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side="right"
        className="w-[350px] sm:w-[400px] px-8"
        aria-label="Contact information"
      >
        <SheetHeader className="space-y-4">
          <SheetTitle className="text-xl font-bold flex items-center gap-2">
            <MessageSquare className="h-5 w-5" aria-hidden="true" />
            {t("getInTouch")}
          </SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground">
            {t("description")}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Email Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              {t("email")}
            </h3>
            <Button
              variant="outline"
              className="w-full justify-start h-auto py-3 px-4 cursor-pointer"
              onClick={handleEmailClick}
              aria-label={`Send email to ${contactInfo.email}`}
            >
              <Mail className="h-4 w-4 mr-3 text-blue-500" aria-hidden="true" />
              <div className="text-left">
                <div className="font-medium">{contactInfo.email}</div>
                <div className="text-xs text-muted-foreground">
                  {t("clickToSendEmail")}
                </div>
              </div>
            </Button>
          </div>
          <Separator />
          {/* Social Media Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              {t("socialMedia")}
            </h3>
            <div className="grid grid-cols-5 gap-2">
              {socialLinks.map((social) => {
                const IconComponent =
                  iconMap[social.icon as keyof typeof iconMap];
                if (!IconComponent) return null;

                // Get display name for social platform
                const getDisplayName = (label: string) => {
                  switch (label.toLowerCase()) {
                    case "x":
                      return "X";
                    case "github":
                      return "GitHub";
                    case "linkedin":
                      return "LinkedIn";
                    case "instagram":
                      return "Instagram";
                    case "spotify":
                      return "Spotify";
                    default:
                      return label;
                  }
                };

                return (
                  <div
                    key={social.label}
                    className="flex flex-col items-center"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-10 w-10 p-0 cursor-pointer"
                      onClick={() =>
                        handleSocialClick(social.href, social.label)
                      }
                      aria-label={
                        social.ariaLabel || `Visit ${social.label} profile`
                      }
                    >
                      <IconComponent className="h-4 w-4" aria-hidden="true" />
                    </Button>
                    <span className="text-xs text-muted-foreground mt-1">
                      {getDisplayName(social.label)}
                    </span>
                  </div>
                );
              })}

              {/* Additional Development Platforms */}
              {[
                {
                  label: "GitLab",
                  icon: "FaGitlab",
                  href: "https://gitlab.com/ColdByDefault",
                  displayName: "GitLab",
                },
                {
                  label: "CodePen",
                  icon: "FaCodepen",
                  href: "https://codepen.io/ColdByDefault",
                  displayName: "CodePen",
                },
                {
                  label: "Developer Roadmaps",
                  icon: "SiRoadmapdotsh",
                  href: "https://roadmap.sh/u/coldbydefault",
                  displayName: "Roadmaps",
                },
                {
                  label: "Daily.dev",
                  icon: "SiDailydotdev",
                  href: "https://app.daily.dev/coldbydefault",
                  displayName: "Daily.dev",
                },
                {
                  label: "DEV Community",
                  icon: "FaDev",
                  href: "https://dev.to/coldbydefault",
                  displayName: "Dev",
                },
              ].map((platform) => {
                const IconComponent =
                  iconMap[platform.icon as keyof typeof iconMap];
                if (!IconComponent) return null;

                return (
                  <div
                    key={platform.label}
                    className="flex flex-col items-center"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-10 w-10 p-0 cursor-pointer"
                      onClick={() =>
                        handleSocialClick(platform.href, platform.label)
                      }
                      aria-label={`Visit ${platform.label} profile`}
                    >
                      <IconComponent className="h-4 w-4" aria-hidden="true" />
                    </Button>
                    <span className="text-xs text-muted-foreground mt-1">
                      {platform.displayName}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>{" "}
          <Separator />
          {/* Additional Info Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              {t("info")}
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">{t("location")}:</span>
                <Badge variant="outline" className="text-xs">
                  {contactInfo.location}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">{t("status")}:</span>
                <Badge variant="secondary" className="text-xs">
                  {t("openForCollaboration")}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Position:</span>
                <Badge variant="outline" className="text-xs">
                  Intern at avarno GmbH
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">{t("training")}:</span>
                <Badge variant="secondary" className="text-xs">
                  GFN Trainee
                </Badge>
              </div>
            </div>
          </div>
          <Separator />
          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              {t("quickLinks")}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-9 cursor-pointer"
                onClick={() =>
                  handleSocialClick(
                    "https://github.com/ColdByDefault",
                    "GitHub"
                  )
                }
              >
                <FaGithub className="h-4 w-4 mr-1" />
                GitHub
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-9 cursor-pointer"
                onClick={() =>
                  handleSocialClick(
                    "https://www.linkedin.com/in/yazan-a-a-465b44312/",
                    "LinkedIn"
                  )
                }
              >
                <FaLinkedin className="h-4 w-4 mr-1" />
                LinkedIn
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
