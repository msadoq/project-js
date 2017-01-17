// Generated file


module.exports = {
  encode: data => ({
    providerDefinitionName: (data.providerDefinitionName !== null && typeof data.providerDefinitionName !== 'undefined')
      ? { value: data.providerDefinitionName }
      : null,
    providerDefinitionTime: (data.providerDefinitionTime !== null && typeof data.providerDefinitionTime !== 'undefined')
      ? { value: data.providerDefinitionTime }
      : null,
  }),
  decode: data => ({
    providerDefinitionName: (data.providerDefinitionName !== null && typeof data.providerDefinitionName !== 'undefined')
      ? { type: 'identifier', value: data.providerDefinitionName.value.toBuffer() }
      : undefined,
    providerDefinitionTime: (data.providerDefinitionTime !== null && typeof data.providerDefinitionTime !== 'undefined')
      ? { type: 'time', value: data.providerDefinitionTime.value.toNumber() }
      : undefined,
    referenceTimestamp: (data.providerDefinitionTime !== null && typeof data.providerDefinitionTime !== 'undefined')
        ? { type: 'time', value: data.providerDefinitionTime.value.toNumber() }
        : undefined,
  }),
};

