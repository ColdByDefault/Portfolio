/**
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Shield, Cookie, Eye, Server, Globe } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function Privacy() {
  const t = await getTranslations("Privacy");

  return (
    <div className="container mx-auto px-4 py-8 mt-20 max-w-4xl">
      <div className="space-y-6">
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

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              {t("overview.title")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("overview.description")}
            </p>
            <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <p className="text-sm font-medium text-green-900 dark:text-green-100 mb-2">
                {t("overview.keyPoint")}
              </p>
              <p className="text-sm text-green-800 dark:text-green-200">
                {t("overview.keyPointDescription")}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cookie className="w-5 h-5" />
              {t("cookies.title")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="p-3 border rounded-lg">
                <h4 className="font-medium text-sm">
                  {t("cookies.essential.title")}
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {t("cookies.essential.description")}
                </p>
              </div>
              <div className="p-3 border rounded-lg">
                <h4 className="font-medium text-sm">
                  {t("cookies.analytics.title")}
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {t("cookies.analytics.description")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="w-5 h-5" />
              {t("dataProcessing.title")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("dataProcessing.description")}
            </p>
            <div className="p-4 rounded-lg border">
              <p className="text-sm font-medium mb-2">
                {t("dataProcessing.vercelTitle")}
              </p>
              <p className="text-sm">{t("dataProcessing.vercelDescription")}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="w-5 h-5" />
              {t("chatbot.title")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("chatbot.description")}
            </p>
            <div className="p-4 rounded-lg border">
              <p className="text-sm font-medium mb-2">
                {t("chatbot.apiTitle")}
              </p>
              <p className="text-sm">{t("chatbot.apiDescription")}</p>
            </div>
            <div className="p-4 rounded-lg border">
              <p className="text-sm font-medium mb-2">
                {t("chatbot.temporaryTitle")}
              </p>
              <p className="text-sm">{t("chatbot.temporaryDescription")}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="w-5 h-5" />
              {t("booking.title")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("booking.description")}
            </p>
            <div className="p-4 rounded-lg border">
              <p className="text-sm font-medium mb-2">
                {t("booking.calendlyTitle")}
              </p>
              <p className="text-sm">{t("booking.calendlyDescription")}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              {t("rights.title")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("rights.description")}
            </p>
            <div className="grid gap-2">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
                <p className="text-sm">{t("rights.clearCookies")}</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
                <p className="text-sm">{t("rights.disableAnalytics")}</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
                <p className="text-sm">{t("rights.contact")}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center pt-6">
          <p className="text-xs text-muted-foreground">
            {t("lastUpdated")}
            {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
