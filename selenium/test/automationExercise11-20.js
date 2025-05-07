import { Builder, By, Key, until } from 'selenium-webdriver';
import { expect } from 'chai';

(async () => {
    describe('Automation exercise testing 11-20', function () {
        let driver;

        it('11 Verify Subscription in Cart page', async function () {
            driver = await new Builder().forBrowser('chrome').build();
            try {
                await driver.get('https://automationexercise.com/');
                await driver.wait(until.urlIs('https://automationexercise.com/'), 5000);
                await driver.wait(until.elementLocated(By.xpath('/html/body/div/div[2]/div[2]/div[2]/div[2]/button[1]')), 5000).click(); //accept cookies

                await driver.findElement(By.xpath('//*[@id="header"]/div/div/div/div[2]/div/ul/li[3]/a')).click();
                await driver.wait(until.urlIs('https://automationexercise.com/view_cart'), 5000);

                await driver.findElement(By.css('input#susbscribe_email')).sendKeys('bebras666@gmail.com');
                await driver.findElement(By.css('#subscribe')).click();

                expect(await driver.findElement(By.css('div.alert-success')).getText()).to.equal('You have been successfully subscribed!');

            } catch (error) {
                console.error("❌ Test failed:", error);
            } finally {
                await driver.quit();
            }
        });

        it('12 Add Products in Cart', async function () {
            driver = await new Builder().forBrowser('chrome').build();
            try {
                await driver.get('https://automationexercise.com/');
                await driver.wait(until.urlIs('https://automationexercise.com/'), 5000);
                await driver.wait(until.elementLocated(By.xpath('/html/body/div/div[2]/div[2]/div[2]/div[2]/button[1]')), 5000).click(); //accept cookies

                await driver.findElement(By.xpath('//*[@id="header"]/div/div/div/div[2]/div/ul/li[2]/a')).click();
                await driver.wait(until.urlIs('https://automationexercise.com/products'), 5000);

                const productInfo = await driver.findElements(By.css('div.productinfo'));
                await driver.actions({ bridge: true }).move({ origin: productInfo[0] }).perform()
                await driver.sleep(1000);
                const addToCartBtn1 = await driver.wait(until.elementLocated(By.css('[data-product-id="1"]')), 5000);

                await driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", addToCartBtn1);
                await driver.wait(until.elementIsVisible(addToCartBtn1), 5000);
                await driver.wait(until.elementIsEnabled(addToCartBtn1), 5000);
                await addToCartBtn1.click();
                await driver.sleep(1000);
                await driver.wait(until.elementLocated(By.css('[data-dismiss="modal"]')), 5000).click();

                await driver.actions({ bridge: true }).move({ origin: productInfo[2] }).perform()
                await driver.sleep(1000);
                const addToCartBtn3 = await driver.wait(until.elementLocated(By.css('[data-product-id="3"]')), 5000);
                await driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", addToCartBtn3);
                await driver.wait(until.elementIsVisible(addToCartBtn3), 5000);
                await driver.wait(until.elementIsEnabled(addToCartBtn3), 5000);
                await addToCartBtn3.click();
                await driver.sleep(1000);
                await driver.wait(until.elementLocated(By.css('[data-dismiss="modal"]')), 5000).click();

                await driver.findElement(By.xpath('//*[@id="header"]/div/div/div/div[2]/div/ul/li[3]/a')).click();
                await driver.wait(until.urlIs('https://automationexercise.com/view_cart'), 5000);

                expect(await driver.findElement(By.css('#product-1 .cart_description')).getText()).to.contain('Blue Top');
                expect(await driver.findElement(By.css('#product-1 .cart_price')).getText()).to.contain('Rs. 500');
                expect(await driver.findElement(By.css('#product-1 .cart_quantity')).getText()).to.contain('1');
                expect(await driver.findElement(By.css('#product-1 .cart_total')).getText()).to.contain('Rs. 500');

                expect(await driver.findElement(By.css('#product-3 .cart_description')).getText()).to.contain('Sleeveless Dress');
                expect(await driver.findElement(By.css('#product-3 .cart_price')).getText()).to.contain('Rs. 1000');
                expect(await driver.findElement(By.css('#product-3 .cart_quantity')).getText()).to.contain('1');
                expect(await driver.findElement(By.css('#product-3 .cart_total')).getText()).to.contain('Rs. 1000');

            } catch (error) {
                console.error("❌ Test failed:", error);
            } finally {
                await driver.quit();
            }
        });

        it('13 Verify Product quantity in Cart', async function () {
            driver = await new Builder().forBrowser('chrome').build();
            try {
                await driver.get('https://automationexercise.com/');
                await driver.wait(until.urlIs('https://automationexercise.com/'), 5000);
                await driver.wait(until.elementLocated(By.xpath('/html/body/div/div[2]/div[2]/div[2]/div[2]/button[1]')), 5000).click(); //accept cookies

                const products = await driver.findElements(By.css('div.choose'));
                products[5].click();
                await driver.wait(until.urlIs('https://automationexercise.com/product_details/6'), 5000);

                await driver.wait(until.elementLocated(By.css('#quantity')), 5000).clear();
                await driver.wait(until.elementLocated(By.css('#quantity')), 5000).sendKeys(5);
                await driver.wait(until.elementLocated(By.xpath('/html/body/section/div/div/div[2]/div[2]/div[2]/div/span/button')), 5000).click();
                await driver.sleep(1000);
                await driver.wait(until.elementLocated(By.xpath('//*[@id="cartModal"]/div/div/div[2]/p[2]/a')), 5000).click();

                await driver.wait(until.urlIs('https://automationexercise.com/view_cart'), 5000);

                expect(await driver.findElement(By.css('#product-6 .cart_description')).getText()).to.contain('Summer White Top');
                expect(await driver.findElement(By.css('#product-6 .cart_price')).getText()).to.contain('Rs. 400');
                expect(await driver.findElement(By.css('#product-6 .cart_quantity')).getText()).to.contain('5');
                expect(await driver.findElement(By.css('#product-6 .cart_total')).getText()).to.contain('Rs. 2000');

            } catch (error) {
                console.error("❌ Test failed:", error);
            } finally {
                await driver.quit();
            }
        });

        it('14 Place Order: Register while Checkout', async function () {
            driver = await new Builder().forBrowser('chrome').build();
            try {
                await driver.get('https://automationexercise.com/');
                await driver.wait(until.urlIs('https://automationexercise.com/'), 5000);
                await driver.wait(until.elementLocated(By.xpath('/html/body/div/div[2]/div[2]/div[2]/div[2]/button[1]')), 5000).click(); //accept cookies

                const productInfo = await driver.findElements(By.css('div.productinfo'));
                await driver.actions({ bridge: true }).move({ origin: productInfo[0] }).perform()
                await driver.sleep(600);
                const addToCartBtn1 = await driver.wait(until.elementLocated(By.css('[data-product-id="1"]')), 5000);

                await driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", addToCartBtn1);
                await driver.wait(until.elementIsVisible(addToCartBtn1), 5000);
                await driver.wait(until.elementIsEnabled(addToCartBtn1), 5000);
                await addToCartBtn1.click();
                await driver.sleep(600);
                await driver.wait(until.elementLocated(By.css('[data-dismiss="modal"]')), 5000).click();

                const addToCartBtn2 = await driver.wait(until.elementLocated(By.css('[data-product-id="2"]')), 5000);
                await driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", addToCartBtn2);
                await driver.wait(until.elementIsVisible(addToCartBtn2), 5000);
                await driver.wait(until.elementIsEnabled(addToCartBtn2), 5000);
                await addToCartBtn2.click();
                await driver.sleep(600);
                await driver.wait(until.elementLocated(By.xpath('//*[@id="cartModal"]/div/div/div[2]/p[2]/a')), 5000).click();

                await driver.wait(until.urlIs('https://automationexercise.com/view_cart'), 5000);

                await driver.findElement(By.xpath('//*[@id="do_action"]/div[1]/div/div/a')).click();
                await driver.sleep(600);
                await driver.findElement(By.xpath('//*[@id="checkoutModal"]/div/div/div[2]/p[2]/a')).click();

                await driver.wait(until.urlIs('https://automationexercise.com/login'), 10000);
                await driver.wait(until.elementLocated(By.css('.signup-form')), 5000);

                await driver.findElement(By.css('input[data-qa="signup-name"]')).sendKeys('Bebras666');
                await driver.findElement(By.css('input[data-qa="signup-email"]')).sendKeys('bebras666@example.com');
                await driver.findElement(By.css('button[data-qa="signup-button"]')).click();

                await driver.wait(until.elementLocated(By.xpath("//*[contains(text(),'Enter Account Information')]")), 5000);

                await driver.findElement(By.id('id_gender1')).click();
                await driver.findElement(By.css('input[data-qa="password"]')).sendKeys('password123');
                await driver.findElement(By.id('days')).sendKeys('13');
                await driver.findElement(By.id('months')).sendKeys('February');
                await driver.findElement(By.id('years')).sendKeys('1999');
                await driver.findElement(By.id('newsletter')).click();
                await driver.findElement(By.id('optin')).click();
                await driver.findElement(By.css('input[data-qa="first_name"]')).sendKeys('Bredas');
                await driver.findElement(By.css('input[data-qa="last_name"]')).sendKeys('Babrauskas');
                await driver.findElement(By.css('input[data-qa="company"]')).sendKeys('Uztvanka');
                await driver.findElement(By.css('input[data-qa="address"]')).sendKeys('Bebriskes');
                await driver.findElement(By.css('input[data-qa="address2"]')).sendKeys('Rastu 11');
                await driver.findElement(By.css('select[data-qa="country"]')).sendKeys('Canada');
                await driver.findElement(By.css('input[data-qa="state"]')).sendKeys('Big State');
                await driver.findElement(By.css('input[data-qa="city"]')).sendKeys('Small City');
                await driver.findElement(By.css('input[data-qa="zipcode"]')).sendKeys('1234567890');
                await driver.findElement(By.css('input[data-qa="mobile_number"]')).sendKeys('1234567890');

                await driver.findElement(By.css('button[data-qa="create-account"]')).click();

                await driver.wait(until.elementLocated(By.xpath("//*[contains(text(),'Account Created!')]")), 5000);
                await driver.findElement(By.css('[data-qa="continue-button"]')).click();
                await driver.wait(until.elementLocated(By.linkText('Logged in as Bebras666')), 5000);

                await driver.findElement(By.xpath('//*[@id="header"]/div/div/div/div[2]/div/ul/li[3]/a')).click();
                await driver.wait(until.urlIs('https://automationexercise.com/view_cart'), 5000);

                await driver.findElement(By.xpath('//*[@id="do_action"]/div[1]/div/div/a')).click();

                await driver.findElement(By.css('textarea.form-control')).sendKeys('Description coment in comment text area.');
                await driver.findElement(By.css('a[href="/payment"]')).click();
                await driver.sleep(600);
                await driver.findElement(By.css('[data-qa="name-on-card"]')).sendKeys('BREDAS BEBRAS');
                await driver.findElement(By.css('[data-qa="card-number"]')).sendKeys('1234567890123456');
                await driver.findElement(By.css('[data-qa="cvc"]')).sendKeys('123');
                await driver.findElement(By.css('[data-qa="expiry-month"]')).sendKeys('10');
                await driver.findElement(By.css('[data-qa="expiry-year"]')).sendKeys('2030');

                await driver.findElement(By.css('button[data-qa="pay-button"]')).click();
                expect(await driver.wait(until.elementLocated(By.xpath('//*[@id="form"]/div/div/div/p')), 5000).getText()).to.contain('Congratulations! Your order has been confirmed!');

                await driver.findElement(By.linkText('Delete Account')).click();
                const confirmTest = await driver.wait(until.elementLocated(By.xpath("//*[contains(text(),'Account Deleted!')]")), 5000).getText();

                expect(confirmTest).to.equal('ACCOUNT DELETED!');

            } catch (error) {
                console.error("❌ Test failed:", error);
            } finally {
                await driver.quit();
            }
        });

        it('15 Place Order: Register before Checkout', async function () {
            driver = await new Builder().forBrowser('chrome').build();
            try {
                await driver.get('https://automationexercise.com/');
                await driver.wait(until.urlIs('https://automationexercise.com/'), 5000);
                await driver.wait(until.elementLocated(By.xpath('/html/body/div/div[2]/div[2]/div[2]/div[2]/button[1]')), 5000).click(); //accept cookies
                await driver.findElement(By.linkText('Signup / Login')).click();

                await driver.wait(until.urlIs('https://automationexercise.com/login'), 10000);
                await driver.wait(until.elementLocated(By.css('.signup-form')), 5000);

                await driver.findElement(By.css('input[data-qa="signup-name"]')).sendKeys('Bebras666');
                await driver.findElement(By.css('input[data-qa="signup-email"]')).sendKeys('bebras666@example.com');
                await driver.findElement(By.css('button[data-qa="signup-button"]')).click();

                await driver.wait(until.elementLocated(By.xpath("//*[contains(text(),'Enter Account Information')]")), 5000);

                await driver.findElement(By.id('id_gender1')).click();
                await driver.findElement(By.css('input[data-qa="password"]')).sendKeys('password123');
                await driver.findElement(By.id('days')).sendKeys('13');
                await driver.findElement(By.id('months')).sendKeys('February');
                await driver.findElement(By.id('years')).sendKeys('1999');
                await driver.findElement(By.id('newsletter')).click();
                await driver.findElement(By.id('optin')).click();
                await driver.findElement(By.css('input[data-qa="first_name"]')).sendKeys('Bredas');
                await driver.findElement(By.css('input[data-qa="last_name"]')).sendKeys('Babrauskas');
                await driver.findElement(By.css('input[data-qa="company"]')).sendKeys('Uztvanka');
                await driver.findElement(By.css('input[data-qa="address"]')).sendKeys('Bebriskes');
                await driver.findElement(By.css('input[data-qa="address2"]')).sendKeys('Rastu 11');
                await driver.findElement(By.css('select[data-qa="country"]')).sendKeys('Canada');
                await driver.findElement(By.css('input[data-qa="state"]')).sendKeys('Big State');
                await driver.findElement(By.css('input[data-qa="city"]')).sendKeys('Small City');
                await driver.findElement(By.css('input[data-qa="zipcode"]')).sendKeys('1234567890');
                await driver.findElement(By.css('input[data-qa="mobile_number"]')).sendKeys('1234567890');

                await driver.findElement(By.css('button[data-qa="create-account"]')).click();

                await driver.wait(until.elementLocated(By.xpath("//*[contains(text(),'Account Created!')]")), 5000);
                await driver.findElement(By.css('[data-qa="continue-button"]')).click();
                await driver.wait(until.elementLocated(By.linkText('Logged in as Bebras666')), 5000);

                const productInfo = await driver.findElements(By.css('div.productinfo'));
                await driver.actions({ bridge: true }).move({ origin: productInfo[0] }).perform()
                await driver.sleep(600);
                const addToCartBtn1 = await driver.wait(until.elementLocated(By.css('[data-product-id="1"]')), 5000);

                await driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", addToCartBtn1);
                await driver.wait(until.elementIsVisible(addToCartBtn1), 5000);
                await driver.wait(until.elementIsEnabled(addToCartBtn1), 5000);
                await addToCartBtn1.click();
                await driver.sleep(600);
                await driver.wait(until.elementLocated(By.css('[data-dismiss="modal"]')), 5000).click();

                const addToCartBtn2 = await driver.wait(until.elementLocated(By.css('[data-product-id="2"]')), 5000);
                await driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", addToCartBtn2);
                await driver.wait(until.elementIsVisible(addToCartBtn2), 5000);
                await driver.wait(until.elementIsEnabled(addToCartBtn2), 5000);
                await addToCartBtn2.click();
                await driver.sleep(600);
                await driver.wait(until.elementLocated(By.xpath('//*[@id="cartModal"]/div/div/div[2]/p[2]/a')), 5000).click();

                await driver.wait(until.urlIs('https://automationexercise.com/view_cart'), 5000);

                await driver.findElement(By.xpath('//*[@id="do_action"]/div[1]/div/div/a')).click();

                await driver.findElement(By.css('textarea.form-control')).sendKeys('Description coment in comment text area.');
                await driver.findElement(By.css('a[href="/payment"]')).click();
                await driver.sleep(600);
                await driver.findElement(By.css('[data-qa="name-on-card"]')).sendKeys('BREDAS BEBRAS');
                await driver.findElement(By.css('[data-qa="card-number"]')).sendKeys('1234567890123456');
                await driver.findElement(By.css('[data-qa="cvc"]')).sendKeys('123');
                await driver.findElement(By.css('[data-qa="expiry-month"]')).sendKeys('10');
                await driver.findElement(By.css('[data-qa="expiry-year"]')).sendKeys('2030');

                await driver.findElement(By.css('button[data-qa="pay-button"]')).click();
                expect(await driver.wait(until.elementLocated(By.xpath('//*[@id="form"]/div/div/div/p')), 5000).getText()).to.contain('Congratulations! Your order has been confirmed!');

                await driver.findElement(By.linkText('Delete Account')).click();
                const confirmTest = await driver.wait(until.elementLocated(By.xpath("//*[contains(text(),'Account Deleted!')]")), 5000).getText();

                expect(confirmTest).to.equal('ACCOUNT DELETED!');

            } catch (error) {
                console.error("❌ Test failed:", error);
            } finally {
                await driver.quit();
            }
        });

        it('16 Place Order: Login before Checkout', async function () {
            driver = await new Builder().forBrowser('chrome').build();
            try {
                await driver.get('https://automationexercise.com/');
                await driver.wait(until.urlIs('https://automationexercise.com/'), 5000);

                await driver.wait(until.elementLocated(By.xpath('/html/body/div/div[2]/div[2]/div[2]/div[2]/button[1]')), 5000).click(); //accept cookies
                await driver.findElement(By.linkText('Signup / Login')).click();
                await driver.wait(until.urlIs('https://automationexercise.com/login'), 10000);
                await driver.wait(until.elementLocated(By.css('.signup-form')), 5000);

                await driver.findElement(By.css('input[data-qa="signup-name"]')).sendKeys('Bebras666');
                await driver.findElement(By.css('input[data-qa="signup-email"]')).sendKeys('bebras666@example.com');
                await driver.findElement(By.css('button[data-qa="signup-button"]')).click();

                await driver.wait(until.elementLocated(By.xpath("//*[contains(text(),'Enter Account Information')]")), 5000);

                await driver.findElement(By.id('id_gender1')).click();
                await driver.findElement(By.css('input[data-qa="password"]')).sendKeys('password123');
                await driver.findElement(By.id('days')).sendKeys('13');
                await driver.findElement(By.id('months')).sendKeys('February');
                await driver.findElement(By.id('years')).sendKeys('1999');
                await driver.findElement(By.id('newsletter')).click();
                await driver.findElement(By.id('optin')).click();
                await driver.findElement(By.css('input[data-qa="first_name"]')).sendKeys('Bredas');
                await driver.findElement(By.css('input[data-qa="last_name"]')).sendKeys('Babrauskas');
                await driver.findElement(By.css('input[data-qa="company"]')).sendKeys('Uztvanka');
                await driver.findElement(By.css('input[data-qa="address"]')).sendKeys('Bebriskes');
                await driver.findElement(By.css('input[data-qa="address2"]')).sendKeys('Rastu 11');
                await driver.findElement(By.css('select[data-qa="country"]')).sendKeys('Canada');
                await driver.findElement(By.css('input[data-qa="state"]')).sendKeys('Big State');
                await driver.findElement(By.css('input[data-qa="city"]')).sendKeys('Small City');
                await driver.findElement(By.css('input[data-qa="zipcode"]')).sendKeys('1234567890');
                await driver.findElement(By.css('input[data-qa="mobile_number"]')).sendKeys('1234567890');

                await driver.findElement(By.css('button[data-qa="create-account"]')).click();

                await driver.wait(until.elementLocated(By.xpath("//*[contains(text(),'Account Created!')]")), 5000);
                await driver.findElement(By.css('[data-qa="continue-button"]')).click();
                await driver.findElement(By.linkText('Logout')).click();

                //Real test begins NOW!
                await driver.findElement(By.linkText('Signup / Login')).click();
                await driver.wait(until.urlIs('https://automationexercise.com/login'), 10000);

                await driver.findElement(By.css('input[data-qa="login-email"]')).sendKeys('bebras666@example.com');
                await driver.findElement(By.css('input[data-qa="login-password"]')).sendKeys('password123');
                await driver.findElement(By.css('button[data-qa="login-button"]')).click();

                await driver.wait(until.elementLocated(By.linkText('Logged in as Bebras666')), 5000);

                const productInfo = await driver.findElements(By.css('div.productinfo'));
                await driver.actions({ bridge: true }).move({ origin: productInfo[0] }).perform()
                await driver.sleep(600);
                const addToCartBtn2 = await driver.wait(until.elementLocated(By.css('[data-product-id="2"]')), 5000);
                await driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", addToCartBtn2);
                await driver.wait(until.elementIsVisible(addToCartBtn2), 5000);
                await driver.wait(until.elementIsEnabled(addToCartBtn2), 5000);
                await addToCartBtn2.click();
                await driver.sleep(600);
                await driver.wait(until.elementLocated(By.xpath('//*[@id="cartModal"]/div/div/div[2]/p[2]/a')), 5000).click();

                await driver.wait(until.urlIs('https://automationexercise.com/view_cart'), 5000);

                await driver.findElement(By.xpath('//*[@id="do_action"]/div[1]/div/div/a')).click();

                await driver.findElement(By.css('textarea.form-control')).sendKeys('Description coment in comment text area.');
                await driver.findElement(By.css('a[href="/payment"]')).click();
                await driver.sleep(600);
                await driver.findElement(By.css('[data-qa="name-on-card"]')).sendKeys('BREDAS BEBRAS');
                await driver.findElement(By.css('[data-qa="card-number"]')).sendKeys('1234567890123456');
                await driver.findElement(By.css('[data-qa="cvc"]')).sendKeys('123');
                await driver.findElement(By.css('[data-qa="expiry-month"]')).sendKeys('10');
                await driver.findElement(By.css('[data-qa="expiry-year"]')).sendKeys('2030');

                await driver.findElement(By.css('button[data-qa="pay-button"]')).click();
                expect(await driver.wait(until.elementLocated(By.xpath('//*[@id="form"]/div/div/div/p')), 5000).getText()).to.contain('Congratulations! Your order has been confirmed!');

                await driver.findElement(By.linkText('Delete Account')).click();
                const confirmTest = await driver.wait(until.elementLocated(By.xpath("//*[contains(text(),'Account Deleted!')]")), 5000).getText();

                expect(confirmTest).to.equal('ACCOUNT DELETED!');

            } catch (error) {
                console.error("❌ Test failed:", error);
            } finally {
                await driver.quit();
            }
        });

        it('17 Remove Products From Cart', async function () {
            driver = await new Builder().forBrowser('chrome').build();
            try {
                await driver.get('https://automationexercise.com/');
                await driver.wait(until.urlIs('https://automationexercise.com/'), 5000);
                await driver.wait(until.elementLocated(By.xpath('/html/body/div/div[2]/div[2]/div[2]/div[2]/button[1]')), 5000).click(); //accept cookies

                const productInfo = await driver.findElements(By.css('div.productinfo'));
                await driver.actions({ bridge: true }).move({ origin: productInfo[0] }).perform()
                await driver.sleep(800);

                const addToCartBtn1 = await driver.wait(until.elementLocated(By.css('[data-product-id="1"]')), 5000);
                await driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", addToCartBtn1);
                await driver.wait(until.elementIsVisible(addToCartBtn1), 5000);
                await driver.wait(until.elementIsEnabled(addToCartBtn1), 5000);
                await addToCartBtn1.click();
                await driver.sleep(800);
                await driver.wait(until.elementLocated(By.css('[data-dismiss="modal"]')), 5000).click();

                const addToCartBtn2 = await driver.wait(until.elementLocated(By.css('[data-product-id="2"]')), 5000);
                await driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", addToCartBtn2);
                await driver.wait(until.elementIsVisible(addToCartBtn2), 5000);
                await driver.wait(until.elementIsEnabled(addToCartBtn2), 5000);
                await addToCartBtn2.click();
                await driver.sleep(800);
                await driver.wait(until.elementLocated(By.css('[data-dismiss="modal"]')), 5000).click();

                const addToCartBtn3 = await driver.wait(until.elementLocated(By.css('[data-product-id="3"]')), 5000);
                await driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", addToCartBtn3);
                await driver.wait(until.elementIsVisible(addToCartBtn3), 5000);
                await driver.wait(until.elementIsEnabled(addToCartBtn3), 5000);
                await addToCartBtn3.click();
                await driver.sleep(800);
                await driver.wait(until.elementLocated(By.xpath('//*[@id="cartModal"]/div/div/div[2]/p[2]/a')), 5000).click();

                await driver.wait(until.urlIs('https://automationexercise.com/view_cart'), 5000);

                await driver.wait(until.elementLocated(By.css('[data-product-id="1"]')), 5000).click();
                await driver.sleep(800);

                const products = (await driver.findElements(By.xpath('//*[@id="cart_info_table"]/tbody/tr'))).length;
                expect(products).to.equal(2);

            } catch (error) {
                console.error("❌ Test failed:", error);
            } finally {
                await driver.quit();
            }
        });

        it('18 View Category Products', async function () {
            driver = await new Builder().forBrowser('chrome').build();
            try {
                await driver.get('https://automationexercise.com/');
                await driver.wait(until.urlIs('https://automationexercise.com/'), 5000);
                await driver.wait(until.elementLocated(By.xpath('/html/body/div/div[2]/div[2]/div[2]/div[2]/button[1]')), 5000).click(); //accept cookies

                await driver.wait(until.elementLocated(By.xpath('//*[@id="accordian"]/div[1]/div[1]/h4/a/span')), 5000).click();                
                await driver.sleep(800);

                await driver.wait(until.elementLocated(By.xpath('//*[@id="Women"]/div/ul/li[1]/a')), 5000).click();
                await driver.sleep(800);

                expect(await driver.wait(until.elementLocated(By.xpath('/html/body/section/div/div[2]/div[2]/div/h2')), 5000).getText()).to.contain('WOMEN -  DRESS PRODUCTS');

                await driver.wait(until.elementLocated(By.xpath('//*[@id="accordian"]/div[2]/div[1]/h4/a')), 5000).click();                
                await driver.sleep(800);

                await driver.wait(until.elementLocated(By.xpath('//*[@id="Men"]/div/ul/li[1]/a')), 5000).click();
                await driver.sleep(800);

                expect(await driver.wait(until.elementLocated(By.xpath('/html/body/section/div/div[2]/div[2]/div/h2')), 5000).getText()).to.contain('MEN - TSHIRTS PRODUCTS');
                
            } catch (error) {
                console.error("❌ Test failed:", error);
            } finally {
                await driver.quit();
            }
        });

        it('19 View & Cart Brand Products', async function () {
            driver = await new Builder().forBrowser('chrome').build();
            try {
                await driver.get('https://automationexercise.com/');
                await driver.wait(until.urlIs('https://automationexercise.com/'), 5000);
                await driver.wait(until.elementLocated(By.xpath('/html/body/div/div[2]/div[2]/div[2]/div[2]/button[1]')), 5000).click(); //accept cookies

                await driver.findElement(By.xpath('//*[@id="header"]/div/div/div/div[2]/div/ul/li[2]/a')).click();
                await driver.wait(until.urlIs('https://automationexercise.com/products'), 5000);

                await driver.wait(until.elementLocated(By.xpath('/html/body/section[2]/div/div/div[1]/div/div[2]/div/ul/li[8]/a')), 5000).click();
                expect(await driver.wait(until.urlIs('https://automationexercise.com/brand_products/Biba'), 5000)).to.equal(true);

                await driver.wait(until.elementLocated(By.xpath('/html/body/section/div/div[2]/div[1]/div/div[2]/div/ul/li[1]/a')), 5000).click();
                expect(await driver.wait(until.urlIs('https://automationexercise.com/brand_products/Polo'), 5000)).to.equal(true);            
                
            } catch (error) {
                console.error("❌ Test failed:", error);
            } finally {
                await driver.quit();
            }
        });

        it.only('20 Search Products and Verify Cart After Login', async function () {
            driver = await new Builder().forBrowser('chrome').build();
            try {
                await driver.get('https://automationexercise.com/');
                await driver.wait(until.urlIs('https://automationexercise.com/'), 5000);
                await driver.wait(until.elementLocated(By.xpath('/html/body/div/div[2]/div[2]/div[2]/div[2]/button[1]')), 5000).click(); //accept cookies

                await driver.findElement(By.linkText('Signup / Login')).click();
                await driver.wait(until.urlIs('https://automationexercise.com/login'), 10000);
                await driver.wait(until.elementLocated(By.css('.signup-form')), 5000);
                await driver.findElement(By.css('input[data-qa="signup-name"]')).sendKeys('Bebras666');
                await driver.findElement(By.css('input[data-qa="signup-email"]')).sendKeys('bebras666@example.com');
                await driver.findElement(By.css('button[data-qa="signup-button"]')).click();
                await driver.wait(until.elementLocated(By.xpath("//*[contains(text(),'Enter Account Information')]")), 5000);
                await driver.findElement(By.id('id_gender1')).click();
                await driver.findElement(By.css('input[data-qa="password"]')).sendKeys('password123');
                await driver.findElement(By.id('days')).sendKeys('13');
                await driver.findElement(By.id('months')).sendKeys('February');
                await driver.findElement(By.id('years')).sendKeys('1999');
                await driver.findElement(By.id('newsletter')).click();
                await driver.findElement(By.id('optin')).click();
                await driver.findElement(By.css('input[data-qa="first_name"]')).sendKeys('Bredas');
                await driver.findElement(By.css('input[data-qa="last_name"]')).sendKeys('Babrauskas');
                await driver.findElement(By.css('input[data-qa="company"]')).sendKeys('Uztvanka');
                await driver.findElement(By.css('input[data-qa="address"]')).sendKeys('Bebriskes');
                await driver.findElement(By.css('input[data-qa="address2"]')).sendKeys('Rastu 11');
                await driver.findElement(By.css('select[data-qa="country"]')).sendKeys('Canada');
                await driver.findElement(By.css('input[data-qa="state"]')).sendKeys('Big State');
                await driver.findElement(By.css('input[data-qa="city"]')).sendKeys('Small City');
                await driver.findElement(By.css('input[data-qa="zipcode"]')).sendKeys('1234567890');
                await driver.findElement(By.css('input[data-qa="mobile_number"]')).sendKeys('1234567890');
                await driver.findElement(By.css('button[data-qa="create-account"]')).click();
                await driver.wait(until.elementLocated(By.xpath("//*[contains(text(),'Account Created!')]")), 5000);
                await driver.findElement(By.css('[data-qa="continue-button"]')).click();
                await driver.findElement(By.linkText('Logout')).click();

                //Real test begins NOW!
                await driver.findElement(By.linkText('Signup / Login')).click();
                await driver.wait(until.urlIs('https://automationexercise.com/login'), 10000);

                await driver.findElement(By.css('input[data-qa="login-email"]')).sendKeys('bebras666@example.com');
                await driver.findElement(By.css('input[data-qa="login-password"]')).sendKeys('password123');
                await driver.findElement(By.css('button[data-qa="login-button"]')).click();
                await driver.wait(until.elementLocated(By.linkText('Logged in as Bebras666')), 5000);

                await driver.findElement(By.xpath('//*[@id="header"]/div/div/div/div[2]/div/ul/li[2]/a')).click();
                await driver.wait(until.urlIs('https://automationexercise.com/products'), 5000);

                await driver.wait(until.elementLocated(By.css('#search_product')), 5000).sendKeys('jeans');
                await driver.wait(until.elementLocated(By.css('#submit_search')), 5000).click();

                const products = await driver.findElements(By.css('productinfo'));

                for (let i = 0; i < products.length; i++) {
                    expect(products[i]).to.contain('Jeans');                    
                };

                const addToCartBtn = await driver.wait(until.elementLocated(By.css('[data-product-id="33"]')), 5000);
                await driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", addToCartBtn);
                await driver.wait(until.elementIsVisible(addToCartBtn), 5000);
                await driver.wait(until.elementIsEnabled(addToCartBtn), 5000);
                await addToCartBtn.click();
                await driver.sleep(800);
                await driver.wait(until.elementLocated(By.xpath('//*[@id="cartModal"]/div/div/div[2]/p[2]/a')), 5000).click();

                await driver.wait(until.urlIs('https://automationexercise.com/view_cart'), 5000);
            
                expect(await driver.findElement(By.css('#product-33 .cart_description')).getText()).to.contain('Soft Stretch Jeans');
                expect(await driver.findElement(By.css('#product-33 .cart_price')).getText()).to.contain('Rs. 799');
                expect(await driver.findElement(By.css('#product-33 .cart_quantity')).getText()).to.contain('1');
                expect(await driver.findElement(By.css('#product-33 .cart_total')).getText()).to.contain('Rs. 799');

                await driver.findElement(By.linkText('Delete Account')).click();
                const confirmTest = await driver.wait(until.elementLocated(By.xpath("//*[contains(text(),'Account Deleted!')]")), 5000).getText();

                expect(confirmTest).to.equal('ACCOUNT DELETED!');
                
            } catch (error) {
                console.error("❌ Test failed:", error);
            } finally {
                await driver.quit();
            }
        });

        
    });
})();