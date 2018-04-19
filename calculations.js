var config = require('./config.js');
var inquirer = require('inquirer');
var calls = require('./calls.js');
var KrakenClient = require('kraken-exchange-api');
// var kraken = new KrakenClient(config.kraken.apiKey, config.kraken.private);
// initialize modules 
// var caller = new calls('price', config.apiSettings);



var start = {
    type: 'list',
    name: 'command',
    message: 'check price or do a quick calculation',
    choices: [{
        name: 'check price',
        value: 'quoting'
    }, {
        name: 'calculate bitcoin to USD',
        value: 'calculate'
    }]
};

var processInitialAnswer = function(answers) {
    console.log(answers.command);
    switch (answers.command) {
        case 'quoting':
            calls.price()
            break;
        case 'calculate':
            calculate();
            break;

    }
};



mainPrompt()

function mainPrompt() {
    inquirer.prompt(start).then(processInitialAnswer);
}


// var grab = function() {

// }


var calculate = function() {

    console.log('hey there');

}