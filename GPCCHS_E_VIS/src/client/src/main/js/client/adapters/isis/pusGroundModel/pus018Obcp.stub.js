// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _now = require('lodash/now');
const _defaultsDeep = require('lodash/defaultsDeep');
const getPusElement = require('./pusElement.stub');
const getPusParameter = require('./pusParameter.stub');

const now = _now();

const pus018Obcp = {
  id: 100,
  status: 'mySTRING',
  stepId: 'mySTRING',
  partitionId: 'mySTRING',
  observabilityLevel: 'mySTRING',
  priority: 'mySTRING',
  pus18Parameter: [getPusParameter(), getPusParameter()],
  pusElement: getPusElement(),
  lastUpdateModeStatus: 1,
  lastUpdateTimeStatus: now,
  lastUpdateModeStepId: 1,
  lastUpdateTimeStepId: now,
  lastUpdateModePartitionId: 1,
  lastUpdateTimePartitionId: now,
  lastUpdateModePriority: 1,
  lastUpdateTimePriority: now,
  lastUpdateModeObsLevel: 1,
  lastUpdateTimeObsLevel: now,
  lastUpdateModeObcpId: 1,
  lastUpdateTimeObcpId: now,
};

module.exports = override => (override ? _defaultsDeep({}, override, pus018Obcp) : pus018Obcp);
