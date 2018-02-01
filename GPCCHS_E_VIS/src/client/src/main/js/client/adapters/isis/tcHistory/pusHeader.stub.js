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


const now = _now();

const pusHeader = {
  versionNumber: 1,
  sequenceCount: 100,
  sourceId: 100,
  serviceType: 1,
  serviceSubType: 1,
  subCounter: 1,
  destinationId: 1,
  time: now + 1,
};

module.exports = override => (override ? _defaultsDeep({}, override, pusHeader) : pusHeader);
