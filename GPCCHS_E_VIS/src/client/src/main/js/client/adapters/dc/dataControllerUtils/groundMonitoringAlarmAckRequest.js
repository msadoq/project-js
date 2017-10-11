const groundMonitoringAlarm = require('../../isis/groundAlarm/groundMonitoringAlarm');
const ackRequest = require('../../isis/ackRequest/ackRequest');

module.exports = {
  encode: data => ({
    oid: data.oid,
    groundAlarm: groundMonitoringAlarm.encode(data.groundAlarm),
    ackRequest: ackRequest.encode(data.ackRequest),
    parameterName: data.parameterName,
    parameterType: data.parameterType,
    satellite: data.satellite,
    telemetryType: data.telemetryType,
  }),
  decode: data => ({
    oid: data.oid,
    groundAlarm: groundMonitoringAlarm.decode(data.groundAlarm),
    ackRequest: ackRequest.decode(data.ackRequest),
    parameterName: data.parameterName,
    parameterType: data.parameterType,
    satellite: data.satellite,
    telemetryType: data.telemetryType,
  }),
};
