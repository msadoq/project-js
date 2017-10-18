const onBoardAlarm = require('./onBoardAlarm');
const ackRequest = require('../../isis/ackRequest/ackRequest');

module.exports = {
  encode: data => ({
    oid: data.oid,
    onBoardAlarm: (data.onBoardAlarm !== null && typeof data.onBoardAlarm !== 'undefined')
      ? onBoardAlarm.encode(data.onBoardAlarm)
      : null,
    ackRequest: (data.ackRequest !== null && typeof data.ackRequest !== 'undefined')
      ? ackRequest.encode(data.ackRequest)
      : null,
    satellite: data.satellite,
    telemetryType: data.telemetryType,
  }),
  decode: data => ({
    oid: data.oid,
    onBoardAlarm: (data.onBoardAlarm !== null && typeof data.onBoardAlarm !== 'undefined')
      ? onBoardAlarm.decode(data.onBoardAlarm)
      : undefined,
    ackRequest: (data.ackRequest !== null && typeof data.ackRequest !== 'undefined')
      ? ackRequest.decode(data.ackRequest)
      : undefined,
    satellite: data.satellite,
    telemetryType: data.telemetryType,
  }),
};
