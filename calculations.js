var inquirer = require('inquirer');

var start = {

    type: 'list',
    name: 'command',
    message: 'check price or do a quick calculation',
    choices: [{
        name: 'check price',
        value: 'call'
    }, {
        name: 'calculate bitcoin to USD',
        value: 'calculate'
    }]
};





var call = function() {



}


var calculate = function() {



}