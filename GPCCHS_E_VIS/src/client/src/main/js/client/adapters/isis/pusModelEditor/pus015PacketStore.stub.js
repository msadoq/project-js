// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');
const getPus015Packet = require('./pus015Packet.stub');

const pus015PacketStore = {
  storeId: 100,
  status: 100,
  storageType: 'mySTRING',
  dumpEnabled: true,
  pus015Packet: [getPus015Packet(), getPus015Packet()],
  hkStatusParameterName: 'mySTRING',
  lastUpdateModeStoreId: 100,
  lastUpdateTimeStoreId: 'mySTRING',
  lastUpdateModeStoreType: 100,
  lastUpdateTimeStoreType: 'mySTRING',
  lastUpdateModeStoreStatus: 100,
  lastUpdateTimeStoreStatus: 'mySTRING',
  serviceApidName: 'mySTRING',
  storeName: 'mySTRING',
  serviceApid: 100,
  uniqueId: 1000,
  listPossibleDownlinkVcs: 'mySTRING',
};

module.exports = override => (override ? _defaultsDeep({}, override, pus015PacketStore) : pus015PacketStore);
