import { Builder, By, Key, until } from 'selenium-webdriver';
import { expect } from 'chai';

(async () => {
    describe('Automation exercise testing 21-26', function () {
        let driver;

        it('21 Add review on product', async function () {
            driver = await new Builder().forBrowser('chrome').build();
            try {
                await driver.get('https://automationexercise.com/');
                await driver.wait(until.urlIs('https://automationexercise.com/'), 5000);
                await driver.wait(until.elementLocated(By.xpath('/html/body/div/div[2]/div[2]/div[2]/div[2]/button[1]')), 5000).click(); //accept cookies

                await driver.findElement(By.xpath('//*[@id="header"]/div/div/div/div[2]/div/ul/li[2]/a')).click();
                await driver.wait(until.urlIs('https://automationexercise.com/products'), 5000);

                await driver.findElement(By.xpath('/html/body/section[2]/div/div/div[2]/div/div[9]/div/div[2]/ul/li/a')).click();
                await driver.wait(until.elementLocated(By.css('#name')), 5000).sendKeys('Bebras');
                await driver.wait(until.elementLocated(By.css('#email')), 5000).sendKeys('bebras666@example.com');
                await driver.wait(until.elementLocated(By.css('#review')), 5000).sendKeys('Bebras Babrauskas approves!');
                await driver.wait(until.elementLocated(By.css('#button-review')), 5000).click();

                expect(await driver.findElement(By.css('div.alert-success')).getText()).to.equal('Thank you for your review.');

            } catch (error) {
                console.error("❌ Test failed:", error);
            } finally {
                await driver.quit();
            }
        });

        it('22 Add to cart from Recommended items', async function () {
            driver = await new Builder().forBrowser('chrome').build();
            try {
                await driver.get('https://automationexercise.com/');
                await driver.wait(until.urlIs('https://automationexercise.com/'), 5000);
                await driver.wait(until.elementLocated(By.xpath('/html/body/div/div[2]/div[2]/div[2]/div[2]/button[1]')), 5000).click(); //accept cookies

                expect(await driver.findElement(By.xpath('/html/body/section[2]/div/div/div[2]/div[2]/h2')).getText()).to.equal('RECOMMENDED ITEMS');

                await driver.wait(until.elementLocated(By.xpath('//*[@id="recommended-item-carousel"]/div/div[2]/div[2]/div/div/div/a')), 5000).click();
                await driver.sleep(800);
                await driver.wait(until.elementLocated(By.xpath('//*[@id="cartModal"]/div/div/div[2]/p[2]/a/u')), 5000).click();

                expect(await driver.findElement(By.css('#product-5 .cart_description')).getText()).to.contain('Winter Top');
                expect(await driver.findElement(By.css('#product-5 .cart_price')).getText()).to.contain('Rs. 600');
                expect(await driver.findElement(By.css('#product-5 .cart_quantity')).getText()).to.contain('1');
                expect(await driver.findElement(By.css('#product-5 .cart_total')).getText()).to.contain('Rs. 600');

            } catch (error) {
                console.error("❌ Test failed:", error);
            } finally {
                await driver.quit();
            }
        });

        it('23 Verify address details in checkout page', async function () {
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
                expect(await driver.wait(until.elementLocated(By.linkText('Logged in as Bebras666')), 5000).getText()).to.equal('Logged in as Bebras666');

                await driver.wait(until.elementLocated(By.xpath('//*[@id="recommended-item-carousel"]/div/div[2]/div[2]/div/div/div/a')), 5000).click();
                await driver.sleep(800);
                await driver.wait(until.elementLocated(By.xpath('//*[@id="cartModal"]/div/div/div[2]/p[2]/a/u')), 5000).click();

                await driver.wait(until.urlIs('https://automationexercise.com/view_cart'), 5000);
                await driver.findElement(By.xpath('//*[@id="do_action"]/div[1]/div/div/a')).click();
                await driver.sleep(800);

                expect(await driver.findElement(By.css('#address_delivery .address_firstname ')).getText()).to.contain('Mr. Bredas Babrauskas');
                const addressDelivery = await driver.findElements(By.css('#address_delivery .address_address1'));
                expect(await addressDelivery[0].getText()).to.contain('Uztvanka');
                expect(await addressDelivery[1].getText()).to.contain('Bebriskes');
                expect(await addressDelivery[2].getText()).to.contain('Rastu 11');
                expect(await driver.findElement(By.css('#address_delivery .address_city ')).getText()).to.contain('Small City Big State 1234567890');
                expect(await driver.findElement(By.css('#address_delivery .address_country_name')).getText()).to.contain('Canada');
                expect(await driver.findElement(By.css('#address_delivery .address_phone')).getText()).to.contain('1234567890');

                expect(await driver.findElement(By.css('#address_invoice .address_firstname ')).getText()).to.contain('Mr. Bredas Babrauskas');
                const addressInvoce = await driver.findElements(By.css('#address_invoice .address_address1'));
                expect(await addressInvoce[0].getText()).to.contain('Uztvanka');
                expect(await addressInvoce[1].getText()).to.contain('Bebriskes');
                expect(await addressInvoce[2].getText()).to.contain('Rastu 11');
                expect(await driver.findElement(By.css('#address_invoice .address_city ')).getText()).to.contain('Small City Big State 1234567890');
                expect(await driver.findElement(By.css('#address_invoice .address_country_name')).getText()).to.contain('Canada');
                expect(await driver.findElement(By.css('#address_invoice .address_phone')).getText()).to.contain('1234567890');

                await driver.findElement(By.linkText('Delete Account')).click();
                const confirmTest = await driver.wait(until.elementLocated(By.xpath("//*[contains(text(),'Account Deleted!')]")), 5000).getText();

                expect(confirmTest).to.equal('ACCOUNT DELETED!');

            } catch (error) {
                console.error("❌ Test failed:", error);
            } finally {
                await driver.quit();
            }
        });

        it('24 Download Invoice after purchase order', async function () {
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
                expect(await driver.wait(until.elementLocated(By.linkText('Logged in as Bebras666')), 5000).getText()).to.equal('Logged in as Bebras666');

                await driver.wait(until.elementLocated(By.xpath('//*[@id="recommended-item-carousel"]/div/div[2]/div[2]/div/div/div/a')), 5000).click();
                await driver.sleep(800);
                await driver.wait(until.elementLocated(By.xpath('//*[@id="cartModal"]/div/div/div[2]/p[2]/a/u')), 5000).click();

                await driver.wait(until.urlIs('https://automationexercise.com/view_cart'), 5000);
                await driver.findElement(By.xpath('//*[@id="do_action"]/div[1]/div/div/a')).click();
                await driver.sleep(800);

                expect(await driver.findElement(By.css('#address_delivery .address_firstname ')).getText()).to.contain('Mr. Bredas Babrauskas');
                const addressDelivery = await driver.findElements(By.css('#address_delivery .address_address1'));
                expect(await addressDelivery[0].getText()).to.contain('Uztvanka');
                expect(await addressDelivery[1].getText()).to.contain('Bebriskes');
                expect(await addressDelivery[2].getText()).to.contain('Rastu 11');
                expect(await driver.findElement(By.css('#address_delivery .address_city ')).getText()).to.contain('Small City Big State 1234567890');
                expect(await driver.findElement(By.css('#address_delivery .address_country_name')).getText()).to.contain('Canada');
                expect(await driver.findElement(By.css('#address_delivery .address_phone')).getText()).to.contain('1234567890');

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

                await driver.findElement(By.xpath('//*[@id="form"]/div/div/div/a')).click();
                await driver.findElement(By.xpath('//*[@id="form"]/div/div/div/div/a')).click();

                await driver.findElement(By.linkText('Delete Account')).click();
                const confirmTest = await driver.wait(until.elementLocated(By.xpath("//*[contains(text(),'Account Deleted!')]")), 5000).getText();

                expect(confirmTest).to.equal('ACCOUNT DELETED!');

            } catch (error) {
                console.error("❌ Test failed:", error);
            } finally {
                await driver.quit();
            }
        });

        it('25 Verify Scroll Up using Arrow button and Scroll Down functionality', async function () {
            driver = await new Builder().forBrowser('chrome').build();
            try {
                await driver.get('https://automationexercise.com/');
                await driver.wait(until.urlIs('https://automationexercise.com/'), 5000);
                await driver.wait(until.elementLocated(By.xpath('/html/body/div/div[2]/div[2]/div[2]/div[2]/button[1]')), 5000).click(); //accept cookies

                await driver.executeScript('window.scrollTo(0, document.body.scrollHeight);');
                await driver.sleep(800);

                expect(await driver.wait(until.elementLocated(By.xpath('//*[@id="footer"]/div[1]/div/div/div[2]/div/h2')), 5000).getText()).to.contains('SUBSCRIPTION');

                await driver.wait(until.elementLocated(By.xpath('//*[@id="scrollUp"]')), 5000).click();
                await driver.sleep(800);

                expect(await driver.wait(until.elementLocated(By.xpath('//*[@id="slider-carousel"]/div/div[1]/div[1]/h2')), 5000).getText()).to.equal('Full-Fledged practice website for Automation Engineers');

            } catch (error) {
                console.error("❌ Test failed:", error);
            } finally {
                await driver.quit();
            }
        });

        it.only('26 Verify Scroll Up without Arrow button and Scroll Down functionality', async function () {
            driver = await new Builder().forBrowser('chrome').build();
            try {
                await driver.get('https://automationexercise.com/');
                await driver.wait(until.urlIs('https://automationexercise.com/'), 5000);
                await driver.wait(until.elementLocated(By.xpath('/html/body/div/div[2]/div[2]/div[2]/div[2]/button[1]')), 5000).click(); //accept cookies

                await driver.executeScript('window.scrollTo(0, document.body.scrollHeight);');
                await driver.sleep(800);

                expect(await driver.wait(until.elementLocated(By.xpath('//*[@id="footer"]/div[1]/div/div/div[2]/div/h2')), 5000).getText()).to.contains('SUBSCRIPTION');

                await driver.executeScript('window.scrollTo(0, 0);');
                await driver.sleep(800);

                expect(await driver.wait(until.elementLocated(By.xpath('//*[@id="slider-carousel"]/div/div[1]/div[1]/h2')), 5000).getText()).to.equal('Full-Fledged practice website for Automation Engineers');

            } catch (error) {
                console.error("❌ Test failed:", error);
            } finally {
                await driver.quit();
            }
        });

    });
})();