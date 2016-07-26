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
    socketOut.send([null, header, payload]);
}


let factor = 1;
if (!isNaN(parseInt(process.argv[2], 10))) {
    factor = parseInt(process.argv[2], 10);
}

var JS = require("../files/reportingParameter.proto.js"); 
var ReportingParameter = JS.ReportingParameter;

// socketOut.bind("tcp://127.0.0.1:3000");
socketOut.bind("tcp://127.0.0.1:49159", (err) => {
    if (err) throw err;
    console.log("Binding Done");
});
socketIn.connect("tcp://127.0.0.1:4000");

socketIn.on("message", function (subscriptions) {
    JSON.parse(subscriptions).forEach(function(newSubscription){
        console.log(newSubscription);
        var dInf = newSubscription.VisuWindow.dInf;
        var dSup = newSubscription.VisuWindow.dSup;
        var timeStep = 600*factor;
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
                const splittedId = newSubscription.DataFullName.split('.');
                const splittedParameter = splittedId[1].split('<');
                const splittedType = splittedParameter[1].split('>');
                var obj = {
                    'catalog' : splittedId[0],
                    'fullDataId' : newSubscription.DataFullName,
                    'oid' : OID,
                    'parameter' : splittedParameter[0],
                    'binPayload' : buffer,
                    'session'  : newSubscription.SessionId,
                    'timestamp' : dInf,
                    'type' : splittedType[0]
                };
                //console.log(JSON.stringify(obj));
                const metaData = new Buffer(JSON.stringify(obj));
                sendMessage(metaData, buffer);   
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