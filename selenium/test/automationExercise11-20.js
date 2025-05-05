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

        it.only('12 Add Products in Cart', async function () {
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

        

    });
})();