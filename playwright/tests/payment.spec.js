import { test, expect } from '@playwright/test';

test.describe('Checkout and Payment', () => {
    
    test('1. Filling checkout form successfully', async ({ page }) => {
        await page.goto('https://sweetshop.netlify.app/');
        await page.getByRole('link', { name: 'Basket' }).click();
        await expect(page).toHaveURL('https://sweetshop.netlify.app/basket');

        await page.locator('#name').nth(0).fill('Bebras');
        await page.locator('#name').nth(1).fill('Babrauskas');
        await page.fill('#email', 'bebras@example.com');
        await page.fill('#address', 'Rastu 11');
        await page.fill('#address2', 'Bebriskes');
        await page.selectOption('#country', 'United Kingdom');
        await page.selectOption('#city', 'Bristol');
        await page.fill('#zip', '123456');
        await page.fill('#cc-name', '123456');
        await page.fill('#cc-number', '123456');
        await page.fill('#cc-expiration', '123456');
        await page.fill('#cc-cvv', '123456');
        
        await page.getByRole('button', { name: 'Continue to checkout' }).click();
    });

    test('2. Filling checkout form unsuccessfully', async ({ page }) => {
        await page.goto('https://sweetshop.netlify.app/');
        await page.getByRole('link', { name: 'Basket' }).click();
        await expect(page).toHaveURL('https://sweetshop.netlify.app/basket');

        await page.getByRole('button', { name: 'Continue to checkout' }).click();

        const errorMessages = [
            'Valid first name is required.',
            'Valid last name is required.',
            'Please enter a valid email address for shipping updates.',
            'Please enter your shipping address.',
            'Please select a valid country.',
            'Please provide a valid state.',
            'Zip code required.',
            'Name on card is required',
            'Credit card number is required',
            'Expiration date required',
            'Security code required'
        ];

        for (let i = 0; i <= 10; i++) {
            await expect(page.locator('.invalid-feedback').nth(i + 1)).toContainText(errorMessages[i]);
        }
    });

});