// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');
const getPusParameter = require('./pusParameter.stub');

const pus018Obcp = {
  obcpId: 100,
  obcpStatus: 'mySTRING',
  stepId: 'mySTRING',
  partitionId: 'mySTRING',
  observabilityLevel: 'mySTRING',
  priority: 'mySTRING',
  lastUpdateModeStatus: 100,
  lastUpdateTimeStatus: 'mySTRING',
  lastUpdateModeStepId: 100,
  lastUpdateTimeStepId: 'mySTRING',
  lastUpdateModePartitionId: 100,
  lastUpdateTimePartitionId: 'mySTRING',
  lastUpdateModePriority: 100,
  lastUpdateTimePriority: 'mySTRING',
  lastUpdateModeObsLevel: 100,
  lastUpdateTimeObsLevel: 'mySTRING',
  lastUpdateModeObcpId: 100,
  lastUpdateTimeObcpId: 'mySTRING',
  serviceApid: 100,
  serviceApidName: 'mySTRING',
  uniqueId: 1000,
  pusParameter: [getPusParameter(), getPusParameter()],
  status: 100,
};

module.exports = override => (override ? _defaultsDeep({}, override, pus018Obcp) : pus018Obcp);
