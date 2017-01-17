// Generated file

const {
  encodeAttribute,
  decodeAttribute,
} = require('../types');

module.exports = {
  encode: data => ({
    startTime: (data.startTime !== null && typeof data.startTime !== 'undefined')
      ? { value: data.startTime }
      : null,
    endTime: (data.endTime !== null && typeof data.endTime !== 'undefined')
      ? { value: data.endTime }
      : null,
    valueTime: (data.valueTime !== null && typeof data.valueTime !== 'undefined')
      ? { value: data.valueTime }
      : null,
    value: (data.value !== null && typeof data.value !== 'undefined')
      ? encodeAttribute(data.value)
      : null,
    sampleCount: (data.sampleCount !== null && typeof data.sampleCount !== 'undefined')
      ? { value: data.sampleCount }
      : null,
    timestamp: (data.timestamp !== null && typeof data.timestamp !== 'undefined')
      ? { value: data.timestamp }
      : null,
  }),
  decode: data => ({
    startTime: (data.startTime !== null && typeof data.startTime !== 'undefined')
      ? { type: 'time', value: data.startTime.value.toNumber() }
      : undefined,
    endTime: (data.endTime !== null && typeof data.endTime !== 'undefined')
      ? { type: 'time', value: data.endTime.value.toNumber() }
      : undefined,
    valueTime: (data.valueTime !== null && typeof data.valueTime !== 'undefined')
      ? { type: 'time', value: data.valueTime.value.toNumber() }
      : undefined,
    value: (data.value !== null && typeof data.value !== 'undefined')
      ? decodeAttribute(data.value)
      : undefined,
    sampleCount: (data.sampleCount !== null && typeof data.sampleCount !== 'undefined')
      ? { type: 'uinteger', value: data.sampleCount.value }
      : undefined,
    timestamp: (data.timestamp !== null && typeof data.timestamp !== 'undefined')
      ? { type: 'time', value: data.timestamp.value.toNumber() }
      : undefined,
    referenceTimestamp: (data.timestamp !== null && typeof data.timestamp !== 'undefined')
        ? { type: 'time', value: data.timestamp.value.toNumber() }
        : undefined,
  }),
};

