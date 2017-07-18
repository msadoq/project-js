// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
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
    noCommands: (data.noCommands !== null && typeof data.noCommands !== 'undefined')
      ? uINTEGER.encode(data.noCommands)
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
    noCommands: (data.noCommands !== null && typeof data.noCommands !== 'undefined')
      ? uINTEGER.decode(data.noCommands)
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
    referenceTimestamp: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
        ? { type: 'time', value: data.groundDate.value.toNumber() }
        : undefined,
  }),
};
