// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');
const getPus011Apid = require('./pus011Apid.stub');
const getPus011Command = require('./pus011Command.stub');
const getPus011SubSchedule = require('./pus011SubSchedule.stub');

const pus011Model = {
  serviceApid: 100,
  status: 100,
  spaceInNumberOfCommands: true,
  scheduleStatus: 100,
  lastUpdateTimeScheduleStatus: 'mySTRING',
  lastUpdateModeScheduleStatus: 100,
  noFreeCommands: -100,
  lastUpdateTimeNoFreeCommands: 'mySTRING',
  lastUpdateModeNoFreeCommands: 100,
  freeSpace: -100,
  lastUpdateTimeFreeSpace: 'mySTRING',
  lastUpdateModeFreeSpace: 100,
  pus011Apid: [getPus011Apid(), getPus011Apid()],
  pus011Command: [getPus011Command(), getPus011Command()],
  pus011SubSchedule: [getPus011SubSchedule(), getPus011SubSchedule()],
  serviceApidName: 'mySTRING',
  uniqueId: 1000,
};

module.exports = override => (override ? _defaultsDeep({}, override, pus011Model) : pus011Model);
