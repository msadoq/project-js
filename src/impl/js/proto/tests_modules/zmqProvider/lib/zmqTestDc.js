

var socketsIn = new Array(1,2,3,4,5);



var zmq = require("zmq"),
    socketOut = zmq.socket("push"),
    socketIn = zmq.socket("pull"),
    protoBuf = require("protobufjs");

const fs = require('fs'),
    path = require('path');


var builder = protoBuf.loadProtoFile("../protobuf/DataId.proto"),
    pb = builder.build(["dataControllerUtils","protobuf"]),
    DataId = pb.DataId;
    
/* TEST MAL STRING */

const getValue = (malString) => {
    value = new Buffer(malString).toString('utf8').split('\0')[0]; 
    return value;
}

const getRaw = (malString) => malString.data;


var toDataIdPb = meta => {
    
}

let totalSize = 0;
var onMessage = function (...msg) {
    //MSG[0] IS MESSAGE HEADER, IGNORE IT.
    msg.splice(0,1);
    
    //MSG[0] is now the DataId header, decode it.
    var did = DataId.decode(new Buffer(msg[0]));
    console.log(did);
    msg.splice(0,1); //remove DataId header from msg
    
    console.log("MESSAGE LENGTH " ,msg.length);
    totalSize+= msg.length;
    console.log("TOTAL LENGTH " ,totalSize);
    //msg is now as follow : [payload1, ts1, payload2, ts2 ,  ...] 
    let treatMsg = (msg) => {
        if (msg.length > 1){
                
                let payloadTimestamp = msg.splice(0,2);
                let ts =  payloadTimestamp[0];
                let payload = payloadTimestamp[1];
                treatMsg(msg);
        }
    }
    
    //get all payload and associated timestamp.
    treatMsg(msg);   
}

console.log("CONNECT socketIn");
let socketPull = zmq.socket("pull");
var port= 49165; 
var uri = 'tcp://127.0.0.1:'+port; 
console.log(uri); 
let socketConnect = socketPull.bind(uri);
socketConnect.on("message",onMessage);

function sendMessage (header, payload) {
    //console.log("Sending " + header);
    socketOut.send([header, payload]);
}

