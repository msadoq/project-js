const JS = require('../protoFile/execution.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const Execution = JS.Execution;

exports.binToJson = (payload) => {
  const decoded = Execution.decode(payload);
  const execution = {
    launchingParameter: decoded.launchingParameter.value,    launchingTime: decoded.launchingTime.value
  };
  return execution;
};
