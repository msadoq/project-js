const validityState = require('../ccsds_mc/validityState');
const {
  encodeAttribute,
  decodeAttribute,
  stringToBytes,
  bytesToString,
} = require('../../lpisis/types');

module.exports = {
  encode: data => ({
    name: { value: stringToBytes(data.name) },
    extractedValue: encodeAttribute(data.extractedValue),
    rawValue: encodeAttribute(data.rawValue),
    convertedValue: encodeAttribute(data.convertedValue),
    validityState: data.validityState,
  }),
  decode: data => ({
    name: { type: 'identifier', value: bytesToString(data.name.value) },
    extractedValue: decodeAttribute(data.extractedValue),
    rawValue: decodeAttribute(data.rawValue),
    convertedValue: decodeAttribute(data.convertedValue),
    validityState: { type: 'enum', value: data.validityState, symbol: validityState[data.validityState] },
  }),
};
