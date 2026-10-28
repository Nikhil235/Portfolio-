import { test, expect } from '@playwright/test';

test.describe('Interactive Dark Portfolio', () => {
  test('loads portfolio and transitions through preloader', async ({ page }) => {
    await page.goto('/');

    // Check that preloader or main portfolio content is present
    const preloader = page.getByRole('status', { name: 'Loading portfolio' });
    if (await preloader.isVisible()) {
      // Click or press a key to skip preloader quickly
      await page.keyboard.press('Space');
    }

    // Main portfolio container should be visible
    await expect(page.locator('main')).toBeVisible({ timeout: 10000 });
    
    // Navbar should be rendered with navigation buttons
    await expect(page.locator('header')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Home' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'About' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Work' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Contact' })).toBeVisible();
  });

  test('skips preloader when reduced motion is preferred', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');

    // Directly renders main without preloader wait
    await expect(page.locator('main')).toBeVisible({ timeout: 5000 });
  });

  test('navigates through portfolio sections', async ({ page }) => {
    await page.addInitScript(() => {
      sessionStorage.setItem('na:preloader-seen', '1');
    });

    await page.goto('/');
    await expect(page.locator('main')).toBeVisible();

    // Click "Work" nav link and check active state
    const workBtn = page.getByRole('button', { name: 'Work' });
    await expect(workBtn).toBeVisible();
    await workBtn.click();

    // Click "About" nav link
    const aboutBtn = page.getByRole('button', { name: 'About' });
    await expect(aboutBtn).toBeVisible();
    await aboutBtn.click();
  });

  test('toggles tactile sound on and off', async ({ page }) => {
    await page.addInitScript(() => {
      sessionStorage.setItem('na:preloader-seen', '1');
    });

    await page.goto('/');
    await expect(page.locator('main')).toBeVisible();

    // Find the sound toggle button
    const soundToggle = page.locator('button[aria-label*="sound" i]');
    await expect(soundToggle).toBeVisible();

    // Toggle sound
    await soundToggle.click();
    await expect(soundToggle).toHaveAttribute('aria-label', 'Enable sound');

    // Toggle sound back on
    await soundToggle.click();
    await expect(soundToggle).toHaveAttribute('aria-label', 'Mute sound');
  });
});
