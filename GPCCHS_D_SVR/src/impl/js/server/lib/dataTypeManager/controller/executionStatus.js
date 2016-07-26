const JS = require('../protoFile/executionStatus.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const ExecutionStatus = JS.ExecutionStatus;

exports.binToJson = (payload) => {
  const decoded = ExecutionStatus.decode(payload);
  const executionStatus = {
    status: decoded.status.value,    statusTime: decoded.statusTime.value
  };
  return executionStatus;
};
