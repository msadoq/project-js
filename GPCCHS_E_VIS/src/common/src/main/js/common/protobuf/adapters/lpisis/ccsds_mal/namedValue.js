const {
  encodeAttribute,
  decodeAttribute,
  stringToBytes,
  bytesToString,
} = require('../../lpisis/types');

module.exports = {
  encode: data => ({
    name: { value: stringToBytes(data.name) },
    value: encodeAttribute(data.value),
  }),
  decode: data => ({
    name: { type: 'identifier', value: bytesToString(data.name.value) },
    value: decodeAttribute(data.value),
  }),
};
