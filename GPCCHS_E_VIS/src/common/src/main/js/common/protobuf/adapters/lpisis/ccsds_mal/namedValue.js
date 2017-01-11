const {
  encodeAttribute,
  decodeAttribute,
} = require('../../lpisis/types');

module.exports = {
  encode: data => ({
    name: { value: data.name },
    value: encodeAttribute(data.value),
  }),
  decode: data => ({
    name: { type: 'identifier', value: data.name.value.toBuffer() },
    value: decodeAttribute(data.value),
  }),
};
