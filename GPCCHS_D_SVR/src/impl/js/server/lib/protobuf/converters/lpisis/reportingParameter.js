const { encodeAttribute, decodeAttribute, uintToBytes, bytesToUint } = require('./types');

module.exports = {
  encode: data => ({
    onboardDate: { value: data.onboardDate },
    groundDate: { value: data.groundDate },
    convertedValue: encodeAttribute(data.convertedValue),
    rawValue: encodeAttribute(data.rawValue),
    extractedValue: encodeAttribute(data.extractedValue),
    triggerOnCounter: { value: uintToBytes(data.triggerOnCounter) },
    triggerOffCounter: { value: uintToBytes(data.triggerOffCounter) },
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
    triggerOnCounter: bytesToUint(data.triggerOnCounter.value),
    triggerOffCounter: bytesToUint(data.triggerOffCounter.value),
    monitoringState: data.monitoringState,
    validityState: data.validityState,
    isObsolete: data.isObsolete.value,
    isNominal: data.isNominal.value,
    getReferenceTimestamp: () => data.onboardDate.value.toNumber(),
  }),
};
