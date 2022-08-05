require('dotenv').config();
const { test, expect } = require('@playwright/test');
test.describe('fist test using ob as code',() => {
test('fist test using ob as code', async ({ page }) => {
await page.goto('https://www.aa.com');
await page.locator('#coachmarkContent').click();
}); });
