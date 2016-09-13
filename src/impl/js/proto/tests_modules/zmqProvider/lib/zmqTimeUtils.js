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

var day = 'default';
let length = 1;
const lengthOfDay = 86400000;

//const startValue = 1467496800;
const startValue = 1420675200000;

const visuWindow = {'lower': 0,'upper': 0};

const days = {
    'default' : 0,
    'lu' : 1,
    'ma' : 2,
    'me' : 3,
    'je' : 4,
    've' : 5,
    'sa' : 6,
    'di' : 7
}

if (process.argv[2] in days) {
    day=process.argv[2];
    visuWindow.lower = startValue + days[day]*lengthOfDay;
    if (!isNaN(parseInt(process.argv[3], 10))) {
      length = parseInt(process.argv[3], 10);
    }
    visuWindow.upper = visuWindow.lower + length*lengthOfDay;
    if (visuWindow.upper < visuWindow.lower) [visuWindow.lower, visuWindow.upper] = [visuWindow.upper, visuWindow.lower];
}

console.log('DAY: '+length+' day(s) from '+day+' -> '+visuWindow.lower+' - '+visuWindow.upper);

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
            "visuWindow" : visuWindow,
            "CurrentTime" : (visuWindow.lower+visuWindow.upper)/2
        }
    ],
    "MasterId" : 91
}


sendMessage(JSON.stringify(timelines));
