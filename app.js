"use strict";
exports.__esModule = true;
var fs = require('fs');
var yaml = require('js-yaml');
var core = require('@actions/core');
var github = require('@actions/github');
// const raw = fs.readFileSync("./observability.yaml");
// const data = yaml.load(raw);
//core.getInput()
var line = '';
var requireConfig = "require('dotenv').config();";
appendToTestFile(requireConfig);
var playwrightlib = "const { test, expect } = require('@playwright/test');";
appendToTestFile(playwrightlib);
try {
    var fileContents = fs.readFileSync('./observability.test.yaml', 'utf8');
    var data = yaml.load(fileContents);
    var observabilityInput = data;
    var testActions = observabilityInput.tests[0].actions;
    console.log(observabilityInput.tests[0].actions.length);
    //get actions for first test
    for (var test in observabilityInput.tests) {
        appendToTestFile("test.describe('".concat(observabilityInput.tests[test].name, "',() => {"));
        appendToTestFile("test('".concat(observabilityInput.tests[test].name, "', async ({ page }) => {"));
        testActions = observabilityInput.tests[test].actions;
    }
    //build playwright commands
    for (var testAction in testActions) {
        if (testActions[testAction].action.actioncpeform === 'navigate') {
            var pagenavigate = "await page.goto('".concat(testActions[testAction].action.url, "');");
            appendToTestFile(pagenavigate);
        }
        else if (testActions[testAction].action.actioncpeform === 'click') {
            var actionwrite = "await page.locator('".concat(testActions[testAction].action.locators[0].locator, "').click();");
            appendToTestFile(actionwrite);
        }
        else if (testActions[testAction].action.actioncpeform === 'keystrokes') {
            var actionwrite = "await page.locator('".concat(testActions[testAction].action.locators[0].locator, "').fill('").concat(testActions[testAction].action.text, "');");
            appendToTestFile(actionwrite);
        }
    }
    appendToTestFile("}); });");
    fs.writeFileSync('obstoyaml.json', JSON.stringify(observabilityInput, null, 2));
    // fs.appendFileSync("obstoyaml.json",data , function(err,file) {
    //     if(err) throw err;
    // })
}
catch (e) {
    console.log(e);
}
function appendToTestFile(data) {
    line += data + '\n';
}
fs.writeFileSync("./tests/synthnewtesta.spec.js", line, function (err, file) {
    if (err)
        throw err;
});
console.log(line);
