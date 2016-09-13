const JS = require('../protoFile/groundMonitoringAlarm.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const GroundMonitoringAlarm = JS.GroundMonitoringAlarm;

exports.binToJson = (payload) => {
  const decoded = GroundMonitoringAlarm.decode(payload);
  const groundMonitoringAlarm = {
    creationDate: decoded.creationDate.value,    updateDate: decoded.updateDate.value,    closingDate: decoded.closingDate.value,    hasAckRequest: decoded.hasAckRequest.value,    alarmId: decoded.alarmId.value,    transitions: decoded.transitions.value,    isNominal: decoded.isNominal.value
  };
  return groundMonitoringAlarm;
};
