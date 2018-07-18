// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const bOOLEAN = require('../ccsds_mal/bOOLEAN');
const pus015Packet = require('./pus015Packet');
const sTRING = require('../ccsds_mal/sTRING');
const uINTEGER = require('../ccsds_mal/uINTEGER');
const uLONG = require('../ccsds_mal/uLONG');

module.exports = {
  encode: data => ({
    storeId: (data.storeId !== null && typeof data.storeId !== 'undefined')
      ? uINTEGER.encode(data.storeId)
      : null,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? uINTEGER.encode(data.status)
      : null,
    storageType: (data.storageType !== null && typeof data.storageType !== 'undefined')
      ? sTRING.encode(data.storageType)
      : null,
    dumpEnabled: (data.dumpEnabled !== null && typeof data.dumpEnabled !== 'undefined')
      ? bOOLEAN.encode(data.dumpEnabled)
      : null,
    pus015Packet: _map(data.pus015Packet, d => (pus015Packet.encode(d))),
    hkStatusParameterName: (data.hkStatusParameterName !== null && typeof data.hkStatusParameterName !== 'undefined')
      ? sTRING.encode(data.hkStatusParameterName)
      : null,
    lastUpdateModeStoreId: (data.lastUpdateModeStoreId !== null && typeof data.lastUpdateModeStoreId !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeStoreId)
      : null,
    lastUpdateTimeStoreId: (data.lastUpdateTimeStoreId !== null && typeof data.lastUpdateTimeStoreId !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeStoreId)
      : null,
    lastUpdateModeStoreType: (data.lastUpdateModeStoreType !== null && typeof data.lastUpdateModeStoreType !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeStoreType)
      : null,
    lastUpdateTimeStoreType: (data.lastUpdateTimeStoreType !== null && typeof data.lastUpdateTimeStoreType !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeStoreType)
      : null,
    lastUpdateModeStoreStatus: (data.lastUpdateModeStoreStatus !== null && typeof data.lastUpdateModeStoreStatus !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeStoreStatus)
      : null,
    lastUpdateTimeStoreStatus: (data.lastUpdateTimeStoreStatus !== null && typeof data.lastUpdateTimeStoreStatus !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeStoreStatus)
      : null,
    serviceApidName: (data.serviceApidName !== null && typeof data.serviceApidName !== 'undefined')
      ? sTRING.encode(data.serviceApidName)
      : null,
    storeName: (data.storeName !== null && typeof data.storeName !== 'undefined')
      ? sTRING.encode(data.storeName)
      : null,
    serviceApid: (data.serviceApid !== null && typeof data.serviceApid !== 'undefined')
      ? uINTEGER.encode(data.serviceApid)
      : null,
    uniqueId: (data.uniqueId !== null && typeof data.uniqueId !== 'undefined')
      ? uLONG.encode(data.uniqueId)
      : null,
    listPossibleDownlinkVcs: (data.listPossibleDownlinkVcs !== null && typeof data.listPossibleDownlinkVcs !== 'undefined')
      ? sTRING.encode(data.listPossibleDownlinkVcs)
      : null,
  }),
  decode: data => ({
    storeId: (data.storeId !== null && typeof data.storeId !== 'undefined')
      ? uINTEGER.decode(data.storeId)
      : undefined,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? uINTEGER.decode(data.status)
      : undefined,
    storageType: (data.storageType !== null && typeof data.storageType !== 'undefined')
      ? sTRING.decode(data.storageType)
      : undefined,
    dumpEnabled: (data.dumpEnabled !== null && typeof data.dumpEnabled !== 'undefined')
      ? bOOLEAN.decode(data.dumpEnabled)
      : undefined,
    pus015Packet: _map(data.pus015Packet, d => (pus015Packet.decode(d))),
    hkStatusParameterName: (data.hkStatusParameterName !== null && typeof data.hkStatusParameterName !== 'undefined')
      ? sTRING.decode(data.hkStatusParameterName)
      : undefined,
    lastUpdateModeStoreId: (data.lastUpdateModeStoreId !== null && typeof data.lastUpdateModeStoreId !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeStoreId)
      : undefined,
    lastUpdateTimeStoreId: (data.lastUpdateTimeStoreId !== null && typeof data.lastUpdateTimeStoreId !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeStoreId)
      : undefined,
    lastUpdateModeStoreType: (data.lastUpdateModeStoreType !== null && typeof data.lastUpdateModeStoreType !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeStoreType)
      : undefined,
    lastUpdateTimeStoreType: (data.lastUpdateTimeStoreType !== null && typeof data.lastUpdateTimeStoreType !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeStoreType)
      : undefined,
    lastUpdateModeStoreStatus: (data.lastUpdateModeStoreStatus !== null && typeof data.lastUpdateModeStoreStatus !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeStoreStatus)
      : undefined,
    lastUpdateTimeStoreStatus: (data.lastUpdateTimeStoreStatus !== null && typeof data.lastUpdateTimeStoreStatus !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeStoreStatus)
      : undefined,
    serviceApidName: (data.serviceApidName !== null && typeof data.serviceApidName !== 'undefined')
      ? sTRING.decode(data.serviceApidName)
      : undefined,
    storeName: (data.storeName !== null && typeof data.storeName !== 'undefined')
      ? sTRING.decode(data.storeName)
      : undefined,
    serviceApid: (data.serviceApid !== null && typeof data.serviceApid !== 'undefined')
      ? uINTEGER.decode(data.serviceApid)
      : undefined,
    uniqueId: (data.uniqueId !== null && typeof data.uniqueId !== 'undefined')
      ? uLONG.decode(data.uniqueId)
      : undefined,
    listPossibleDownlinkVcs: (data.listPossibleDownlinkVcs !== null && typeof data.listPossibleDownlinkVcs !== 'undefined')
      ? sTRING.decode(data.listPossibleDownlinkVcs)
      : undefined,
  }),
};
