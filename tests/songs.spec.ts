import { test, expect } from "@playwright/test";

test("should display add song form", async ({ page }) => {
  await page.goto("http://localhost:8080/");

  await expect(page.getByRole("button", { name: "Add Song" })).toBeVisible();
});
