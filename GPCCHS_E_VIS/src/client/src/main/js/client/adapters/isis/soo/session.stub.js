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

const session = {
  functionalChains: [Buffer.alloc(4, 1), Buffer.alloc(4, 1)],
  mode: 0,
  name: 'mySTRING',
  activity: 0,
  creationDate: now,
};

module.exports = override => (override ? _defaultsDeep({}, override, session) : session);