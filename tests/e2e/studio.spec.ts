import { test, expect } from '@playwright/test';

test.describe('Creator Studio Workspace', () => {
  test('should display studio navigation and overview', async ({ page }) => {
    await page.goto('/studio');
    await expect(page.getByText('Active Workspace: Elena Vance')).toBeVisible();
    await expect(page.getByText('Artworks Archive')).toBeVisible();
  });
});
