module.exports = {
  encode: data => ({
    oid: data.oid,
    onboardAlarm: data.onboardAlarm,
    ackRequest: data.ackRequest,
    satellite: data.satellite,
    telemetryType: data.telemetryType,
  }),
  decode: data => ({
    oid: data.oid,
    onboardAlarm: data.onboardAlarm,
    ackRequest: data.ackRequest,
    satellite: data.satellite,
    telemetryType: data.telemetryType,
  }),
};
