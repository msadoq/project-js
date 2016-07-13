

var socketsIn = new Array(1,2,3,4,5);



var zmq = require("zmq"),
    socketOut = zmq.socket("push"),
    socketIn = zmq.socket("pull"),
    protoBuf = require("protobufjs");

const fs = require('fs'),
    path = require('path');







var onMessage = function (msg) {
    console.log("MESSAGE RECEIVED");
    console.log(msg);
    console.log(msg.toString('utf-8'));
    console.log(JSON.parse(msg.toString('utf-8')));
}

console.log("CONNECT socketIn");
var socketsPull = socketsIn.map(function (s) { return zmq.socket("pull")});
socketsConnected = socketsPull.map(function (s, i) {var port= 49159+i; var uri = 'tcp://127.0.0.1:'+port; console.log(uri); return s.connect(uri)});
console.log(socketsIn);
socketsConnected.map(function (s) { s.on("message", onMessage)});



