import { expect, test } from "@playwright/test";

const localeCookieName = "PORTFOLIOVERSIONLATEST_LOCALE";
const browserLanguageCookieName = "PORTFOLIOVERSIONLATEST_BROWSER_LANG";
const defaultBaseURL = "http://localhost:3000";

test.describe("locale proxy behavior", () => {
  test("sets locale cookies from the Accept-Language header", async ({
    browser,
  }, testInfo) => {
    const baseURL = testInfo.project.use.baseURL ?? defaultBaseURL;
    const context = await browser.newContext({
      baseURL,
      extraHTTPHeaders: {
        "Accept-Language": "fr-FR,fr;q=0.9,en;q=0.8",
      },
      locale: "fr-FR",
    });

    try {
      const page = await context.newPage();

      await page.goto("/");
      await expect
        .poll(async () => {
          const cookies = await context.cookies(baseURL);
          return cookies.find((cookie) => cookie.name === localeCookieName)
            ?.value;
        })
        .toBe("fr");
      await expect
        .poll(async () => {
          const cookies = await context.cookies(baseURL);
          return cookies.find(
            (cookie) => cookie.name === browserLanguageCookieName,
          )?.value;
        })
        .toBe("fr");

      await page.reload();
      await expect(page.locator("html")).toHaveAttribute("lang", "fr");
    } finally {
      await context.close();
    }
  });

  test("redirects legacy German locale-prefixed routes", async ({ page }) => {
    await page.goto("/de/about");

    await expect
      .poll(() => new URL(page.url()).pathname)
      .toBe("/about");
  });
});
