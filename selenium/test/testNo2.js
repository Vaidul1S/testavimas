// const { Builder, By, Key, until } = require('selenium-webdriver');
// const should = require('chai');


// describe('editing todo', function () {
//     after(async function () {
//         await driver.quit();
//     });

//     it('should edit todo', async function () {
//         driver = await new Builder().forBrowser('chrome').build();
//         await driver.get('https://todolist.james.am/#/');
//         await driver.wait(until.elementLocated(By.className('new-todo')), 2000);

//         const newTodoInput = await driver.findElement(By.className('new-todo'));

//         await newTodoInput.sendKeys('1 uzduotis', Key.RETURN);
//         await newTodoInput.sendKeys('2 uzduotis', Key.RETURN);
//         await newTodoInput.sendKeys('3 uzduotis', Key.RETURN);
//         await newTodoInput.sendKeys('4 uzduotis', Key.RETURN);
//         await newTodoInput.sendKeys('5 uzduotis', Key.RETURN);
//         await newTodoInput.sendKeys('6 uzduotis', Key.RETURN);
//         await driver.sleep(2000);

//         const editableTodo = await driver.findElement(By.xpath("//ul[@class='todo-list']/li[contains(., '3 uzduotis')]"));

//         driver.actions().doubleClick(editableTodo).perform();

//         const editField = await editableTodo.findElement(By.css('input.edit'));

//         for(let i=0; i<100;i++) {
//             await editField.sendKeys(Key.BACK_SPACE);
//         };

//         await editField.sendKeys('edited todo', Key.RETURN);

//         const editedItem = await driver.findElement(By.xpath("//ul[@class='todo-list']//li[contains(., 'edited todo')]")).getText();
//         await driver.sleep(3000);

//         assert.strictEqual(editedItem, 'edited todo', 'Edit failed');
//     });

// });

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
        await driver.sleep(2000);

        const editableTodo = await driver.findElement(By.xpath("//ul[@class='todo-list']/li[contains(., '3 uzduotis')]"));
        await driver.actions().doubleClick(editableTodo).perform();

        const editField = await editableTodo.findElement(By.css('input.edit'));

        for (let i = 0; i < 50; i++) {
            await editField.sendKeys(Key.BACK_SPACE);
        }

        await editField.sendKeys('Edited todo', Key.RETURN);

        // Verify the updated todo item
        const editedItem = await driver.findElement(By.xpath("//ul[@class='todo-list']//li[contains(., 'Edited todo')]"))
                                     .getText();
        await driver.sleep(3000);

        expect(editedItem).to.equal('Edited todo', 'Edit failed');
    });
});
