// Generated file

const {
  encodeAttribute,
  decodeAttribute,
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
    extractedValue: (data.extractedValue !== null && typeof data.extractedValue !== 'undefined')
      ? encodeAttribute(data.extractedValue)
      : null,
    rawValue: (data.rawValue !== null && typeof data.rawValue !== 'undefined')
      ? encodeAttribute(data.rawValue)
      : null,
    monitoringState: (data.monitoringState !== null && typeof data.monitoringState !== 'undefined')
      ? { value: data.monitoringState }
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
    extractedValue: (data.extractedValue !== null && typeof data.extractedValue !== 'undefined')
      ? decodeAttribute(data.extractedValue)
      : undefined,
    rawValue: (data.rawValue !== null && typeof data.rawValue !== 'undefined')
      ? decodeAttribute(data.rawValue)
      : undefined,
    monitoringState: (data.monitoringState !== null && typeof data.monitoringState !== 'undefined')
      ? { type: 'string', value: data.monitoringState.value }
      : undefined,
  }),
};

