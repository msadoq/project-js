var zmq = require("zmq"),
    socketOut = zmq.socket("push"),
    protoBuf = require("protobufjs");

var ByteBuffer = protoBuf.ByteBuffer;
const fs = require('fs'),
    path = require('path');



var builder = protoBuf.loadProtoFile("../proto/DataQuery.proto"),
    pb = builder.build(["dataControllerUtils","protobuf"]),
    DataQuery = pb.DataQuery,
    DataQueryFilter = pb.DataQueryFilter,
    TimeInterval = pb.TimeInterval,
    SamplingLevel = pb.SamplingLevel;

console.log("binding tcp://127.0.0.1:5042");

socketOut.connect("tcp://127.0.0.1:5042");

console.log("bound tcp://127.0.0.1:5042");

console.log(DataQuery);
let queryFilter = new DataQueryFilter({
                    "lhs" : "extractedValue",
                    "comp" : ">",
                    "rhs" : "42"
})


let timeInterval = new TimeInterval({
                    "lowerMs" : 133713371337,
                    "lowerPs" : 424242,
                    "upperMs" :178917891789,
                    "upperPs" : 848484,
})

let samplingLevel = new SamplingLevel({ //TBD
                   
})

let dataQuery = new DataQuery({
                    "queryId" : 1515,
                    "parameterName" : "ATT_BC_STR1VOLTRAGE",
                    "catalog" : "Reporting",
                    "comObject" : "ReportingParameter",
                    "sessionId" : 1,
                    "domainId" : 0,
                    "url" : "theUrl", //for FDS
                    "version" : "theVersion", //for FDS
                    "filters" : [queryFilter],
                    "interval" :timeInterval,
                    "sampling" : samplingLevel
                });

var byteBuffer = dataQuery.encode();
var buffer = byteBuffer.toBuffer();

socketOut.send(buffer);

/*socketIn.connect('tcp://127.0.0.1:4000');*/
