// ====================================================================
// HISTORY
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _now = require('lodash/now');
const _defaultsDeep = require('lodash/defaultsDeep');
const getNamedValue = require('../ccsds_mal/namedValue.stub');
const getResult = require('./result.stub');
const getStatus = require('./status.stub');

const now = _now();

const genericOperation = {
  operationId: -1000,
  earliest_start_date: now,
  latest_start_date: now,
  expected_duration: 42.5,
  foreseenDate: now,
  label: 'mySTRING',
  description: 'mySTRING',
  target: 'mySTRING',
  domain: 'mySTRING',
  executor: 'mySTRING',
  criticality: 0,
  operationStatus: 0,
  arguments: ['mySTRING', 'mySTRING'],
  options: [getNamedValue(), getNamedValue()],
  result: getResult(),
  hostname: 'mySTRING',
  functionalChain: Buffer.alloc(4, 1),
  statuses: [getStatus(), getStatus()],
  activity: 0,
};

module.exports = override => (override ? _defaultsDeep({}, override, genericOperation) : genericOperation);
