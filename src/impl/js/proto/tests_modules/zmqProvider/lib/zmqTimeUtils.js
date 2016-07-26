var zmq = require("zmq"),
    socketOut = zmq.socket("push")

const fs = require('fs'),
    path = require('path');

function logToConsole (message) {
  console.log("[" + new Date().toLocaleTimeString() + "]" + message);
}

function sendMessage (header) {
    logToConsole("Sending " + JSON.parse(header).Timelines[0].VisuWindow.dInf + " - " + JSON.parse(header).Timelines[0].VisuWindow.dSup);
    socketOut.send(header);
}

var day = 'default';
let length = 1;
const lengthOfDay = 86400000;

//const startValue = 1467496800;
const startValue = 1420675200000;

const visuWindow = {'dInf': 0,'dSup': 0};

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
    visuWindow.dInf = startValue + days[day]*lengthOfDay;
    if (!isNaN(parseInt(process.argv[3], 10))) {
      length = parseInt(process.argv[3], 10);
    }
    visuWindow.dSup = visuWindow.dInf + length*lengthOfDay;
    if (visuWindow.dSup < visuWindow.dInf) [visuWindow.dInf, visuWindow.dSup] = [visuWindow.dSup, visuWindow.dInf];
}

console.log('DAY: '+length+' day(s) from '+day+' -> '+visuWindow.dInf+' - '+visuWindow.dSup);

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
            "VisuWindow" : visuWindow,
            "CurrentTime" : (visuWindow.dInf+visuWindow.dSup)/2
        }
    ],
    "MasterId" : 91
}


sendMessage(JSON.stringify(timelines));
