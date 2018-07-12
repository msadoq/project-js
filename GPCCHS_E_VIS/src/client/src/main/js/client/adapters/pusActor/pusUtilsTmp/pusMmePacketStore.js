const _string = require('../ccsds_mal/sTRING');
const uinteger = require('../ccsds_mal/uINTEGER');
const ulong = require('../ccsds_mal/uLONG');

module.exports = {
  encode: data => ({
    storeName: (data.storeName !== null && typeof data.storeName !== 'undefined')
    ? _string.encode(data.storeName)
    : null,
    storeId: (data.storeId !== null && typeof data.storeId !== 'undefined')
    ? uinteger.encode(data.storeId)
    : null,
    storeStatus: (data.storeStatus !== null && typeof data.storeStatus !== 'undefined')
    ? uinteger.encode(data.storeStatus)
    : null,
    subSamplingRatio: (data.subSamplingRatio !== null && typeof data.subSamplingRatio !== 'undefined')
    ? uinteger.encode(data.subSamplingRatio)
    : null,
    lastUpdateModeStoreId: (data.lastUpdateModeStoreId !== null && typeof data.lastUpdateModeStoreId !== 'undefined')
    ? uinteger.encode(data.lastUpdateModeStoreId)
    : null,
    lastUpdateTimeStoreId: (data.lastUpdateTimeStoreId !== null && typeof data.lastUpdateTimeStoreId !== 'undefined')
    ? _string.encode(data.lastUpdateTimeStoreId)
    : null,
    lastUpdateModeStoreStatus: (data.lastUpdateModeStoreStatus !== null && typeof data.lastUpdateModeStoreStatus !== 'undefined')
    ? uinteger.encode(data.lastUpdateModeStoreStatus)
    : null,
    lastUpdateTimeStoreStatus: (data.lastUpdateTimeStoreStatus !== null && typeof data.lastUpdateTimeStoreStatus !== 'undefined')
    ? _string.encode(data.lastUpdateTimeStoreStatus)
    : null,
    lastUpdateModeSubSamplingRatio: (data.lastUpdateModeSubSamplingRatio !== null && typeof data.lastUpdateModeSubSamplingRatio !== 'undefined')
    ? uinteger.encode(data.lastUpdateModeSubSamplingRatio)
    : null,
    lastUpdateTimeSubSamplingRatio: (data.lastUpdateTimeSubSamplingRatio !== null && typeof data.lastUpdateTimeSubSamplingRatio !== 'undefined')
    ? _string.encode(data.lastUpdateTimeSubSamplingRatio)
    : null,
    uniqueId: (data.uniqueId !== null && typeof data.uniqueId !== 'undefined')
    ? ulong.encode(data.uniqueId)
    : null,
  }),
  decode: data => ({
    storeName: (data.storeName !== null && typeof data.storeName !== 'undefined')
    ? _string.decode(data.storeName)
    : null,
    storeId: (data.storeId !== null && typeof data.storeId !== 'undefined')
    ? uinteger.decode(data.storeId)
    : null,
    storeStatus: (data.storeStatus !== null && typeof data.storeStatus !== 'undefined')
    ? uinteger.decode(data.storeStatus)
    : null,
    subSamplingRatio: (data.subSamplingRatio !== null && typeof data.subSamplingRatio !== 'undefined')
    ? uinteger.decode(data.subSamplingRatio)
    : null,
    lastUpdateModeStoreId: (data.lastUpdateModeStoreId !== null && typeof data.lastUpdateModeStoreId !== 'undefined')
    ? uinteger.decode(data.lastUpdateModeStoreId)
    : null,
    lastUpdateTimeStoreId: (data.lastUpdateTimeStoreId !== null && typeof data.lastUpdateTimeStoreId !== 'undefined')
    ? _string.decode(data.lastUpdateTimeStoreId)
    : null,
    lastUpdateModeStoreStatus: (data.lastUpdateModeStoreStatus !== null && typeof data.lastUpdateModeStoreStatus !== 'undefined')
    ? uinteger.decode(data.lastUpdateModeStoreStatus)
    : null,
    lastUpdateTimeStoreStatus: (data.lastUpdateTimeStoreStatus !== null && typeof data.lastUpdateTimeStoreStatus !== 'undefined')
    ? _string.decode(data.lastUpdateTimeStoreStatus)
    : null,
    lastUpdateModeSubSamplingRatio: (data.lastUpdateModeSubSamplingRatio !== null && typeof data.lastUpdateModeSubSamplingRatio !== 'undefined')
    ? uinteger.decode(data.lastUpdateModeSubSamplingRatio)
    : null,
    lastUpdateTimeSubSamplingRatio: (data.lastUpdateTimeSubSamplingRatio !== null && typeof data.lastUpdateTimeSubSamplingRatio !== 'undefined')
    ? _string.decode(data.lastUpdateTimeSubSamplingRatio)
    : null,
    uniqueId: (data.uniqueId !== null && typeof data.uniqueId !== 'undefined')
    ? ulong.decode(data.uniqueId)
    : null,
  }),
};
