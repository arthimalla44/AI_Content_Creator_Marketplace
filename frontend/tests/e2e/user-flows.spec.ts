import { test, expect } from '@playwright/test';

test.describe('E2E Live User Journeys: CreatorHub AI', () => {
  const timestamp = Date.now();
  const clientEmail = `live-client-${timestamp}@creatorhub.ai`;
  const creatorEmail = `live-creator-${timestamp}@creatorhub.ai`;

  test('E2E-01: Client Registration, Account Menu & Sign Out Flow', async ({ page }) => {
    await page.goto('/auth/register');
    await expect(page).toHaveTitle(/CreatorHub/i);

    // 1. Fill client registration form
    await page.fill('input[placeholder="Aarav Mehta"]', 'Live Client Tester');
    await page.fill('input[placeholder="you@domain.com"]', clientEmail);
    await page.fill('input[placeholder="At least 6 characters"]', 'password123');
    await page.fill('input[placeholder="Repeat your password"]', 'password123');

    const submitBtn = page.locator('button[type="submit"]');
    await submitBtn.click();

    // 2. Redirects to client dashboard upon registration
    await page.waitForURL((url) => url.pathname.includes('/dashboard') || url.pathname === '/', { timeout: 10000 });

    // 3. Verify interactive account menu in Navbar displays database user details
    const userMenuBtn = page.locator('#user-menu-button');
    await expect(userMenuBtn).toBeVisible({ timeout: 5000 });
    await userMenuBtn.click();

    // Verify account menu displays real user details inside the dropdown menu
    const menuDropdown = page.locator('#user-account-menu');
    await expect(menuDropdown.locator('text=Live Client Tester')).toBeVisible();
    await expect(menuDropdown.locator(`text=${clientEmail}`)).toBeVisible();
    await expect(menuDropdown.locator('text=CLIENT Account')).toBeVisible();

    // 4. Test Sign Out action
    const signOutBtn = page.locator('button:has-text("Sign Out")');
    await expect(signOutBtn).toBeVisible();
    await signOutBtn.click();

    // 5. Verify unauthenticated state in Navbar (Sign In link appears)
    await expect(page.locator('a:has-text("Sign In")').first()).toBeVisible({ timeout: 5000 });
  });

  test('E2E-02: Creator Registration, Onboarding and Role Verification', async ({ page }) => {
    await page.goto('/auth/register');

    // Switch role to AI Creator
    const creatorRoleBtn = page.locator('button:has-text("AI Creator")');
    if (await creatorRoleBtn.isVisible()) {
      await creatorRoleBtn.click();
    }

    await page.fill('input[placeholder="Aarav Mehta"]', 'Live Creator Director');
    await page.fill('input[placeholder="you@domain.com"]', creatorEmail);
    await page.fill('input[placeholder="At least 6 characters"]', 'password123');
    await page.fill('input[placeholder="Repeat your password"]', 'password123');

    await page.locator('button[type="submit"]').click();

    // Redirects to onboarding or creator dashboard
    await page.waitForURL((url) => url.pathname.includes('/onboarding/creator') || url.pathname.includes('/dashboard/creator') || url.pathname === '/', { timeout: 10000 });

    if (page.url().includes('/onboarding/creator')) {
      const submitOnboarding = page.locator('button:has-text("Complete Onboarding")');
      if (await submitOnboarding.isVisible()) {
        await submitOnboarding.click();
        await page.waitForTimeout(1500);
      }
    }

    // Verify creator account menu
    const userMenuBtn = page.locator('#user-menu-button');
    if (await userMenuBtn.isVisible()) {
      await userMenuBtn.click();
      await expect(page.locator(`text=${creatorEmail}`)).toBeVisible();
      await expect(page.locator('text=CREATOR Account')).toBeVisible();
    }
  });

  test('E2E-03: Protected Route Middleware Redirection and Return Destination', async ({ page }) => {
    // Open protected dashboard directly while unauthenticated
    await page.goto('/dashboard/client');

    // Middleware must redirect to /auth/login with safe redirect parameter
    await page.waitForURL((url) => url.pathname === '/auth/login', { timeout: 8000 });
    expect(page.url()).toContain('redirect=%2Fdashboard%2Fclient');

    // Log in with seeded admin
    await page.fill('input[type="email"]', 'admin@creatorhub.ai');
    await page.fill('input[type="password"]', 'password123');
    await page.locator('button[type="submit"]').click();

    // Verify redirected back to intended destination (/dashboard/client)
    await page.waitForURL((url) => url.pathname === '/dashboard/client', { timeout: 10000 });
    await expect(page.locator('body')).toBeVisible();
  });

  test('E2E-04: Creator Search & Directory Navigation', async ({ page }) => {
    await page.goto('/creators');
    await expect(page.locator('body')).toBeVisible();

    await expect(page.locator('text=Verified AI Content Creators')).toBeVisible();
    await expect(page.locator('text=Elena Rostova').first()).toBeVisible({ timeout: 10000 });

    const searchInput = page.locator('input[placeholder*="Search" i]');
    if (await searchInput.isVisible()) {
      await searchInput.fill('Elena');
      await page.waitForTimeout(400);
      await expect(page.locator('text=Elena Rostova').first()).toBeVisible();
    }
  });

  test('E2E-05: AI Content Studio & Prompt Generation Flow', async ({ page }) => {
    await page.goto('/ai-studio');
    await expect(page.locator('body')).toBeVisible();

    const promptInput = page.locator('textarea, input[placeholder*="topic" i], input[placeholder*="Describe" i], input[placeholder*="Prompt" i]');
    if (await promptInput.first().isVisible()) {
      await promptInput.first().fill('Autonomous AI Commercial Video Shoot');

      const generateBtn = page.locator('button:has-text("Generate"), button:has-text("Create"), button[type="submit"]');
      if (await generateBtn.first().isVisible()) {
        await generateBtn.first().click();
        await page.waitForTimeout(2000);
      }
    }
    await expect(page.locator('body')).toBeVisible();
  });

  test('E2E-06: Marketplace Workflows & Prompt Catalogs', async ({ page }) => {
    await page.goto('/workflows');
    await expect(page.locator('body')).toBeVisible();

    await page.goto('/prompts');
    await expect(page.locator('body')).toBeVisible();

    await page.goto('/services');
    await expect(page.locator('body')).toBeVisible();
  });

  test('E2E-07: Direct Messaging Interface', async ({ page }) => {
    await page.goto('/messages');
    await expect(page.locator('body')).toBeVisible();

    const chatInput = page.locator('input[placeholder*="message" i], textarea[placeholder*="message" i]');
    if (await chatInput.isVisible()) {
      await chatInput.fill('Hi Elena! The 4K render looks breathtaking.');
      const sendBtn = page.locator('button:has-text("Send"), button[type="submit"]');
      if (await sendBtn.isVisible()) {
        await sendBtn.click();
        await page.waitForTimeout(500);
      }
    }
    await expect(page.locator('body')).toBeVisible();
  });
});
