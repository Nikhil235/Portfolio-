import { test, expect } from '@playwright/test';

test.describe('Interactive Dark Portfolio', () => {
  test('loads portfolio, skips preloader, and renders renamed navigation items', async ({ page }) => {
    await page.goto('/');

    const preloader = page.getByRole('status', { name: 'Loading portfolio' });
    if (await preloader.isVisible()) {
      await page.keyboard.press('Space');
    }

    await expect(page.locator('main')).toBeVisible({ timeout: 10000 });

    // Navbar should render all section-matched links
    await expect(page.locator('header')).toBeVisible();
    for (const label of ['Home', 'Philosophy', 'Capabilities', 'Experience', 'Field Notes', 'Sketchbook', 'Contact']) {
      await expect(page.getByRole('button', { name: label, exact: true })).toBeVisible();
    }
  });

  test('skips preloader when reduced motion is preferred', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');

    await expect(page.locator('main')).toBeVisible({ timeout: 5000 });
  });

  test('navigates through portfolio sections and copies contact email', async ({ page }) => {
    await page.addInitScript(() => {
      sessionStorage.setItem('na:preloader-seen', '1');
    });

    await page.goto('/');
    await expect(page.locator('main')).toBeVisible();

    const expBtn = page.getByRole('button', { name: 'Experience', exact: true });
    await expect(expBtn).toBeVisible();
    await expBtn.click();

    const philosophyBtn = page.getByRole('button', { name: 'Philosophy', exact: true });
    await expect(philosophyBtn).toBeVisible();
    await philosophyBtn.click();

    // Verify visible contact email and copy button
    await expect(page.getByText('nikhilarjun.design@gmail.com')).toBeVisible();
    const copyBtn = page.getByRole('button', { name: /copy email/i });
    await expect(copyBtn).toBeVisible();
  });

  test('toggles tactile sound on and off (opt-in by default)', async ({ page }) => {
    await page.addInitScript(() => {
      sessionStorage.setItem('na:preloader-seen', '1');
    });

    await page.goto('/');
    await expect(page.locator('main')).toBeVisible();

    // Sound starts opt-in (off by default -> aria-label is 'Enable sound')
    const soundToggle = page.locator('button[aria-label*="sound" i]');
    await expect(soundToggle).toBeVisible();
    await expect(soundToggle).toHaveAttribute('aria-label', 'Enable sound');

    // Click to enable sound
    await soundToggle.click();
    await expect(soundToggle).toHaveAttribute('aria-label', 'Mute sound');

    // Click to mute sound again
    await soundToggle.click();
    await expect(soundToggle).toHaveAttribute('aria-label', 'Enable sound');
  });
});
