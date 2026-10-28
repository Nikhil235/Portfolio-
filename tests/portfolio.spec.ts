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
    
    // Navbar should be rendered
    await expect(page.locator('header')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Home' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'About' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Work' })).toBeVisible();
  });

  test('skips preloader when reduced motion is preferred', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');

    // Directly renders main without preloader wait
    await expect(page.locator('main')).toBeVisible({ timeout: 5000 });
  });

  test('opens and interacts with Spring Motion Physics Lab', async ({ page }) => {
    // Set sessionStorage to bypass preloader immediately
    await page.addInitScript(() => {
      sessionStorage.setItem('na:preloader-seen', '1');
    });

    await page.goto('/');
    await expect(page.locator('main')).toBeVisible();

    // Find and click the SPRING LAB button in Navbar
    const springLabBtn = page.getByTitle('Open Motion Physics Lab');
    await expect(springLabBtn).toBeVisible();
    await springLabBtn.click();

    // Verify modal appears
    await expect(page.getByText('MOTION PHYSICS LAB')).toBeVisible();
    await expect(page.getByText('Apple iOS Sheet')).toBeVisible();

    // Close the modal
    const closeBtn = page.locator('button[aria-label="Close modal"], button:has(svg.lucide-x)').first();
    if (await closeBtn.isVisible()) {
      await closeBtn.click();
    } else {
      await page.keyboard.press('Escape');
    }

    await expect(page.getByText('MOTION PHYSICS LAB')).not.toBeVisible();
  });

  test('opens and interacts with Interactive Playgrounds drawer', async ({ page }) => {
    await page.addInitScript(() => {
      sessionStorage.setItem('na:preloader-seen', '1');
    });

    await page.goto('/');
    await expect(page.locator('main')).toBeVisible();

    // Click Playgrounds button
    const playgroundsBtn = page.getByRole('button', { name: 'PLAYGROUNDS' }).first();
    await expect(playgroundsBtn).toBeVisible();
    await playgroundsBtn.click();

    // Verify drawer appears with prototypes
    await expect(page.getByRole('heading', { name: 'Interactive Playgrounds' })).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('Dynamic Magnetic Attractor')).toBeVisible();

    // Switch to Tactile Audio tab
    await page.getByRole('button', { name: 'Tactile Audio' }).click();
    await expect(page.getByText('Synthesized Web Audio Engine')).toBeVisible();

    // Switch to 3D Tilt Card tab
    await page.getByRole('button', { name: '3D Tilt Card' }).click();
    await expect(page.getByText('3D Holographic Parallax Card')).toBeVisible();

    // Close the drawer using Close button
    const closeBtn = page.getByLabel('Close Playgrounds');
    await expect(closeBtn).toBeVisible();
    await closeBtn.click();

    // Verify drawer is closed
    await expect(page.getByRole('heading', { name: 'Interactive Playgrounds' })).not.toBeVisible();
  });
});
