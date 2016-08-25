var zmq = require("zmq"),
    socketOut = zmq.socket("req"),
    protoBuf = require("protobufjs");

var ByteBuffer = protoBuf.ByteBuffer;
const fs = require('fs'),
    path = require('path');

var builder = protoBuf.newBuilder();

let buildProtobuf = (builder, ...protofiles) => {
    protofiles.map( file => protoBuf.loadProtoFile(file, builder));
}

buildProtobuf(builder,  "../protobuf/DataQuery.proto", 
                        "../protobuf/DataSubscribe.proto",
                        "../protobuf/DcResponse.proto",
                        "../protobuf/TimeFilterMessage.proto");

var root = builder.build(["dataControllerUtils","protobuf"]);

let {Action, 
    DataId, 
    DataQuery, 
    DcResponse, 
    DataSubscribe, 
    SamplingLevel, 
    TimeFilterMessage, 
    TimeInterval, 
    ValueFilter} = root;
       

console.log("binding tcp://127.0.0.1:5042");

socketOut.connect("tcp://127.0.0.1:5042");

console.log("bound tcp://127.0.0.1:5042");



// Message received from DC
let onMessage = function (msg){
    var did = DcResponse.decode(new Buffer(msg));
    
    console.log("RESPONSE"); 
    console.log(did.toRaw()); 
    switch (did.toRaw().status){
    case 'ERROR':
        console.log("error :",did.reason);
        break;
    case 'OK':
        console.log("OK");
        break;
    case 'WARNING':
        console.log("warning ",reason);
        break;
    }
}
socketOut.on("message",onMessage); // retrieve DataQueryResponse from DC



let queryFilter1 = new ValueFilter({
    "lhs" : "extractedValue",
    "comp" : ValueFilter.LT,                       // TODO make an enum with comparison operators
    "rhs" : "42"
})

let queryFilter2 = new ValueFilter({
    "lhs" : "extractedValue",
    "comp" : ValueFilter.LT,                       // TODO make an enum with comparison operators
    "rhs" : "420"
})

let timeInterval = new TimeInterval({
    "lower_ms" : 1438413300000, // 8 aout 2015 9h15
    "upper_ms" : 1438413400000, // 8 aout 2015 9h16:40
    "lower_ps" : 424242,
    "upper_ps" : 848484, 
})

let samplingLevel = new SamplingLevel({
          //TODO set SamplingLevel attributes
})

let sessionIdTest = 1;

let dataId = new DataId( {                      // corresponds to SubscriptionID ?
    "parameterName" : "ATT_BC_STR1VOLTAGE",
    "catalog" : "Reporting",
    "comObject" : "ReportingParameter",
    "sessionId" : sessionIdTest,                // TODO type is currently uint32, should be uint16 (bytes)
    "domainId" : 1,                             // TODO type is currently uint32, should be uint16 (bytes)
    "url" : "theUrl",                           //for FDS params
    "version" : "theVersion",                   //for FDS params
});



let dataIdWithTypo = new DataId( {                   
    "parameterName" : "ATT_BC_STR1VOLAGE",      // typo error on parameterName
    "catalog" : "Reporting",
    "comObject" : "ReportingParameter",
    "sessionId" : sessionIdTest,                          
    "domainId" : 1,                      
    "url" : "theUrl",                   
    "version" : "theVersion",        
});



// A full request for data 
let dataQuery = new DataQuery({
    "dataId" : dataId, 
    "filters" : [queryFilter1,queryFilter2],
    "interval" :timeInterval,
    "sampling" : samplingLevel
});

// A full request for data, with a wrong parameter (doesn't exist)
let wrongDataQuery = new DataQuery({
    "dataId" : dataIdWithTypo, 
    "filters" : [queryFilter1,queryFilter2],
    "interval" :timeInterval,
    "sampling" : samplingLevel
});

// a filter to send to PubSub (Real time) with only DataId 
let dataFilter = new DataSubscribe({
    "action" : Action.ADD, 
    "id" : 1424,
    "dataId" : dataId
});

// a filter to send to PubSub (Real time) with only DataId, which is wrong
let wrongDataFilter = new DataSubscribe({
    "action" : Action.ADD,
    "id" : 1425,
    "dataId" : dataIdWithTypo
});

// a time filter with a sessionID and the same timeInterval as the query to Archive
// there can be several time filter for the same sessionId (useful in edge cases)
let timeFilterMsg = new TimeFilterMessage({
    "action" : Action.ADD,
    "id" : 5666,
    "sessionId" : sessionIdTest, //same sessionIs as dataId of previoussly defined dataFilter
    "interval" : timeInterval
});

// Removal of an existing filter on data for PubSub
let dataFilterRemoval = new DataSubscribe({
    "action" : Action.DELETE, 
    "id" : dataFilter.id // same ID as previously defined dataFilter
});

// Removal of an existing time filter on session for PubSub
let timeFilterRemoval = new DataSubscribe({
    "action" : Action.DELETE, 
    "id" : dataFilter.id // same ID as previously defined dataFilter
});


let sendProtobuf = function (protoObj) {
 var byteBuffer = protoObj.encode();
 var buffer = byteBuffer.toBuffer();
 socketOut.send(buffer);
}

//Expected DcResponse : OK
sendProtobuf(dataQuery);

//Expected DcResponse : ERROR
sendProtobuf(wrongDataQuery);

//Expected DcResponse : OK
sendProtobuf(dataFilter);

//Expected DcResponse : ERROR
sendProtobuf(wrongDataFilter);

//Expected DcResponse : OK
sendProtobuf(timeFilterMsg);

//Expected DcResponse : OK
sendProtobuf(dataFilterRemoval);

//Expected DcResponse : OK
sendProtobuf(timeFilterRemoval);

