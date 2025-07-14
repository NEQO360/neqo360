import { test, expect } from '@playwright/test'

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('should display contact form', async ({ page }) => {
    // Navigate to contact section
    await page.click('a[href="#contact"]')
    
    // Check if contact form is visible
    await expect(page.locator('#contact')).toBeVisible()
    await expect(page.locator('form')).toBeVisible()
    
    // Check form fields
    await expect(page.locator('input[name="name"]')).toBeVisible()
    await expect(page.locator('input[name="email"]')).toBeVisible()
    await expect(page.locator('input[name="phone"]')).toBeVisible()
    await expect(page.locator('select[name="projectType"]')).toBeVisible()
    await expect(page.locator('textarea[name="message"]')).toBeVisible()
  })

  test('should validate required fields', async ({ page }) => {
    await page.click('a[href="#contact"]')
    
    // Try to submit empty form
    await page.click('button[type="submit"]')
    
    // Check for validation errors
    await expect(page.locator('input[name="name"]')).toHaveAttribute('aria-invalid', 'true')
    await expect(page.locator('input[name="email"]')).toHaveAttribute('aria-invalid', 'true')
    await expect(page.locator('select[name="projectType"]')).toHaveAttribute('aria-invalid', 'true')
    await expect(page.locator('textarea[name="message"]')).toHaveAttribute('aria-invalid', 'true')
  })

  test('should validate email format', async ({ page }) => {
    await page.click('a[href="#contact"]')
    
    // Fill form with invalid email
    await page.fill('input[name="name"]', 'John Doe')
    await page.fill('input[name="email"]', 'invalid-email')
    await page.fill('input[name="phone"]', '1234567890')
    await page.selectOption('select[name="projectType"]', 'Web Development')
    await page.fill('textarea[name="message"]', 'Test message')
    
    // Submit form
    await page.click('button[type="submit"]')
    
    // Check for email validation error
    await expect(page.locator('input[name="email"]')).toHaveAttribute('aria-invalid', 'true')
    await expect(page.locator('#email-error')).toContainText('valid email')
  })

  test('should submit form successfully with valid data', async ({ page }) => {
    // Mock the API response
    await page.route('/api/contact', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Email sent successfully' }),
      })
    })

    await page.click('a[href="#contact"]')
    
    // Fill form with valid data
    await page.fill('input[name="name"]', 'John Doe')
    await page.fill('input[name="email"]', 'john@example.com')
    await page.fill('input[name="phone"]', '1234567890')
    await page.selectOption('select[name="projectType"]', 'Web Development')
    await page.fill('textarea[name="message"]', 'This is a test message')
    
    // Submit form
    await page.click('button[type="submit"]')
    
    // Check for success message
    await expect(page.locator('text=Message sent successfully')).toBeVisible()
    
    // Check that form is cleared
    await expect(page.locator('input[name="name"]')).toHaveValue('')
    await expect(page.locator('input[name="email"]')).toHaveValue('')
  })

  test('should handle form submission errors', async ({ page }) => {
    // Mock API error response
    await page.route('/api/contact', async route => {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Validation failed' }),
      })
    })

    await page.click('a[href="#contact"]')
    
    // Fill and submit form
    await page.fill('input[name="name"]', 'John Doe')
    await page.fill('input[name="email"]', 'john@example.com')
    await page.fill('input[name="phone"]', '1234567890')
    await page.selectOption('select[name="projectType"]', 'Web Development')
    await page.fill('textarea[name="message"]', 'Test message')
    
    await page.click('button[type="submit"]')
    
    // Check for error message
    await expect(page.locator('text=Validation failed')).toBeVisible()
  })

  test('should be keyboard accessible', async ({ page }) => {
    await page.click('a[href="#contact"]')
    
    // Tab through form fields
    await page.keyboard.press('Tab')
    await expect(page.locator('input[name="name"]')).toBeFocused()
    
    await page.keyboard.press('Tab')
    await expect(page.locator('input[name="email"]')).toBeFocused()
    
    await page.keyboard.press('Tab')
    await expect(page.locator('input[name="phone"]')).toBeFocused()
    
    await page.keyboard.press('Tab')
    await expect(page.locator('select[name="projectType"]')).toBeFocused()
    
    await page.keyboard.press('Tab')
    await expect(page.locator('textarea[name="message"]')).toBeFocused()
    
    await page.keyboard.press('Tab')
    await expect(page.locator('button[type="submit"]')).toBeFocused()
  })

  test('should show loading state during submission', async ({ page }) => {
    // Mock slow API response
    await page.route('/api/contact', async route => {
      await new Promise(resolve => setTimeout(resolve, 2000))
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Success' }),
      })
    })

    await page.click('a[href="#contact"]')
    
    // Fill form
    await page.fill('input[name="name"]', 'John Doe')
    await page.fill('input[name="email"]', 'john@example.com')
    await page.fill('input[name="phone"]', '1234567890')
    await page.selectOption('select[name="projectType"]', 'Web Development')
    await page.fill('textarea[name="message"]', 'Test message')
    
    // Submit and check loading state
    await page.click('button[type="submit"]')
    await expect(page.locator('button[type="submit"]')).toBeDisabled()
    await expect(page.locator('text=Submitting')).toBeVisible()
  })
}) 