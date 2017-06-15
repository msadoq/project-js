// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
const ByteBuffer = require('bytebuffer');

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
  encode: (data) => {
    const serviceAddress = new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    serviceAddress.writeUint32(data.supportedCapabilities, SUPPORTEDCAPABILITIES_OFFSET);
    serviceAddress.writeUint32(data.supportedLevels, SUPPORTEDLEVELS_OFFSET);
    serviceAddress.writeUint32(data.qoSproperties, QOSPROPERTIES_OFFSET);
    serviceAddress.writeUint32(data.priorityLevels, PRIORITYLEVELS_OFFSET);
    serviceAddress.writeString(data.serviceURI + '\0'.repeat(SERVICEURI_SIZE - data.serviceURI.length), SERVICEURI_OFFSET);
    serviceAddress.writeString(data.dataURI + '\0'.repeat(DATAURI_SIZE - data.dataURI.length), DATAURI_OFFSET);
    serviceAddress.writeString(data.dataName + '\0'.repeat(DATANAME_SIZE - data.dataName.length), DATANAME_OFFSET);
    return { value: serviceAddress.buffer };
  },
  decode: data => ({
    type: 'raw',
    value: data.value,
    fields: [
      {
        type: 'uinteger',
        name: 'supportedCapabilities',
        size: SUPPORTEDCAPABILITIES_SIZE,
        offset: SUPPORTEDCAPABILITIES_OFFSET,
      },
      {
        type: 'uinteger',
        name: 'supportedLevels',
        size: SUPPORTEDLEVELS_SIZE,
        offset: SUPPORTEDLEVELS_OFFSET,
      },
      {
        type: 'uinteger',
        name: 'qoSproperties',
        size: QOSPROPERTIES_SIZE,
        offset: QOSPROPERTIES_OFFSET,
      },
      {
        type: 'uinteger',
        name: 'priorityLevels',
        size: PRIORITYLEVELS_SIZE,
        offset: PRIORITYLEVELS_OFFSET,
      },
      {
        type: 'uri',
        name: 'serviceURI',
        size: SERVICEURI_SIZE,
        offset: SERVICEURI_OFFSET,
      },
      {
        type: 'uri',
        name: 'dataURI',
        size: DATAURI_SIZE,
        offset: DATAURI_OFFSET,
      },
      {
        type: 'string',
        name: 'dataName',
        size: DATANAME_SIZE,
        offset: DATANAME_OFFSET,
      },
    ],
  }),
};
