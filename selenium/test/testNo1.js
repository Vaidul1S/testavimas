// const { Builder, By, Key, until } = require('selenium-webdriver');

// (async () => {
//     const should = await import('chai').should();
        
//     describe('Todo testing', function () {
        
//         it('Add new to do', async function () {
//             driver = await new Builder().forBrowser('chrome').build();
//             await driver.get('https://todolist.james.am/#/');
//             await driver.wait(until.elementLocated(By.className('new-todo')), 2000);

//             const newTodoInput = await driver.findElement(By.className('new-todo'));

//             newTodoInput.sendKeys('Pirma uzduotis', Key.RETURN);
//             await driver.sleep(2000);

//             const addedTodoItem = await driver.findElement(By.xpath("//label[text()='Pirma uzduotis']")).getText();

//             addedTodoItem.should.equal('Pirma uzduotis');
//             console.log('Added todo:', addedTodoItem);

//             await driver.quit();
//         });
//     });
// })();

import { Builder, By, Key, until } from 'selenium-webdriver';
import { expect } from 'chai';

(async () => {
    describe('Todo testing', function () {
        let driver;

        it('Add new to-do', async function () {
            driver = await new Builder().forBrowser('chrome').build();

            try {
                // Open the Todo app
                await driver.get('https://todolist.james.am/#/');

                // Wait for the input field to be located
                const newTodoInput = await driver.wait(
                    until.elementLocated(By.className('new-todo')),
                    5000
                );

                // Add a new to-do item
                await newTodoInput.sendKeys('Pirma uzduotis', Key.RETURN);

                // Wait for the added to-do item to appear
                const addedTodoItem = await driver.wait(
                    until.elementLocated(By.xpath("//label[text()='Pirma uzduotis']")),
                    5000
                );

                // Validate that the item is added
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