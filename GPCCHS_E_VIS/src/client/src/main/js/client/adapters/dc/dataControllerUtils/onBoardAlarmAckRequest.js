const onboardAlarm = require('./onBoardAlarm');
const ackRequest = require('../../isis/ackRequest/ackRequest');

module.exports = {
  encode: data => ({
    oid: data.oid,
    onboardAlarm: onboardAlarm.encode(data.onboardAlarm),
    ackRequest: ackRequest.encode(data.ackRequest),
    satellite: data.satellite,
    telemetryType: data.telemetryType,
  }),
  decode: data => ({
    oid: data.oid,
    onboardAlarm: onboardAlarm.decode(data.onboardAlarm),
    ackRequest: ackRequest.decode(data.ackRequest),
    satellite: data.satellite,
    telemetryType: data.telemetryType,
  }),
};
