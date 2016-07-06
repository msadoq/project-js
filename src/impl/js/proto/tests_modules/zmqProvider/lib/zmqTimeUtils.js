var zmq = require("zmq"),
    socket = zmq.socket("push")

const fs = require('fs'),
    path = require('path');

function logToConsole (message) {
  console.log("[" + new Date().toLocaleTimeString() + "]" + message);
}

function sendMessage (header) {
    logToConsole("Sending " + JSON.parse(header).Timelines[0].VisuWindow.dInf + " - " + JSON.parse(header).Timelines[0].VisuWindow.dSup);
    socket.send(header);
}

var dateTime = new Date();

socket.bindSync("tcp://*:4000")
setInterval(function () {
    
    //var OID = "000100010100010001" + Math.floor((Math.random() * 99999999) + 1);

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
                    "dInf" : dateTime,
                    "dSup" : new Date()
                },
                "CurrentTime" : new Date()
            }
        ],
        "MasterId" : 91
    }
    
    sendMessage(JSON.stringify(timelines));
}, 50);
