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
const uINTEGER = require('../ccsds_mal/uINTEGER');
const uRI = require('../ccsds_mal/uRI');

const SUPPORTEDCAPABILITIES_SIZE = 4;
const SUPPORTEDCAPABILITIES_OFFSET = 0;
const SUPPORTEDLEVELS_SIZE = 4;
const SUPPORTEDLEVELS_OFFSET = SUPPORTEDCAPABILITIES_OFFSET + SUPPORTEDCAPABILITIES_SIZE;
const QOSPROPERTIES_SIZE = 4;
const QOSPROPERTIES_OFFSET = SUPPORTEDLEVELS_OFFSET + SUPPORTEDLEVELS_SIZE;
const PRIORITYLEVELS_SIZE = 4;
const PRIORITYLEVELS_OFFSET = QOSPROPERTIES_OFFSET + QOSPROPERTIES_SIZE;
const SERVICEURI_SIZE = 64;
const SERVICEURI_OFFSET = PRIORITYLEVELS_OFFSET + PRIORITYLEVELS_SIZE;
const DATAURI_SIZE = 64;
const DATAURI_OFFSET = SERVICEURI_OFFSET + SERVICEURI_SIZE;
const DATANAME_SIZE = 32;
const DATANAME_OFFSET = DATAURI_OFFSET + DATAURI_SIZE;

module.exports = {
  encodeRaw: (data, buffer, offset = 0) => {
    const serviceAddress = buffer || new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    uINTEGER.encodeRaw(data.supportedCapabilities, serviceAddress, SUPPORTEDCAPABILITIES_OFFSET + offset, SUPPORTEDCAPABILITIES_SIZE);
    uINTEGER.encodeRaw(data.supportedLevels, serviceAddress, SUPPORTEDLEVELS_OFFSET + offset, SUPPORTEDLEVELS_SIZE);
    uINTEGER.encodeRaw(data.qoSproperties, serviceAddress, QOSPROPERTIES_OFFSET + offset, QOSPROPERTIES_SIZE);
    uINTEGER.encodeRaw(data.priorityLevels, serviceAddress, PRIORITYLEVELS_OFFSET + offset, PRIORITYLEVELS_SIZE);
    uRI.encodeRaw(data.serviceURI, serviceAddress, SERVICEURI_OFFSET + offset, SERVICEURI_SIZE);
    uRI.encodeRaw(data.dataURI, serviceAddress, DATAURI_OFFSET + offset, DATAURI_SIZE);
    sTRING.encodeRaw(data.dataName, serviceAddress, DATANAME_OFFSET + offset, DATANAME_SIZE);
    return serviceAddress.buffer;
  },
  decodeRaw: (data, buffer, offset = 0) => {
    const serviceAddress = {};
    const bufferedData = buffer || ByteBuffer.wrap(data, ByteBuffer.LITTLE_ENDIAN);
    serviceAddress.supportedCapabilities = uINTEGER.decodeRaw(null, bufferedData, SUPPORTEDCAPABILITIES_OFFSET + offset, SUPPORTEDCAPABILITIES_SIZE);
    serviceAddress.supportedLevels = uINTEGER.decodeRaw(null, bufferedData, SUPPORTEDLEVELS_OFFSET + offset, SUPPORTEDLEVELS_SIZE);
    serviceAddress.qoSproperties = uINTEGER.decodeRaw(null, bufferedData, QOSPROPERTIES_OFFSET + offset, QOSPROPERTIES_SIZE);
    serviceAddress.priorityLevels = uINTEGER.decodeRaw(null, bufferedData, PRIORITYLEVELS_OFFSET + offset, PRIORITYLEVELS_SIZE);
    serviceAddress.serviceURI = uRI.decodeRaw(null, bufferedData, SERVICEURI_OFFSET + offset, SERVICEURI_SIZE);
    serviceAddress.dataURI = uRI.decodeRaw(null, bufferedData, DATAURI_OFFSET + offset, DATAURI_SIZE);
    serviceAddress.dataName = sTRING.decodeRaw(null, bufferedData, DATANAME_OFFSET + offset, DATANAME_SIZE);
    return serviceAddress;
  },
};
