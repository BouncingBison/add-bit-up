var math = require('mathjs');
var inquirer = require('inquirer');
var KrakenClient = require('kraken-exchange-api');
var config = require('./config.js');
var util = require('util');
var async = require('async');
var _ = require('underscore');
var kraken = new KrakenClient(config.kraken.apiKey, config.kraken.private);


var calculator = {};


calculator.value = function(err) {
    // var inputValue;



};


calculator.calculate = function(inputValue, parseToNumber) {


    var base = parseToNumber;
    var input = inputValue;

    console.log("base", base);

    console.log("input", input);

    var result = math.eval(input * base);
    console.log(input + " of Bitcoin is worth $" + result + " at this point in time.");


}



calculator.input = function() {

    var inputPrompt = {

        type: 'input',
        name: 'input',
        message: 'input the amount of Bitcoin to convert to USD'

    }

    inquirer.prompt(inputPrompt).then(answers => {


        inputValue = parseFloat(answers.input, 10);
        console.log(typeof inputValue);
        console.log(inputValue);


        this.kraken = new KrakenClient(config.kraken.apiKey, config.kraken.private);
        this.kraken.api('Ticker', { "pair": 'XXBTZUSD' }, function(error, data) {
                if (error) {
                    console.log(error);
                } else {

                    var toNumber = data.result.XXBTZUSD.a;
                    var parseToNumber = parseFloat(toNumber[0], 10);


                    // console.log("\nBitcoin is currently valued at: ", currentVal[0]);
                    calculator.calculate(inputValue, parseToNumber);

                }
            })
            // inputValue = answers.input;
    });
    // calculator.value()
    // calculator.currency().then(calculator.calculate);
}

module.exports = calculator;