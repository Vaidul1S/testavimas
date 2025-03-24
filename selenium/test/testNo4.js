import { Builder, By, Key, until } from 'selenium-webdriver';
import { expect } from 'chai';

(async () => {
    describe('Todo testing', function () {
        let driver;
        it('Count active tasks', async function () {
            driver = await new Builder().forBrowser('chrome').build();
            try {
                await driver.get('https://todolist.james.am/#/');

                await driver.wait(until.elementLocated(By.className('new-todo')), 2000);

                const newTodoInput = await driver.findElement(By.className('new-todo'));
                await newTodoInput.sendKeys('1 uzduotis', Key.RETURN);
                await newTodoInput.sendKeys('2 uzduotis', Key.RETURN);
                await newTodoInput.sendKeys('3 uzduotis', Key.RETURN);
                await newTodoInput.sendKeys('4 uzduotis', Key.RETURN);

                const activeBtn = await driver.findElement(By.xpath("//ul/li[2]/a[contains(., 'active')]"));

                await activeBtn.click();

                const activeList = await driver.findElement(By.className('todo-list'));

                expect(activeList).length.to.equal(3);

            } finally {
                await driver.quit();
            }
        });
    });
})();