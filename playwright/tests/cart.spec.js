import { test, expect } from '@playwright/test';

test.describe('Cart Page', () => {
    test('1. Add products to the basket and check their properties.', async ({ page }) => {
        await page.goto('https://sweetshop.netlify.app/');
        await page.getByRole('link', { name: 'Browse Sweets' }).click();
        await page.waitForTimeout(500);
        await page.locator('a[data-id="1"]').click();
        await page.waitForTimeout(500);
        await page.locator('a[data-id="5"]').click();
        await page.waitForTimeout(500);
        await page.locator('a[data-id="9"]').click();
        await page.waitForTimeout(500);
        await page.locator('a[data-id="11"]').click();
        await page.waitForTimeout(500);

        await page.getByRole('link', { name: 'Basket' }).click();
        await expect(page).toHaveURL('https://sweetshop.netlify.app/basket');

        await expect(page.locator('#basketCount')).toHaveText('4');

        const items = ['Swansea Mixture', 'Sweet Whistle', 'Chocolate Cups', 'Jellies'];
        for (let i = 0; i < items.length; i++) {
            await expect(page.locator('.list-group-item').nth(i)).toContainText(items[i]);
        }

        const prices = ['£1.50', '£0.25', '£1.00', '£0.75'];
        for (let i = 0; i < prices.length; i++) {
            await expect(page.locator('span.text-muted').nth(i + 1)).toContainText(prices[i]);
        }

        for (let i = 0; i < 4; i++) {
            await expect(page.locator('small.text-muted').nth(i)).toContainText('x 1');
        }

        for (let i = 0; i < 4; i++) {
            await expect(page.locator('a.small').nth(i)).toContainText('Delete Item');
        }

        await expect(page.locator('.list-group-item').nth(4)).toContainText('Total (GBP)');
        await expect(page.locator('.list-group-item').nth(4)).toContainText('£3.50');

        await expect(page.getByText('Collect (FREE)')).toBeVisible();

        await page.getByRole('link', { name: 'Empty Basket', state: 'visible' });

        page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.accept().catch(() => { });
        });
        await page.getByRole('link', { name: 'Empty Basket' }).click();

        await page.waitForSelector('#basketCount', { state: 'visible' });
        await expect(page.locator('#basketCount')).toHaveText('0');
        await expect(page.locator('.list-group-item').nth(0)).toContainText('Total (GBP)');
        await expect(page.locator('.list-group-item').nth(0)).toContainText('£0.00');
    });

    test('2. Add and remove products by one to the basket', async ({ page }) => {
        await page.goto('https://sweetshop.netlify.app/');
        await page.getByRole('link', { name: 'Browse Sweets' }).click();
        await page.waitForTimeout(500);
        await page.locator('a[data-id="2"]').click();
        await page.waitForTimeout(500);
        await page.locator('a[data-id="4"]').click();
        await page.waitForTimeout(500);
        await page.locator('a[data-id="7"]').click();
        await page.waitForTimeout(500);

        await page.getByRole('link', { name: 'Basket' }).click();
        await expect(page.locator('#basketCount')).toHaveText('3');

        page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.accept().catch(() => { });
        });
        await page.getByRole('link', { name: 'Delete Item' }).nth(1).click();

        await expect(page.locator('#basketCount')).toHaveText('2');

    })
});