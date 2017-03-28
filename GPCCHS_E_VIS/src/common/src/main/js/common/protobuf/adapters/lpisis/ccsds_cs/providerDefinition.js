// Produced by Acceleo JavaScript Generator 1.1.0

const {
  stringToBytes,
  bytesToString,

} = require('../types');

module.exports = {
  encode: data => ({
    providerDefinitionName: (data.providerDefinitionName !== null && typeof data.providerDefinitionName !== 'undefined')
      ? { value: stringToBytes(data.providerDefinitionName) }
      : null,
    providerDefinitionTime: (data.providerDefinitionTime !== null && typeof data.providerDefinitionTime !== 'undefined')
      ? { value: data.providerDefinitionTime }
      : null,
  }),
  decode: data => ({
    providerDefinitionName: (data.providerDefinitionName !== null && typeof data.providerDefinitionName !== 'undefined')
      ? { type: 'identifier', value: bytesToString(data.providerDefinitionName.value) }
      : undefined,
    providerDefinitionTime: (data.providerDefinitionTime !== null && typeof data.providerDefinitionTime !== 'undefined')
      ? { type: 'time', value: data.providerDefinitionTime.value.toNumber() }
      : undefined,
    referenceTimestamp: (data.providerDefinitionTime !== null && typeof data.providerDefinitionTime !== 'undefined')
        ? { type: 'time', value: data.providerDefinitionTime.value.toNumber() }
        : undefined,
  }),
};

