import { test, expect } from '@playwright/test';

test('homepage has Playwright in title and get started link linking to the intro page', 
  async ({ page }) => {
  await page.goto('https://aa.com/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Airline/);

  // create a locator
  //const getStarted = page.locator('#coachMarkCloseIconLogIn');

  // Expect an attribute "to be strictly equal" to the value.

  // Click the get started link.
  //await getStarted.click();
  const loginButton = page.locator('#log-in-button');
  await loginButton.click();
  // Expects the URL to contain intro.
  await expect(page.locator('text=AAdvantage # or username')).toBeVisible();
});
