// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _now = require('lodash/now');
const _defaultsDeep = require('lodash/defaultsDeep');
const getPus015PacketStore = require('./pus015PacketStore.stub');
const getPusElement = require('./pusElement.stub');

const now = _now();

const pus015Model = {
  pus015PacketStore: [getPus015PacketStore(), getPus015PacketStore()],
  groundDate: now,
  apid: 100,
  noPacketStores: 100,
  pusElement: getPusElement(),
  status: 100,
};

module.exports = override => (override ? _defaultsDeep({}, override, pus015Model) : pus015Model);
