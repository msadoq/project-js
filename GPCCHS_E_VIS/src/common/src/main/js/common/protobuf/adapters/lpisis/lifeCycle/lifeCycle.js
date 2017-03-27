// Produced by Acceleo JavaScript Generator 1.1.0

const {
  encodeAttribute,
  decodeAttribute,

} = require('../types');

module.exports = {
  encode: data => ({
    launchingParameters: (data.launchingParameters !== null && typeof data.launchingParameters !== 'undefined')
      ? encodeAttribute(data.launchingParameters)
      : null,
    launchingTime: (data.launchingTime !== null && typeof data.launchingTime !== 'undefined')
      ? { value: data.launchingTime }
      : null,
  }),
  decode: data => ({
    launchingParameters: (data.launchingParameters !== null && typeof data.launchingParameters !== 'undefined')
      ? decodeAttribute(data.launchingParameters)
      : undefined,
    launchingTime: (data.launchingTime !== null && typeof data.launchingTime !== 'undefined')
      ? { type: 'time', value: data.launchingTime.value.toNumber() }
      : undefined,
    referenceTimestamp: (data.launchingTime !== null && typeof data.launchingTime !== 'undefined')
        ? { type: 'time', value: data.launchingTime.value.toNumber() }
        : undefined,
  }),
};

