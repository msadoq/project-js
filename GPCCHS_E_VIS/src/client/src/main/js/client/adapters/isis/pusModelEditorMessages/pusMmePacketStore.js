// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const sTRING = require('../ccsds_mal/sTRING');
const uINTEGER = require('../ccsds_mal/uINTEGER');
const uLONG = require('../ccsds_mal/uLONG');

module.exports = {
  encode: data => ({
    storeName: (data.storeName !== null && typeof data.storeName !== 'undefined')
      ? sTRING.encode(data.storeName)
      : null,
    storeId: (data.storeId !== null && typeof data.storeId !== 'undefined')
      ? uINTEGER.encode(data.storeId)
      : null,
    storeStatus: (data.storeStatus !== null && typeof data.storeStatus !== 'undefined')
      ? uINTEGER.encode(data.storeStatus)
      : null,
    subSamplingRatio: (data.subSamplingRatio !== null && typeof data.subSamplingRatio !== 'undefined')
      ? uINTEGER.encode(data.subSamplingRatio)
      : null,
    lastUpdateModeStoreId: (data.lastUpdateModeStoreId !== null && typeof data.lastUpdateModeStoreId !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeStoreId)
      : null,
    lastUpdateTimeStoreId: (data.lastUpdateTimeStoreId !== null && typeof data.lastUpdateTimeStoreId !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeStoreId)
      : null,
    lastUpdateModeStoreStatus: (data.lastUpdateModeStoreStatus !== null && typeof data.lastUpdateModeStoreStatus !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeStoreStatus)
      : null,
    lastUpdateTimeStoreStatus: (data.lastUpdateTimeStoreStatus !== null && typeof data.lastUpdateTimeStoreStatus !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeStoreStatus)
      : null,
    lastUpdateModeSubSamplingRatio: (data.lastUpdateModeSubSamplingRatio !== null && typeof data.lastUpdateModeSubSamplingRatio !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeSubSamplingRatio)
      : null,
    lastUpdateTimeSubSamplingRatio: (data.lastUpdateTimeSubSamplingRatio !== null && typeof data.lastUpdateTimeSubSamplingRatio !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeSubSamplingRatio)
      : null,
    uniqueId: (data.uniqueId !== null && typeof data.uniqueId !== 'undefined')
      ? uLONG.encode(data.uniqueId)
      : null,
  }),
  decode: data => ({
    storeName: (data.storeName !== null && typeof data.storeName !== 'undefined')
      ? sTRING.decode(data.storeName)
      : undefined,
    storeId: (data.storeId !== null && typeof data.storeId !== 'undefined')
      ? uINTEGER.decode(data.storeId)
      : undefined,
    storeStatus: (data.storeStatus !== null && typeof data.storeStatus !== 'undefined')
      ? uINTEGER.decode(data.storeStatus)
      : undefined,
    subSamplingRatio: (data.subSamplingRatio !== null && typeof data.subSamplingRatio !== 'undefined')
      ? uINTEGER.decode(data.subSamplingRatio)
      : undefined,
    lastUpdateModeStoreId: (data.lastUpdateModeStoreId !== null && typeof data.lastUpdateModeStoreId !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeStoreId)
      : undefined,
    lastUpdateTimeStoreId: (data.lastUpdateTimeStoreId !== null && typeof data.lastUpdateTimeStoreId !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeStoreId)
      : undefined,
    lastUpdateModeStoreStatus: (data.lastUpdateModeStoreStatus !== null && typeof data.lastUpdateModeStoreStatus !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeStoreStatus)
      : undefined,
    lastUpdateTimeStoreStatus: (data.lastUpdateTimeStoreStatus !== null && typeof data.lastUpdateTimeStoreStatus !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeStoreStatus)
      : undefined,
    lastUpdateModeSubSamplingRatio: (data.lastUpdateModeSubSamplingRatio !== null && typeof data.lastUpdateModeSubSamplingRatio !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeSubSamplingRatio)
      : undefined,
    lastUpdateTimeSubSamplingRatio: (data.lastUpdateTimeSubSamplingRatio !== null && typeof data.lastUpdateTimeSubSamplingRatio !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeSubSamplingRatio)
      : undefined,
    uniqueId: (data.uniqueId !== null && typeof data.uniqueId !== 'undefined')
      ? uLONG.decode(data.uniqueId)
      : undefined,
  }),
};
