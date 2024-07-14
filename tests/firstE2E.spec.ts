import { test, expect } from "@playwright/test";

// test.beforeEach(async ({ page }) => {
//   // await page.goto("http://localhost:4280");
//   await page.goto("https://proud-mud-025936b0f.5.azurestaticapps.net");
// });

test.describe("Fetching And Posting Data", () => {
  test.skip(({ browserName }) => browserName !== "chromium", "Chromium only!");

  test.beforeEach(async ({ page, isMobile, context }) => {
    test.fixme(isMobile, "Settings page does not work in mobile yet");
    await page.goto("https://proud-mud-025936b0f.5.azurestaticapps.net");
    await context.grantPermissions(["notifications"], {
      origin: "https://proud-mud-025936b0f.5.azurestaticapps.net",
    });
  });

  test.describe.configure({ mode: "parallel" });

  test.use({
    viewport: { width: 1600, height: 1200 },
    locale: "de-DE",
    timezoneId: "Europe/Berlin",
    geolocation: { longitude: 41.890221, latitude: 12.492348 },
    permissions: ["geolocation"],
    // javaScriptEnabled: false,
  });

  test("GetUsers Sends And Receives A Response", async ({ page }) => {
    let requestSent = false;

    await page.route("**/api/v1/getData", (route) => {
      requestSent = true;
      // route.continue();
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ data: "Expected Data" }),
      });
    });

    await page.getByRole("button", { name: "GetUsers" }).click();

    await page.waitForTimeout(2000);

    expect(requestSent).toBe(true);

    await expect(page.locator("text=Expected Data")).toBeVisible();
  });

  test(
    "PostUsers Sends And Receives A Response",
    {
      annotation: [
        {
          type: "issue",
          description: "https://github.com/microsoft/playwright/issues/23180",
        },
        { type: "performance", description: "very slow test!" },
      ],
    },
    async ({ page, browser, context }) => {
      tag: "@report";

      await context.setGeolocation({
        longitude: 48.858455,
        latitude: 2.294474,
      });
      test.info().annotations.push({
        type: "browser version",
        description: browser.version(),
      });

      let requestSent = false;

      await page.route("**/api/v1/postData", (route) => {
        requestSent = true;
        // route.continue();
        route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ data: "Expected Data" }),
        });
      });

      await page.getByRole("button", { name: "PostUser" }).click();

      await page.waitForTimeout(2000);

      expect(requestSent).toBe(true);

      await expect(page.locator("text=Expected Data")).toBeVisible();
    }
  );
});
