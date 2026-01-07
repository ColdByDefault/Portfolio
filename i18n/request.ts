// SPDX-License-Identifier: LicenseRef-BRH-1.0
import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import type { LocaleModule } from "@/types/configs/i18n";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("PORTFOLIOVERSIONLATEST_LOCALE")?.value;

  // Validate that the locale exists in our supported languages
  const supportedLocales = ["en", "de", "es", "fr", "sv"];
  const locale =
    localeCookie && supportedLocales.includes(localeCookie)
      ? localeCookie
      : "en";

  const localeModule = (await import(
    `../messages/${locale}.json`
  )) as LocaleModule;

  return {
    locale,
    messages: localeModule.default,
  };
});
