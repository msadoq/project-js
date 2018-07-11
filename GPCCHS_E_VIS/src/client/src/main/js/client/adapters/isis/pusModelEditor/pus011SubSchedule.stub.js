// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');


const pus011SubSchedule = {
  serviceApid: 100,
  ssId: 100,
  status: 100,
  ssIdLabel: 'mySTRING',
  lastUpdateModeSubScheduleId: 100,
  lastUpdateTimeSubscheduleId: 'mySTRING',
  lastUpdateModeStatus: 100,
  lastUpdateTimeStatus: 'mySTRING',
  executionTimeFirstTc: 'mySTRING',
  lastUpdateModeExecTimeFirstTc: 100,
  lastUpdateTimeExecTimeFirstTc: 'mySTRING',
  serviceApidName: 'mySTRING',
  uniqueId: 1000,
};

module.exports = override => (override ? _defaultsDeep({}, override, pus011SubSchedule) : pus011SubSchedule);
