var zmq = require("zmq"),
    socketOut = zmq.socket("req"),
    socketPull = zmq.socket("pull"),
    protoBuf = require("protobufjs");
const { encode } = require("../../lib/protobuf");
const { decode } = require("../../lib/protobuf");
const onDcData = require('../../lib/controllers/onDcData');

socketOut.connect("tcp://127.0.0.1:5042");

var uri = 'tcp://127.0.0.1:49165';
let socketIn = socketPull.bind(uri);


//Treat data from DC
socketIn.on("message",(header, msg) => onDcData(msg));






let ts1 = {"ms" : 1 };
let ts2 = {"ms" : 1455413400000 };
let timeInterval = {
    "lowerTs" : ts1, // 8 aout 2015 9h15
    "upperTs" : ts2 // 8 aout 2015 9h15:XX
};

let sessionIdTest = 1;

let dataId = {                      // corresponds to SubscriptionID ?
    "parameterName" : "ATT_BC_STR1VOLTAGE",
    "catalog" : "Reporting",
    "comObject" : "ReportingParameter",
    "sessionId" : sessionIdTest,                // TODO type is currently uint32, should be uint16 (bytes)
    "domainId" : 1,                             // TODO type is currently uint32, should be uint16 (bytes)
    "url" : "theUrl",                           //for FDS params
    "version" : "theVersion",                   //for FDS params
};




let dataIdWithTypo = {
    "parameterName" : "ATT_BC_STR1VOLAGE",      // typo error on parameterName
    "catalog" : "Reporting",
    "comObject" : "ReportingParameter",
    "sessionId" : sessionIdTest,
    "domainId" : 1,
    "url" : "theUrl",
    "version" : "theVersion",
};

// A full request for data
let dataQuery = {
    "id" : "42",
    "dataId" : dataId,
    "interval" :timeInterval
};


// A full request for data, with a wrong parameter (doesn't exist)
let wrongDataQuery = {
    "id" : "43",
    "dataId" : dataIdWithTypo,
    "interval" :timeInterval
};


// a filter to send to PubSub (Real time) with only DataId
let dataFilter = {
    "action" : 0,
    "id" : "1424",
    "dataId" : dataId
};

// a filter to send to PubSub (Real time) with only DataId, which is wrong
let wrongDataFilter = {
    "action" : 0,
    "id" : "1425",
    "dataId" : dataIdWithTypo
};

let domainQuery = {
    "id" : "tartanpion"
}
// a time filter with a sessionID and the same timeInterval as the query to Archive
// there can be several time filter for the same sessionId (useful in edge cases)
// let timeFilterMsg = new TimeFilterMessage({
//     "action" : 0,
//     "id" : 5666,
//     "sessionId" : sessionIdTest, //same sessionIs as dataId of previoussly defined dataFilter
//     "interval" : timeInterval
// });

// Removal of an existing filter on data for PubSub
let dataFilterRemoval = {
    "action" : 2,
    "id" : dataFilter.id // same ID as previously defined dataFilter
};


let callbackQueue = [];
var onResponse = function (reply) {
    //Take out the first callback and call it.
    let callback = callbackQueue.shift();
    if (typeof(callback) != 'undefined'){
        callback(reply);
    }
}
let sendRequest = function (request, callback){
    //put the callback in the queue and send request
    console.log(callback);
    callbackQueue.push(callback);
    socketOut.send(request);
}


// Response received from DC
let checkDcAnswer =  (waitedAnswer) => function (msg) {
    var did = decode("dc.dataControllerUtils.DcResponse",msg);
    console.log("checkDcAnswer")
    console.log(waitedAnswer == did.status)
    if (waitedAnswer != did.status){
      throw "checkDcAsnwer failure";
    }
}


//Expected DcResponse : OK

//for (i = 0; i < 50; i++){

//}
//Expected DcResponse : ERROR


//Expected DcResponse : OK

socketOut.on("message",onResponse);

let dataQueryPb = encode("dc.dataControllerUtils.DataQuery",dataQuery);
let wrongDataQueryPb = encode("dc.dataControllerUtils.DataQuery",wrongDataQuery);
//sendRequestProtobuf(dataQueryPb);
domainQuery = encode("dc.dataControllerUtils.DomainQuery",domainQuery);


let i = 0;
for (i = 0; i < 5; i++){
  sendRequest(dataQueryPb, checkDcAnswer('OK'));
}

sendRequest(wrongDataQueryPb, checkDcAnswer('ERROR'));
sendRequest(wrongDataQueryPb, checkDcAnswer('ERROR'));
sendRequest(wrongDataQueryPb, checkDcAnswer('ERROR'));
sendRequest(wrongDataQueryPb, checkDcAnswer('ERROR'));
sendRequest(wrongDataQueryPb, checkDcAnswer('ERROR'));
sendRequest(dataQueryPb, checkDcAnswer('OK'));
sendRequest(domainQuery, msg => {
  console.log(decode("dc.dataControllerUtils.DomainResponse",msg))
});

let dataFilterPb = encode("dc.dataControllerUtils.DataSubscribe",dataFilter);
// sendRequestProtobuf(dataFilterPb , onMessage);

//Expected DcResponse : ERROR
// let wrongDataFilterPb = encode("dc.dataControllerUtils.DataSubscribe",dataFilter);
// sendRequestProtobuf(wrongDataFilterPb, onMessage);
sendRequest(dataFilterPb, checkDcAnswer('OK'));


//Expected DcResponse : OK
// sendProtobuf(timeFilterMsg);

//Expected DcResponse : OK
// sendProtobuf(dataFilterRemoval);

//Expected DcResponse : OK
// sendProtobuf(timeFilterRemoval);
