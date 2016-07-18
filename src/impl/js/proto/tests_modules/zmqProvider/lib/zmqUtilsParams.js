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

var JS = require("../files/reportingParameter.proto.js"); 
var ReportingParameter = JS.ReportingParameter;


socketOut.bind("tcp://127.0.0.1:3000");
socketIn.bind("tcp://127.0.0.1:4000");

socketIn.on("message", function (subscriptions) {
    JSON.parse(subscriptions).forEach(function(newSubscription){
        console.log(newSubscription);
        var dInf = newSubscription.VisuWindow.dInf;
        var dSup = newSubscription.VisuWindow.dSup;
        var timeStep = 600;
        var sendToCache = setInterval(function () {
            if(dInf < dSup) {
                parameter = new ReportingParameter({
                    "onboardDate" : {"value" : dInf},
                    "groundDate" : {"value" : Math.round(+new Date()/1000)},
                    "convertedValue" : {"_double" : {"value" : Math.floor((Math.random() * 100) + 1)}},
                    "rawValue" : {"_double" : {"value" : Math.floor((Math.random() * 100) + 1)}},
                    "extractedValue" : {"_double" : {"value" : Math.floor((Math.random() * 100) + 1)}},
                    "triggerOnCounter" : {"value" : '6'},
                    "triggerOffCounter" : {"value" : '8'},
                    "monitoringState" : "INFORMATIONAL",
                    "validityState" : "INVALID",
                    "isObsolete" : {"value" : false},
                    "isNominal" : {"value" : false}
                });

                var byteBuffer = parameter.encode();
                var buffer = byteBuffer.toBuffer();

                var OID = "000100010100010001" + Math.floor((Math.random() * 99999999) + 1);
                var obj = {
                    'dataId' : newSubscription.DataFullName,
                    'session'  : newSubscription.SessionId,
                    'oid' : OID,
                    'dataTime' : dInf
                };
                sendMessage(JSON.stringify(obj), buffer);   
                dInf = dInf + timeStep;
            } else {
                console.log('terminé');
                clearInterval(sendToCache);
                /*socketIn.close();
                process.exit(1);*/
            }
            
        }, 50);
    });
});


/*socketIn.connect('tcp://127.0.0.1:4000');*/