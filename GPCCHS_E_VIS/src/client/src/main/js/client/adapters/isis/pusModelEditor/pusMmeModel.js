// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const pusMmePacket = require('./pusMmePacket');
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
    serviceApidName: (data.serviceApidName !== null && typeof data.serviceApidName !== 'undefined')
      ? sTRING.encode(data.serviceApidName)
      : null,
    uniqueId: (data.uniqueId !== null && typeof data.uniqueId !== 'undefined')
      ? uLONG.encode(data.uniqueId)
      : null,
    pusMmePacket: _map(data.pusMmePacket, d => (pusMmePacket.encode(d))),
    noHkPackets: (data.noHkPackets !== null && typeof data.noHkPackets !== 'undefined')
      ? uINTEGER.encode(data.noHkPackets)
      : null,
    noDiagPackets: (data.noDiagPackets !== null && typeof data.noDiagPackets !== 'undefined')
      ? uINTEGER.encode(data.noDiagPackets)
      : null,
  }),
  decode: data => ({
    serviceApid: (data.serviceApid !== null && typeof data.serviceApid !== 'undefined')
      ? uINTEGER.decode(data.serviceApid)
      : undefined,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? uINTEGER.decode(data.status)
      : undefined,
    serviceApidName: (data.serviceApidName !== null && typeof data.serviceApidName !== 'undefined')
      ? sTRING.decode(data.serviceApidName)
      : undefined,
    uniqueId: (data.uniqueId !== null && typeof data.uniqueId !== 'undefined')
      ? uLONG.decode(data.uniqueId)
      : undefined,
    pusMmePacket: _map(data.pusMmePacket, d => (pusMmePacket.decode(d))),
    noHkPackets: (data.noHkPackets !== null && typeof data.noHkPackets !== 'undefined')
      ? uINTEGER.decode(data.noHkPackets)
      : undefined,
    noDiagPackets: (data.noDiagPackets !== null && typeof data.noDiagPackets !== 'undefined')
      ? uINTEGER.decode(data.noDiagPackets)
      : undefined,
  }),
};
