// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const UserContext = require('./userContext');
const User = require('./user');
const ServiceAddress = require('./serviceAddress');
const ProviderDefinition = require('./providerDefinition');
const ServiceFilter = require('./serviceFilter');
const Provider = require('./provider');
const Container = require('./container');

module.exports = {
  UserContext: { type: 'raw', adapter: UserContext },
  User: { type: 'raw', adapter: User },
  ServiceAddress: { type: 'raw', adapter: ServiceAddress },
  ProviderDefinition: { type: 'raw', adapter: ProviderDefinition },
  ServiceFilter: { type: 'raw', adapter: ServiceFilter },
  Provider: { type: 'raw', adapter: Provider },
  Container: { type: 'raw', adapter: Container },
};
