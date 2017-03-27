// Produced by Acceleo JavaScript Generator 1.1.0
const _map = require('lodash/map');
const pus015PacketStore = require('./pus015PacketStore');
const pusElement = require('./pusElement');

module.exports = {
  encode: data => ({
    pus015PacketStore: _map(data.pus015PacketStore, d => (pus015PacketStore.encode(d))),
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? { value: data.groundDate }
      : null,
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? { value: data.apid }
      : null,
    noPacketStores: (data.noPacketStores !== null && typeof data.noPacketStores !== 'undefined')
      ? { value: data.noPacketStores }
      : null,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.encode(data.pusElement)
      : null,
  }),
  decode: data => ({
    pus015PacketStore: _map(data.pus015PacketStore, d => (pus015PacketStore.decode(d))),
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? { type: 'time', value: data.groundDate.value.toNumber() }
      : undefined,
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? { type: 'uinteger', value: data.apid.value }
      : undefined,
    noPacketStores: (data.noPacketStores !== null && typeof data.noPacketStores !== 'undefined')
      ? { type: 'uinteger', value: data.noPacketStores.value }
      : undefined,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.decode(data.pusElement)
      : undefined,
    referenceTimestamp: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
        ? { type: 'time', value: data.groundDate.value.toNumber() }
        : undefined,
  }),
};

