module.exports = {
  encode: data => ({
    oid: data.oid,
    groundAlarm: data.groundAlarm,
    ackRequest: data.ackRequest,
    parameterName: data.parameterName,
    parameterType: data.parameterType,
    satellite: data.satellite,
    telemetryType: data.telemetryType,
  }),
  decode: data => ({
    oid: data.oid,
    groundAlarm: data.groundAlarm,
    ackRequest: data.ackRequest,
    parameterName: data.parameterName,
    parameterType: data.parameterType,
    satellite: data.satellite,
    telemetryType: data.telemetryType,
  }),
};
