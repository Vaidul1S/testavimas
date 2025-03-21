import { Builder, By, Key, until } from 'selenium-webdriver';
import { expect } from 'chai';

(async () => {
    describe('Todo testing', function () {
        let driver;
        it('Add new to-do', async function () {
            driver = await new Builder().forBrowser('chrome').build();
            try {
                await driver.get('https://todolist.james.am/#/');

                const newTodoInput = await driver.wait(
                    until.elementLocated(By.className('new-todo')),
                    5000
                );
                await newTodoInput.sendKeys('Pirma uzduotis', Key.RETURN);
                const addedTodoItem = await driver.wait(
                    until.elementLocated(By.xpath("//label[text()='Pirma uzduotis']")),
                    5000
                );

                const addedTodoText = await addedTodoItem.getText();
                expect(addedTodoText).to.equal('Pirma uzduotis');
                console.log('Added to-do:', addedTodoText);
            } finally {
                // Quit the browser even if the test fails
                await driver.quit();
            }
        });
    });
})();