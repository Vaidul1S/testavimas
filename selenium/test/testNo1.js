const {Builder, By, Key, until} = require('selenium-webdriver');
// import { expect } from 'chai';
// const assert = require('assert'); -- neveikia, cia to grybo paistalai


describe('Todo testing', function() {
    it('Add new to do', async function() {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('https://todolist.james.am/#/');
        await driver.wait(until.elementLocated(By.className('new-todo')),2000);

        const newTodoInput = await driver.findElement(By.className('new-todo'));

        newTodoInput.sendKeys('Pirma uzduotis', Key.RETURN);
        
        const addedTodoItem = await driver.findElement(By.xpath("//li[contains(text()='Pirma uzduotis')]"))

        await driver.sleep(2000);

        await driver.quit();
    });
});
