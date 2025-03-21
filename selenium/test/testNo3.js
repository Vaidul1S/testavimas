import { Builder, By, Key, until } from 'selenium-webdriver';

(async () => {
    describe('Todo testing', function () {
        let driver;
        it('Delete task from list', async function () {
            driver = await new Builder().forBrowser('chrome').build();
            try {
                await driver.get('https://todolist.james.am/#/');

                const todoInput = await driver.wait(
                    until.elementLocated(By.className('new-todo')),
                    5000
                );
                await todoInput.sendKeys('Trinama uzduotis', Key.RETURN);
                const addedTodoItem = await driver.wait(
                    until.elementLocated(By.xpath("//label[text()='Trinama uzduotis']")),
                    5000
                );

                await addedTodoItem.click();
                const deleteButton = await driver.wait(
                    until.elementLocated(By.css('button.destroy')),
                    5000
                );
                await deleteButton.click();

                const itemDeleted = await driver.findElements(By.xpath("//label[text()='Trinama uzduotis']"));
                if (!itemDeleted) {
                    console.log('Item successfully deleted.');
                } else {
                    console.log('Failed to delete the item.');
                }

            } finally {
                await driver.quit();
            }
        });
    });
})();