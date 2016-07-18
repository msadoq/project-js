const Promise = require('promise');
const JS = require('../protoFiles/reportingParameter.proto.js');
const { getAttributeValue } = require('../utils.js');

const ReportingParameter = JS.ReportingParameter;

exports.binToJson = (payload) => new Promise(
  (resolve) => {
    const decoded = ReportingParameter.decode(payload);
    const parameter = {
        onboardDate: item.name.value,
        definition: item.definition.value,
        extractedValue: getAttributeValue(item.extractedValue),
        rawValue: getAttributeValue(item.rawValue),
        convertedValue: getAttributeValue(item.convertedValue),
        triggerOnCounter: '',
        triggerOffCounter: '',
        validityState: item.validityState,
        isObsolete: item.isObsolete.value,
    };

    resolve(parameter);
  }
);
