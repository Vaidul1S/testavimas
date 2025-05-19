import { test, expect } from '@playwright/test';

test.describe('Automation Exercise Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://automationexercise.com/');
        await page.getByRole('button', { name: 'Consent' }).click();
    });

    test('Test Case 1: Register User', async ({ page }) => {
        await expect(page).toHaveTitle(/Automation Exercise/);
        await page.locator('ul.navbar-nav li').nth(3).click();

        await page.fill('input[data-qa="signup-name"]', 'Bebras666');
        await page.fill('input[data-qa="signup-email"]', 'bebras666@example.com');
        await page.locator('button[data-qa="signup-button"]').click();

        await expect(page).toHaveTitle(/Enter Account Information/);

        await page.locator('input#id_gender1').click();
        await page.fill('input[data-qa="password"]', 'password123');
        await page.fill('select#days', '13');
        await page.fill('select#months', 'February');
        await page.fill('select#years', '1999');
        await page.locator('input#newsletter').click();
        await page.locator('input#optin').click();
        await page.fill('input[data-qa="first_name"]', 'Bredas');
        await page.fill('input[data-qa="last_name"]', 'Babrauskas');
        await page.fill('input[data-qa="company"]', 'Uzvanka');
        await page.fill('input[data-qa="address"]', 'Rastu 11');
        await page.fill('input[data-qa="address2"]', 'Bebriskes');
        await page.fill('select[data-qa="country"]', 'Canada');
        await page.fill('input[data-qa="state"]', 'Big State');
        await page.fill('input[data-qa="city"]', 'Small City');
        await page.fill('input[data-qa="zipcode"]', '1234567890');
        await page.fill('input[data-qa="mobile_number"]', '1234567890');

        await page.locator('button[data-qa="create-account"]').click();

        await expect(page).toHaveTitle(/Account Created!/);
        await page.locator('[data-qa="continue-button"]').click();

        await expect(page).toHaveTitle(/Logged in as Bebras666/);
        await page.locator('ul.navbar-nav li').nth(3).click();

        await expect(page).toHaveTitle(/Account Deleted!/);

    });


    // test('update item', async ({ page }) => {
    //     await page.getByRole('textbox', { name: 'What need\'s to be done?' }).click();
    //     await page.getByRole('textbox', { name: 'What need\'s to be done?' }).fill('123456');
    //     await page.getByRole('textbox', { name: 'What need\'s to be done?' }).press('Enter');
    //     await page.getByText('123456').dblclick();
    //     await page.locator('input.edit').fill('7890')      
    // });

    // test('count items', async ({ page }) => {
    //     await page.fill('input.new-todo', '1 uzduotis');
    //     await page.press('input.new-todo', 'Enter');
    //     await page.fill('input.new-todo', '2 uzduotis');
    //     await page.press('input.new-todo', 'Enter');
    //     await page.fill('input.new-todo', '3 uzduotis');
    //     await page.press('input.new-todo', 'Enter');
    //     await page.fill('input.new-todo', '4 uzduotis');
    //     await page.press('input.new-todo', 'Enter');
    //     await page.fill('input.new-todo', '5 uzduotis');
    //     await page.press('input.new-todo', 'Enter');
    //     await expect(page.locator('ul.todo-list li')).toHaveCount(5);
    // });

});
