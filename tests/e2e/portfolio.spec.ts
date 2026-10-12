import { test, expect } from '@playwright/test';

test.describe('Public Creator Portfolio', () => {
  test('should render artist profile and catalog', async ({ page }) => {
    await page.goto('/u/elenavance');
    await expect(page.locator('h1')).toContainText('Elena Vance');
    await expect(page.getByText('Master Catalog')).toBeVisible();
  });
});
