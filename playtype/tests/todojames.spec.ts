import { test, expect } from '@playwright/test';

test.describe('Todojames Tests', () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto('https://todolist.james.am/#/')
    });

    test('has title h1', async ({ page }) => {
        await expect(page).toHaveTitle(/To Do List/);
    });

    test('add new item', async ({ page }) => {
        await page.getByRole('textbox', { name: 'What need\'s to be done?' }).click();
        await page.getByRole('textbox', { name: 'What need\'s to be done?' }).fill('123456');
        await page.getByRole('textbox', { name: 'What need\'s to be done?' }).press('Enter');
    });

    test('delete item', async ({ page }) => {
        await page.getByRole('textbox', { name: 'What need\'s to be done?' }).click();
        await page.getByRole('textbox', { name: 'What need\'s to be done?' }).fill('123456');
        await page.getByRole('textbox', { name: 'What need\'s to be done?' }).press('Enter');
        await page.getByText('123456').click();
        await page.getByRole('button', { name: '×' }).click();
    });

    test('update item', async ({ page }) => {

    });

    test('count items', async ({ page }) => {

    });

});
