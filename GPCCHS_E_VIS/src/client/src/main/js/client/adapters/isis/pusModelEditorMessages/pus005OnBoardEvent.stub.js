// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');


const pus005OnBoardEvent = {
  rid: 100,
  onBoardStatus: 100,
  alarmLevel: 'mySTRING',
  lastUpdateModeRid: 100,
  lastUpdateTimeRid: 'mySTRING',
  lastUpdateModeOnBoardStatus: 100,
  lastUpdateTimeOnBoardStatus: 'mySTRING',
  lastUpdateModeAlarmLevel: 100,
  lastUpdateTimeAlarmLevel: 'mySTRING',
  serviceApid: 100,
  serviceApidName: 'mySTRING',
  reportName: 'mySTRING',
  ridLabel: 'mySTRING',
  reportShortDescription: 'mySTRING',
  reportLongDescription: 'mySTRING',
  actionName: 'mySTRING',
  defaultOnBoardStatus: 100,
  uniqueId: 1000,
};

module.exports = override => (override ? _defaultsDeep({}, override, pus005OnBoardEvent) : pus005OnBoardEvent);
