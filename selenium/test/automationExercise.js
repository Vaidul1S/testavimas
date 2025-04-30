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

                await driver.findElement(By.linkText('Delete Account')).click();
                const confirmTest = await driver.wait(until.elementLocated(By.xpath("//*[contains(text(),'Account Deleted!')]")), 5000).getText();

                expect(confirmTest).to.equal('ACCOUNT DELETED!');

            } catch (error) {
                console.error("❌ Test failed:", error);
            } finally {
                // Quit the browser even if the test fails
                await driver.quit();
            }
        });
    });
})();