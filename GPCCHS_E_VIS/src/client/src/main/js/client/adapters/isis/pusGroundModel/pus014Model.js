// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const pus014EventReportPacket = require('./pus014EventReportPacket');
const pus014HkOrDiagPacket = require('./pus014HkOrDiagPacket');
const pus014TmPacket = require('./pus014TmPacket');
const pusElement = require('./pusElement');
const tIME = require('../ccsds_mal/tIME');
const uINTEGER = require('../ccsds_mal/uINTEGER');

module.exports = {
  encode: data => ({
    pus014EventReportPacket: _map(data.pus014EventReportPacket, d => (pus014EventReportPacket.encode(d))),
    pus014HkPacket: _map(data.pus014HkPacket, d => (pus014HkOrDiagPacket.encode(d))),
    pus014TmPacket: _map(data.pus014TmPacket, d => (pus014TmPacket.encode(d))),
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? tIME.encode(data.groundDate)
      : null,
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? uINTEGER.encode(data.apid)
      : null,
    pus014DiagPacket: _map(data.pus014DiagPacket, d => (pus014HkOrDiagPacket.encode(d))),
    noEventReportPackets: (data.noEventReportPackets !== null && typeof data.noEventReportPackets !== 'undefined')
      ? uINTEGER.encode(data.noEventReportPackets)
      : null,
    noDiagPackets: (data.noDiagPackets !== null && typeof data.noDiagPackets !== 'undefined')
      ? uINTEGER.encode(data.noDiagPackets)
      : null,
    noHKPackets: (data.noHKPackets !== null && typeof data.noHKPackets !== 'undefined')
      ? uINTEGER.encode(data.noHKPackets)
      : null,
    noTMPackets: (data.noTMPackets !== null && typeof data.noTMPackets !== 'undefined')
      ? uINTEGER.encode(data.noTMPackets)
      : null,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.encode(data.pusElement)
      : null,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? uINTEGER.encode(data.status)
      : null,
  }),
  decode: data => ({
    pus014EventReportPacket: _map(data.pus014EventReportPacket, d => (pus014EventReportPacket.decode(d))),
    pus014HkPacket: _map(data.pus014HkPacket, d => (pus014HkOrDiagPacket.decode(d))),
    pus014TmPacket: _map(data.pus014TmPacket, d => (pus014TmPacket.decode(d))),
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? tIME.decode(data.groundDate)
      : undefined,
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? uINTEGER.decode(data.apid)
      : undefined,
    pus014DiagPacket: _map(data.pus014DiagPacket, d => (pus014HkOrDiagPacket.decode(d))),
    noEventReportPackets: (data.noEventReportPackets !== null && typeof data.noEventReportPackets !== 'undefined')
      ? uINTEGER.decode(data.noEventReportPackets)
      : undefined,
    noDiagPackets: (data.noDiagPackets !== null && typeof data.noDiagPackets !== 'undefined')
      ? uINTEGER.decode(data.noDiagPackets)
      : undefined,
    noHKPackets: (data.noHKPackets !== null && typeof data.noHKPackets !== 'undefined')
      ? uINTEGER.decode(data.noHKPackets)
      : undefined,
    noTMPackets: (data.noTMPackets !== null && typeof data.noTMPackets !== 'undefined')
      ? uINTEGER.decode(data.noTMPackets)
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
