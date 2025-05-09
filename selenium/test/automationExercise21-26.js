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
        
        it.only('23 Verify address details in checkout page', async function () {
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



    });
})();