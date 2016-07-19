

var socketsIn = new Array(1,2,3,4,5);



var zmq = require("zmq"),
    socketOut = zmq.socket("push"),
    socketIn = zmq.socket("pull"),
    protoBuf = require("protobufjs");

const fs = require('fs'),
    path = require('path');



socketOut.bind("tcp://127.0.0.1:3000");

/* TEST MAL STRING */

const getValue = (malString) => {
    let value = null;
   /* if (getRaw(malString) != null) {*/
        value = new Buffer(malString).toString('utf8').split('\0')[0]; 
    /*}*/
    return value;
}

const getRaw = (malString) => malString.data;

/*const truc = {"type":"Buffer","data":[123,10,32,32,32,32,34,99,97,116,97,108,111,103,34,58,32,34,82,101,112,111,114,116,105,110,103,34,44,10,32,32,32,32,34,102,117,108,108,68,97,116,97,73,100,34,58,32,34,82,101,112,111,114,116,105,110,103,46,65,84,84,95,66,67,95,83,84,82,49,86,79,76,84,65,71,69,60,82,101,112,111,114,116,105,110,103,80,97,114,97,109,101,116,101,114,62,46,114,97,119,86,97,108,117,101,34,44,10,32,32,32,32,34,111,105,100,34,58,32,34,48,48,48,50,48,48,48,50,48,49,48,48,99,52,48,48,48,49,48,48,48,48,48,48,48,48,48,48,48,48,48,51,51,102,34,44,10,32,32,32,32,34,112,97,114,97,109,101,116,101,114,34,58,32,34,65,84,84,95,66,67,95,83,84,82,49,86,79,76,84,65,71,69,34,44,10,32,32,32,32,34,115,101,115,115,105,111,110,34,58,32,49,44,10,32,32,32,32,34,116,105,109,101,115,116,97,109,112,34,58,32,49,52,51,57,56,51,56,57,57,49,51,49,48,44,10,32,32,32,32,34,116,121,112,101,34,58,32,34,82,101,112,111,114,116,105,110,103,80,97,114,97,109,101,116,101,114,34,10,125,10]}

console.log("TRUC:");
console.log(truc);
console.log("TRUC TYPE:");
console.log(typeof truc);
const trucValue = getValue(truc);
console.log("TRUC VALUE:");
console.log(trucValue);
console.log("TRUC TYPE:");
console.log(typeof trucValue);*/

/* END TEST MAL STRING */

var onMessage = function (header, meta, payload) {
    console.log("MESSAGE RECEIVED");
    console.log("HEADER: "+header);
    console.log("META:");
    console.log(meta);
    console.log("META JSON:");
    const metaJson = getValue(meta);
    console.log(metaJson);
    console.log("PAYLOAD: "+payload);
    sendMessage(metaJson,payload);
}

console.log("CONNECT socketIn");
var socketsPull = socketsIn.map(function (s) { return zmq.socket("pull")});
socketsConnected = socketsPull.map(function (s, i) {var port= 49159+i; var uri = 'tcp://127.0.0.1:'+port; console.log(uri); return s.connect(uri)});
console.log(socketsIn);
socketsConnected.map(function (s) { s.on("message", onMessage)});

function sendMessage (header, payload) {
    //console.log("Sending " + header);
    socketOut.send([header, payload]);
}

