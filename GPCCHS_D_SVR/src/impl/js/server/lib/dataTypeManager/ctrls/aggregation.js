const Promise = require('promise');
const JS = require('../protoFiles/isisAggregation.proto.js');
const { getAttributeValue } = require('../utils.js');

const IsisAggregation = JS.IsisAggregation;

exports.binToJson = (payload) => new Promise(
  (resolve) => {
    const decoded = IsisAggregation.decode(payload);
    const parameters = [];
    decoded.parameters.forEach((item) => {
      const parameter = {
        name: item.name.value,
        definition: item.definition.value,
        extractedValue: getAttributeValue(item.extractedValue),
        rawValue: getAttributeValue(item.rawValue),
        convertedValue: getAttributeValue(item.convertedValue),
        triggerOnCounter: '',
        triggerOffCounter: '',
        validityState: item.validityState,
        isObsolete: item.isObsolete.value,
      };
      parameters.push(parameter);
    });

    const processedJson = {
      onboardDate: decoded.onboardDate.value.low,
      groundDate: decoded.groundDate.value.low,
      isNominal: decoded.isNominal.value,
      parameters,
    };
    resolve(processedJson);
  }
);
