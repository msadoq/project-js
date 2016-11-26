const {
  encodeAttribute,
  decodeAttribute,
  ushortToBytes,
  bytesToUshort,
} = require('../types');

const validityState = require('./validityState');

module.exports = {
  encode: data => ({
    onboardDate: { value: data.onboardDate },
    groundDate: { value: data.groundDate },
    convertedValue: encodeAttribute(data.convertedValue),
    rawValue: encodeAttribute(data.rawValue),
    extractedValue: encodeAttribute(data.extractedValue),
    monitoringState: { value: data.monitoringState },
    triggerOnCounter: { value: ushortToBytes(data.triggerOnCounter) },
    triggerOffCounter: { value: ushortToBytes(data.triggerOffCounter) },
    validityState: data.validityState,
    isObsolete: { value: data.isObsolete },
    isNominal: { value: data.isNominal },
  }),
  decode: data => ({
    onboardDate: { type: 'time', value: data.onboardDate.value.toNumber() },
    groundDate: { type: 'time', value: data.groundDate.value.toNumber() },
    convertedValue: decodeAttribute(data.convertedValue),
    rawValue: decodeAttribute(data.rawValue),
    extractedValue: decodeAttribute(data.extractedValue),
    monitoringState: { type: 'string', value: data.monitoringState.value },
    triggerOffCounter: { type: 'ushort', value: data.triggerOffCounter ? bytesToUshort(data.triggerOffCounter.value) : null },
    triggerOnCounter: { type: 'ushort', value: data.triggerOnCounter ? bytesToUshort(data.triggerOnCounter.value) : null },
    validityState: { type: 'enum', value: data.validityState, symbol: validityState[data.validityState] },
    isObsolete: data.isObsolete ? { type: 'boolean', value: data.isObsolete.value } : null,
    isNominal: data.isNominal ? { type: 'boolean', value: data.isNominal.value } : null,
    referenceTimestamp: { type: 'time', value: data.onboardDate.value.toNumber() },
  }),
};
