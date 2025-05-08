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
        
    });
})();