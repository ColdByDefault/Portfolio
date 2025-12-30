/**
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Shield,
  User,
  Phone,
  Receipt,
  FileEdit,
  Scale,
  ExternalLink,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function Impressum() {
  const t = await getTranslations("Impressum");

  return (
    <div className="container mx-auto px-4 py-8 mt-20 max-w-4xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight">{t("title")}</h1>
          <p className="text-muted-foreground text-lg">{t("subtitle")}</p>
        </div>

        <Separator />

        {/* Contact Information - § 5 DDG */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              {t("provider.title")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm font-medium">{t("provider.name")}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {t("provider.address")}
              </p>
              <p className="text-sm text-muted-foreground">
                {t("provider.city")}
              </p>
              <p className="text-sm text-muted-foreground">
                {t("provider.country")}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              {t("contact.title")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{t("contact.phone")}</span>
              <span className="text-sm text-muted-foreground">
                {t("contact.phoneValue")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{t("contact.email")}</span>
              <Link
                href={`mailto:${t("contact.emailValue")}`}
                className="text-sm text-primary hover:underline"
              >
                {t("contact.emailValue")}
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* VAT ID */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="w-5 h-5" />
              {t("vat.title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {t("vat.description")}
            </p>
            <p className="text-sm font-medium mt-2">{t("vat.value")}</p>
          </CardContent>
        </Card>

        {/* Editorial Responsibility (for Blog) */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileEdit className="w-5 h-5" />
              {t("editorial.title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm font-medium">{t("editorial.name")}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {t("editorial.address")}
              </p>
              <p className="text-sm text-muted-foreground">
                {t("editorial.city")}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* EU Dispute Resolution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scale className="w-5 h-5" />
              {t("dispute.title")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
                {t("dispute.euTitle")}
              </p>
              <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
                {t("dispute.euDescription")}
              </p>
              <Link
                href="https://consumer-redress.ec.europa.eu/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
              >
                https://consumer-redress.ec.europa.eu/
                <ExternalLink className="w-3 h-3" />
              </Link>
              <p className="text-sm text-blue-800 dark:text-blue-200 mt-2">
                {t("dispute.emailNote")}
              </p>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm font-medium mb-2">
                {t("dispute.arbitrationTitle")}
              </p>
              <p className="text-sm text-muted-foreground">
                {t("dispute.arbitrationDescription")}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Last Updated */}
        <div className="text-center pt-6">
          <p className="text-xs text-muted-foreground">
            {t("lastUpdated")} {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
