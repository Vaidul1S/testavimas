import { test, expect } from '@playwright/test';

test.describe('Home Page and Navigation', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://sweetshop.netlify.app/');
    });

    test('1. Home Page', async ({ page }) => {
        await expect(page.locator('.display-3')).toHaveText('Welcome to the sweet shop!');
        await expect(page.locator('nav.navbar')).toBeVisible();
    });

    test('2. Navigation route - Sweets', async ({ page }) => {
        await page.getByRole('link', { name: 'Sweets', exact: true }).click();
        await expect(page).toHaveURL('https://sweetshop.netlify.app/sweets');
    });

    test('3. Navigation route - About', async ({ page }) => {
        await page.getByRole('link', { name: 'About' }).click();
        await expect(page).toHaveURL('https://sweetshop.netlify.app/about');
    });

    test('4. Navigation route - Login', async ({ page }) => {
        await page.getByRole('link', { name: 'Login' }).click();
        await expect(page).toHaveURL('https://sweetshop.netlify.app/login');
    });

    test('5. Navigation route - Basket', async ({ page }) => {
        await page.getByRole('link', { name: 'Basket' }).click();
        await expect(page).toHaveURL('https://sweetshop.netlify.app/basket');
    });

    test('6. Navigation route - Sweet Shop', async ({ page }) => {
        await page.getByRole('link', { name: 'Sweet Shop' }).click();
        await expect(page).toHaveURL('https://sweetshop.netlify.app');
    });

});