const JS = require('../protoFile/pus011SubSchedule.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const Pus011SubSchedule = JS.Pus011SubSchedule;

exports.binToJson = (payload) => {
  const decoded = Pus011SubSchedule.decode(payload);
  const pus011SubSchedule = {
    ssId: decoded.ssId.value,    status: decoded.status.value,    executionTimeFirstTc: decoded.executionTimeFirstTc.value,    apid: decoded.apid.value,    pusElement: decoded.pusElement.value,    groundDate: decoded.groundDate.value
  };
  return pus011SubSchedule;
};
