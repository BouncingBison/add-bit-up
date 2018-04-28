var config = require('./config.js');
var inquirer = require('inquirer');
var calls = require('./calls.js');
var KrakenClient = require('kraken-exchange-api');
var exchange = require('./binance');
var calculator = require('./calculator.js');
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
    }, {
        name: 'Check Binance Balances',
        value: 'binance'
    }]
};

var processInitialAnswer = function(answers) {
    console.log(answers.command);
    switch (answers.command) {
        case 'quoting':
            var quoteChain = new Promise(function(resolve, reject) {
                // calls.price
                resolve(calls.price())
            });

            quoteChain.then(mainPrompt())

            break;
        case 'calculate':
            calculator.input();
            break;
        case 'binance':

            exchange.balance()
            exchange.tickerActivate()
                // exchange.tickerTape()
                // tickerInput()
                // tickerInput()
                // binanceStatus.ticker();
            break;
    }
};


// function tickerActivate() {

//     inquirer.prompt({
//         type: 'list',
//         name: 'decision',
//         message: 'Would you like to turn the live ticker on?',
//         choices: ['yes', 'no', 'maybe']
//     }).then(answers => {
//         var what = answers.decision;
//         if (what === 'yes') {
//             console.log("activating ticker!");
//             choices()
//         } else {
//             var quoteChain = new Promise(function(resolve, reject) {

//                 // calls.price
//                 resolve(exchange.balances())
//             });

//             quoteChain.then(mainPrompt())
//         }


//     })

// var tickerOn = {
//     type: 'list',
//     name: 'decision',
//     message: 'Would you like to turn the live ticker on?',
//     choices: ['yes', 'no', 'maybe']
// };


// }









mainPrompt()

function mainPrompt() {
    inquirer.prompt(start).then(processInitialAnswer);
}