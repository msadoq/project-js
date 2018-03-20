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
const getStatValue = require('./statValue.stub');

const now = _now();

const statAggregation = {
  statDate: now,
  statValue: getStatValue(),
};

module.exports = override => (override ? _defaultsDeep({}, override, statAggregation) : statAggregation);
