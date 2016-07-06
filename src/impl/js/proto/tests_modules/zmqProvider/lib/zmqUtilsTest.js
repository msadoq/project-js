var ProtoBuf = require("protobufjs");

var JS = require("../files/isisAggregation.proto.js"); 
var IsisAggregation = JS.IsisAggregation;
var Parameter = JS.Parameter; 

var parameters = [];
var parameter;




var isisAggregation = new IsisAggregation({
    "onboardDate" : {"value" : new Date().getTime()},
    "groundDate" : {"value" : new Date().getTime()},
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


// OR: It's also possible to mix all of this!
// Afterwards, just encode your message:
var byteBuffer = isisAggregation.encode();
var buffer = byteBuffer.toBuffer();

var decoded = IsisAggregation.decode(buffer);
console.log(decoded.parameters[0].extractedValue._double.value);