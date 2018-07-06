const uINTEGER = require('../ccsds_mal/uINTEGER');
const bOOLEAN = require('../ccsds_mal/bOOLEAN');
const sTRING = require('../ccsds_mal/sTRING');
const uLONG = require('../ccsds_mal/uLONG');
const pus011Apid = require('./pus011Apid');
const pus011Command = require('./pus011Command');
const pus011SubSchedule = require('./pus011SubSchedule');
const _map = require('lodash/map');


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
      ? uINTEGER.encode(data.noFreeCommands)
      : null,
    lastUpdateTimeNoFreeCommands: (data.lastUpdateTimeNoFreeCommands !== null && typeof data.lastUpdateTimeNoFreeCommands !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeNoFreeCommands)
      : null,
    lastUpdateModeNoFreeCommands: (data.lastUpdateModeNoFreeCommands !== null && typeof data.lastUpdateModeNoFreeCommands !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeNoFreeCommands)
      : null,
    freeSpace: (data.freeSpace !== null && typeof data.freeSpace !== 'undefined')
      ? uINTEGER.encode(data.freeSpace)
      : null,
    lastUpdateTimeFreeSpace: (data.lastUpdateTimeFreeSpace !== null && typeof data.lastUpdateTimeFreeSpace !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeFreeSpace)
      : null,
    lastUpdateModeFreeSpace: (data.lastUpdateModeFreeSpace !== null && typeof data.lastUpdateModeFreeSpace !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeFreeSpace)
      : null,
    pus011Apid: _map(data.pus011Apid, pusApid => pus011Apid.encode(pusApid)),
    pus011Command: _map(data.pus011Command, pusCommand => pus011Command.encode(pusCommand)),
    pus011SubSchedule: _map(data.pus011SubSchedule, subSchedule => pus011SubSchedule.encode(subSchedule)),
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
      ? uINTEGER.decode(data.noFreeCommands)
      : undefined,
    lastUpdateTimeNoFreeCommands: (data.lastUpdateTimeNoFreeCommands !== null && typeof data.lastUpdateTimeNoFreeCommands !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeNoFreeCommands)
      : undefined,
    lastUpdateModeNoFreeCommands: (data.lastUpdateModeNoFreeCommands !== null && typeof data.lastUpdateModeNoFreeCommands !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeNoFreeCommands)
      : undefined,
    freeSpace: (data.freeSpace !== null && typeof data.freeSpace !== 'undefined')
      ? uINTEGER.decode(data.freeSpace)
      : undefined,
    lastUpdateTimeFreeSpace: (data.lastUpdateTimeFreeSpace !== null && typeof data.lastUpdateTimeFreeSpace !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeFreeSpace)
      : undefined,
    lastUpdateModeFreeSpace: (data.lastUpdateModeFreeSpace !== null && typeof data.lastUpdateModeFreeSpace !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeFreeSpace)
      : undefined,
    pus011Apid: _map(data.pus011Apid, pusApid => pus011Apid.decode(pusApid)),
    pus011Command: _map(data.pus011Command, pusCommand => pus011Command.decode(pusCommand)),
    pus011SubSchedule: _map(data.pus011SubSchedule, subSchedule => pus011SubSchedule.decode(subSchedule)),
    serviceApidName: (data.serviceApidName !== null && typeof data.serviceApidName !== 'undefined')
      ? sTRING.decode(data.serviceApidName)
      : undefined,
    uniqueId: (data.uniqueId !== null && typeof data.uniqueId !== 'undefined')
      ? uLONG.decode(data.uniqueId)
      : undefined,
  }),
};
