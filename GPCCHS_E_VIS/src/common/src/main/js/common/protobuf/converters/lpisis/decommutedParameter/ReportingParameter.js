const {
  encodeAttribute,
  decodeAttribute,
  ushortToBytes,
  bytesToUshort,
} = require('../types');

module.exports = {
  encode: data => ({
    onboardDate: { value: data.onboardDate },
    groundDate: { value: data.groundDate },
    convertedValue: encodeAttribute(data.convertedValue),
    rawValue: encodeAttribute(data.rawValue),
    extractedValue: encodeAttribute(data.extractedValue),
    triggerOnCounter: { value: ushortToBytes(data.triggerOnCounter) },
    triggerOffCounter: { value: ushortToBytes(data.triggerOffCounter) },
    monitoringState: data.monitoringState,
    validityState: data.validityState,
    isObsolete: { value: data.isObsolete },
    isNominal: { value: data.isNominal },
  }),
  decode: data => ({
    onboardDate: data.onboardDate.value.toNumber(),
    groundDate: data.groundDate.value.toNumber(),
    convertedValue: decodeAttribute(data.convertedValue),
    rawValue: decodeAttribute(data.rawValue),
    extractedValue: decodeAttribute(data.extractedValue),
    triggerOnCounter: data.triggerOnCounter ? bytesToUshort(data.triggerOnCounter.value) : null,
    triggerOffCounter: data.triggerOffCounter ? bytesToUshort(data.triggerOffCounter.value) : null,
    monitoringState: data.monitoringState,
    validityState: data.validityState,
    isObsolete: data.isObsolete ? data.isObsolete.value : null,
    isNominal: data.isNominal ? data.isNominal.value : null,
    referenceTimestamp: data.onboardDate.value.toNumber(),
  }),
};
