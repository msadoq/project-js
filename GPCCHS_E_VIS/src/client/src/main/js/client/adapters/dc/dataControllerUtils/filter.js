// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

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
