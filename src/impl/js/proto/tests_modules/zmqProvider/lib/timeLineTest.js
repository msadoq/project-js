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

var mode = 'none';

modes = {
    'play' : 'play',
    'follow' : 'follow'
}

dInf = 1467583200;
dSup = 1467669600;
MAX = 1467842340

if (process.argv[2] in modes) {
    mode=process.argv[2];
}

console.log('MODE: '+mode);

socketOut.bindSync("tcp://*:4242");

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
            "VisuWindow" : {
                "dInf" : dInf,
                "dSup" : dSup
            },
            "CurrentTime" : (dInf+dSup)/2
        }
    ],
    "MasterId" : 91
}

var i=0;
var tf = 0;
var OFFSET=3600;

if (mode != 'none') {
    var sendToSM = setInterval(function () {        
        
        switch(mode) {
            case "play":
                timelines.Timelines[0].VisuWindow.dInf = dInf+i*OFFSET;
                timelines.Timelines[0].VisuWindow.dSup = dSup+i*OFFSET;
                timelines.Timelines[0].CurrentTime = i*OFFSET+(dInf+dSup)/2;
                break;
            case "follow":
                if ((i*OFFSET+(dInf+dSup)/2) > dSup) {
                    tf = tf + 1;
                    timelines.Timelines[0].VisuWindow.dInf = dInf+tf*OFFSET;
                    timelines.Timelines[0].VisuWindow.dSup = dSup+tf*OFFSET; 
                }
                timelines.Timelines[0].CurrentTime = i*OFFSET+(dInf+dSup)/2;
                break;
            default:
                clearInterval(sendToSM);
                break;
        }
        
        sendMessage(JSON.stringify(timelines));
        
        i = i + 1;
        
        if (i*OFFSET > (MAX-dSup)) {
            clearInterval(sendToSM);
        }
        
    }, 50);
}


