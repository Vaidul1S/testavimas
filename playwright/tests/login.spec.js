import { test, expect } from '@playwright/test';

test.describe('Login', () => {

    test('1. Visit Sweet Shop', async ({ page }) => {
        await page.goto('https://sweetshop.netlify.app/');
        await page.getByRole('link', { name: 'Login' }).click();
        await expect(page).toHaveURL('https://sweetshop.netlify.app/login');
    });

    test.beforeEach(async ({ page }) => {
        await page.goto('https://sweetshop.netlify.app/login');
    });

    test('2. Login successfully', async ({ page }) => {
        await page.fill('#exampleInputEmail', 'test@example.com');
        await page.fill('#exampleInputPassword', '1234');
        await page.click('button[type="submit"]');
        await expect(page.locator('text=Welcome back test@user.com')).toBeVisible();
    });

    test('3. Login unsuccessfully', async ({ page }) => {
        await page.click('#exampleInputEmail');
        await page.click('#exampleInputPassword');
        await page.click('button[type="submit"]');
        await expect(page.locator('text=Please enter a valid email address.')).toBeVisible();
        await expect(page.locator('text=Please enter a valid password.')).toBeVisible();
    });

});