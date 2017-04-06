// Produced by Acceleo JavaScript Generator 1.1.0

const {
  stringToBytes,
  bytesToString,

} = require('../types');

module.exports = {
  encode: data => ({
    name: (data.name !== null && typeof data.name !== 'undefined')
      ? { value: data.name }
      : null,
    version: (data.version !== null && typeof data.version !== 'undefined')
      ? { value: data.version }
      : null,
    uri: (data.uri !== null && typeof data.uri !== 'undefined')
      ? { value: stringToBytes(data.uri) }
      : null,
    brokenLink: (data.brokenLink !== null && typeof data.brokenLink !== 'undefined')
      ? { value: data.brokenLink }
      : null,
  }),
  decode: data => ({
    name: (data.name !== null && typeof data.name !== 'undefined')
      ? { type: 'string', value: data.name.value }
      : undefined,
    version: (data.version !== null && typeof data.version !== 'undefined')
      ? { type: 'string', value: data.version.value }
      : undefined,
    uri: (data.uri !== null && typeof data.uri !== 'undefined')
      ? { type: 'uri', value: bytesToString(data.uri.value) }
      : undefined,
    brokenLink: (data.brokenLink !== null && typeof data.brokenLink !== 'undefined')
      ? { type: 'boolean', value: data.brokenLink.value }
      : undefined,
  }),
};

