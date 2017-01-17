// Generated file
const _map = require('lodash/map');
const pus014EventReportPacket = require('./pus014EventReportPacket');
const pus014HkOrDiagPacket = require('./pus014HkOrDiagPacket');
const pus014TmPacket = require('./pus014TmPacket');
const pusElement = require('./pusElement');

module.exports = {
  encode: data => ({
    pus014EventReportPacket: _map(data.pus014EventReportPacket, d => (pus014EventReportPacket.encode(d))),
    pus014HkPacket: _map(data.pus014HkPacket, d => (pus014HkOrDiagPacket.encode(d))),
    pus014TmPacket: _map(data.pus014TmPacket, d => (pus014TmPacket.encode(d))),
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? { value: data.groundDate }
      : null,
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? { value: data.apid }
      : null,
    pus014DiagPacket: _map(data.pus014DiagPacket, d => (pus014HkOrDiagPacket.encode(d))),
    noEventReportPackets: (data.noEventReportPackets !== null && typeof data.noEventReportPackets !== 'undefined')
      ? { value: data.noEventReportPackets }
      : null,
    noDiagPackets: (data.noDiagPackets !== null && typeof data.noDiagPackets !== 'undefined')
      ? { value: data.noDiagPackets }
      : null,
    noHKPackets: (data.noHKPackets !== null && typeof data.noHKPackets !== 'undefined')
      ? { value: data.noHKPackets }
      : null,
    noTMPackets: (data.noTMPackets !== null && typeof data.noTMPackets !== 'undefined')
      ? { value: data.noTMPackets }
      : null,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.encode(data.pusElement)
      : null,
  }),
  decode: data => ({
    pus014EventReportPacket: _map(data.pus014EventReportPacket, d => (pus014EventReportPacket.decode(d))),
    pus014HkPacket: _map(data.pus014HkPacket, d => (pus014HkOrDiagPacket.decode(d))),
    pus014TmPacket: _map(data.pus014TmPacket, d => (pus014TmPacket.decode(d))),
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? { type: 'time', value: data.groundDate.value.toNumber() }
      : undefined,
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? { type: 'uinteger', value: data.apid.value }
      : undefined,
    pus014DiagPacket: _map(data.pus014DiagPacket, d => (pus014HkOrDiagPacket.decode(d))),
    noEventReportPackets: (data.noEventReportPackets !== null && typeof data.noEventReportPackets !== 'undefined')
      ? { type: 'uinteger', value: data.noEventReportPackets.value }
      : undefined,
    noDiagPackets: (data.noDiagPackets !== null && typeof data.noDiagPackets !== 'undefined')
      ? { type: 'uinteger', value: data.noDiagPackets.value }
      : undefined,
    noHKPackets: (data.noHKPackets !== null && typeof data.noHKPackets !== 'undefined')
      ? { type: 'uinteger', value: data.noHKPackets.value }
      : undefined,
    noTMPackets: (data.noTMPackets !== null && typeof data.noTMPackets !== 'undefined')
      ? { type: 'uinteger', value: data.noTMPackets.value }
      : undefined,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.decode(data.pusElement)
      : undefined,
    referenceTimestamp: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
        ? { type: 'time', value: data.groundDate.value.toNumber() }
        : undefined,
  }),
};

