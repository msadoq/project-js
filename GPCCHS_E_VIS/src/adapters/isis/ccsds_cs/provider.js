// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
const ByteBuffer = require('bytebuffer');

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
  encode: (data) => {
    const provider = new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    provider.writeUint16(data.slotID, SLOTID_OFFSET);
    provider.writeUint16(data.factoryID, FACTORYID_OFFSET);
    provider.writeString(data.providerName + '\0'.repeat(PROVIDERNAME_SIZE - data.providerName.length), PROVIDERNAME_OFFSET);
    provider.writeUint8(data.network, NETWORK_OFFSET);
    provider.writeUint64(data.session, SESSION_OFFSET);
    provider.writeUint32(data.serviceProperties, SERVICEPROPERTIES_OFFSET);
    provider.writeUint32(data.serviceAddress.supportedCapabilities, SERVICEADDRESS_SUPPORTEDCAPABILITIES_OFFSET);
    provider.writeUint32(data.serviceAddress.supportedLevels, SERVICEADDRESS_SUPPORTEDLEVELS_OFFSET);
    provider.writeUint32(data.serviceAddress.qoSproperties, SERVICEADDRESS_QOSPROPERTIES_OFFSET);
    provider.writeUint32(data.serviceAddress.priorityLevels, SERVICEADDRESS_PRIORITYLEVELS_OFFSET);
    provider.writeString(data.serviceAddress.serviceURI + '\0'.repeat(SERVICEADDRESS_SERVICEURI_SIZE - data.serviceAddress.serviceURI.length), SERVICEADDRESS_SERVICEURI_OFFSET);
    provider.writeString(data.serviceAddress.dataURI + '\0'.repeat(SERVICEADDRESS_DATAURI_SIZE - data.serviceAddress.dataURI.length), SERVICEADDRESS_DATAURI_OFFSET);
    provider.writeString(data.serviceAddress.dataName + '\0'.repeat(SERVICEADDRESS_DATANAME_SIZE - data.serviceAddress.dataName.length), SERVICEADDRESS_DATANAME_OFFSET);
    provider.writeString(data.providerProperties + '\0'.repeat(PROVIDERPROPERTIES_SIZE - data.providerProperties.length), PROVIDERPROPERTIES_OFFSET);
    provider.writeUint64(data.providerTime, PROVIDERTIME_OFFSET);
    return { value: provider.buffer };
  },
  decode: data => ({
    type: 'raw',
    value: data.value,
    fields: [
      {
        type: 'ushort',
        name: 'slotID',
        size: SLOTID_SIZE,
        offset: SLOTID_OFFSET,
      },
      {
        type: 'ushort',
        name: 'factoryID',
        size: FACTORYID_SIZE,
        offset: FACTORYID_OFFSET,
      },
      {
        type: 'string',
        name: 'providerName',
        size: PROVIDERNAME_SIZE,
        offset: PROVIDERNAME_OFFSET,
      },
      {
        type: 'uoctet',
        name: 'network',
        size: NETWORK_SIZE,
        offset: NETWORK_OFFSET,
      },
      {
        type: 'ulong',
        name: 'session',
        size: SESSION_SIZE,
        offset: SESSION_OFFSET,
      },
      {
        type: 'uinteger',
        name: 'serviceProperties',
        size: SERVICEPROPERTIES_SIZE,
        offset: SERVICEPROPERTIES_OFFSET,
      },
      {
        type: 'object',
        name: 'serviceAddress',
        fields: [
          {
            type: 'uinteger',
            name: 'supportedCapabilities',
            size: SERVICEADDRESS_SUPPORTEDCAPABILITIES_SIZE,
            offset: SERVICEADDRESS_SUPPORTEDCAPABILITIES_OFFSET,
          },
          {
            type: 'uinteger',
            name: 'supportedLevels',
            size: SERVICEADDRESS_SUPPORTEDLEVELS_SIZE,
            offset: SERVICEADDRESS_SUPPORTEDLEVELS_OFFSET,
          },
          {
            type: 'uinteger',
            name: 'qoSproperties',
            size: SERVICEADDRESS_QOSPROPERTIES_SIZE,
            offset: SERVICEADDRESS_QOSPROPERTIES_OFFSET,
          },
          {
            type: 'uinteger',
            name: 'priorityLevels',
            size: SERVICEADDRESS_PRIORITYLEVELS_SIZE,
            offset: SERVICEADDRESS_PRIORITYLEVELS_OFFSET,
          },
          {
            type: 'uri',
            name: 'serviceURI',
            size: SERVICEADDRESS_SERVICEURI_SIZE,
            offset: SERVICEADDRESS_SERVICEURI_OFFSET,
          },
          {
            type: 'uri',
            name: 'dataURI',
            size: SERVICEADDRESS_DATAURI_SIZE,
            offset: SERVICEADDRESS_DATAURI_OFFSET,
          },
          {
            type: 'string',
            name: 'dataName',
            size: SERVICEADDRESS_DATANAME_SIZE,
            offset: SERVICEADDRESS_DATANAME_OFFSET,
          },
        ],
      },
      {
        type: 'string',
        name: 'providerProperties',
        size: PROVIDERPROPERTIES_SIZE,
        offset: PROVIDERPROPERTIES_OFFSET,
      },
      {
        type: 'time',
        name: 'providerTime',
        size: PROVIDERTIME_SIZE,
        offset: PROVIDERTIME_OFFSET,
      },
    ],
  }),
};
