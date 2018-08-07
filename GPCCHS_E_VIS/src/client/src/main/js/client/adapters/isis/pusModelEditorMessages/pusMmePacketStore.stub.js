// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');


const pusMmePacketStore = {
  storeName: 'mySTRING',
  storeId: 100,
  storeStatus: 100,
  subSamplingRatio: 100,
  lastUpdateModeStoreId: 100,
  lastUpdateTimeStoreId: 'mySTRING',
  lastUpdateModeStoreStatus: 100,
  lastUpdateTimeStoreStatus: 'mySTRING',
  lastUpdateModeSubSamplingRatio: 100,
  lastUpdateTimeSubSamplingRatio: 'mySTRING',
  uniqueId: 1000,
};

module.exports = override => (override ? _defaultsDeep({}, override, pusMmePacketStore) : pusMmePacketStore);
