var zmq = require("zmq"),
    socket = zmq.socket("push"),
    protoBuf = require("protobufjs");

const fs = require('fs'),
    path = require('path');

function logToConsole (message) {
  console.log("[" + new Date().toLocaleTimeString() + "]" + message);
}

function sendMessage (header, payload) {
    logToConsole("Sending " + header);
    socket.send([header, payload]);
}

var JS = require("../files/isisAggregation.proto.js"); 
var IsisAggregation = JS.IsisAggregation;
var Parameter = JS.Parameter; 

var parameters = [];
var parameter;

socket.bindSync("tcp://*:3000")
setInterval(function () {

    var isisAggregation = new IsisAggregation({
        "onboardDate" : {"value" : new Date().getTime()},
        "groundDate" : {"value" : new Date().getTime()},
        "isNominal" : {"value" : true}
    });

    for (var i = 0; i < 130; i++) {
        parameter = new Parameter({  
            "name": {"value" : 'Parameter Name' + Math.floor((Math.random() * 99999999) + 1)},
            "definition" : {"value" : '00030001010002010000000000000005'},
            "extractedValue" : {"_double" : {"value" : Math.floor((Math.random() * 100) + 1)}},
            "rawValue" : {"_double" : {"value" : Math.floor((Math.random() * 100) + 1)}},
            "convertedValue" : {"_double" : {"value" : Math.floor((Math.random() * 100) + 1)}},
            "triggerOnCounter" : {"value" : '6'},
            "triggerOffCounter" : {"value" : '8'},
            "validityState" : "INVALID",
            "isObsolete" : {"value" : false}
        });
        isisAggregation.add("parameters", parameter);
    }


    var byteBuffer = isisAggregation.encode();
    var buffer = byteBuffer.toBuffer();

    var dateTime = new Date();
    var OID = "000100010100010001" + Math.floor((Math.random() * 99999999) + 1);
    var obj = {
        'dataId' : 'Reporting.ParameterName',
        'session'  : 1,
        'oid' : OID,
        'dataTime' : dateTime/*,
        'binPayload' : '',
        'jsonPayload' : ''*/
    };
    sendMessage(JSON.stringify(obj), buffer);
}, 50);
