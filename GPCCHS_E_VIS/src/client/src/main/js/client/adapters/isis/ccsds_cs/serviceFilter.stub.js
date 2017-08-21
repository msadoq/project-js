// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');


const serviceFilter = {
  area: 10,
  service: 10,
  version: 1,
  factoryID: 10,
  sessionOid: 1000,
  network: 1,
  slotOid: 10,
  domainID: 10,
  providerName: 'mySTRING',
};

module.exports = override => (override ? _defaultsDeep({}, override, serviceFilter) : serviceFilter);
