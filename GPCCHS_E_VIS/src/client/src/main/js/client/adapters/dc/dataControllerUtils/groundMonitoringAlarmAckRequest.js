const groundMonitoringAlarm = require('../../isis/groundAlarm/groundMonitoringAlarm');
const ackRequest = require('../../isis/ackRequest/ackRequest');

module.exports = {
  encode: data => ({
    oid: data.oid,
    groundMonitoringAlarm: (data.groundMonitoringAlarm !== null && typeof data.groundMonitoringAlarm !== 'undefined')
      ? groundMonitoringAlarm.encode(data.groundMonitoringAlarm)
      : null,
    ackRequest: (data.ackRequest !== null && typeof data.ackRequest !== 'undefined')
      ? ackRequest.encode(data.ackRequest)
      : null,
    parameterName: data.parameterName,
    parameterType: data.parameterType,
    satellite: data.satellite,
    telemetryType: data.telemetryType,
  }),
  decode: data => ({
    oid: data.oid,
    groundMonitoringAlarm: (data.groundMonitoringAlarm !== null && typeof data.groundMonitoringAlarm !== 'undefined')
      ? groundMonitoringAlarm.decode(data.groundMonitoringAlarm)
      : undefined,
    ackRequest: (data.ackRequest !== null && typeof data.ackRequest !== 'undefined')
      ? ackRequest.decode(data.ackRequest)
      : undefined,
    parameterName: data.parameterName,
    parameterType: data.parameterType,
    satellite: data.satellite,
    telemetryType: data.telemetryType,
  }),
};
