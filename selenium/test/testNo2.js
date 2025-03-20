const { Builder, By, Key, until } = require('selenium-webdriver');
const should = require('chai');

describe('editing todo', function () {
    after(async function () {
        await driver.quit();
    });

    it('should edit todo', async function () {
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
        await driver.sleep(1000);

        const editableTodo = await driver.findElement(By.xpath("//ul[@class='todo-list']/li[contains(., '3 uzduotis')]"));

    })

})
