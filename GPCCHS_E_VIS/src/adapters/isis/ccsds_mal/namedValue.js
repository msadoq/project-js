// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */

const {
  encodeAttribute,
  decodeAttribute,
  stringToBytes,
  bytesToString,

} = require('../types');

module.exports = {
  encode: data => ({
    name: (data.name !== null && typeof data.name !== 'undefined')
      ? { value: stringToBytes(data.name) }
      : null,
    value: (data.value !== null && typeof data.value !== 'undefined')
      ? encodeAttribute(data.value)
      : null,
  }),
  decode: data => ({
    name: (data.name !== null && typeof data.name !== 'undefined')
      ? { type: 'identifier', value: bytesToString(data.name.value) }
      : undefined,
    value: (data.value !== null && typeof data.value !== 'undefined')
      ? decodeAttribute(data.value)
      : undefined,
  }),
};
