// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _now = require('lodash/now');
const _defaultsDeep = require('lodash/defaultsDeep');
const getPus011Apid = require('./pus011Apid.stub');
const getPusElement = require('./pusElement.stub');

const now = _now();

const pus011Model = {
  maxNoTc: 100,
  scheduleStatus: 100,
  apid: 100,
  noFreeCommands: 100,
  lastUpdateTimeNoFreeCommands: now,
  freeSpace: 100,
  lastUpdateTimeFreeSpace: now,
  spaceInNumberOfCommands: true,
  noSubSchedule: 100,
  pusElement: getPusElement(),
  groundDate: now,
  status: 100,
  pus011Apid: [getPus011Apid(), getPus011Apid()],
  useTimeShifts: true,
  lastUpdateModeFreeSpace: 100,
  lastUpdateModeNoFreeCommands: 100,
  lastUpdateModeScheduleStatus: 100,
  lastUpdateTimeScheduleStatus: now,
};

module.exports = override => (override ? _defaultsDeep({}, override, pus011Model) : pus011Model);
