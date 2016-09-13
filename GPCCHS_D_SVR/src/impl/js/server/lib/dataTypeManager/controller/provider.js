const JS = require('../protoFile/provider.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const Provider = JS.Provider;

exports.binToJson = (payload) => {
  const decoded = Provider.decode(payload);
  const provider = {
    slotID: decoded.slotID.value,    factoryID: decoded.factoryID.value,    providerName: decoded.providerName.value,    network: decoded.network.value,    session: decoded.session.value,    serviceProperties: decoded.serviceProperties.value,    serviceAddress: decoded.serviceAddress.value,    providerProperties: decoded.providerProperties.value,    providerTime: decoded.providerTime.value
  };
  return provider;
};
