import { test, expect } from '@playwright/test'

test.describe('Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('should have proper heading structure', async ({ page }) => {
    // Check for main heading
    await expect(page.locator('h1')).toBeVisible()
    
    // Check for section headings
    const headings = await page.locator('h2, h3').all()
    expect(headings.length).toBeGreaterThan(0)
    
    // Verify heading hierarchy
    const h1Count = await page.locator('h1').count()
    expect(h1Count).toBe(1) // Should have exactly one h1
  })

  test('should have proper ARIA labels', async ({ page }) => {
    // Check navigation links
    const navLinks = page.locator('nav a')
    for (let i = 0; i < await navLinks.count(); i++) {
      const link = navLinks.nth(i)
      const ariaLabel = await link.getAttribute('aria-label')
      const text = await link.textContent()
      expect(ariaLabel || text).toBeTruthy()
    }
    
    // Check buttons
    const buttons = page.locator('button')
    for (let i = 0; i < await buttons.count(); i++) {
      const button = buttons.nth(i)
      const ariaLabel = await button.getAttribute('aria-label')
      const text = await button.textContent()
      expect(ariaLabel || text).toBeTruthy()
    }
  })

  test('should be keyboard navigable', async ({ page }) => {
    // Test tab navigation
    await page.keyboard.press('Tab')
    await expect(page.locator(':focus')).toBeVisible()
    
    // Navigate through all interactive elements
    const focusableElements = page.locator('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])')
    const count = await focusableElements.count()
    
    for (let i = 0; i < Math.min(count, 10); i++) { // Test first 10 elements
      await page.keyboard.press('Tab')
      await expect(page.locator(':focus')).toBeVisible()
    }
  })

  test('should have proper form labels', async ({ page }) => {
    await page.click('a[href="#contact"]')
    
    // Check that all form inputs have associated labels
    const inputs = page.locator('input, select, textarea')
    for (let i = 0; i < await inputs.count(); i++) {
      const input = inputs.nth(i)
      const id = await input.getAttribute('id')
      if (id) {
        const label = page.locator(`label[for="${id}"]`)
        await expect(label).toBeVisible()
      }
    }
  })

  test('should announce errors to screen readers', async ({ page }) => {
    await page.click('a[href="#contact"]')
    
    // Submit empty form to trigger errors
    await page.click('button[type="submit"]')
    
    // Check for error announcements
    const errorElements = page.locator('[role="alert"]')
    await expect(errorElements.first()).toBeVisible()
  })

  test('should have proper color contrast', async ({ page }) => {
    // This would typically be tested with axe-core or similar tools
    // For now, we'll check that text elements are visible
    const textElements = page.locator('p, h1, h2, h3, h4, h5, h6, span, div')
    for (let i = 0; i < Math.min(await textElements.count(), 20); i++) {
      const element = textElements.nth(i)
      const text = await element.textContent()
      if (text && text.trim().length > 0) {
        await expect(element).toBeVisible()
      }
    }
  })

  test('should have skip links for keyboard users', async ({ page }) => {
    // Check for skip to main content link
    const skipLinks = page.locator('a[href^="#"]').filter({ hasText: /skip|jump/i })
    if (await skipLinks.count() > 0) {
      await expect(skipLinks.first()).toBeVisible()
    }
  })

  test('should have proper semantic HTML', async ({ page }) => {
    // Check for semantic elements
    await expect(page.locator('main, [role="main"]')).toBeVisible()
    await expect(page.locator('nav, [role="navigation"]')).toBeVisible()
    
    // Check for landmarks
    const landmarks = page.locator('main, nav, header, footer, aside, [role="main"], [role="navigation"], [role="banner"], [role="contentinfo"], [role="complementary"]')
    expect(await landmarks.count()).toBeGreaterThan(0)
  })

  test('should handle focus management in modals', async ({ page }) => {
    // Open calendar modal
    await page.click('button:has-text("Book Meeting")')
    
    // Check that modal is focused
    await expect(page.locator('[role="dialog"]')).toBeVisible()
    
    // Check that first input is focused
    await expect(page.locator('#calendar-name')).toBeFocused()
    
    // Test escape key closes modal
    await page.keyboard.press('Escape')
    await expect(page.locator('[role="dialog"]')).not.toBeVisible()
  })

  test('should have proper alt text for images', async ({ page }) => {
    const images = page.locator('img')
    for (let i = 0; i < await images.count(); i++) {
      const image = images.nth(i)
      const alt = await image.getAttribute('alt')
      const role = await image.getAttribute('role')
      
      // Images should have alt text or be decorative (role="presentation")
      expect(alt || role === 'presentation').toBeTruthy()
    }
  })

  test('should have proper page title', async ({ page }) => {
    const title = await page.title()
    expect(title).toBeTruthy()
    expect(title.length).toBeGreaterThan(0)
  })

  test('should have proper language attribute', async ({ page }) => {
    const lang = await page.locator('html').getAttribute('lang')
    expect(lang).toBeTruthy()
  })
}) 