import { Builder, By, Key, until } from 'selenium-webdriver';
import { expect } from 'chai';

(async () => {
    describe('Automation exercise testing', function () {
        let driver;
        it('01 Register new user', async function () {
            driver = await new Builder().forBrowser('chrome').build();
            try {
                await driver.get('https://automationexercise.com/');
                await driver.wait(
                    until.urlIs('https://automationexercise.com/'),
                    5000
                );
                console.log("✅ Test completed successfully.");

            } catch (error) {
                console.error("❌ Test failed:", error);
            } finally {
                // Quit the browser even if the test fails
                await driver.quit();
            }
        });
    });
})();