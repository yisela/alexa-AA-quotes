'use strict';
var Alexa = require('alexa-sdk');

var APP_ID = undefined; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";
var SKILL_NAME = 'AA Quotes';

/**
 * Array containing space facts.
 */
var FACTS = [
    "I have found that the process of discovering who I really am begins with knowing who I really don't want to be. Anything else I can help with?",
    "When I stopped living in the problem and began living in the answer, the problem went away. Anything else I can help with?",
    "It will take time to clear away the wreck. Though old buildings will eventually be replaced by finer ones, the new structures will take years to complete. Anything else I can help with?",
    "One day at a time. Anything else I can help with?",
    " Anything else I can help with?",
    " Anything else I can help with?",
    " Anything else I can help with?",
    " Anything else I can help with?",
    " Anything else I can help with?",
    " Anything else I can help with?",
    " Anything else I can help with?",
    " Anything else I can help with?",
    " Anything else I can help with?",
    " Anything else I can help with?",
    " Anything else I can help with?",
    " Anything else I can help with?",
    " Anything else I can help with?",
    " Anything else I can help with?",
    " Anything else I can help with?",
    " Anything else I can help with?",
    " Anything else I can help with?",
    " Anything else I can help with?",
    " Anything else I can help with?",
    " Anything else I can help with?",
    " Anything else I can help with?",
    " Anything else I can help with?",
    " Anything else I can help with?",
    " Anything else I can help with?",
    " Anything else I can help with?",
    " Anything else I can help with?",
    " Anything else I can help with?",
];

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        // Get a random evolution fact from the Evolution facts list
        var factIndex = Math.floor(Math.random() * FACTS.length);
        var randomFact = FACTS[factIndex];

        // Create speech output
        var speechOutput = "Here's your quote: " + randomFact;

        this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFact)
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = "You can say tell me an AA quote, or, you can say exit... What can I help you with?";
        var reprompt = "What can I help you with?";
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Goodbye!');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Goodbye!');
    }
};
