import { Builder, By, Key, until } from 'selenium-webdriver';

(async () => {
    describe('Todo testing', function () {
        let driver;
        it('Delete task from list', async function () {
            driver = await new Builder().forBrowser('chrome').build();
            try {
                await driver.get('https://todolist.james.am/#/');

                
            } finally {
                await driver.quit();
            }
        });
    });
});