var zmq = require("zmq"),
    socketOut = zmq.socket("push"),
    protoBuf = require("protobufjs");

const fs = require('fs'),
    path = require('path');

function logToConsole (message) {
  console.log("[" + new Date().toLocaleTimeString() + "]" + message);
}

function sendMessage (header, payload) {
    logToConsole("Sending " + header);
    socketOut.send([header, payload]);
}

console.log("binding tcp://127.0.0.1:5040");

socketOut.connect("tcp://127.0.0.1:5040");

console.log("bound tcp://127.0.0.1:5040");
var toSend = {};
toSend["toto"] = "titi";

socketOut.send(JSON.stringify(toSend));
var toSend2 = {}
toSend2["toto"] = "grosminet";

console.log("sent ", toSend, toSend2);
socketOut.send(JSON.stringify(toSend2));

/*socketIn.connect('tcp://127.0.0.1:4000');*/
