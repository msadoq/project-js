var zmq = require("zmq"),
    socketOut = zmq.socket("push")

const fs = require('fs'),
    path = require('path');

function logToConsole (message) {
  console.log("[" + new Date().toLocaleTimeString() + "]" + message);
}

function sendMessage (header) {
    logToConsole("Sending " + JSON.parse(header).Timelines[0].visuWindow.lower + " - " + JSON.parse(header).Timelines[0].visuWindow.upper);
    socketOut.send(header);
}

var mode = 'none';

modes = {
    'play' : 'play',
    'follow' : 'follow'
}

lower = 1438412400000;
upper = 1438412460000;
MAX = 1438413000000

if (process.argv[2] in modes) {
    mode=process.argv[2];
}

console.log('MODE: '+mode);

socketOut.bind("tcp://*:4242");

var timelines = {
    "Timelines" : [
        {
            "TimelineId" : 7,
            "TimelineName" : "Foo",
            "DomainId" : 1,
            "TimelineType" : "dataset",
            "SessionId" : 42,
            "SetFileName" : "Bar",
            "SubscriptionState" : "Play",
            "VisuSpeed" : 50,
            "visuWindow" : {
                "lower" : lower,
                "upper" : upper
            },
            "CurrentTime" : (lower+upper)/2
        }
    ],
    "MasterId" : 91
}

var i=0;
var tf = 0;
var OFFSET=1000;

if (mode != 'none') {
    var sendToSM = setInterval(function () {

        switch(mode) {
            case "play":
                timelines.Timelines[0].visuWindow.lower = lower+i*OFFSET;
                timelines.Timelines[0].visuWindow.upper = upper+i*OFFSET;
                timelines.Timelines[0].CurrentTime = i*OFFSET+(lower+upper)/2;
                break;
            case "follow":
                if ((i*OFFSET+(lower+upper)/2) > upper) {
                    tf = tf + 1;
                    timelines.Timelines[0].visuWindow.lower = lower+tf*OFFSET;
                    timelines.Timelines[0].visuWindow.upper = upper+tf*OFFSET;
                }
                timelines.Timelines[0].CurrentTime = i*OFFSET+(lower+upper)/2;
                break;
            default:
                clearInterval(sendToSM);
                break;
        }

        sendMessage(JSON.stringify(timelines));

        i = i + 1;

        if (i*OFFSET > (MAX-upper)) {
            clearInterval(sendToSM);
        }

    }, 50);
}
