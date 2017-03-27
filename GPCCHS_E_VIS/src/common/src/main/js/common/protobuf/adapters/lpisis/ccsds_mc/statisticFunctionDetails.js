// Produced by Acceleo JavaScript Generator 1.1.0

const {
  stringToBytes,
  bytesToString,

} = require('../types');

module.exports = {
  encode: data => ({
    name: (data.name !== null && typeof data.name !== 'undefined')
      ? { value: stringToBytes(data.name) }
      : null,
    description: (data.description !== null && typeof data.description !== 'undefined')
      ? { value: data.description }
      : null,
    timestamp: (data.timestamp !== null && typeof data.timestamp !== 'undefined')
      ? { value: data.timestamp }
      : null,
  }),
  decode: data => ({
    name: (data.name !== null && typeof data.name !== 'undefined')
      ? { type: 'identifier', value: bytesToString(data.name.value) }
      : undefined,
    description: (data.description !== null && typeof data.description !== 'undefined')
      ? { type: 'string', value: data.description.value }
      : undefined,
    timestamp: (data.timestamp !== null && typeof data.timestamp !== 'undefined')
      ? { type: 'time', value: data.timestamp.value.toNumber() }
      : undefined,
    referenceTimestamp: (data.timestamp !== null && typeof data.timestamp !== 'undefined')
        ? { type: 'time', value: data.timestamp.value.toNumber() }
        : undefined,
  }),
};

