// Produced by Acceleo JavaScript Generator 1.1.0
const objectId = require('../ccsds_com/objectId');
const validityState = require('../ccsds_mc/validityState');
const {
  encodeAttribute,
  decodeAttribute,
  ushortToBytes,
  bytesToUshort,

} = require('../types');

module.exports = {
  encode: data => ({
    definition: (data.definition !== null && typeof data.definition !== 'undefined')
      ? objectId.encode(data.definition)
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
    triggerCounter: (data.triggerCounter !== null && typeof data.triggerCounter !== 'undefined')
      ? { value: ushortToBytes(data.triggerCounter) }
      : null,
    monitoringState: (data.monitoringState !== null && typeof data.monitoringState !== 'undefined')
      ? { value: data.monitoringState }
      : null,
    validityState: (data.validityState !== null && typeof data.validityState !== 'undefined')
      ? data.validityState
      : null,
  }),
  decode: data => ({
    definition: (data.definition !== null && typeof data.definition !== 'undefined')
      ? objectId.decode(data.definition)
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
    triggerCounter: (data.triggerCounter !== null && typeof data.triggerCounter !== 'undefined')
      ? { type: 'ushort', value: bytesToUshort(data.triggerCounter.value) }
      : undefined,
    monitoringState: (data.monitoringState !== null && typeof data.monitoringState !== 'undefined')
      ? { type: 'string', value: data.monitoringState.value }
      : undefined,
    validityState: (data.validityState !== null && typeof data.validityState !== 'undefined')
      ? { type: 'enum', value: data.validityState, symbol: validityState[data.validityState] }
      : undefined,
  }),
};

