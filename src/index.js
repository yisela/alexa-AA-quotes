'use strict';
var Alexa = require('alexa-sdk');

var APP_ID = undefined; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";
var SKILL_NAME = 'Evolution Facts';

/**
 * Array containing space facts.
 */
var FACTS = [
    "We have about the same number of hairs on our bodies as a chimpanzee, but ours are so fine they are almost invisible. Anything else I can help with?",
                "During the French Revolution, a theory of evolution proposed by Baptiste lamarck was used to challenge the authority of the king as well as that of the church. England, anticipating problems, made evolution a scandalous idea. Anything else I can help with?",
                "All humans originated in Africa, however migrations from the continent happened in several ocassions. The groups that left first might have very well met those that had left behind. Anything else I can help with?",
                "About 9% of humans are born without a plantaris muscle, the one in the foot our ancestors used to grip and manipulate objects. Those that have it, though, hardly use it as it has lost its ability in our species. Anything else I can help with?",
                "Some snakes have hipbones, which shows they once had four legs like their close cousins the lizards. Anything else I can help with?",
                "Birds and dinosaurs both evolved from reptiles. The closest living reptilian relation of a bird is the crocodile. Anything else I can help with?",
                "Some scientists think that the pink tissue in the corner of the human eye is a remnant of a third eye, not unlike that of birds, reptiles and fish. Anything else I can help with?",
                "Until about 10,000 years ago, most people had brown eyes. A single genetic mutation originating in the Black Sea is responsible for the current 8% of the world’s population that has blue eyes. Anything else I can help with?",
                "All humans develop a tail in the womb that eventually dissolves. Anything else I can help with?",
                "About 85% of people can't voluntarily moe their ears. It's thought that we lost this ability somewhere on the way to become the humans we are today. Anything else I can help with?",
                "About 80,000 years ago, humanity's effective population size was reduced drastically. The reasons are unknown, although hypothesis have been given for volcanic activity and interbreeding among small populations. Anything else I can help with?",
                "Belief in evolution is highest among Icelanders, with 80 per cent... and lowest in Turkey, with 24 per cent. Anything else I can help with?",
                "The phrase 'Survival of the Fittest' is not Darwin's. It was actually oined by the philosopher Herbert Spencer. Anything else I can help with?",
                "If all frog eggs were successful, we would be knee-deep in frogs within the next ten years.",
                "Around 600 million years ago, the first creatures with bones and shells began to appear. More organisms showed up during this time than any other point in history. Anything else I can help with?",
                "Humans are the least genetically diverse apes, because we all share a common origin in Africa. Anything else I can help with?",
                "Until about 250,000 years ago, homo sapiens lived alongside neanderthals. Some of their genes made it into our DNA as well. Anything else I can help with?",
                "We are still evolving, although most of our changes revolv around size size and development, and food tolerance. Anything else I can help with?",
                "The majority of DNA is junk, meaning that it does not code for aprotein. Evolution is often incomplete or inefficient. Anything else I can help with?",
                "Every single person you know or will know, descends from one East African woman who lived about 200-150,000 years ago. Anything else I can help with?",
                "Darwin never said that humans come from monkeys. His words actually quote a hairy, tailed, quadruped and probably arboreal ancestor. Anything else I can help with?",
                "Humans navigated the Indian ocean in boats and arrived to Australia about 50,000 years ago",
                "Humans share about 31% of their genes with yeast, and about 50% with bananas. Anything else I can help with?",
                "An “evolutionary response to the colour red” has been offered to explain why goalkeepers in red jerseys save more goals in penalty shoot-outs. Anything else I can help with?",
                "Goosepimples are a remnant of our evolutionary predecessors. They occur when tiny muscles around the base of each hair tense, pulling the hair more erect and making for a better insulation. The only detail is that we don't have fur, so this has no effect. Anything else I can help with?",
                "The animal most frequently mentioned in Darwin’s Origin Of Species is the pigeon. Anything else I can help with?",
                "Darwin began formulating his theory in the late 1830s, but kept it under wraps for two decades. Anything else I can help with?",
                "The platypus is a strange creature due to its early separation as a mammal from reptiles. It lays eggs but also produces milk, and it has evolved an ability to produce venom independently of its reptile ancestors. Anything else I can help with?",
                "Biological Evolution Started 3.7 Billion Years Ago, when the earliest bacteria dominated the land and the sea. Anything else I can help with?",
                "Darwin didn’t have a Eureka moment in the Galapagos islands. Rather, his ideas evolved over time, and were based on rudimentary theories about evolution that had been around for decades. Anything else I can help with?",
                "Humans' lack of hair is an adaptation to navigate shallow waters, lose heat faster in the hot savanna and reduce the number of parasites in the body. Anything else I can help with?",
                "Homo Sapiens has always used fire as a tool. Our evolution has was accompanied and augmented by it. Anything else I can help with?",
                "Hiccups might have originated in our watery ancestors. The mechanism that allows fish to push water over gills has been imperfectly rewired in mammals. This can sometimes cause spams, or hiccups. Anything else I can help with?"
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
        var speechOutput = "Here's your fact: " + randomFact;

        this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFact)
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = "You can say tell me a space fact, or, you can say exit... What can I help you with?";
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
