// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const bOOLEAN = require('../ccsds_mal/bOOLEAN');
const pus011Apid = require('./pus011Apid');
const pusElement = require('./pusElement');
const tIME = require('../ccsds_mal/tIME');
const uINTEGER = require('../ccsds_mal/uINTEGER');

module.exports = {
  encode: data => ({
    maxNoTc: (data.maxNoTc !== null && typeof data.maxNoTc !== 'undefined')
      ? uINTEGER.encode(data.maxNoTc)
      : null,
    scheduleStatus: (data.scheduleStatus !== null && typeof data.scheduleStatus !== 'undefined')
      ? uINTEGER.encode(data.scheduleStatus)
      : null,
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? uINTEGER.encode(data.apid)
      : null,
    noFreeCommands: (data.noFreeCommands !== null && typeof data.noFreeCommands !== 'undefined')
      ? uINTEGER.encode(data.noFreeCommands)
      : null,
    lastUpdateTimeNoFreeCommands: (data.lastUpdateTimeNoFreeCommands !== null && typeof data.lastUpdateTimeNoFreeCommands !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeNoFreeCommands)
      : null,
    freeSpace: (data.freeSpace !== null && typeof data.freeSpace !== 'undefined')
      ? uINTEGER.encode(data.freeSpace)
      : null,
    lastUpdateTimeFreeSpace: (data.lastUpdateTimeFreeSpace !== null && typeof data.lastUpdateTimeFreeSpace !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeFreeSpace)
      : null,
    spaceInNumberOfCommands: (data.spaceInNumberOfCommands !== null && typeof data.spaceInNumberOfCommands !== 'undefined')
      ? bOOLEAN.encode(data.spaceInNumberOfCommands)
      : null,
    noSubSchedule: (data.noSubSchedule !== null && typeof data.noSubSchedule !== 'undefined')
      ? uINTEGER.encode(data.noSubSchedule)
      : null,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.encode(data.pusElement)
      : null,
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? tIME.encode(data.groundDate)
      : null,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? uINTEGER.encode(data.status)
      : null,
    pus011Apid: _map(data.pus011Apid, d => (pus011Apid.encode(d))),
    useTimeShifts: (data.useTimeShifts !== null && typeof data.useTimeShifts !== 'undefined')
      ? bOOLEAN.encode(data.useTimeShifts)
      : null,
    lastUpdateModeFreeSpace: (data.lastUpdateModeFreeSpace !== null && typeof data.lastUpdateModeFreeSpace !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeFreeSpace)
      : null,
    lastUpdateModeNoFreeCommands: (data.lastUpdateModeNoFreeCommands !== null && typeof data.lastUpdateModeNoFreeCommands !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeNoFreeCommands)
      : null,
    lastUpdateModeScheduleStatus: (data.lastUpdateModeScheduleStatus !== null && typeof data.lastUpdateModeScheduleStatus !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeScheduleStatus)
      : null,
    lastUpdateTimeScheduleStatus: (data.lastUpdateTimeScheduleStatus !== null && typeof data.lastUpdateTimeScheduleStatus !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeScheduleStatus)
      : null,
  }),
  decode: data => ({
    maxNoTc: (data.maxNoTc !== null && typeof data.maxNoTc !== 'undefined')
      ? uINTEGER.decode(data.maxNoTc)
      : undefined,
    scheduleStatus: (data.scheduleStatus !== null && typeof data.scheduleStatus !== 'undefined')
      ? uINTEGER.decode(data.scheduleStatus)
      : undefined,
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? uINTEGER.decode(data.apid)
      : undefined,
    noFreeCommands: (data.noFreeCommands !== null && typeof data.noFreeCommands !== 'undefined')
      ? uINTEGER.decode(data.noFreeCommands)
      : undefined,
    lastUpdateTimeNoFreeCommands: (data.lastUpdateTimeNoFreeCommands !== null && typeof data.lastUpdateTimeNoFreeCommands !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeNoFreeCommands)
      : undefined,
    freeSpace: (data.freeSpace !== null && typeof data.freeSpace !== 'undefined')
      ? uINTEGER.decode(data.freeSpace)
      : undefined,
    lastUpdateTimeFreeSpace: (data.lastUpdateTimeFreeSpace !== null && typeof data.lastUpdateTimeFreeSpace !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeFreeSpace)
      : undefined,
    spaceInNumberOfCommands: (data.spaceInNumberOfCommands !== null && typeof data.spaceInNumberOfCommands !== 'undefined')
      ? bOOLEAN.decode(data.spaceInNumberOfCommands)
      : undefined,
    noSubSchedule: (data.noSubSchedule !== null && typeof data.noSubSchedule !== 'undefined')
      ? uINTEGER.decode(data.noSubSchedule)
      : undefined,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.decode(data.pusElement)
      : undefined,
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? tIME.decode(data.groundDate)
      : undefined,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? uINTEGER.decode(data.status)
      : undefined,
    pus011Apid: _map(data.pus011Apid, d => (pus011Apid.decode(d))),
    useTimeShifts: (data.useTimeShifts !== null && typeof data.useTimeShifts !== 'undefined')
      ? bOOLEAN.decode(data.useTimeShifts)
      : undefined,
    lastUpdateModeFreeSpace: (data.lastUpdateModeFreeSpace !== null && typeof data.lastUpdateModeFreeSpace !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeFreeSpace)
      : undefined,
    lastUpdateModeNoFreeCommands: (data.lastUpdateModeNoFreeCommands !== null && typeof data.lastUpdateModeNoFreeCommands !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeNoFreeCommands)
      : undefined,
    lastUpdateModeScheduleStatus: (data.lastUpdateModeScheduleStatus !== null && typeof data.lastUpdateModeScheduleStatus !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeScheduleStatus)
      : undefined,
    lastUpdateTimeScheduleStatus: (data.lastUpdateTimeScheduleStatus !== null && typeof data.lastUpdateTimeScheduleStatus !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeScheduleStatus)
      : undefined,
    referenceTimestamp: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
        ? { type: 'time', value: data.groundDate.value.toNumber() }
        : undefined,
  }),
};
