// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');


const serviceAddress = {
  supportedCapabilities: 100,
  supportedLevels: 100,
  qoSproperties: 100,
  priorityLevels: 100,
  serviceURI: 'myURI',
  dataURI: 'myURI',
  dataName: 'mySTRING',
};

module.exports = override => (override ? _defaultsDeep({}, override, serviceAddress) : serviceAddress);
