// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const bOOLEAN = require('../ccsds_mal/bOOLEAN');
const iNTEGER = require('../ccsds_mal/iNTEGER');
const pus011Apid = require('./pus011Apid');
const pus011Command = require('./pus011Command');
const pus011SubSchedule = require('./pus011SubSchedule');
const sTRING = require('../ccsds_mal/sTRING');
const uINTEGER = require('../ccsds_mal/uINTEGER');
const uLONG = require('../ccsds_mal/uLONG');

module.exports = {
  encode: data => ({
    serviceApid: (data.serviceApid !== null && typeof data.serviceApid !== 'undefined')
      ? uINTEGER.encode(data.serviceApid)
      : null,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? uINTEGER.encode(data.status)
      : null,
    spaceInNumberOfCommands: (data.spaceInNumberOfCommands !== null && typeof data.spaceInNumberOfCommands !== 'undefined')
      ? bOOLEAN.encode(data.spaceInNumberOfCommands)
      : null,
    scheduleStatus: (data.scheduleStatus !== null && typeof data.scheduleStatus !== 'undefined')
      ? uINTEGER.encode(data.scheduleStatus)
      : null,
    lastUpdateTimeScheduleStatus: (data.lastUpdateTimeScheduleStatus !== null && typeof data.lastUpdateTimeScheduleStatus !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeScheduleStatus)
      : null,
    lastUpdateModeScheduleStatus: (data.lastUpdateModeScheduleStatus !== null && typeof data.lastUpdateModeScheduleStatus !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeScheduleStatus)
      : null,
    noFreeCommands: (data.noFreeCommands !== null && typeof data.noFreeCommands !== 'undefined')
      ? iNTEGER.encode(data.noFreeCommands)
      : null,
    lastUpdateTimeNoFreeCommands: (data.lastUpdateTimeNoFreeCommands !== null && typeof data.lastUpdateTimeNoFreeCommands !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeNoFreeCommands)
      : null,
    lastUpdateModeNoFreeCommands: (data.lastUpdateModeNoFreeCommands !== null && typeof data.lastUpdateModeNoFreeCommands !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeNoFreeCommands)
      : null,
    freeSpace: (data.freeSpace !== null && typeof data.freeSpace !== 'undefined')
      ? iNTEGER.encode(data.freeSpace)
      : null,
    lastUpdateTimeFreeSpace: (data.lastUpdateTimeFreeSpace !== null && typeof data.lastUpdateTimeFreeSpace !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeFreeSpace)
      : null,
    lastUpdateModeFreeSpace: (data.lastUpdateModeFreeSpace !== null && typeof data.lastUpdateModeFreeSpace !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeFreeSpace)
      : null,
    pus011Apid: _map(data.pus011Apid, d => (pus011Apid.encode(d))),
    pus011Command: _map(data.pus011Command, d => (pus011Command.encode(d))),
    pus011SubSchedule: _map(data.pus011SubSchedule, d => (pus011SubSchedule.encode(d))),
    serviceApidName: (data.serviceApidName !== null && typeof data.serviceApidName !== 'undefined')
      ? sTRING.encode(data.serviceApidName)
      : null,
    uniqueId: (data.uniqueId !== null && typeof data.uniqueId !== 'undefined')
      ? uLONG.encode(data.uniqueId)
      : null,
  }),
  decode: data => ({
    serviceApid: (data.serviceApid !== null && typeof data.serviceApid !== 'undefined')
      ? uINTEGER.decode(data.serviceApid)
      : undefined,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? uINTEGER.decode(data.status)
      : undefined,
    spaceInNumberOfCommands: (data.spaceInNumberOfCommands !== null && typeof data.spaceInNumberOfCommands !== 'undefined')
      ? bOOLEAN.decode(data.spaceInNumberOfCommands)
      : undefined,
    scheduleStatus: (data.scheduleStatus !== null && typeof data.scheduleStatus !== 'undefined')
      ? uINTEGER.decode(data.scheduleStatus)
      : undefined,
    lastUpdateTimeScheduleStatus: (data.lastUpdateTimeScheduleStatus !== null && typeof data.lastUpdateTimeScheduleStatus !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeScheduleStatus)
      : undefined,
    lastUpdateModeScheduleStatus: (data.lastUpdateModeScheduleStatus !== null && typeof data.lastUpdateModeScheduleStatus !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeScheduleStatus)
      : undefined,
    noFreeCommands: (data.noFreeCommands !== null && typeof data.noFreeCommands !== 'undefined')
      ? iNTEGER.decode(data.noFreeCommands)
      : undefined,
    lastUpdateTimeNoFreeCommands: (data.lastUpdateTimeNoFreeCommands !== null && typeof data.lastUpdateTimeNoFreeCommands !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeNoFreeCommands)
      : undefined,
    lastUpdateModeNoFreeCommands: (data.lastUpdateModeNoFreeCommands !== null && typeof data.lastUpdateModeNoFreeCommands !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeNoFreeCommands)
      : undefined,
    freeSpace: (data.freeSpace !== null && typeof data.freeSpace !== 'undefined')
      ? iNTEGER.decode(data.freeSpace)
      : undefined,
    lastUpdateTimeFreeSpace: (data.lastUpdateTimeFreeSpace !== null && typeof data.lastUpdateTimeFreeSpace !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeFreeSpace)
      : undefined,
    lastUpdateModeFreeSpace: (data.lastUpdateModeFreeSpace !== null && typeof data.lastUpdateModeFreeSpace !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeFreeSpace)
      : undefined,
    pus011Apid: _map(data.pus011Apid, d => (pus011Apid.decode(d))),
    pus011Command: _map(data.pus011Command, d => (pus011Command.decode(d))),
    pus011SubSchedule: _map(data.pus011SubSchedule, d => (pus011SubSchedule.decode(d))),
    serviceApidName: (data.serviceApidName !== null && typeof data.serviceApidName !== 'undefined')
      ? sTRING.decode(data.serviceApidName)
      : undefined,
    uniqueId: (data.uniqueId !== null && typeof data.uniqueId !== 'undefined')
      ? uLONG.decode(data.uniqueId)
      : undefined,
  }),
};
