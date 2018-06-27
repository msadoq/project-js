// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _now = require('lodash/now');
const _defaultsDeep = require('lodash/defaultsDeep');
const getPus015Packet = require('./pus015Packet.stub');
const getPusElement = require('./pusElement.stub');

const now = _now();

const pus015PacketStore = {
  name: 'mySTRING',
  id: 100,
  status: 100,
  storageType: 'mySTRING',
  dumpEnabled: true,
  pus015Packet: [getPus015Packet(), getPus015Packet()],
  pusElement: getPusElement(),
  hkStatusParameterName: 'mySTRING',
  lastUpdateModeStoreId: 100,
  lastUpdateTimeStoreId: now,
  lastUpdateModeStoreType: 100,
  lastUpdateTimeStoreType: now,
  lastUpdateModeStoreStatus: 100,
  lastUpdateTimeStoreStatus: now,
};

module.exports = override => (override ? _defaultsDeep({}, override, pus015PacketStore) : pus015PacketStore);
