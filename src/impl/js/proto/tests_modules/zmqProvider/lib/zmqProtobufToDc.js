var zmq = require("zmq"),
    socketOut = zmq.socket("req"),
    protoBuf = require("protobufjs");

var ByteBuffer = protoBuf.ByteBuffer;
const fs = require('fs'),
    path = require('path');




var builder = protoBuf.loadProtoFile("../protobuf/DataQuery.proto"),
    pb = builder.build(["dataControllerUtils","protobuf"]),
    DataQuery = pb.DataQuery,
    DataQueryFilter = pb.DataQueryFilter,
    TimeInterval = pb.TimeInterval,
    DataId = pb.DataId;
    SamplingLevel = pb.SamplingLevel;

console.log("binding tcp://127.0.0.1:5042");

socketOut.connect("tcp://127.0.0.1:5042");

console.log("bound tcp://127.0.0.1:5042");


let queryFilter1 = new DataQueryFilter({
    "lhs" : "extractedValue",
    "comp" : ">", // TODO make an enum with comparison operators
    "rhs" : "42"
})

let queryFilter2 = new DataQueryFilter({
    "lhs" : "extractedValue",
    "comp" : "<", // TODO make an enum with comparison operators
    "rhs" : "420"
})

let timeInterval = new TimeInterval({
    "lowerMs" : 1420704004000 ,
    "lowerPs" : 424242,
    "upperMs" :1420705004000,
    "upperPs" : 848484,
})

let samplingLevel = new SamplingLevel({
          //TODO set SamplingLevel attributes
})

let dataId = new DataId( {
    "queryId" : 1515, // corresponds to SubscriptionID ?
    "parameterName" : "ATT_BC_STR1VOLTRAGE",
    "catalog" : "Reporting",
    "comObject" : "ReportingParameter",
    "sessionId" : 1, // TODO type is currently uint32, should be uint16 (bytes)
    "domainId" : 1, // TODO type is currently uint32, should be uint16 (bytes)
    "domain" : "fr.cnes.isis.sat1.*", // TODO clarify if HS should transmit a domain or domainId
    "url" : "theUrl", //for FDS params
    "version" : "theVersion", //for FDS params
});

let dataQuery = new DataQuery({
    "dataId" : dataId, 
    "filters" : [queryFilter1,queryFilter2],
    "interval" :timeInterval,
    "sampling" : samplingLevel
});

var byteBuffer = dataQuery.encode();
var buffer = byteBuffer.toBuffer();

let onMessage = function (msg){
    console.log(msg); 
}
socketOut.on("message",onMessage); // retrieve DataQueryResponse from DC

socketOut.send(buffer);


/*socketIn.connect('tcp://127.0.0.1:4000');*/
