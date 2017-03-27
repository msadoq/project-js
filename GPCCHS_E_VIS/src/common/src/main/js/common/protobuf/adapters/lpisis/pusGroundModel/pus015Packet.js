// Produced by Acceleo JavaScript Generator 1.1.0
const pusElement = require('./pusElement');

module.exports = {
  encode: data => ({
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? { value: data.apid }
      : null,
    serviceTpe: (data.serviceTpe !== null && typeof data.serviceTpe !== 'undefined')
      ? { value: data.serviceTpe }
      : null,
    serviceSubType: (data.serviceSubType !== null && typeof data.serviceSubType !== 'undefined')
      ? { value: data.serviceSubType }
      : null,
    sid: (data.sid !== null && typeof data.sid !== 'undefined')
      ? { value: data.sid }
      : null,
    subsamplingRatio: (data.subsamplingRatio !== null && typeof data.subsamplingRatio !== 'undefined')
      ? { value: data.subsamplingRatio }
      : null,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.encode(data.pusElement)
      : null,
    packetType: (data.packetType !== null && typeof data.packetType !== 'undefined')
      ? { value: data.packetType }
      : null,
  }),
  decode: data => ({
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? { type: 'uinteger', value: data.apid.value }
      : undefined,
    serviceTpe: (data.serviceTpe !== null && typeof data.serviceTpe !== 'undefined')
      ? { type: 'uinteger', value: data.serviceTpe.value }
      : undefined,
    serviceSubType: (data.serviceSubType !== null && typeof data.serviceSubType !== 'undefined')
      ? { type: 'uinteger', value: data.serviceSubType.value }
      : undefined,
    sid: (data.sid !== null && typeof data.sid !== 'undefined')
      ? { type: 'uinteger', value: data.sid.value }
      : undefined,
    subsamplingRatio: (data.subsamplingRatio !== null && typeof data.subsamplingRatio !== 'undefined')
      ? { type: 'uinteger', value: data.subsamplingRatio.value }
      : undefined,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.decode(data.pusElement)
      : undefined,
    packetType: (data.packetType !== null && typeof data.packetType !== 'undefined')
      ? { type: 'uinteger', value: data.packetType.value }
      : undefined,
  }),
};

