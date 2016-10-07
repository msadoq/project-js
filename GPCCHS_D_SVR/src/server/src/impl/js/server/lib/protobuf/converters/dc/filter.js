const {
  encodeAttribute,
  decodeAttribute,
} = require('../lpisis/types');

module.exports = {
  encode: data => ({
    field: data.field,
    operator: data.operator,
    value: encodeAttribute(data.value),
  }),
  decode: data => ({
    field: data.field,
    operator: data.operator,
    value: decodeAttribute(data.value),
  }),
};
