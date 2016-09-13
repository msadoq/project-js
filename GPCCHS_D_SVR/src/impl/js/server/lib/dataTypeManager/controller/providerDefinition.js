const JS = require('../protoFile/providerDefinition.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const ProviderDefinition = JS.ProviderDefinition;

exports.binToJson = (payload) => {
  const decoded = ProviderDefinition.decode(payload);
  const providerDefinition = {
    providerDefinitionName: decoded.providerDefinitionName.value,    providerDefinitionTime: decoded.providerDefinitionTime.value
  };
  return providerDefinition;
};
