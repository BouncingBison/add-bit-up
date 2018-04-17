var KrakenClient = require('kraken-exchange-api');
var config = require('./config.js');
var babar = require('babar');
var util = require('util');
var async = require('async');
var _ = require('underscore');
var kraken = new KrakenClient(config.apiSettings.apiKey, config.apiSettings.private);

var calls = {};


// console.log(util.inspect(calls, false, null));
// var calls = function(apiSettings) {

//     this.kraken = new KrakenClient(config.apiSettings.apiKey, config.apiSettings.private);
//     this.price = price;

//     _.bind(this, 'price');

// };

calls.price = function(err) {
    if (err) {

        console.log(err);
    } else {

        this.kraken = new KrakenClient(config.apiSettings.apiKey, config.apiSettings.private);
        this.kraken.api('Ticker', { "pair": 'XXBTZUSD' }, function(error, data) {
            if (error) {
                console.log(error);
            } else {
                var currentVal = data.result.XXBTZUSD.a;
                // console.log(util.inspect(currentVal, false, null));
                console.log("Bitcoin is currently valued at: ", currentVal[0]);
            }
        })
    }
};


// console.log(module.exports);
// console.log('====================');
// console.log(module);


module.exports = calls;
/*
<pair_name> = pair name
    a = ask array(<price>, <whole lot volume>, <lot volume>),
    b = bid array(<price>, <whole lot volume>, <lot volume>),
    c = last trade closed array(<price>, <lot volume>),
    v = volume array(<today>, <last 24 hours>),
    p = volume weighted average price array(<today>, <last 24 hours>),
    t = number of trades array(<today>, <last 24 hours>),
    l = low array(<today>, <last 24 hours>),
    h = high array(<today>, <last 24 hours>),
    o = today's opening price


    { XXBTZUSD:
   { a: [ '8062.70000', '1', '1.000' ],
     b: [ '8044.30000', '2', '2.000' ],
     c: [ '8044.30000', '3.25515163' ],
     v: [ '2211.93816559', '5553.72225429' ],
     p: [ '8211.09968', '8265.72362' ],
     t: [ 5967, 17161 ],
     l: [ '8002.80000', '8002.80000' ],
     h: [ '8429.80000', '8429.80000' ],
     o: '8363.30000' } }


*/