// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');
const getPus011CommandParameter = require('./pus011CommandParameter.stub');
const getPus011TimeShift = require('./pus011TimeShift.stub');

const pus011Command = {
  uniqueId: 1000,
  commandApid: 100,
  commandApidName: 'mySTRING',
  commandName: 'mySTRING',
  commandDescription: 'mySTRING',
  commandSequenceCount: 100,
  commandSourceId: 100,
  commandSsId: 100,
  serviceApid: 100,
  lastUpdateModeCommandId: 100,
  lastUpdateTimeCommandId: 'mySTRING',
  commandBinaryProfile: 'mySTRING',
  lastUpdateModeBinProf: 100,
  lastUpdateTimeBinProf: 'mySTRING',
  commandGroundStatus: 'mySTRING',
  lastUpdateModeGroundStatus: 100,
  lastUpdateTimeGroundStatus: 'mySTRING',
  commandStatus: 100,
  lastUpdateModeStatus: 100,
  lastUpdateTimeStatus: 'mySTRING',
  currentExecutionTime: 'mySTRING',
  lastUpdateModeCurrentExecTime: 100,
  lastUpdateTimeCurrentExecTime: 'mySTRING',
  initialExecutionTime: 'mySTRING',
  lastUpdateModeInitialExecTime: 100,
  lastUpdateTimeInitialExecTime: 'mySTRING',
  totalTimeShiftOffset: -100,
  lastUpdateModeTotalTimeShiftOffset: 100,
  lastUpdateTimeTotalTimeShiftOffset: 'mySTRING',
  pus011CommandParameters: [getPus011CommandParameter(), getPus011CommandParameter()],
  pus011TimeShift: [getPus011TimeShift(), getPus011TimeShift()],
  serviceApidName: 'mySTRING',
};

module.exports = override => (override ? _defaultsDeep({}, override, pus011Command) : pus011Command);
