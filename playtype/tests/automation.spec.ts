import { test, expect } from '@playwright/test';

test.describe('Automation Exercise Tests', () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto('https://automationexercise.com/')
    });

    test('Test Case 1: Register User', async ({ page }) => {
        await expect(page).toHaveTitle(/To Do List/);
    });

    
    test('update item', async ({ page }) => {
        await page.getByRole('textbox', { name: 'What need\'s to be done?' }).click();
        await page.getByRole('textbox', { name: 'What need\'s to be done?' }).fill('123456');
        await page.getByRole('textbox', { name: 'What need\'s to be done?' }).press('Enter');
        await page.getByText('123456').dblclick();
        await page.locator('input.edit').fill('7890')      
    });

    test('count items', async ({ page }) => {
        await page.fill('input.new-todo', '1 uzduotis');
        await page.press('input.new-todo', 'Enter');
        await page.fill('input.new-todo', '2 uzduotis');
        await page.press('input.new-todo', 'Enter');
        await page.fill('input.new-todo', '3 uzduotis');
        await page.press('input.new-todo', 'Enter');
        await page.fill('input.new-todo', '4 uzduotis');
        await page.press('input.new-todo', 'Enter');
        await page.fill('input.new-todo', '5 uzduotis');
        await page.press('input.new-todo', 'Enter');
        await expect(page.locator('ul.todo-list li')).toHaveCount(5);
    });

});
