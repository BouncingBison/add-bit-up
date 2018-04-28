const inquirer = require('inquirer');
const config = require('./config.js');
const api = require('binance');
const binanceRest = new api.BinanceRest({
    key: config.binance.key, // Get this from your account on binance.com
    secret: config.binance.secret, // Same for this
    timeout: 15000, // Optional, defaults to 15000, is the request time out in milliseconds
    recvWindow: 10000, // Optional, defaults to 5000, increase if you're getting timestamp errors
    disableBeautification: false,
    handleDrift: false

});

const binanceWS = new api.BinanceWS(true); // Argument specifies whether the responses should be beautified, defaults to true
const streams = binanceWS.streams;

var exchange = {};

exchange.balance = function() {

    binanceRest.account((err, data) => {

        console.log("Current Balances are listed below")
        console.log("_______________________________________")
        console.log("                                       ")

        // console.log(data); 
        data.balances.forEach(function(item, index, array) {
            // holds the value of an assets ticker symbol
            var tickerSymbol = data.balances[index].asset;
            // holds value of balance that is locked due to open trade orders
            var lockedBalance = data.balances[index].locked;
            // holds value of balance of that is unlocked in account
            var freeBalance = data.balances[index].free;
            // string value that represents a zero balance
            var zeroBalance = '0.00000000';

            // if the locked and free balnces have a value that != 0 we want to log this to the user. 
            if (lockedBalance && freeBalance != zeroBalance) {
                console.dir("|$" + tickerSymbol + " | Free | " + freeBalance + " | Lock | " + lockedBalance + " ");
                console.log("_______________________________________")
            }
        });

        return data.balances;
        // console.log(data.balences);
    });

}

exchange.tickerActivate = function() {

    inquirer.prompt({
        type: 'list',
        name: 'decision',
        message: 'Would you like to turn the live ticker on?',
        choices: ['yes', 'no', 'maybe']
    }).then(answers => {
        var what = answers.decision;
        if (what === 'yes') {
            console.log("activating ticker!");
            choices()
        } else {
            var quoteChain = new Promise(function(resolve, reject) {

                // calls.price
                resolve(exchange.balances())
            });

            quoteChain.then(mainPrompt())
        }


        function choices() {

            inquirer.prompt({
                type: 'input',
                name: 'tickerChoice',
                message: 'input the a coins ticker symbol paired with Bitcoin (BTC) eg: `ETHBTC`',
                validate: function(value) {

                    var pass = value.match(
                        // using a regular expression to give some guidance to user inputs 
                        /^[a-zA-Z]{3,7}$/
                    );
                    if (pass) {
                        return true;
                    }
                    return 'please double check your ticker input!'
                }

            }).then(answers => {

                // this.async()
                console.log(answers.tickerChoice);
                var tickerChoices = answers.tickerChoice;

                console.log(tickerChoices);
                // tickerChoices.push(answers);
                // console.log(tickerChoices);
                exchange.tickerTape(tickerChoices)
            })

        }


    })


    // binanceWS.onUserData(binanceRest, (data) => {
    //         console.log(data);
    //     }, 6000) // Optional, how often the keep alive should be sent in milliseconds
    //     .then((ws) => {
    //         // websocket instance available here
    //         // console.log(ws);
    //     });


    exchange.tickerTape = function(tickerChoices) {

        console.log(typeof tickerChoices);

        var query = tickerChoices;


        binanceWS.onCombinedStream(query, [
                streams.ticker(query)
            ],
            (streamEvent) => {
                switch (streamEvent.stream) {
                    case streams.ticker(query):
                        console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
                        console.log('Ticker event for', streamEvent.data.symbol);
                        console.log('Current Price is', streamEvent.data.weightedAveragePrice);
                        console.log('price has changed by $', streamEvent.data.priceChange);
                        console.log('price has changed by $', streamEvent.data.priceChange);
                        console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
                        break;
                }
            }
        );

        // tickerChoices.forEach(function(item, array, index) {

        //     // the streamKey variable is the user input for the ticker functions, 


        //     query = {}
        //         // we parse the array and pull out the string value of the ticker symbol, passing it to the stream API
        //     query.symbol = "'" + item.tickerChoice + "'";

        //     console.log(typeof query.symbol);
        //     console.log(query.symbol);


        // console.log("itemmmmm", item.tickerChoice);

        // binanceWS.onCombinedStream(query.symbol, [
        //         streams.ticker(query.symbol)
        //     ],
        //     (streamEvent) => {
        //         switch (streamEvent.stream) {
        //             case streams.ticker(query.symbol):
        //                 console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        //                 console.log('Ticker event for', streamEvent.data.symbol);
        //                 console.log('Current Price is', streamEvent.data.weightedAveragePrice);
        //                 console.log('price has changed by $', streamEvent.data.priceChange);
        //                 console.log('price has changed by $', streamEvent.data.priceChange);
        //                 console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        //                 break;
        //         }
        //     }
        // );


        // });




    }

}


module.exports = exchange;