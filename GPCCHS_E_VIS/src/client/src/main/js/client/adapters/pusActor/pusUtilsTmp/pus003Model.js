const tIME = require('../ccsds_mal/tIME');
const uLONG = require('../ccsds_mal/uLONG');
const uINTEGER = require('../ccsds_mal/uINTEGER');
const sTRING = require('../ccsds_mal/sTRING');
const pus003DiagnosticPacket = require('./pus003DiagnosticPacket');
const pus003HkPacket = require('./pus003HkPacket');
const _map = require('lodash/map');

module.exports = {
  encode: data => ({
    pus003DiagPacket: _map(data.pus003DiagPacket, diagPacket => pus003DiagnosticPacket.encode(diagPacket)),
    numberHkPackets: (data.numberHkPackets !== null && typeof data.numberHkPackets !== 'undefined')
      ? uINTEGER.encode(data.numberHkPackets)
      : null,
    numberDiagPackets: (data.numberDiagPackets !== null && typeof data.numberDiagPackets !== 'undefined')
      ? uINTEGER.encode(data.numberDiagPackets)
      : null,
    serviceApid: (data.serviceApid !== null && typeof data.serviceApid !== 'undefined')
      ? uINTEGER.encode(data.serviceApid)
      : null,
    pus003HkPacket: _map(data.pus003HkPacket, hkPacket => pus003HkPacket.encode(hkPacket)),
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? uINTEGER.encode(data.status)
      : null,
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? tIME.encode(data.groundDate)
      : null,
    serviceApidName: (data.serviceApidName !== null && typeof data.serviceApidName !== 'undefined')
      ? sTRING.encode(data.serviceApidName)
      : null,
    uniqueId: (data.uniqueId !== null && typeof data.uniqueId !== 'undefined')
      ? uLONG.encode(data.uniqueId)
      : null,
  }),
  decode: data => ({
    pus003DiagPacket: pus003DiagnosticPacket.encode(data.pus003DiagPacket),
    numberHkPackets: (data.numberHkPackets !== null && typeof data.numberHkPackets !== 'undefined')
      ? uINTEGER.decode(data.numberHkPackets)
      : undefined,
    numberDiagPackets: (data.numberDiagPackets !== null && typeof data.numberDiagPackets !== 'undefined')
      ? uINTEGER.decode(data.numberDiagPackets)
      : undefined,
    serviceApid: (data.serviceApid !== null && typeof data.serviceApid !== 'undefined')
      ? uINTEGER.decode(data.serviceApid)
      : undefined,
    pus003HkPacket: pus003HkPacket.decode(data.pus003HkPacket),
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? uINTEGER.decode(data.status)
      : undefined,
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? tIME.decode(data.groundDate)
      : undefined,
    serviceApidName: (data.serviceApidName !== null && typeof data.serviceApidName !== 'undefined')
      ? sTRING.decode(data.serviceApidName)
      : undefined,
    uniqueId: (data.uniqueId !== null && typeof data.uniqueId !== 'undefined')
      ? uLONG.decode(data.uniqueId)
      : undefined,
  }),
};
