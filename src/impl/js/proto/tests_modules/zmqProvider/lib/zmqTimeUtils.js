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

days = {
    'default' : {'dInf': 1438412400000,'dSup': 1438413000000},
    'lu' : {'dInf': 1467583200,'dSup': 1467669600},
    'ma' : {'dInf': 1467669600,'dSup': 1467756000},
    'me' : {'dInf': 1467756000,'dSup': 1467842340},
    'luma' : {'dInf': 1467583200,'dSup': 1467756000},
    'mame' : {'dInf': 1467669600,'dSup': 1467842340},
    'lume' : {'dInf': 1467583200,'dSup': 1467842340}
}

if (process.argv[2] in days) {
    day=process.argv[2];
}

console.log('DAY: '+day+' -> '+days[day].dInf+' - '+days[day].dSup);

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
            "VisuWindow" : {
                "dInf" : days[day].dInf,
                "dSup" : days[day].dSup
            },
            "CurrentTime" : (days[day].dInf+days[day].dSup)/2
        }
    ],
    "MasterId" : 91
}


sendMessage(JSON.stringify(timelines));
