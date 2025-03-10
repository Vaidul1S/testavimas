import { test, expect } from '@playwright/test';

test.describe('Home Page and Navigation', () => {

    test('1. Home Page', async ({ page }) => {
        await page.goto('https://sweetshop.netlify.app/');
        await expect(page.locator('.display-3')).toHaveText('Welcome to the sweet shop!');
        await expect(page.locator('nav.navbar')).toBeVisible(); 
    });

    test.beforeEach(async ({page}) => {
        await page.goto('https://sweetshop.netlify.app/');
    });

    test('2. Navigation route - Sweets', async ({ page }) => {
        await page.getByRole('link', { name: 'Sweets', exact: true }).click();
        await expect(page).toHaveURL('https://sweetshop.netlify.app/sweets');
    });

    test('3. Navigation route - About', async ({ page }) => {
        await page.getByRole('link', { name: 'About', exact: true }).click();
        await expect(page).toHaveURL('https://sweetshop.netlify.app/about');
    });
});