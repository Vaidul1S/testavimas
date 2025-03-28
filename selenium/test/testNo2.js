import { Builder, By, Key, until } from 'selenium-webdriver';
import { expect } from 'chai';

describe('Editing todo', function () {
    let driver;
    after(async function () {
        if (driver) {
            await driver.quit();
        }
    });

    it('should edit a todo item', async function () {
        driver = await new Builder().forBrowser('chrome').build();
        
        await driver.get('https://todolist.james.am/#/');
        await driver.wait(until.elementLocated(By.className('new-todo')), 2000);

        const newTodoInput = await driver.findElement(By.className('new-todo'));
        await newTodoInput.sendKeys('1 uzduotis', Key.RETURN);
        await newTodoInput.sendKeys('2 uzduotis', Key.RETURN);
        await newTodoInput.sendKeys('3 uzduotis', Key.RETURN);
        await newTodoInput.sendKeys('4 uzduotis', Key.RETURN);
        await newTodoInput.sendKeys('5 uzduotis', Key.RETURN);
        await newTodoInput.sendKeys('6 uzduotis', Key.RETURN);
        
        const editableTodo = await driver.wait(until.elementLocated(By.xpath("//ul[@class='todo-list']/li[contains(., '3 uzduotis')]")));
        await driver.actions().doubleClick(editableTodo).perform();

        const editField = await editableTodo.findElement(By.css('input.edit'));

        for (let i = 0; i < 50; i++) {
            await editField.sendKeys(Key.BACK_SPACE);
        }

        await editField.sendKeys('Edited todo', Key.RETURN);

        // Verify the updated todo item
        const editedItem = await driver.wait(until.elementLocated(By.xpath("//ul[@class='todo-list']//li[contains(., 'Edited todo')]"))).getText();
        
        expect(editedItem).to.equal('Edited todo', 'Edit failed');
    });
});
