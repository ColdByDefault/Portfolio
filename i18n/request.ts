// SPDX-License-Identifier: LicenseRef-BRH-1.0
import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("PORTFOLIOVERSIONLATEST_LOCALE")?.value;
  const locale = localeCookie ?? "en";

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
