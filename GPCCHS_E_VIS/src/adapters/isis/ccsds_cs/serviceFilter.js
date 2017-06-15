// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
const ByteBuffer = require('bytebuffer');

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
  encode: (data) => {
    const serviceFilter = new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    serviceFilter.writeUint16(data.area, AREA_OFFSET);
    serviceFilter.writeUint16(data.service, SERVICE_OFFSET);
    serviceFilter.writeUint8(data.version, VERSION_OFFSET);
    serviceFilter.writeUint16(data.factoryID, FACTORYID_OFFSET);
    serviceFilter.writeUint64(data.sessionOid, SESSIONOID_OFFSET);
    serviceFilter.writeUint8(data.network, NETWORK_OFFSET);
    serviceFilter.writeUint16(data.slotOid, SLOTOID_OFFSET);
    serviceFilter.writeUint16(data.domainID, DOMAINID_OFFSET);
    serviceFilter.writeString(data.providerName + '\0'.repeat(PROVIDERNAME_SIZE - data.providerName.length), PROVIDERNAME_OFFSET);
    return { value: serviceFilter.buffer };
  },
  decode: data => ({
    type: 'raw',
    value: data.value,
    fields: [
      {
        type: 'ushort',
        name: 'area',
        size: AREA_SIZE,
        offset: AREA_OFFSET,
      },
      {
        type: 'ushort',
        name: 'service',
        size: SERVICE_SIZE,
        offset: SERVICE_OFFSET,
      },
      {
        type: 'uoctet',
        name: 'version',
        size: VERSION_SIZE,
        offset: VERSION_OFFSET,
      },
      {
        type: 'ushort',
        name: 'factoryID',
        size: FACTORYID_SIZE,
        offset: FACTORYID_OFFSET,
      },
      {
        type: 'ulong',
        name: 'sessionOid',
        size: SESSIONOID_SIZE,
        offset: SESSIONOID_OFFSET,
      },
      {
        type: 'uoctet',
        name: 'network',
        size: NETWORK_SIZE,
        offset: NETWORK_OFFSET,
      },
      {
        type: 'ushort',
        name: 'slotOid',
        size: SLOTOID_SIZE,
        offset: SLOTOID_OFFSET,
      },
      {
        type: 'ushort',
        name: 'domainID',
        size: DOMAINID_SIZE,
        offset: DOMAINID_OFFSET,
      },
      {
        type: 'string',
        name: 'providerName',
        size: PROVIDERNAME_SIZE,
        offset: PROVIDERNAME_OFFSET,
      },
    ],
  }),
};
