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

        it.only('22 Add to cart from Recommended items', async function () {
            driver = await new Builder().forBrowser('chrome').build();
            try {
                await driver.get('https://automationexercise.com/');
                await driver.wait(until.urlIs('https://automationexercise.com/'), 5000);
                await driver.wait(until.elementLocated(By.xpath('/html/body/div/div[2]/div[2]/div[2]/div[2]/button[1]')), 5000).click(); //accept cookies

                expect(await driver.findElement(By.xpath('/html/body/section[2]/div/div/div[2]/div[2]/h2')).getText()).to.equal('RECOMMENDED ITEMS');
                
                await driver.findElement(By.css('[data-product-id="5"]')).click();
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