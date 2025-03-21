const { Builder, By, Key, until } = require('selenium-webdriver');

(async () => {
    const should = await import('chai').should();
        
    describe('Todo testing', function () {
        
        it('Add new to do', async function () {
            driver = await new Builder().forBrowser('chrome').build();
            await driver.get('https://todolist.james.am/#/');
            await driver.wait(until.elementLocated(By.className('new-todo')), 2000);

            const newTodoInput = await driver.findElement(By.className('new-todo'));

            newTodoInput.sendKeys('Pirma uzduotis', Key.RETURN);
            await driver.sleep(2000);

            const addedTodoItem = await driver.findElement(By.xpath("//label[text()='Pirma uzduotis']")).getText();

            addedTodoItem.should.equal('Pirma uzduotis');
            console.log('Added todo:', addedTodoItem);

            await driver.quit();
        });
    });
})();
