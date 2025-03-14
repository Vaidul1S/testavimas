import { test, expect } from '@playwright/test';

test.describe('Products', () => {
    
    test('1. Product Page', async ({ page }) => {
        await page.goto('https://sweetshop.netlify.app/');
        await expect(page.getByRole('link', { name: 'Browse Sweets' })).toBeVisible();
        await page.getByRole('link', { name: 'Browse Sweets' }).click();
    });

    test.beforeEach(async ({ page }) => {
        await page.goto('https://sweetshop.netlify.app/sweets');
    });

    test('2. Products have images', async ({ page }) => {
        for (let i = 0; i < page.locator('.card-img-top').length; i++) {
            await expect(page.locator('.card-img-top').nth(i)).toBeVisible();            
        }
    });

    test('3. Products have names', async ({ page }) => {
        for (let i = 0; i < page.locator('.card-title').length; i++) {
            await expect(page.locator('.card-title').nth(i)).toBeVisible();            
        }
    });

    test('4. Products have text', async ({ page }) => {
        for (let i = 0; i < page.locator('.card-text').length; i++) {
            await expect(page.locator('.card-text').nth(i)).toBeVisible();            
        }
    });

    test('5. Products have prices', async ({ page }) => {
        for (let i = 0; i < page.locator('.text_muted').length; i++) {
            await expect(page.locator('.text_muted').nth(i)).toBeVisible();            
        }
    });

    test('6. Products have add to basket button', async ({ page }) => {
        for (let i = 0; i < page.locator('.add-item').length; i++) {
            await expect(page.locator('.add-item').nth(i)).toBeVisible();            
        }
    });

});