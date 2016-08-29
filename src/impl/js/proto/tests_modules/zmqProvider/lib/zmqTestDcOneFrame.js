


var zmq = require("zmq"),
    socketPull = zmq.socket("pull"),
    protoBuf = require("protobufjs");

const fs = require('fs'),
    path = require('path');



var builder = protoBuf.newBuilder();

let buildProtobuf = (builder, ...protofiles) => {
    protofiles.map( file => protoBuf.loadProtoFile(file, builder));
}

buildProtobuf(builder,  "../protobuf/NewDataMessage.proto");

var root = builder.build(["dataControllerUtils","protobuf"]);

let {NewDataMessage} = root;

    
/* TEST MAL STRING */

const getValue = (malString) => {
    value = new Buffer(malString).toString('utf8').split('\0')[0]; 
    return value;
}

const getRaw = (malString) => malString.data;


var toDataIdPb = meta => {
    
}

var JS = require("../files/reportingParameter.proto.js"); 
var ReportingParameter = JS.ReportingParameter;
var Protobuf = JS.protobuf;
var Header = require("../files/header.proto.js");

let totalSize = 0;
var onMessage = function (header,msg) {
    //MSG[0] IS MESSAGE HEADER, IGNORE IT.
    console.log(msg);
    
    //MSG[0] is now the DataId header, decode it.
    var newData = NewDataMessage.decode(msg);
    console.log(newData);
    console.log(newData.payloads[0].timestamp);
    console.log(newData.payloads[0].payload);
    var param = ReportingParameter.decode(newData.payloads[0].payload);
    console.log(param);
    
    
}

console.log("CONNECT socketIn");
let 
var port= 49165; 
var uri = 'tcp://127.0.0.1:'+port; 
console.log(uri); 
let socketConnect = socketPull.bind(uri);
socketConnect.on("message",onMessage);

function sendMessage (header, payload) {
    //console.log("Sending " + header);
    socketOut.send([header, payload]);
}

