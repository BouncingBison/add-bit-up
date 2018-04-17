var config = require('./config.js');
var inquirer = require('inquirer');
var calls = require('./calls.js');
var KrakenClient = require('kraken-exchange-api');
// var kraken = new KrakenClient(config.apiSettings.apiKey, config.apiSettings.private);
// initialize modules 
// var caller = new calls('price', config.apiSettings);

// var start = {
//     type: 'list',
//     name: 'command',
//     message: 'check price or do a quick calculation',
//     choices: [{
//         name: 'check price',
//         value: 'call'
//     }, {
//         name: 'calculate bitcoin to USD',
//         value: 'calculate'
//     }]
// };


var grab = function() {
    calls.price()
}

grab()

// var calculate = function() {



// }