// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const pus003DiagnosticPacket = require('./pus003DiagnosticPacket');
const pus003HkPacket = require('./pus003HkPacket');
const pusElement = require('./pusElement');
const tIME = require('../ccsds_mal/tIME');
const uINTEGER = require('../ccsds_mal/uINTEGER');

module.exports = {
  encode: data => ({
    pus003DiagPacket: _map(data.pus003DiagPacket, d => (pus003DiagnosticPacket.encode(d))),
    numberHkPackets: (data.numberHkPackets !== null && typeof data.numberHkPackets !== 'undefined')
      ? uINTEGER.encode(data.numberHkPackets)
      : null,
    numberDiagPackets: (data.numberDiagPackets !== null && typeof data.numberDiagPackets !== 'undefined')
      ? uINTEGER.encode(data.numberDiagPackets)
      : null,
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? uINTEGER.encode(data.apid)
      : null,
    pus003HkPacket: _map(data.pus003HkPacket, d => (pus003HkPacket.encode(d))),
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? uINTEGER.encode(data.status)
      : null,
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? tIME.encode(data.groundDate)
      : null,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.encode(data.pusElement)
      : null,
  }),
  decode: data => ({
    pus003DiagPacket: _map(data.pus003DiagPacket, d => (pus003DiagnosticPacket.decode(d))),
    numberHkPackets: (data.numberHkPackets !== null && typeof data.numberHkPackets !== 'undefined')
      ? uINTEGER.decode(data.numberHkPackets)
      : undefined,
    numberDiagPackets: (data.numberDiagPackets !== null && typeof data.numberDiagPackets !== 'undefined')
      ? uINTEGER.decode(data.numberDiagPackets)
      : undefined,
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? uINTEGER.decode(data.apid)
      : undefined,
    pus003HkPacket: _map(data.pus003HkPacket, d => (pus003HkPacket.decode(d))),
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? uINTEGER.decode(data.status)
      : undefined,
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? tIME.decode(data.groundDate)
      : undefined,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.decode(data.pusElement)
      : undefined,
    referenceTimestamp: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
        ? { type: 'time', value: data.groundDate.value.toNumber() }
        : undefined,
  }),
};
