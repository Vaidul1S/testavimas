import { test, expect } from '@playwright/test';

test.describe('Home Page and Navigation', () => {

    test('Home Page', async ({ page }) => {
        await page.goto('https://sweetshop.netlify.app/');
        await expect(page.locator('h1')).toContainText('Welcome to the sweet shop!').toBeVisible();
        await expect(page.locator('#nav.navbar')).toBeVisible();
        await page.getByRole('link', { name: 'Sweets', exact: true }).click();
        await page.getByRole('link', { name: 'About' }).click();
        await page.getByRole('link', { name: 'Login' }).click();
        await page.getByRole('link', { name: 'Basket' }).click();
        await page.getByRole('link', { name: 'Sweet Shop' }).click();
    });

});