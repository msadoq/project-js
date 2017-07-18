// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const bOOLEAN = require('../ccsds_mal/bOOLEAN');
const pus015Packet = require('./pus015Packet');
const pusElement = require('./pusElement');
const sTRING = require('../ccsds_mal/sTRING');
const uINTEGER = require('../ccsds_mal/uINTEGER');

module.exports = {
  encode: data => ({
    name: (data.name !== null && typeof data.name !== 'undefined')
      ? sTRING.encode(data.name)
      : null,
    id: (data.id !== null && typeof data.id !== 'undefined')
      ? uINTEGER.encode(data.id)
      : null,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? uINTEGER.encode(data.status)
      : null,
    storageType: (data.storageType !== null && typeof data.storageType !== 'undefined')
      ? uINTEGER.encode(data.storageType)
      : null,
    dumpEnabled: (data.dumpEnabled !== null && typeof data.dumpEnabled !== 'undefined')
      ? bOOLEAN.encode(data.dumpEnabled)
      : null,
    pus015Packet: _map(data.pus015Packet, d => (pus015Packet.encode(d))),
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.encode(data.pusElement)
      : null,
    hkStatusParameterName: (data.hkStatusParameterName !== null && typeof data.hkStatusParameterName !== 'undefined')
      ? sTRING.encode(data.hkStatusParameterName)
      : null,
  }),
  decode: data => ({
    name: (data.name !== null && typeof data.name !== 'undefined')
      ? sTRING.decode(data.name)
      : undefined,
    id: (data.id !== null && typeof data.id !== 'undefined')
      ? uINTEGER.decode(data.id)
      : undefined,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? uINTEGER.decode(data.status)
      : undefined,
    storageType: (data.storageType !== null && typeof data.storageType !== 'undefined')
      ? uINTEGER.decode(data.storageType)
      : undefined,
    dumpEnabled: (data.dumpEnabled !== null && typeof data.dumpEnabled !== 'undefined')
      ? bOOLEAN.decode(data.dumpEnabled)
      : undefined,
    pus015Packet: _map(data.pus015Packet, d => (pus015Packet.decode(d))),
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.decode(data.pusElement)
      : undefined,
    hkStatusParameterName: (data.hkStatusParameterName !== null && typeof data.hkStatusParameterName !== 'undefined')
      ? sTRING.decode(data.hkStatusParameterName)
      : undefined,
  }),
};
