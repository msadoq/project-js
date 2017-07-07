const {
  encodeAttribute,
  decodeAttribute,
} = require('../types');

module.exports = {
  encode: data => ({
    fieldName: data.field,
    type: data.operator,
    fieldValue: encodeAttribute(data.operand),
  }),
  decode: data => ({
    field: data.fieldName,
    operator: data.type,
    operand: decodeAttribute(data.fieldValue),
  }),
};
