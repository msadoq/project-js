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
const uLONG = require('../ccsds_mal/uLONG');
const uOCTET = require('../ccsds_mal/uOCTET');
const uSHORT = require('../ccsds_mal/uSHORT');

const AREA_SIZE = 2;
const AREA_OFFSET = 0;
const SERVICE_SIZE = 2;
const SERVICE_OFFSET = AREA_OFFSET + AREA_SIZE;
const VERSION_SIZE = 1;
const VERSION_OFFSET = SERVICE_OFFSET + SERVICE_SIZE;
const FACTORYID_SIZE = 2;
const FACTORYID_OFFSET = VERSION_OFFSET + VERSION_SIZE;
const SESSIONOID_SIZE = 8;
const SESSIONOID_OFFSET = FACTORYID_OFFSET + FACTORYID_SIZE;
const NETWORK_SIZE = 1;
const NETWORK_OFFSET = SESSIONOID_OFFSET + SESSIONOID_SIZE;
const SLOTOID_SIZE = 2;
const SLOTOID_OFFSET = NETWORK_OFFSET + NETWORK_SIZE;
const DOMAINID_SIZE = 2;
const DOMAINID_OFFSET = SLOTOID_OFFSET + SLOTOID_SIZE;
const PROVIDERNAME_SIZE = 32;
const PROVIDERNAME_OFFSET = DOMAINID_OFFSET + DOMAINID_SIZE;

module.exports = {
  encodeRaw: (data, buffer, offset = 0) => {
    const serviceFilter = buffer || new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    uSHORT.encodeRaw(data.area, serviceFilter, AREA_OFFSET + offset, AREA_SIZE);
    uSHORT.encodeRaw(data.service, serviceFilter, SERVICE_OFFSET + offset, SERVICE_SIZE);
    uOCTET.encodeRaw(data.version, serviceFilter, VERSION_OFFSET + offset, VERSION_SIZE);
    uSHORT.encodeRaw(data.factoryID, serviceFilter, FACTORYID_OFFSET + offset, FACTORYID_SIZE);
    uLONG.encodeRaw(data.sessionOid, serviceFilter, SESSIONOID_OFFSET + offset, SESSIONOID_SIZE);
    uOCTET.encodeRaw(data.network, serviceFilter, NETWORK_OFFSET + offset, NETWORK_SIZE);
    uSHORT.encodeRaw(data.slotOid, serviceFilter, SLOTOID_OFFSET + offset, SLOTOID_SIZE);
    uSHORT.encodeRaw(data.domainID, serviceFilter, DOMAINID_OFFSET + offset, DOMAINID_SIZE);
    sTRING.encodeRaw(data.providerName, serviceFilter, PROVIDERNAME_OFFSET + offset, PROVIDERNAME_SIZE);
    return serviceFilter.buffer;
  },
  decodeRaw: (data, buffer, offset = 0) => {
    const serviceFilter = {};
    const bufferedData = buffer || ByteBuffer.wrap(data, ByteBuffer.LITTLE_ENDIAN);
    serviceFilter.area = uSHORT.decodeRaw(null, bufferedData, AREA_OFFSET + offset, AREA_SIZE);
    serviceFilter.service = uSHORT.decodeRaw(null, bufferedData, SERVICE_OFFSET + offset, SERVICE_SIZE);
    serviceFilter.version = uOCTET.decodeRaw(null, bufferedData, VERSION_OFFSET + offset, VERSION_SIZE);
    serviceFilter.factoryID = uSHORT.decodeRaw(null, bufferedData, FACTORYID_OFFSET + offset, FACTORYID_SIZE);
    serviceFilter.sessionOid = uLONG.decodeRaw(null, bufferedData, SESSIONOID_OFFSET + offset, SESSIONOID_SIZE);
    serviceFilter.network = uOCTET.decodeRaw(null, bufferedData, NETWORK_OFFSET + offset, NETWORK_SIZE);
    serviceFilter.slotOid = uSHORT.decodeRaw(null, bufferedData, SLOTOID_OFFSET + offset, SLOTOID_SIZE);
    serviceFilter.domainID = uSHORT.decodeRaw(null, bufferedData, DOMAINID_OFFSET + offset, DOMAINID_SIZE);
    serviceFilter.providerName = sTRING.decodeRaw(null, bufferedData, PROVIDERNAME_OFFSET + offset, PROVIDERNAME_SIZE);
    return serviceFilter;
  },
};
