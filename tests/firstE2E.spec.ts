import { test, expect } from "@playwright/test";

// test.beforeEach(async ({ page }) => {
//   // await page.goto("http://localhost:4280");
//   await page.goto("https://proud-mud-025936b0f.5.azurestaticapps.net");
// });

test.describe("Fetching And Posting Data", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://proud-mud-025936b0f.5.azurestaticapps.net");
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

  test("PostUsers Sends And Receives A Response", async ({ page }) => {
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
  });
});

// test("GetUsers Sends And Receives A Response", async ({ page }) => {
//   let requestSent = false;

//   await page.route("**/api/v1/getData", (route) => {
//     requestSent = true;
//     // route.continue();
//     route.fulfill({
//       status: 200,
//       contentType: "application/json",
//       body: JSON.stringify({ data: "Expected Data" }),
//     });
//   });

//   await page.getByRole("button", { name: "GetUsers" }).click();

//   await page.waitForTimeout(2000);

//   expect(requestSent).toBe(true);

//   await expect(page.locator("text=Expected Data")).toBeVisible();
// });

// test("PostUsers Sends And Receives A Response", async ({ page }) => {
//   let requestSent = false;

//   await page.route("**/api/v1/postData", (route) => {
//     requestSent = true;
//     // route.continue();
//     route.fulfill({
//       status: 200,
//       contentType: "application/json",
//       body: JSON.stringify({ data: "Expected Data" }),
//     });
//   });

//   await page.getByRole("button", { name: "PostUser" }).click();

//   await page.waitForTimeout(2000);

//   expect(requestSent).toBe(true);

//   await expect(page.locator("text=Expected Data")).toBeVisible();
// });
