


var zmq = require("zmq"),
    socketPull = zmq.socket("pull"),
    protoBuf = require("protobufjs");

const fs = require('fs'),
    path = require('path');




var builder = protoBuf.newBuilder();

const { join } = require('path');
let buildProtobuf = (builder, ...protofiles) => {
    protofiles.map( file => protoBuf.loadProtoFile({
      root: join(__dirname, '../../../../../../../GPCCHS_D_SVR/src/impl/js/server/lib/protobuf/proto/dc'),
      file,
    }, builder));
}

buildProtobuf(builder,  "dataControllerUtils/NewDataMessage.proto");

var root = builder.build("dataControllerUtils");

let {NewDataMessage} = root.protobuf;


var JS = require("../files/reportingParameter.proto.js"); 
var ReportingParameter = JS.ReportingParameter;
var Protobuf = JS.protobuf;
var Header = require("../files/header.proto.js");

var onMessage = function (header,msg) {
    //MSG[0] IS MESSAGE HEADER, IGNORE IT.
    console.log(msg);
    
    //MSG[0] is now the DataId header, decode it.
    var newData = NewDataMessage.decode(msg);
    console.log(newData.dataId);
    newData.payloads.forEach( p => { 
        var param = ReportingParameter.decode(p.payload);
        var timestamp = p.timestamp;
        console.log(param); //deserialized param occurence
        console.log(timestamp); //Long
    });
    
    
    
}

console.log("CONNECT socketIn");

var port= 49165; 
var uri = 'tcp://127.0.0.1:'+port; 
console.log(uri); 
let socketConnect = socketPull.bind(uri);
socketConnect.on("message",onMessage);

function sendMessage (header, payload) {
    //console.log("Sending " + header);
    socketOut.send([header, payload]);
}


