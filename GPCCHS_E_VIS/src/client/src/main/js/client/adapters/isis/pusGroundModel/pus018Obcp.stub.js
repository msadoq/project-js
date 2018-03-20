// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');
const getPusElement = require('./pusElement.stub');
const getPusParameter = require('./pusParameter.stub');

const pus018Obcp = {
  id: 100,
  status: 'mySTRING',
  stepId: 'mySTRING',
  partitionId: 'mySTRING',
  observabilityLevel: 'mySTRING',
  priority: 'mySTRING',
  pus18Parameter: [getPusParameter(), getPusParameter()],
  pusElement: getPusElement(),
};

module.exports = override => (override ? _defaultsDeep({}, override, pus018Obcp) : pus018Obcp);
