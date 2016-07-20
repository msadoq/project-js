const JS = require('../protoFiles/reportingParameter.proto.js');
const { getAttributeValue } = require('../utils.js');

const ReportingParameter = JS.ReportingParameter;

exports.binToJson = (payload) => {
  const decoded = ReportingParameter.decode(payload);
  const parameter = {
    onboardDate: decoded.onboardDate.value,
    groundDate: decoded.groundDate.value,
    extractedValue: getAttributeValue(decoded.extractedValue),
    rawValue: getAttributeValue(decoded.rawValue),
    convertedValue: getAttributeValue(decoded.convertedValue),
    triggerOnCounter: '',
    triggerOffCounter: '',
    monitoringState: decoded.monitoringState,
    validityState: decoded.validityState,
    isObsolete: decoded.isObsolete.value,
    isNominal: decoded.isNominal.value,
  };
  return parameter;
};
