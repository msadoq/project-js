// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _now = require('lodash/now');
const _defaultsDeep = require('lodash/defaultsDeep');
const getServiceAddress = require('./serviceAddress.stub');

const now = _now();

const provider = {
  slotID: 10,
  factoryID: 10,
  providerName: 'mySTRING',
  network: 1,
  session: 1000,
  serviceProperties: 100,
  serviceAddress: getServiceAddress(),
  providerProperties: 'mySTRING',
  providerTime: now,
};

module.exports = override => (override ? _defaultsDeep({}, override, provider) : provider);
