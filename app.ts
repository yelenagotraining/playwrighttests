
const fs = require('fs');
const yaml = require('js-yaml');
const core = require('@actions/core');
const github = require('@actions/github');
import  {Action, ObservabilityFile} from '/Users/aa919842/Documents/source/playwrighttests/Models/observability'

// const raw = fs.readFileSync("./observability.yaml");
// const data = yaml.load(raw);
//core.getInput()
let line: string = '';
const requireConfig = "require('dotenv').config();"
appendToTestFile(requireConfig);
const playwrightlib = "const { test, expect } = require('@playwright/test');"
appendToTestFile(playwrightlib);

try {
    let fileContents = fs.readFileSync('./observability.test.yaml', 'utf8');
    
    const data = yaml.load(fileContents);

   
    let observabilityInput: ObservabilityFile  = data;
    let testActions: Action[] = observabilityInput.tests[0].actions;
    console.log(observabilityInput.tests[0].actions.length);
    //get actions for first test
    for (let test in observabilityInput.tests){
      appendToTestFile(`test.describe('${observabilityInput.tests[test].name}',() => {`);
      appendToTestFile(`test('${observabilityInput.tests[test].name}', async ({ page }) => {`);
        testActions =  observabilityInput.tests[test].actions
        
    }
    //build playwright commands
    for (let testAction in testActions){
        if(testActions[testAction].action.actioncpeform === 'navigate'){
            const pagenavigate = `await page.goto('${testActions[testAction].action.url}');`
            appendToTestFile(pagenavigate);
        } else if(testActions[testAction].action.actioncpeform === 'click'){
            const actionwrite = `await page.locator('${testActions[testAction].action.locators[0].locator}').click();`
            appendToTestFile(actionwrite);
        }else if(testActions[testAction].action.actioncpeform === 'keystrokes'){
            const actionwrite = `await page.locator('${testActions[testAction].action.locators[0].locator}').fill('${testActions[testAction].action.text}');`
            appendToTestFile(actionwrite);
        }
      
    }
   
    appendToTestFile( "}); });");
    
    fs.writeFileSync('obstoyaml.json', JSON.stringify(observabilityInput, null, 2));
    // fs.appendFileSync("obstoyaml.json",data , function(err,file) {
    //     if(err) throw err;
       
    // })

} catch (e) {
    console.log(e);
}


function appendToTestFile(data) {
    line += data + '\n';
}

fs.writeFileSync("./tests/synthnewtesta.spec.js", line, function(err,file){
    if(err) throw err;
})

console.log(line)

