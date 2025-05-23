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

        await expect(page.locator('//*[@id="form"]/div/div/div/div[1]/h2/b')).toHaveText(/Enter Account Information/);

        await page.locator('#id_gender1').check();
        await page.fill('input[data-qa="password"]', 'password123');
        await page.selectOption('select#days', '13');
        await page.selectOption('select#months', 'February');
        await page.selectOption('select#years', '1999');
        await page.locator('input#newsletter').check();
        await page.locator('input#optin').check();
        await page.fill('input[data-qa="first_name"]', 'Bredas');
        await page.fill('input[data-qa="last_name"]', 'Babrauskas');
        await page.fill('input[data-qa="company"]', 'Uzvanka');
        await page.fill('input[data-qa="address"]', 'Rastu 11');
        await page.fill('input[data-qa="address2"]', 'Bebriskes');
        await page.selectOption('select[data-qa="country"]', 'Canada');
        await page.fill('input[data-qa="state"]', 'Big State');
        await page.fill('input[data-qa="city"]', 'Small City');
        await page.fill('input[data-qa="zipcode"]', '1234567890');
        await page.fill('input[data-qa="mobile_number"]', '1234567890');

        await page.locator('button[data-qa="create-account"]').click();

        await expect(page.locator('h2[data-qa="account-created"]')).toHaveText(/Account Created!/);
        await page.locator('[data-qa="continue-button"]').click();

        await expect(page.locator('ul.navbar-nav li').nth(9)).toHaveText(/Logged in as Bebras666/);

        await page.locator('ul.navbar-nav li').nth(4).click();
        await expect(page.locator('h2[data-qa="account-deleted"]')).toHaveText(/Account Deleted!/);

    });

    test('Test Case 3: Login User with incorrect email and password', async ({ page }) => {
        await expect(page).toHaveTitle(/Automation Exercise/);
        await page.locator('ul.navbar-nav li').nth(3).click();

        await page.fill('input[data-qa="login-email"]', 'blogas@example.com');
        await page.fill('input[data-qa="login-password"]', 'blogaspsw');
        await page.locator('button[data-qa="login-button"]').click();

        await expect(page.locator('//*[@id="form"]/div/div/div[1]/div/form/p')).toHaveText(/Your email or password is incorrect!/);

    });

    test('Test Case 4: Logout User', async ({ page }) => {
        await page.locator('ul.navbar-nav li').nth(3).click();

        await page.fill('input[data-qa="signup-name"]', 'Bebras666');
        await page.fill('input[data-qa="signup-email"]', 'bebras666@example.com');
        await page.locator('button[data-qa="signup-button"]').click();
        await page.locator('#id_gender1').check();
        await page.fill('input[data-qa="password"]', 'password123');
        await page.selectOption('select#days', '13');
        await page.selectOption('select#months', 'February');
        await page.selectOption('select#years', '1999');
        await page.locator('input#newsletter').check();
        await page.locator('input#optin').check();
        await page.fill('input[data-qa="first_name"]', 'Bredas');
        await page.fill('input[data-qa="last_name"]', 'Babrauskas');
        await page.fill('input[data-qa="company"]', 'Uzvanka');
        await page.fill('input[data-qa="address"]', 'Rastu 11');
        await page.fill('input[data-qa="address2"]', 'Bebriskes');
        await page.selectOption('select[data-qa="country"]', 'Canada');
        await page.fill('input[data-qa="state"]', 'Big State');
        await page.fill('input[data-qa="city"]', 'Small City');
        await page.fill('input[data-qa="zipcode"]', '1234567890');
        await page.fill('input[data-qa="mobile_number"]', '1234567890');

        await page.locator('button[data-qa="create-account"]').click();
        await page.locator('[data-qa="continue-button"]').click();
        await page.locator('ul.navbar-nav li').nth(3).click();

        //Real test begins NOW!

        await page.locator('ul.navbar-nav li').nth(3).click();

        await page.fill('input[data-qa="login-email"]', 'bebras666@example.com');
        await page.fill('input[data-qa="login-password"]', 'password123');
        await page.locator('button[data-qa="login-button"]').click();

        await expect(page.locator('ul.navbar-nav li').nth(9)).toHaveText(/Logged in as Bebras666/);

        await page.locator('ul.navbar-nav li').nth(3).click();

        expect(page.url()).toBe('https://automationexercise.com/login');

    });

    test('Test Case 5: Register User with existing email', async ({ page }) => {
        await page.locator('ul.navbar-nav li').nth(3).click();

        await page.fill('input[data-qa="signup-name"]', 'Bebras666');
        await page.fill('input[data-qa="signup-email"]', 'bebras666@example.com');
        await page.locator('button[data-qa="signup-button"]').click();

        await expect(page.locator('//*[@id="form"]/div/div/div[3]/div/form/p')).toHaveText(/Email Address already exist!/);

    });

    test('Test Case 2: Login User with correct email and password', async ({ page }) => {
        await page.locator('ul.navbar-nav li').nth(3).click();

        await page.fill('input[data-qa="login-email"]', 'bebras666@example.com');
        await page.fill('input[data-qa="login-password"]', 'password123');
        await page.locator('button[data-qa="login-button"]').click();

        await expect(page.locator('ul.navbar-nav li').nth(9)).toHaveText(/Logged in as Bebras666/);

        await page.locator('ul.navbar-nav li').nth(4).click();
        await expect(page.locator('h2[data-qa="account-deleted"]')).toHaveText(/Account Deleted!/);

    });

    test('Test Case 6: Contact Us Form', async ({ page }) => {
        await page.locator('ul.navbar-nav li').nth(7).click();

        await expect(page.locator('//*[@id="contact-page"]/div[1]/div/div/h2')).toHaveText(/Contact Us/);

        await page.fill('input[data-qa="name"]', 'Bredas');
        await page.fill('input[data-qa="email"]', 'bebras666@example.com');
        await page.fill('input[data-qa="subject"]', 'Tema');
        await page.fill('textarea[data-qa="message"]', 'Labai labai labai labai ilgas tekstas.');
        await page.setInputFiles('input[name="upload_file"]', 'ane.png');
        await page.waitForTimeout(500);

        page.once('dialog', dialog => {
            console.log(`Dialog message:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: ${dialog.message()}`);
            dialog.accept().catch(() => { });
        });

        await page.locator('input[data-qa="submit-button"]').click();

        await expect(page.locator('//*[@id="contact-page"]/div[2]/div[1]/div/div[2]')).toHaveText(/Success! Your details have been submitted successfully./);

        await page.locator('//*[@id="form-section"]/a').click();

        expect(page.url()).toBe('https://automationexercise.com/');

    });

    test('Test Case 7: Verify Test Cases Page', async ({ page }) => {
        await page.locator('ul.navbar-nav li').nth(4).click();

        await expect(page.locator('//*[@id="form"]/div/div[1]/div/h2/b')).toHaveText(/Test Cases/);

    });

    test('Test Case 8: Verify All Products and product detail page', async ({ page }) => {
        await page.locator('ul.navbar-nav li').nth(1).click();
        await page.waitForTimeout(500);

        await expect(page.locator('//html/body/section[2]/div/div/div[2]/div/h2')).toHaveText(/All Products/);

        await page.locator('a[href="/product_details/7"]').click();
        await page.waitForTimeout(500);

        await expect(page.locator('.product-information h2')).toHaveText(/Madame Top For Women/);
        await expect(page.locator('.product-information p').nth(0)).toHaveText(/Category: Women > Tops/);
        await expect(page.locator('.product-information span span')).toHaveText(/Rs. 1000/);
        await expect(page.locator('.product-information p').nth(1)).toHaveText(/Availability: In Stock/);
        await expect(page.locator('.product-information p').nth(2)).toHaveText(/Condition: New/);
        await expect(page.locator('.product-information p').nth(3)).toHaveText(/Brand: Madame/);

    });

    test('Test Case 9: Search Product', async ({ page }) => {
        await page.locator('ul.navbar-nav li').nth(1).click();
        await page.waitForTimeout(500);

        await expect(page.locator('//html/body/section[2]/div/div/div[2]/div/h2')).toHaveText(/All Products/);

        await page.fill('input#search_product', 'Jeans');
        await page.locator('button#submit_search').click();

        await expect(page.locator('//html/body/section[2]/div/div/div[2]/div/h2')).toHaveText(/Searched Products/);
        await page.waitForTimeout(500);

        const products = await page.locator('.productinfo p').count();
        console.log('Searched products count', products);

        for (let i = 0; i < products; i++) {
            await expect(page.locator('.productinfo p').nth(i)).toContainText('Jeans');
        };

    });

    test('Test Case 10: Verify Subscription in home page', async ({ page }) => {
        await expect(page.locator('//*[@id="footer"]/div[1]/div/div/div[2]/div/h2')).toHaveText(/Subscription/);

        await page.fill('input#susbscribe_email', 'bebras666@example.com');
        await page.locator('button#subscribe').click();

        await expect(page.locator('text=You have been successfully subscribed!')).toBeVisible();

    });

    test('Test Case 11: Verify Subscription in Cart page', async ({ page }) => {
        await page.locator('ul.navbar-nav li').nth(2).click();
        await page.waitForTimeout(500);

        await expect(page.locator('//*[@id="footer"]/div[1]/div/div/div[2]/div/h2')).toHaveText(/Subscription/);

        await page.fill('input#susbscribe_email', 'bebras666@example.com');
        await page.locator('button#subscribe').click();

        await expect(page.locator('text=You have been successfully subscribed!')).toBeVisible();

    });

    test('Test Case 12: Add Products in Cart', async ({ page }) => {
        await page.locator('ul.navbar-nav li').nth(1).click();
        await page.waitForTimeout(500);

        await expect(page.locator('//html/body/section[2]/div/div/div[2]/div/h2')).toHaveText(/All Products/);
        await page.waitForTimeout(1000);

        await page.locator('.productinfo').nth(4).getByText('Add to cart').hover();
        await page.waitForTimeout(1000);
        await page.locator('div.product-overlay').nth(4).getByText('Add to cart').click();
        await page.waitForTimeout(1000);
        await page.locator('[data-dismiss="modal"]').click();

        await page.locator('.productinfo').nth(9).getByText('Add to cart').hover();
        await page.waitForTimeout(1000);
        await page.locator('div.product-overlay').nth(9).getByText('Add to cart').click();
        await page.waitForTimeout(1000);

        await page.locator('//*[@id="cartModal"]/div/div/div[2]/p[2]/a/u').click();
        await page.waitForTimeout(500);

        await expect(page.locator('//*[@id="product-5"]/td[2]/h4/a')).toContainText('Winter Top');
        await expect(page.locator('//*[@id="product-12"]/td[2]/h4/a')).toContainText('Half Sleeves Top Schiffli Detailing - Pink');

        await expect(page.locator('#product-5 .cart_price')).toHaveText(/Rs. 600/);
        await expect(page.locator('#product-5 .cart_quantity')).toHaveText(/1/);
        await expect(page.locator('#product-5 .cart_total')).toHaveText(/Rs. 600/);

        await expect(page.locator('#product-12 .cart_price')).toHaveText(/Rs. 359/);
        await expect(page.locator('#product-12 .cart_quantity')).toHaveText(/1/);
        await expect(page.locator('#product-12 .cart_total')).toHaveText(/Rs. 359/);
    });

    test('Test Case 13: Verify Product quantity in Cart', async ({ page }) => {
        await page.locator('div.choose').nth(7).click();
        await page.waitForTimeout(500);

        await expect(page).toHaveURL('https://automationexercise.com/product_details/8');

        await page.locator('input#quantity').clear();
        await page.locator('input#quantity').fill('5');
        await page.waitForTimeout(1000);
        await page.locator('//html/body/section/div/div/div[2]/div[2]/div[2]/div/span/button').click();
        await page.waitForTimeout(1000);

        await page.locator('//*[@id="cartModal"]/div/div/div[2]/p[2]/a/u').click();
        await page.waitForTimeout(500);

        await expect(page.locator('//*[@id="product-8"]/td[2]/h4/a')).toContainText('Fancy Green Top');

        await expect(page.locator('#product-8 .cart_price')).toHaveText(/Rs. 700/);
        await expect(page.locator('#product-8 .cart_quantity')).toHaveText(/5/);
        await expect(page.locator('#product-8 .cart_total')).toHaveText(/Rs. 3500/);

    });

    test('Test Case 14: Place Order: Register while Checkout', async ({ page }) => {
        await page.locator('.productinfo').nth(0).getByText('Add to cart').hover();
        await page.waitForTimeout(1000);
        await page.locator('div.product-overlay').nth(0).getByText('Add to cart').click();
        await page.waitForTimeout(1000);
        await page.locator('[data-dismiss="modal"]').click();

        await page.locator('.productinfo').nth(1).getByText('Add to cart').hover();
        await page.waitForTimeout(1000);
        await page.locator('div.product-overlay').nth(1).getByText('Add to cart').click();
        await page.waitForTimeout(1000);

        await page.locator('//*[@id="cartModal"]/div/div/div[2]/p[2]/a/u').click();
        await page.waitForTimeout(500);

        await page.locator('a.check_out').click();
        await page.locator('//*[@id="checkoutModal"]/div/div/div[2]/p[2]/a').click();
        await page.waitForTimeout(500);

        await page.fill('input[data-qa="signup-name"]', 'Bebras666');
        await page.fill('input[data-qa="signup-email"]', 'bebras666@example.com');
        await page.locator('button[data-qa="signup-button"]').click();

        await expect(page.locator('//*[@id="form"]/div/div/div/div[1]/h2/b')).toHaveText(/Enter Account Information/);

        await page.locator('#id_gender1').check();
        await page.fill('input[data-qa="password"]', 'password123');
        await page.selectOption('select#days', '13');
        await page.selectOption('select#months', 'February');
        await page.selectOption('select#years', '1999');
        await page.locator('input#newsletter').check();
        await page.locator('input#optin').check();
        await page.fill('input[data-qa="first_name"]', 'Bredas');
        await page.fill('input[data-qa="last_name"]', 'Babrauskas');
        await page.fill('input[data-qa="company"]', 'Uzvanka');
        await page.fill('input[data-qa="address"]', 'Rastu 11');
        await page.fill('input[data-qa="address2"]', 'Bebriskes');
        await page.selectOption('select[data-qa="country"]', 'Canada');
        await page.fill('input[data-qa="state"]', 'Big State');
        await page.fill('input[data-qa="city"]', 'Small City');
        await page.fill('input[data-qa="zipcode"]', '1234567890');
        await page.fill('input[data-qa="mobile_number"]', '1234567890');

        await page.locator('button[data-qa="create-account"]').click();

        await page.locator('[data-qa="continue-button"]').click();

        await expect(page.locator('ul.navbar-nav li').nth(9)).toHaveText(/Logged in as Bebras666/);
        await page.locator('ul.navbar-nav li').nth(2).click();

        await page.locator('a.check_out').click();

        await page.fill('textarea.form-control', 'Description coment in comment text area.');
        await page.locator('a[href="/payment"]').click();

        await page.fill('[data-qa="name-on-card"]', 'BREDAS BEBRAS');
        await page.fill('[data-qa="card-number"]', '1234567890123456');
        await page.fill('[data-qa="cvc"]', '123');
        await page.fill('[data-qa="expiry-month"]', '10');
        await page.fill('[data-qa="expiry-year"]', '2030');

        await page.locator('button[data-qa="pay-button"]').click();
        // expect(page.locator('text=Your order has been placed successfully!')).toBeVisible(); TO DO how to delay window load

        await page.locator('ul.navbar-nav li').nth(4).click();
        await expect(page.locator('h2[data-qa="account-deleted"]')).toHaveText(/Account Deleted!/);

    });

    test('Test Case 15: Place Order: Register before Checkout', async ({ page }) => {
        await page.locator('ul.navbar-nav li').nth(3).click();

        await page.fill('input[data-qa="signup-name"]', 'Bebras666');
        await page.fill('input[data-qa="signup-email"]', 'bebras666@example.com');
        await page.locator('button[data-qa="signup-button"]').click();

        await expect(page.locator('//*[@id="form"]/div/div/div/div[1]/h2/b')).toHaveText(/Enter Account Information/);

        await page.locator('#id_gender1').check();
        await page.fill('input[data-qa="password"]', 'password123');
        await page.selectOption('select#days', '13');
        await page.selectOption('select#months', 'February');
        await page.selectOption('select#years', '1999');
        await page.locator('input#newsletter').check();
        await page.locator('input#optin').check();
        await page.fill('input[data-qa="first_name"]', 'Bredas');
        await page.fill('input[data-qa="last_name"]', 'Babrauskas');
        await page.fill('input[data-qa="company"]', 'Uzvanka');
        await page.fill('input[data-qa="address"]', 'Rastu 11');
        await page.fill('input[data-qa="address2"]', 'Bebriskes');
        await page.selectOption('select[data-qa="country"]', 'Canada');
        await page.fill('input[data-qa="state"]', 'Big State');
        await page.fill('input[data-qa="city"]', 'Small City');
        await page.fill('input[data-qa="zipcode"]', '1234567890');
        await page.fill('input[data-qa="mobile_number"]', '1234567890');

        await page.locator('button[data-qa="create-account"]').click();

        await page.locator('[data-qa="continue-button"]').click();

        await expect(page.locator('ul.navbar-nav li').nth(9)).toHaveText(/Logged in as Bebras666/);
        await page.locator('ul.navbar-nav li').nth(0).click();

        await page.locator('.productinfo').nth(0).getByText('Add to cart').hover();
        await page.waitForTimeout(1000);
        await page.locator('div.product-overlay').nth(0).getByText('Add to cart').click();
        await page.waitForTimeout(1000);
        await page.locator('[data-dismiss="modal"]').click();

        await page.locator('.productinfo').nth(1).getByText('Add to cart').hover();
        await page.waitForTimeout(1000);
        await page.locator('div.product-overlay').nth(1).getByText('Add to cart').click();
        await page.waitForTimeout(1000);

        await page.locator('//*[@id="cartModal"]/div/div/div[2]/p[2]/a/u').click();
        await page.waitForTimeout(500);

        await page.locator('a.check_out').click();

        await page.fill('textarea.form-control', 'Description coment in comment text area.');
        await page.locator('a[href="/payment"]').click();

        await page.fill('[data-qa="name-on-card"]', 'BREDAS BEBRAS');
        await page.fill('[data-qa="card-number"]', '1234567890123456');
        await page.fill('[data-qa="cvc"]', '123');
        await page.fill('[data-qa="expiry-month"]', '10');
        await page.fill('[data-qa="expiry-year"]', '2030');

        await page.locator('button[data-qa="pay-button"]').click();
        // expect(page.locator('text=Your order has been placed successfully!')).toBeVisible(); TO DO how to delay window load

        await page.locator('ul.navbar-nav li').nth(4).click();
        await expect(page.locator('h2[data-qa="account-deleted"]')).toHaveText(/Account Deleted!/);

    });

    test('Test Case 16: Place Order: Login before Checkout', async ({ page }) => {
        await page.locator('ul.navbar-nav li').nth(3).click();

        await page.fill('input[data-qa="signup-name"]', 'Bebras666');
        await page.fill('input[data-qa="signup-email"]', 'bebras666@example.com');
        await page.locator('button[data-qa="signup-button"]').click();

        await expect(page.locator('//*[@id="form"]/div/div/div/div[1]/h2/b')).toHaveText(/Enter Account Information/);

        await page.locator('#id_gender1').check();
        await page.fill('input[data-qa="password"]', 'password123');
        await page.selectOption('select#days', '13');
        await page.selectOption('select#months', 'February');
        await page.selectOption('select#years', '1999');
        await page.locator('input#newsletter').check();
        await page.locator('input#optin').check();
        await page.fill('input[data-qa="first_name"]', 'Bredas');
        await page.fill('input[data-qa="last_name"]', 'Babrauskas');
        await page.fill('input[data-qa="company"]', 'Uzvanka');
        await page.fill('input[data-qa="address"]', 'Rastu 11');
        await page.fill('input[data-qa="address2"]', 'Bebriskes');
        await page.selectOption('select[data-qa="country"]', 'Canada');
        await page.fill('input[data-qa="state"]', 'Big State');
        await page.fill('input[data-qa="city"]', 'Small City');
        await page.fill('input[data-qa="zipcode"]', '1234567890');
        await page.fill('input[data-qa="mobile_number"]', '1234567890');

        await page.locator('button[data-qa="create-account"]').click();
        await page.locator('[data-qa="continue-button"]').click();
        await page.locator('ul.navbar-nav li').nth(3).click();

        // Real test begins NOW!

        await page.locator('ul.navbar-nav li').nth(3).click();

        await page.fill('input[data-qa="login-email"]', 'bebras666@example.com');
        await page.fill('input[data-qa="login-password"]', 'password123');
        await page.locator('button[data-qa="login-button"]').click();

        await expect(page.locator('ul.navbar-nav li').nth(9)).toHaveText(/Logged in as Bebras666/);
        await page.locator('ul.navbar-nav li').nth(0).click();

        await page.locator('.productinfo').nth(0).getByText('Add to cart').hover();
        await page.waitForTimeout(1000);
        await page.locator('div.product-overlay').nth(0).getByText('Add to cart').click();
        await page.waitForTimeout(1000);
        await page.locator('[data-dismiss="modal"]').click();

        await page.locator('.productinfo').nth(1).getByText('Add to cart').hover();
        await page.waitForTimeout(1000);
        await page.locator('div.product-overlay').nth(1).getByText('Add to cart').click();
        await page.waitForTimeout(1000);

        await page.locator('//*[@id="cartModal"]/div/div/div[2]/p[2]/a/u').click();
        await page.waitForTimeout(500);

        await page.locator('a.check_out').click();

        await page.fill('textarea.form-control', 'Description coment in comment text area.');
        await page.locator('a[href="/payment"]').click();

        await page.fill('[data-qa="name-on-card"]', 'BREDAS BEBRAS');
        await page.fill('[data-qa="card-number"]', '1234567890123456');
        await page.fill('[data-qa="cvc"]', '123');
        await page.fill('[data-qa="expiry-month"]', '10');
        await page.fill('[data-qa="expiry-year"]', '2030');

        await page.locator('button[data-qa="pay-button"]').click();
        // expect(page.locator('text=Your order has been placed successfully!')).toBeVisible(); TO DO how to delay window load

        await page.locator('ul.navbar-nav li').nth(4).click();
        await expect(page.locator('h2[data-qa="account-deleted"]')).toHaveText(/Account Deleted!/);

    });

    test('Test Case 17: Remove Products From Cart', async ({ page }) => {
        await page.locator('.productinfo').nth(0).getByText('Add to cart').hover();
        await page.waitForTimeout(1000);
        await page.locator('div.product-overlay').nth(0).getByText('Add to cart').click();
        await page.waitForTimeout(1000);
        await page.locator('[data-dismiss="modal"]').click();

        await page.locator('.productinfo').nth(6).getByText('Add to cart').hover();
        await page.waitForTimeout(1000);
        await page.locator('div.product-overlay').nth(6).getByText('Add to cart').click();
        await page.waitForTimeout(1000);
        await page.locator('[data-dismiss="modal"]').click();

        await page.locator('.productinfo').nth(11).getByText('Add to cart').hover();
        await page.waitForTimeout(1000);
        await page.locator('div.product-overlay').nth(11).getByText('Add to cart').click();
        await page.waitForTimeout(1000);

        await page.locator('//*[@id="cartModal"]/div/div/div[2]/p[2]/a/u').click();
        await expect(page).toHaveURL('https://automationexercise.com/view_cart');

        await page.locator('[data-product-id="7"]').click();
        await page.waitForTimeout(1000);

        await expect(page.locator('#product-7')).toHaveCount(0);

    });

    test('Test Case 18: View Category Products', async ({ page }) => {
        await page.locator('[data-parent="#accordian"]').nth(0).getByText('Women').click();
        await page.waitForTimeout(500);
        await page.locator('#Women li').getByText('Dress').click();
        await page.waitForTimeout(500);
        await expect(page).toHaveURL('https://automationexercise.com/category_products/1');
        await expect(page.locator('//html/body/section/div/div[2]/div[2]/div/h2')).toHaveText('Women - Dress Products');

        await page.locator('[data-parent="#accordian"]').nth(1).getByText('Men ').click();
        await page.waitForTimeout(500);
        await page.locator('#Men li').getByText('Tshirts ').click();
        await page.waitForTimeout(500);
        await expect(page).toHaveURL('https://automationexercise.com/category_products/3');
        await expect(page.locator('//html/body/section/div/div[2]/div[2]/div/h2')).toHaveText('Men - Tshirts Products');

    });

    test('Test Case 19: View & Cart Brand Products', async ({ page }) => {
        await page.locator('ul.navbar-nav li').nth(1).click();
        await expect(page.locator('//html/body/section[2]/div/div/div[1]/div[1]/div[2]/h2')).toHaveText('Brands');

        await page.locator('//html/body/section[2]/div/div/div[1]/div[1]/div[2]/div/ul/li[1]/a').click();
        await page.waitForTimeout(500);
        await expect(page).toHaveURL('https://automationexercise.com/brand_products/Polo');
        await expect(page.locator('//html/body/section/div/div[2]/div[2]/div/h2')).toHaveText('Brand - Polo Products');

        await page.locator('//html/body/section/div/div[2]/div[1]/div/div[2]/div/ul/li[8]/a').click();
        await page.waitForTimeout(500);
        await expect(page).toHaveURL('https://automationexercise.com/brand_products/Biba');
        await expect(page.locator('//html/body/section/div/div[2]/div[2]/div/h2')).toHaveText('Brand - Biba Products');
    });

    test('Test Case 20: Search Products and Verify Cart After Login', async ({ page }) => {
        await page.locator('ul.navbar-nav li').nth(3).click();

        await page.fill('input[data-qa="signup-name"]', 'Bebras666');
        await page.fill('input[data-qa="signup-email"]', 'bebras666@example.com');
        await page.locator('button[data-qa="signup-button"]').click();

        await expect(page.locator('//*[@id="form"]/div/div/div/div[1]/h2/b')).toHaveText(/Enter Account Information/);

        await page.locator('#id_gender1').check();
        await page.fill('input[data-qa="password"]', 'password123');
        await page.selectOption('select#days', '13');
        await page.selectOption('select#months', 'February');
        await page.selectOption('select#years', '1999');
        await page.locator('input#newsletter').check();
        await page.locator('input#optin').check();
        await page.fill('input[data-qa="first_name"]', 'Bredas');
        await page.fill('input[data-qa="last_name"]', 'Babrauskas');
        await page.fill('input[data-qa="company"]', 'Uzvanka');
        await page.fill('input[data-qa="address"]', 'Rastu 11');
        await page.fill('input[data-qa="address2"]', 'Bebriskes');
        await page.selectOption('select[data-qa="country"]', 'Canada');
        await page.fill('input[data-qa="state"]', 'Big State');
        await page.fill('input[data-qa="city"]', 'Small City');
        await page.fill('input[data-qa="zipcode"]', '1234567890');
        await page.fill('input[data-qa="mobile_number"]', '1234567890');

        await page.locator('button[data-qa="create-account"]').click();
        await page.locator('[data-qa="continue-button"]').click();
        await page.locator('ul.navbar-nav li').nth(3).click();

        // Real test begins NOW!

        await page.locator('ul.navbar-nav li').nth(1).click();
        await expect(page.locator('//html/body/section[2]/div/div/div[2]/div/h2')).toHaveText(/All Products/);

        await page.fill('input#search_product', 'jeans');
        await page.locator('button#submit_search').click();
        const products = await page.locator('.productinfo p').count();
        console.log('Searched products count', products);

        for (let i = 0; i < products; i++) {
            await expect(page.locator('.productinfo p').nth(i)).toContainText('Jeans');
        };

        await page.locator('.productinfo').nth(0).getByText('Add to cart').hover();
        await page.waitForTimeout(1000);
        await page.locator('div.product-overlay').nth(0).getByText('Add to cart').click();
        await page.waitForTimeout(1000);
        await page.locator('[data-dismiss="modal"]').click();

        await page.locator('.productinfo').nth(1).getByText('Add to cart').hover();
        await page.waitForTimeout(1000);
        await page.locator('div.product-overlay').nth(1).getByText('Add to cart').click();
        await page.waitForTimeout(1000);
        await page.locator('[data-dismiss="modal"]').click();

        await page.locator('.productinfo').nth(2).getByText('Add to cart').hover();
        await page.waitForTimeout(1000);
        await page.locator('div.product-overlay').nth(2).getByText('Add to cart').click();
        await page.waitForTimeout(1000);
        await page.locator('//*[@id="cartModal"]/div/div/div[2]/p[2]/a').click();
        await page.waitForTimeout(500);

        await expect(page.locator('#product-33')).toHaveCount(1);
        await expect(page.locator('#product-35')).toHaveCount(1);
        await expect(page.locator('#product-37')).toHaveCount(1);

        await page.locator('ul.navbar-nav li').nth(3).click();

        await page.fill('input[data-qa="login-email"]', 'bebras666@example.com');
        await page.fill('input[data-qa="login-password"]', 'password123');
        await page.locator('button[data-qa="login-button"]').click();

        await expect(page.locator('ul.navbar-nav li').nth(9)).toHaveText(/Logged in as Bebras666/);
        await page.locator('ul.navbar-nav li').nth(2).click();
        await page.waitForTimeout(500);

        await expect(page.locator('#product-33')).toHaveCount(1);
        await expect(page.locator('#product-35')).toHaveCount(1);
        await expect(page.locator('#product-37')).toHaveCount(1);

        await page.locator('ul.navbar-nav li').nth(4).click();
        await expect(page.locator('h2[data-qa="account-deleted"]')).toHaveText(/Account Deleted!/);

    });

});
