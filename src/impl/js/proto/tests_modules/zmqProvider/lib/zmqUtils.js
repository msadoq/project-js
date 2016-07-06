var zmq = require("zmq"),
    socketOut = zmq.socket("push"),
    socketIn = zmq.socket("pull"),
    protoBuf = require("protobufjs");

const fs = require('fs'),
    path = require('path');

function logToConsole (message) {
  console.log("[" + new Date().toLocaleTimeString() + "]" + message);
}

function sendMessage (header, payload) {
    logToConsole("Sending " + header);
    socketOut.send([header, payload]);
}

var JS = require("../files/isisAggregation.proto.js"); 
var IsisAggregation = JS.IsisAggregation;
var Parameter = JS.Parameter; 

var parameters = [];
var parameter;

socketOut.bindSync("tcp://*:3000");

socketIn.on("message", function (subscription) {
    var newSubscription = JSON.parse(subscription);
    var nbValuesToSend = 50;
    var sentValues = 0;
    var sendToCache = setInterval(function () {
        if(sentValues < nbValuesToSend) {
            var isisAggregation = new IsisAggregation({
                "onboardDate" : {"value" : Math.round(+new Date()/1000)},
                "groundDate" : {"value" : Math.round(+new Date()/1000)},
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

            var OID = "000100010100010001" + Math.floor((Math.random() * 99999999) + 1);
            var obj = {
                'dataId' : newSubscription.DataFullName,
                'session'  : newSubscription.SessionId,
                'oid' : OID,
                'dataTime' : Math.round(+new Date()/1000)
            };
            sendMessage(JSON.stringify(obj), buffer);   
            sentValues++;
        } else {
            clearInterval(sendToCache);
        }
        
    }, 50);
});


socketIn.connect('tcp://127.0.0.1:4000');