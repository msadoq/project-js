// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');


const pus012MonitoringCheckProperties = {
  ridStatus: 100,
  actionStatus: 100,
  value: 'mySTRING',
  rid: 100,
  mask: 'mySTRING',
  actionName: 'mySTRING',
  ridLabel: 'mySTRING',
};

module.exports = override => (override ? _defaultsDeep({}, override, pus012MonitoringCheckProperties) : pus012MonitoringCheckProperties);
