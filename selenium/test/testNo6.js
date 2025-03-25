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

    

});