const JS = require('../protoFile/lifeCycleStatus.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const LifeCycleStatus = JS.LifeCycleStatus;

exports.binToJson = (payload) => {
  const decoded = LifeCycleStatus.decode(payload);
  const lifeCycleStatus = {
    status: decoded.status.value,    statusTime: decoded.statusTime.value
  };
  return lifeCycleStatus;
};
