var zmq = require("zmq"),
    socketOut = zmq.socket("push");

socketOut.bindSync("tcp://*:5000");

var subscription = {
    "DataFullName": "TestDonnees",
    "Field": "",
    "DomainId": 0,
    "TimeLineType": "session",
    "SessionId": 1,
    "SetFileName": "",
    "SubscriptionState": "Play",
    "VisuSpeed": 0,
    "VisuWindow": {
        "dInf": 1467756000,
        "dSup": 1467842340
        },
    "Filter": ""
};

socketOut.send(JSON.stringify(subscription));