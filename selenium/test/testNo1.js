const {Builder, By, Key, until} = require('selenium-webdriver');
const should = require('chai').should();

describe('Todo testing', function() {
    it('Add new to do', async function() {
        driver = await new Builder().forBrowser('chrome').build();
    })
})