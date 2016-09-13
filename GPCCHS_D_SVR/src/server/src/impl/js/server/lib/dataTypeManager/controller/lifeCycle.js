const JS = require('../protoFile/lifeCycle.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const LifeCycle = JS.LifeCycle;

exports.binToJson = (payload) => {
  const decoded = LifeCycle.decode(payload);
  const lifeCycle = {
    launchingParameters: getAttributeValue(decoded.launchingParameters),    launchingTime: decoded.launchingTime.value
  };
  return lifeCycle;
};
