import { Builder, By, Key, until } from 'selenium-webdriver';
import { expect } from 'chai';

(async () => {
    describe('Automation exercise testing 11-20', function () {
        let driver;

        it.only('11 Verify Subscription in Cart page', async function () {
            driver = await new Builder().forBrowser('chrome').build();
            try {
                await driver.get('https://automationexercise.com/');
                await driver.wait(until.urlIs('https://automationexercise.com/'), 5000);
                await driver.wait(until.elementLocated(By.xpath('/html/body/div/div[2]/div[2]/div[2]/div[2]/button[1]')), 5000).click(); //accept cookies

                await driver.findElement(By.css('input#susbscribe_email')).sendKeys('bebras666@gmail.com');
                await driver.findElement(By.css('#subscribe')).click();

                expect(await driver.findElement(By.css('div.alert-success')).getText()).to.equal('You have been successfully subscribed!');

            } catch (error) {
                console.error("❌ Test failed:", error);
            } finally {
                await driver.quit();
            }
        });



    });
})();