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

    it('Count active tasks', async function () {
        await driver.get('https://todolist.james.am/#/');

        await driver.wait(until.elementLocated(By.className('new-todo')), 3000);

        const newTodoInput = await driver.findElement(By.className('new-todo'));
        await newTodoInput.sendKeys('1 uzduotis', Key.RETURN);
        await newTodoInput.sendKeys('2 uzduotis', Key.RETURN);
        await newTodoInput.sendKeys('3 uzduotis', Key.RETURN);
        await newTodoInput.sendKeys('4 uzduotis', Key.RETURN);

        const activeBtn = await driver.findElement(By.xpath("//ul/li[2]/a[contains(., 'active')]"));

        await activeBtn.click();

        const activeList = await driver.findElements(By.css('.todo-list li'));

        expect(activeList.length).to.equal(4);


    });
});
