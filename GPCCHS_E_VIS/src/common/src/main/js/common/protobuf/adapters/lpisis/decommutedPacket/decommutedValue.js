// Generated file
const validityState = require('../ccsds_mc/validityState');
const {
  encodeAttribute,
  decodeAttribute,
} = require('../types');

module.exports = {
  encode: data => ({
    name: (data.name !== null && typeof data.name !== 'undefined')
      ? { value: data.name }
      : null,
    extractedValue: (data.extractedValue !== null && typeof data.extractedValue !== 'undefined')
      ? encodeAttribute(data.extractedValue)
      : null,
    rawValue: (data.rawValue !== null && typeof data.rawValue !== 'undefined')
      ? encodeAttribute(data.rawValue)
      : null,
    convertedValue: (data.convertedValue !== null && typeof data.convertedValue !== 'undefined')
      ? encodeAttribute(data.convertedValue)
      : null,
    validityState: (data.validityState !== null && typeof data.validityState !== 'undefined')
      ? data.validityState
      : null,
  }),
  decode: data => ({
    name: (data.name !== null && typeof data.name !== 'undefined')
      ? { type: 'identifier', value: data.name.value.toBuffer() }
      : undefined,
    extractedValue: (data.extractedValue !== null && typeof data.extractedValue !== 'undefined')
      ? decodeAttribute(data.extractedValue)
      : undefined,
    rawValue: (data.rawValue !== null && typeof data.rawValue !== 'undefined')
      ? decodeAttribute(data.rawValue)
      : undefined,
    convertedValue: (data.convertedValue !== null && typeof data.convertedValue !== 'undefined')
      ? decodeAttribute(data.convertedValue)
      : undefined,
    validityState: (data.validityState !== null && typeof data.validityState !== 'undefined')
      ? { type: 'enum', value: data.validityState, symbol: validityState[data.validityState] }
      : undefined,
  }),
};

