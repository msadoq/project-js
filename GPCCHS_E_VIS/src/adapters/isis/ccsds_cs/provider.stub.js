// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
const _now = require('lodash/now');
const applyOverride = require('../applyOverride');
const getServiceAddress = require('./serviceAddress.stub');

const now = _now();

module.exports = override => applyOverride({
  slotID: 10,
  factoryID: 10,
  providerName: 'mySTRING',
  network: 1,
  session: 1000,
  serviceProperties: 100,
  serviceAddress: getServiceAddress(),
  providerProperties: 'mySTRING',
  providerTime: now,
}, override);
