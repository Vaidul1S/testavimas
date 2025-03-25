import { Builder, By, Key, until } from 'selenium-webdriver';
import { expect } from 'chai';


describe('Todo testing', function () {
    let driver;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async function () {
        await driver.quit();
    });

    it('Count completed tasks', async function () {
        await driver.get('https://todolist.james.am/#/');

        await driver.wait(until.elementLocated(By.className('new-todo')), 3000);

        const newTodoInput = await driver.findElement(By.className('new-todo'));
        await newTodoInput.sendKeys('1 uzduotis', Key.RETURN);
        await newTodoInput.sendKeys('2 uzduotis', Key.RETURN);
        await newTodoInput.sendKeys('3 uzduotis', Key.RETURN);
        await newTodoInput.sendKeys('4 uzduotis', Key.RETURN);

        const todoCheckboxes = await driver.findElements(By.css('.todo-list .toggle'));
        if (todoCheckboxes.length > 0) {
            await todoCheckboxes[0].click(); 
            await todoCheckboxes[1].click(); 
            await todoCheckboxes[2].click(); 
        }

        const completedBtn = await driver.findElement(By.xpath("//ul/li[3]/a[contains(., 'Completed')]"));

        await completedBtn.click();

        const completedList = await driver.findElements(By.css('.todo-list li'));

        expect(completedList.length).to.equal(3);

    });
});