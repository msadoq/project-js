// Generated file

const {
  uoctetToBytes,
  bytesToUoctet,

} = require('../types');

module.exports = {
  encode: data => ({
    versionNumber: (data.versionNumber !== null && typeof data.versionNumber !== 'undefined')
      ? { value: uoctetToBytes(data.versionNumber) }
      : null,
    serviceType: (data.serviceType !== null && typeof data.serviceType !== 'undefined')
      ? { value: uoctetToBytes(data.serviceType) }
      : null,
    serviceSubType: (data.serviceSubType !== null && typeof data.serviceSubType !== 'undefined')
      ? { value: uoctetToBytes(data.serviceSubType) }
      : null,
    subCounter: (data.subCounter !== null && typeof data.subCounter !== 'undefined')
      ? { value: uoctetToBytes(data.subCounter) }
      : null,
    destinationId: (data.destinationId !== null && typeof data.destinationId !== 'undefined')
      ? { value: uoctetToBytes(data.destinationId) }
      : null,
    time: (data.time !== null && typeof data.time !== 'undefined')
      ? { millisec: data.time, pico: 0 }
      : null,
  }),
  decode: data => ({
    versionNumber: (data.versionNumber !== null && typeof data.versionNumber !== 'undefined')
      ? { type: 'uoctet', value: bytesToUoctet(data.versionNumber.value) }
      : undefined,
    serviceType: (data.serviceType !== null && typeof data.serviceType !== 'undefined')
      ? { type: 'uoctet', value: bytesToUoctet(data.serviceType.value) }
      : undefined,
    serviceSubType: (data.serviceSubType !== null && typeof data.serviceSubType !== 'undefined')
      ? { type: 'uoctet', value: bytesToUoctet(data.serviceSubType.value) }
      : undefined,
    subCounter: (data.subCounter !== null && typeof data.subCounter !== 'undefined')
      ? { type: 'uoctet', value: bytesToUoctet(data.subCounter.value) }
      : undefined,
    destinationId: (data.destinationId !== null && typeof data.destinationId !== 'undefined')
      ? { type: 'uoctet', value: bytesToUoctet(data.destinationId.value) }
      : undefined,
    time: (data.time !== null && typeof data.time !== 'undefined')
      ? { type: 'finetime', value: data.time.millisec.toNumber() }
      : undefined,
  }),
};

