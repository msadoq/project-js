// Produced by Acceleo JavaScript Generator 1.1.0
const _now = require('lodash/now');
const applyOverride = require('../../applyOverride');
const getPus015PacketStore = require('./pus015PacketStore');
const getPusElement = require('./pusElement');

const now = _now();

module.exports = override => applyOverride({
  pus015PacketStore: [getPus015PacketStore(), getPus015PacketStore()],
  groundDate: now,
  apid: 100,
  noPacketStores: 100,
  pusElement: getPusElement(),
}, override);

