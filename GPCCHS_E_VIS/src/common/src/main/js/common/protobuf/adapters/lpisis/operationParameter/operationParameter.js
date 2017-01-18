// Generated file

const {
  encodeAttribute,
  decodeAttribute,

} = require('../types');

module.exports = {
  encode: data => ({
    name: (data.name !== null && typeof data.name !== 'undefined')
      ? { value: data.name }
      : null,
    timestamp: (data.timestamp !== null && typeof data.timestamp !== 'undefined')
      ? { millisec: data.timestamp, pico: 0 }
      : null,
    value: (data.value !== null && typeof data.value !== 'undefined')
      ? encodeAttribute(data.value)
      : null,
  }),
  decode: data => ({
    name: (data.name !== null && typeof data.name !== 'undefined')
      ? { type: 'string', value: data.name.value }
      : undefined,
    timestamp: (data.timestamp !== null && typeof data.timestamp !== 'undefined')
      ? { type: 'finetime', value: data.timestamp.millisec.toNumber() }
      : undefined,
    value: (data.value !== null && typeof data.value !== 'undefined')
      ? decodeAttribute(data.value)
      : undefined,
    referenceTimestamp: (data.timestamp !== null && typeof data.timestamp !== 'undefined')
        ? { type: 'time', value: data.timestamp.millisec.toNumber() }
        : undefined,
  }),
};

