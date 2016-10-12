const {
  encodeAttribute,
  decodeAttribute,
} = require('../lpisis/types');

module.exports = {
  encode: data => ({
    fieldName: data.fieldName,
    type: data.type,
    fieldValue: encodeAttribute(data.fieldValue),
  }),
  decode: data => ({
    fieldName: data.fieldName,
    type: data.type,
    fieldValue: decodeAttribute(data.fieldValue),
  }),
};
