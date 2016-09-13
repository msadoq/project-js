const JS = require('../protoFile/reportingParameter.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const ReportingParameter = JS.ReportingParameter;

exports.binToJson = (payload) => {
  const decoded = ReportingParameter.decode(payload);
  const reportingParameter = {
    onboardDate: decoded.onboardDate.value,    groundDate: decoded.groundDate.value,    convertedValue: getAttributeValue(decoded.convertedValue),    rawValue: getAttributeValue(decoded.rawValue),    extractedValue: getAttributeValue(decoded.extractedValue),    triggerOnCounter: decoded.triggerOnCounter.value,    triggerOffCounter: decoded.triggerOffCounter.value,    monitoringState: decoded.monitoringState,    validityState: decoded.validityState,    isObsolete: decoded.isObsolete.value,    isNominal: decoded.isNominal.value
  };
  return reportingParameter;
};
