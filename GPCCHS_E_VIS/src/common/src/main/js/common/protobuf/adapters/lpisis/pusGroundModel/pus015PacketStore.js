// Generated file
const _map = require('lodash/map');
const pus015Packet = require('./pus015Packet');
const pusElement = require('./pusElement');

module.exports = {
  encode: data => ({
    name: (data.name !== null && typeof data.name !== 'undefined')
      ? { value: data.name }
      : null,
    id: (data.id !== null && typeof data.id !== 'undefined')
      ? { value: data.id }
      : null,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? { value: data.status }
      : null,
    storageType: (data.storageType !== null && typeof data.storageType !== 'undefined')
      ? { value: data.storageType }
      : null,
    dumpEnabled: (data.dumpEnabled !== null && typeof data.dumpEnabled !== 'undefined')
      ? { value: data.dumpEnabled }
      : null,
    pus015Packet: _map(data.pus015Packet, d => (pus015Packet.encode(d))),
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.encode(data.pusElement)
      : null,
    hkStatusParameterName: (data.hkStatusParameterName !== null && typeof data.hkStatusParameterName !== 'undefined')
      ? { value: data.hkStatusParameterName }
      : null,
  }),
  decode: data => ({
    name: (data.name !== null && typeof data.name !== 'undefined')
      ? { type: 'string', value: data.name.value }
      : undefined,
    id: (data.id !== null && typeof data.id !== 'undefined')
      ? { type: 'uinteger', value: data.id.value }
      : undefined,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? { type: 'uinteger', value: data.status.value }
      : undefined,
    storageType: (data.storageType !== null && typeof data.storageType !== 'undefined')
      ? { type: 'uinteger', value: data.storageType.value }
      : undefined,
    dumpEnabled: (data.dumpEnabled !== null && typeof data.dumpEnabled !== 'undefined')
      ? { type: 'boolean', value: data.dumpEnabled.value }
      : undefined,
    pus015Packet: _map(data.pus015Packet, d => (pus015Packet.decode(d))),
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.decode(data.pusElement)
      : undefined,
    hkStatusParameterName: (data.hkStatusParameterName !== null && typeof data.hkStatusParameterName !== 'undefined')
      ? { type: 'string', value: data.hkStatusParameterName.value }
      : undefined,
  }),
};

