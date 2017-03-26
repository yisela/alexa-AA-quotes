'use strict';
var Alexa = require('alexa-sdk');

var APP_ID = undefined; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";
var SKILL_NAME = 'AA Quotes';

/**
 * Array containing space facts.
 */
var FACTS = [
    "Pain is the touchstone of spiritual growth. Anything else I can help with?",
    "Happiness is appreciating what you have, not getting what you want. Anything else I can help with?",
    "Remember: It's ok to look back but don't stare. Anything else I can help with?",
    "Alcoholic drinking's three stages: impulsive, compulsive, repulsive. Anything else I can help with?",
    "Those who abandon their dreams will discourage yours. Anything else I can help with?",
    "We can no longer be content with just getting by. Anything else I can help with?",
    "I spent a lifetime in hell and it only took me twelve steps to get to heaven. Anything else I can help with?",
    "Would you like to be right or happy? Anything else I can help with?",
    "We came to these rooms not because we drank a lot, but because we drank too much. Anything else I can help with?",
    "Serenity is not the absence of conflict, but the ability to cope with it. Anything else I can help with?",
    "Minds are like parachutes. They only function when they are open. Anything else I can help with?",
    "The longer I'm sober, the drunker I was. Anything else I can help with?",
    "Yesterday is history, tomorrow's a mystery, and today is a gift! Anything else I can help with?",
    "We have good news and bad news here. The good news is you never have to drink again even if you want to. The bad news is that we're your new friends. Anything else I can help with?",
    "No Suffer, No Growth. Anything else I can help with?",
    "Sobriety is its own reward. Anything else I can help with?",
    "To thine own self be true. Anything else I can help with?",
    "It's not what I know in recovery that keeps me sober. It's what I Do that keeps me sober. Anything else I can help with?",
    "I searched for the enemy that I could not see, when I looked in the mirror the enemy was me. Anything else I can help with?",
    "If the path you are on has no obstacles, then it probably doesn't lead anywhere. Anything else I can help with?",
    "It works if you work it, so work it cause you are worth it. Anything else I can help with?",
    "The first drink gets you drunk. Anything else I can help with?",
    "I sought my soul but could no seek. I sought my God but he eluded me. then I sought my brother and found all three. Anything else I can help with?",
    "We must become the change we want to see. Anything else I can help with?",
    "By changing attitudes and finding solutions through our own program of recovery, we can regain our sense of hope, serenity, freedom, and joy. Anything else I can help with?",
    "You know you'll be back, so why don't you just stay? Anything else I can help with?",
    "Alcohol gave me wings and then slowly took away my sky. Anything else I can help with?",
    "Negativity is my disease asking me to come out and play. Anything else I can help with?",
    "Anything an alcoholic lets go of has claw marks all over it. Anything else I can help with?",
    "You can live a perfectly normal life, as soon as you realize your life will never be perfectly normal. Anything else I can help with?",
    "Love is less a feeling than a thousand tiny acts of kindness. Anything else I can help with?",
    "I only drank on special occasions, like the grand opening of a pack of cigarettes. Anything else I can help with?",
    "Where ever you go, there you are! Anything else I can help with?",
    "We are not failing as long as we are trying. Anything else I can help with?",
    "Today is a gift; that's why it's called the present. Anything else I can help with?",
    "Expectations are resentments waiting to happen. Anything else I can help with?",
    "I have found that the process of discovering who I really am begins with knowing who I really don't want to be. Anything else I can help with?",
    "When I stopped living in the problem and began living in the answer, the problem went away. Anything else I can help with?",
    "It will take time to clear away the wreck. Though old buildings will eventually be replaced by finer ones, the new structures will take years to complete. Anything else I can help with?",
    "One day at a time. Anything else I can help with?",
    "The feeling of having shared in a common peril is one element in the powerful cement which binds us. Anything else I can help with?",
    "There is an island of opportunity in the middle of every difficulty. Anything else I can help with?",
    "If we were to live, we had to be free of anger. Anything else I can help with?",
    "To be vital, faith must be accompanied by self sacrifice and unselfish, constructive action. Anything else I can help with?",
    "We cannot subscribe to the belief that this life is a vale of tears, though it once was just that for many of us. But it is clear that we make our own misery Anything else I can help with?",
    "Rationalization is giving a socially acceptable reason for socially unacceptable behavior, and socially unacceptable behavior is a form of insanity. Anything else I can help with?",
    "Almost none of us liked the self-searching, the leveling of our pride, the confession of shortcomings which the process requires for its successful consummation. Anything else I can help with?",
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
