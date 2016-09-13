const JS = require('../protoFile/uCPReport.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const UCPReport = JS.UCPReport;

exports.binToJson = (payload) => {
  const decoded = UCPReport.decode(payload);
  const uCPReport = {
    date: decoded.date.value,    parameters: decoded.parameters.value
  };
  return uCPReport;
};
