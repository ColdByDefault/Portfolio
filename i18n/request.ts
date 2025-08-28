// SPDX-License-Identifier: LicenseRef-BRH-1.0
import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import type { LocaleModule } from "@/types/i18n";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("PORTFOLIOVERSIONLATEST_LOCALE")?.value;
  const locale = localeCookie ?? "en";

  const localeModule = (await import(
    `../messages/${locale}.json`
  )) as LocaleModule;

  return {
    locale,
    messages: localeModule.default,
  };
});
