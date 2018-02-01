// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const pus005OnBoardEvent = require('./pus005OnBoardEvent');
const pusElement = require('./pusElement');
const tIME = require('../ccsds_mal/tIME');
const uINTEGER = require('../ccsds_mal/uINTEGER');

module.exports = {
  encode: data => ({
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? uINTEGER.encode(data.apid)
      : null,
    pus005OnBoardEvent: _map(data.pus005OnBoardEvent, d => (pus005OnBoardEvent.encode(d))),
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? tIME.encode(data.groundDate)
      : null,
    noMonitoringEvents: (data.noMonitoringEvents !== null && typeof data.noMonitoringEvents !== 'undefined')
      ? uINTEGER.encode(data.noMonitoringEvents)
      : null,
    noEventReports: (data.noEventReports !== null && typeof data.noEventReports !== 'undefined')
      ? uINTEGER.encode(data.noEventReports)
      : null,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.encode(data.pusElement)
      : null,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? uINTEGER.encode(data.status)
      : null,
  }),
  decode: data => ({
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? uINTEGER.decode(data.apid)
      : undefined,
    pus005OnBoardEvent: _map(data.pus005OnBoardEvent, d => (pus005OnBoardEvent.decode(d))),
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? tIME.decode(data.groundDate)
      : undefined,
    noMonitoringEvents: (data.noMonitoringEvents !== null && typeof data.noMonitoringEvents !== 'undefined')
      ? uINTEGER.decode(data.noMonitoringEvents)
      : undefined,
    noEventReports: (data.noEventReports !== null && typeof data.noEventReports !== 'undefined')
      ? uINTEGER.decode(data.noEventReports)
      : undefined,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.decode(data.pusElement)
      : undefined,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? uINTEGER.decode(data.status)
      : undefined,
    referenceTimestamp: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
        ? { type: 'time', value: data.groundDate.value.toNumber() }
        : undefined,
  }),
};
