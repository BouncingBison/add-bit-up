const config = require('./config.js');
const api = require('binance');
const binanceRest = new api.BinanceRest({
    key: config.binance.key, // Get this from your account on binance.com
    secret: config.binance.secret, // Same for this
    timeout: 15000, // Optional, defaults to 15000, is the request time out in milliseconds
    recvWindow: 10000, // Optional, defaults to 5000, increase if you're getting timestamp errors
    disableBeautification: false,
    /*
     * Optional, default is false. Binance's API returns objects with lots of one letter keys.  By
     * default those keys will be replaced with more descriptive, longer ones.
     */
    handleDrift: false
        /* Optional, default is false.  If turned on, the library will attempt to handle any drift of
         * your clock on it's own.  If a request fails due to drift, it'll attempt a fix by requesting
         * binance's server time, calculating the difference with your own clock, and then reattempting
         * the request.
         */
});

const binanceWS = new api.BinanceWS(true); // Argument specifies whether the responses should be beautified, defaults to true
const streams = binanceWS.streams;

// You can use promises
// binanceRest.allOrders({
//         symbol: 'BNBBTC' // Object is transformed into a query string, timestamp is automatically added
//     })
//     .then((data) => {
//         console.log(data);
//     })
//     .catch((err) => {
//         console.error(err);
//     });

/*
 * Or you can provide a callback.  Also, instead of passing an object as the query, routes
 * that only mandate a symbol, or symbol and timestamp, can be passed a string.
// //  */
// binanceRest.allOrders('BNBBTC', (err, data) => {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log(data);
//     }
// });


binanceRest.account((err, data) => {
    // if (err) {
    //     console.error(err);
    // } else {
    //     console.log(data.balances);
    // }
    if (data.balances) {
        console.log(data);
    } else {
        console.log("condition has not been met");
    }
});
/*
 * WebSocket API
 *
 * Each call to onXXXX initiates a new websocket for the specified route, and calls your callback with
 * the payload of each message received.  Each call to onXXXX returns the instance of the websocket
 * client if you want direct access(https://www.npmjs.com/package/ws).
 */

// binanceWS.onDepthUpdate('BNBBTC', (data) => {
//     console.log(data);
// });

// binanceWS.onAggTrade('BNBBTC', (data) => {
//     console.log(data);
// });

// binanceWS.onKline('BNBBTC', '1m', (data) => {
//     console.log(data);
// });

/*
 * You can use one websocket for multiple streams.  There are also helpers for the stream names, but the
 * documentation has all of the stream names should you want to specify them explicitly.
 */

binanceWS.onUserData(binanceRest, (data) => {
        console.log(data);
    }, 6000) // Optional, how often the keep alive should be sent in milliseconds
    .then((ws) => {
        // websocket instance available here
        // console.log(ws);
    });

// binanceWS.onCombinedStream([
//         streams.depth('BNBBTC'),
//         streams.kline('BNBBTC', '5m'),
//         streams.trade('BNBBTC'),
//         streams.ticker('BNBBTC')
//     ],
//     (streamEvent) => {
//         switch (streamEvent.stream) {
//             case streams.depth('BNBBTC'):
//                 console.log('Depth event, update order book\n', streamEvent.data);
//                 break;
//             case streams.kline('BNBBTC', '5m'):
//                 console.log('Kline event, update 5m candle display\n', streamEvent.data);
//                 break;
//             case streams.trade('BNBBTC'):
//                 console.log('Trade event, update trade history\n', streamEvent.data);
//                 break;
//             case streams.ticker('BNBBTC'):
//                 console.log('Ticker event, update market stats\n', streamEvent.data);
//                 break;
//         }
//     }
// );

/*
 * onUserData requires an instance of BinanceRest in order to make the necessary startUserDataStream and
 * keepAliveUserDataStream calls.  The webSocket instance is returned by promise rather than directly
 * due to needing to request a listenKey from the server first.
 */


// binanceWS.account((err, data) => {
//     console.log(data);
// })