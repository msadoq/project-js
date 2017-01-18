// Generated file
const validityState = require('../ccsds_mc/validityState');
const {
  encodeAttribute,
  decodeAttribute,
  ushortToBytes,
  bytesToUshort,

} = require('../types');

module.exports = {
  encode: data => ({
    onboardDate: (data.onboardDate !== null && typeof data.onboardDate !== 'undefined')
      ? { value: data.onboardDate }
      : null,
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? { value: data.groundDate }
      : null,
    convertedValue: (data.convertedValue !== null && typeof data.convertedValue !== 'undefined')
      ? encodeAttribute(data.convertedValue)
      : null,
    rawValue: (data.rawValue !== null && typeof data.rawValue !== 'undefined')
      ? encodeAttribute(data.rawValue)
      : null,
    extractedValue: (data.extractedValue !== null && typeof data.extractedValue !== 'undefined')
      ? encodeAttribute(data.extractedValue)
      : null,
    monitoringState: (data.monitoringState !== null && typeof data.monitoringState !== 'undefined')
      ? { value: data.monitoringState }
      : null,
    triggerOnCounter: (data.triggerOnCounter !== null && typeof data.triggerOnCounter !== 'undefined')
      ? { value: ushortToBytes(data.triggerOnCounter) }
      : null,
    triggerOffCounter: (data.triggerOffCounter !== null && typeof data.triggerOffCounter !== 'undefined')
      ? { value: ushortToBytes(data.triggerOffCounter) }
      : null,
    validityState: (data.validityState !== null && typeof data.validityState !== 'undefined')
      ? data.validityState
      : null,
    isObsolete: (data.isObsolete !== null && typeof data.isObsolete !== 'undefined')
      ? { value: data.isObsolete }
      : null,
    isNominal: (data.isNominal !== null && typeof data.isNominal !== 'undefined')
      ? { value: data.isNominal }
      : null,
  }),
  decode: data => ({
    onboardDate: (data.onboardDate !== null && typeof data.onboardDate !== 'undefined')
      ? { type: 'time', value: data.onboardDate.value.toNumber() }
      : undefined,
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? { type: 'time', value: data.groundDate.value.toNumber() }
      : undefined,
    convertedValue: (data.convertedValue !== null && typeof data.convertedValue !== 'undefined')
      ? decodeAttribute(data.convertedValue)
      : undefined,
    rawValue: (data.rawValue !== null && typeof data.rawValue !== 'undefined')
      ? decodeAttribute(data.rawValue)
      : undefined,
    extractedValue: (data.extractedValue !== null && typeof data.extractedValue !== 'undefined')
      ? decodeAttribute(data.extractedValue)
      : undefined,
    monitoringState: (data.monitoringState !== null && typeof data.monitoringState !== 'undefined')
      ? { type: 'string', value: data.monitoringState.value }
      : undefined,
    triggerOnCounter: (data.triggerOnCounter !== null && typeof data.triggerOnCounter !== 'undefined')
      ? { type: 'ushort', value: bytesToUshort(data.triggerOnCounter.value) }
      : undefined,
    triggerOffCounter: (data.triggerOffCounter !== null && typeof data.triggerOffCounter !== 'undefined')
      ? { type: 'ushort', value: bytesToUshort(data.triggerOffCounter.value) }
      : undefined,
    validityState: (data.validityState !== null && typeof data.validityState !== 'undefined')
      ? { type: 'enum', value: data.validityState, symbol: validityState[data.validityState] }
      : undefined,
    isObsolete: (data.isObsolete !== null && typeof data.isObsolete !== 'undefined')
      ? { type: 'boolean', value: data.isObsolete.value }
      : undefined,
    isNominal: (data.isNominal !== null && typeof data.isNominal !== 'undefined')
      ? { type: 'boolean', value: data.isNominal.value }
      : undefined,
    referenceTimestamp: (data.onboardDate !== null && typeof data.onboardDate !== 'undefined')
        ? { type: 'time', value: data.onboardDate.value.toNumber() }
        : undefined,
  }),
};

