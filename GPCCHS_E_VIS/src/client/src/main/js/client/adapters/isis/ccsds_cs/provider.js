// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ByteBuffer = require('bytebuffer');
const sTRING = require('../ccsds_mal/sTRING');
const serviceAddress = require('./serviceAddress');
const tIME = require('../ccsds_mal/tIME');
const uINTEGER = require('../ccsds_mal/uINTEGER');
const uLONG = require('../ccsds_mal/uLONG');
const uOCTET = require('../ccsds_mal/uOCTET');
const uSHORT = require('../ccsds_mal/uSHORT');

const SLOTID_SIZE = 2;
const SLOTID_OFFSET = 0;
const FACTORYID_SIZE = 2;
const FACTORYID_OFFSET = SLOTID_OFFSET + SLOTID_SIZE;
const PROVIDERNAME_SIZE = 64;
const PROVIDERNAME_OFFSET = FACTORYID_OFFSET + FACTORYID_SIZE;
const NETWORK_SIZE = 1;
const NETWORK_OFFSET = PROVIDERNAME_OFFSET + PROVIDERNAME_SIZE;
const SESSION_SIZE = 8;
const SESSION_OFFSET = NETWORK_OFFSET + NETWORK_SIZE;
const SERVICEPROPERTIES_SIZE = 4;
const SERVICEPROPERTIES_OFFSET = SESSION_OFFSET + SESSION_SIZE;
const SERVICEADDRESS_SUPPORTEDCAPABILITIES_SIZE = 4;
const SERVICEADDRESS_SUPPORTEDCAPABILITIES_OFFSET = SERVICEPROPERTIES_OFFSET + SERVICEPROPERTIES_SIZE;
const SERVICEADDRESS_SUPPORTEDLEVELS_SIZE = 4;
const SERVICEADDRESS_SUPPORTEDLEVELS_OFFSET = SERVICEADDRESS_SUPPORTEDCAPABILITIES_OFFSET + SERVICEADDRESS_SUPPORTEDCAPABILITIES_SIZE;
const SERVICEADDRESS_QOSPROPERTIES_SIZE = 4;
const SERVICEADDRESS_QOSPROPERTIES_OFFSET = SERVICEADDRESS_SUPPORTEDLEVELS_OFFSET + SERVICEADDRESS_SUPPORTEDLEVELS_SIZE;
const SERVICEADDRESS_PRIORITYLEVELS_SIZE = 4;
const SERVICEADDRESS_PRIORITYLEVELS_OFFSET = SERVICEADDRESS_QOSPROPERTIES_OFFSET + SERVICEADDRESS_QOSPROPERTIES_SIZE;
const SERVICEADDRESS_SERVICEURI_SIZE = 64;
const SERVICEADDRESS_SERVICEURI_OFFSET = SERVICEADDRESS_PRIORITYLEVELS_OFFSET + SERVICEADDRESS_PRIORITYLEVELS_SIZE;
const SERVICEADDRESS_DATAURI_SIZE = 64;
const SERVICEADDRESS_DATAURI_OFFSET = SERVICEADDRESS_SERVICEURI_OFFSET + SERVICEADDRESS_SERVICEURI_SIZE;
const SERVICEADDRESS_DATANAME_SIZE = 32;
const SERVICEADDRESS_DATANAME_OFFSET = SERVICEADDRESS_DATAURI_OFFSET + SERVICEADDRESS_DATAURI_SIZE;
const SERVICEADDRESS_SIZE = (SERVICEADDRESS_DATANAME_OFFSET + SERVICEADDRESS_DATANAME_SIZE) - SERVICEADDRESS_SUPPORTEDCAPABILITIES_OFFSET;
const SERVICEADDRESS_OFFSET = SERVICEPROPERTIES_OFFSET + SERVICEPROPERTIES_SIZE;
const PROVIDERPROPERTIES_SIZE = 128;
const PROVIDERPROPERTIES_OFFSET = SERVICEADDRESS_OFFSET + SERVICEADDRESS_SIZE;
const PROVIDERTIME_SIZE = 8;
const PROVIDERTIME_OFFSET = PROVIDERPROPERTIES_OFFSET + PROVIDERPROPERTIES_SIZE;

module.exports = {
  encodeRaw: (data, buffer, offset = 0) => {
    const provider = buffer || new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    uSHORT.encodeRaw(data.slotID, provider, SLOTID_OFFSET + offset, SLOTID_SIZE);
    uSHORT.encodeRaw(data.factoryID, provider, FACTORYID_OFFSET + offset, FACTORYID_SIZE);
    sTRING.encodeRaw(data.providerName, provider, PROVIDERNAME_OFFSET + offset, PROVIDERNAME_SIZE);
    uOCTET.encodeRaw(data.network, provider, NETWORK_OFFSET + offset, NETWORK_SIZE);
    uLONG.encodeRaw(data.session, provider, SESSION_OFFSET + offset, SESSION_SIZE);
    uINTEGER.encodeRaw(data.serviceProperties, provider, SERVICEPROPERTIES_OFFSET + offset, SERVICEPROPERTIES_SIZE);
    serviceAddress.encodeRaw(data.serviceAddress, provider, SERVICEADDRESS_OFFSET + offset, SERVICEADDRESS_SIZE);
    sTRING.encodeRaw(data.providerProperties, provider, PROVIDERPROPERTIES_OFFSET + offset, PROVIDERPROPERTIES_SIZE);
    tIME.encodeRaw(data.providerTime, provider, PROVIDERTIME_OFFSET + offset, PROVIDERTIME_SIZE);
    return provider.buffer;
  },
  decodeRaw: (data, buffer, offset = 0) => {
    const provider = {};
    const bufferedData = buffer || ByteBuffer.wrap(data, ByteBuffer.LITTLE_ENDIAN);
    provider.slotID = uSHORT.decodeRaw(null, bufferedData, SLOTID_OFFSET + offset, SLOTID_SIZE);
    provider.factoryID = uSHORT.decodeRaw(null, bufferedData, FACTORYID_OFFSET + offset, FACTORYID_SIZE);
    provider.providerName = sTRING.decodeRaw(null, bufferedData, PROVIDERNAME_OFFSET + offset, PROVIDERNAME_SIZE);
    provider.network = uOCTET.decodeRaw(null, bufferedData, NETWORK_OFFSET + offset, NETWORK_SIZE);
    provider.session = uLONG.decodeRaw(null, bufferedData, SESSION_OFFSET + offset, SESSION_SIZE);
    provider.serviceProperties = uINTEGER.decodeRaw(null, bufferedData, SERVICEPROPERTIES_OFFSET + offset, SERVICEPROPERTIES_SIZE);
    provider.serviceAddress = serviceAddress.decodeRaw(null, bufferedData, SERVICEADDRESS_OFFSET + offset, SERVICEADDRESS_SIZE);
    provider.providerProperties = sTRING.decodeRaw(null, bufferedData, PROVIDERPROPERTIES_OFFSET + offset, PROVIDERPROPERTIES_SIZE);
    provider.providerTime = tIME.decodeRaw(null, bufferedData, PROVIDERTIME_OFFSET + offset, PROVIDERTIME_SIZE);
    return provider;
  },
};
