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

// socketOut.bind("tcp://127.0.0.1:3000");
socketOut.bind("tcp://127.0.0.1:49159");
socketIn.bind("tcp://127.0.0.1:4000");

socketIn.on("message", function (subscriptions) {
    JSON.parse(subscriptions).forEach(function(newSubscription){
        console.log(newSubscription);
        var dInf = newSubscription.VisuWindow.dInf;
        var dSup = newSubscription.VisuWindow.dSup;
        var timeStep = 60;
        var sendToCache = setInterval(function () {
            if(dInf < dSup) {
                var isisAggregation = new IsisAggregation({
                    "onboardDate" : {"value" : dInf},
                    "groundDate" : {"value" : Math.round(+new Date()/1000)},
                    "isNominal" : {"value" : true}
                });

                for (var i = 0; i < 1; i++) {
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
            
        }, 0.6);
    });
});


/*socketIn.connect('tcp://127.0.0.1:4000');*/