// Generated file

const {
  shortToBytes,
  bytesToShort,
} = require('../types');

module.exports = {
  encode: data => ({
    timeStamp: (data.timeStamp !== null && typeof data.timeStamp !== 'undefined')
      ? { millisec: data.timeStamp, pico: 0 }
      : null,
    name: (data.name !== null && typeof data.name !== 'undefined')
      ? { value: data.name }
      : null,
    value: (data.value !== null && typeof data.value !== 'undefined')
      ? { value: shortToBytes(data.value) }
      : null,
  }),
  decode: data => ({
    timeStamp: (data.timeStamp !== null && typeof data.timeStamp !== 'undefined')
      ? { type: 'finetime', value: data.timeStamp.millisec.toNumber() }
      : undefined,
    name: (data.name !== null && typeof data.name !== 'undefined')
      ? { type: 'string', value: data.name.value }
      : undefined,
    value: (data.value !== null && typeof data.value !== 'undefined')
      ? { type: 'short', value: bytesToShort(data.value.value) }
      : undefined,
    referenceTimestamp: (data.timeStamp !== null && typeof data.timeStamp !== 'undefined')
        ? { type: 'time', value: data.timeStamp.millisec.toNumber() }
        : undefined,
  }),
};

