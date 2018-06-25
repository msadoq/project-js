// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _now = require('lodash/now');
const _defaultsDeep = require('lodash/defaultsDeep');
const getFunctionalChain = require('./functionalChain.stub');
const getNamedValue = require('../ccsds_mal/namedValue.stub');
const getResult = require('./result.stub');
const getStatus = require('./status.stub');

const now = _now();

const groupOfOperation = {
  operationId: -1000,
  earliestStartDate: now,
  latestStartDate: now,
  operation: [Buffer.alloc(4, 1), Buffer.alloc(4, 1)],
  expected_duration: 42.5,
  layer: 'mySTRING',
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
  functionalChain: getFunctionalChain(),
  statuses: [getStatus(), getStatus()],
  activity: 0,
};

module.exports = override => (override ? _defaultsDeep({}, override, groupOfOperation) : groupOfOperation);
