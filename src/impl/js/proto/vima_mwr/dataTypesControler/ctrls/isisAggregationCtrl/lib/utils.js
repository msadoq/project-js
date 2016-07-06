var protoBuf = require("protobufjs"),
    Promise = require('promise');

var JS = require("../files/isisAggregation.proto.js"); 
var IsisAggregation = JS.IsisAggregation;

var parameter;
exports.binToJson = function(payload) {
    return new Promise(function(resolve, reject) {
        decoded = IsisAggregation.decode(payload);
        var parameters = [];
        decoded.parameters.forEach(function(item){
            parameter = {
                'name': item.name.value,
                'definition' : item.definition.value,
                'extractedValue' : getAttributeValue(item.extractedValue),
                'rawValue' : getAttributeValue(item.rawValue),
                'convertedValue' : getAttributeValue(item.convertedValue),
                'triggerOnCounter' : '',
                'triggerOffCounter' : '',
                'validityState' : item.validityState,
                'isObsolete' : item.isObsolete.value
            }
            parameters.push(parameter);
        })

        var processedJson = {
            'onboardDate' : decoded.onboardDate.value.low,
            'groundDate' : decoded.groundDate.value.low,
            'isNominal' : decoded.isNominal.value,
            'parameters' : parameters
        }
        resolve(processedJson);
    });
}

var getAttributeValue = function(attribute) {
    if (attribute._blob != null) {
        return attribute._blob.value;
    } else if (attribute._boolean != null) {
        return attribute._boolean.value;
    } else if (attribute.float != null) {
        return attribute.float.value;
    } else if (attribute._double != null) {
        return attribute._double.value;
    } else if (attribute._identifier != null) {
        return attribute._identifier.value;
    } else if (attribute._octet != null) {
        return attribute._octet.value;
    } else if (attribute._uoctet != null) {
        return attribute._uoctet.value;
    } else if (attribute._short != null) {
        return attribute._short.value;
    } else if (attribute._ushort != null) {
        return attribute._ushort.value;
    } else if (attribute._integer != null) {
        return attribute._integer.value;
    } else if (attribute._uinteger != null) {
        return attribute._uinteger.value;
    } else if (attribute._long != null) {
        return attribute._long.value;
    } else if (attribute._ulong != null) {
        return attribute._ulong_blob.value;
    } else if (attribute._string != null) {
        return attribute._string.value;
    } else if (attribute._time != null) {
        return attribute._time.value;
    } else if (attribute._finetime != null) {
        return attribute._finetime.value;
    } else if (attribute._rui != null) {
        return attribute._rui.value;
    }
}
