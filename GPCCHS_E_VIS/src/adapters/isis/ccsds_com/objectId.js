// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
const ByteBuffer = require('bytebuffer');

const OBJECTTYPE_AREA_SIZE = 2;
const OBJECTTYPE_AREA_OFFSET = 0;
const OBJECTTYPE_SERVICE_SIZE = 2;
const OBJECTTYPE_SERVICE_OFFSET = OBJECTTYPE_AREA_OFFSET + OBJECTTYPE_AREA_SIZE; 
const OBJECTTYPE_VERSION_SIZE = 1;
const OBJECTTYPE_VERSION_OFFSET = OBJECTTYPE_SERVICE_OFFSET + OBJECTTYPE_SERVICE_SIZE; 
const OBJECTTYPE_NUMBER_SIZE = 2;
const OBJECTTYPE_NUMBER_OFFSET = OBJECTTYPE_VERSION_OFFSET + OBJECTTYPE_VERSION_SIZE;
const OBJECTTYPE_SIZE = (OBJECTTYPE_NUMBER_OFFSET + OBJECTTYPE_NUMBER_SIZE) - OBJECTTYPE_AREA_OFFSET;
const OBJECTTYPE_OFFSET = 0;
const OBJECTKEY_DOMAINEID_SIZE = 2;
const OBJECTKEY_DOMAINEID_OFFSET = OBJECTTYPE_OFFSET + OBJECTTYPE_SIZE;
const OBJECTKEY_UID_SIZE = 8;
const OBJECTKEY_UID_OFFSET = OBJECTKEY_DOMAINEID_OFFSET + OBJECTKEY_DOMAINEID_SIZE;

module.exports = {
  encode: (data) => {
    const objectId = new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    objectId.writeUint16(data.objectType.area, OBJECTTYPE_AREA_OFFSET);
    objectId.writeUint16(data.objectType.service, OBJECTTYPE_SERVICE_OFFSET);
    objectId.writeUint8(data.objectType.version, OBJECTTYPE_VERSION_OFFSET);
    objectId.writeUint16(data.objectType.number, OBJECTTYPE_NUMBER_OFFSET);
    objectId.writeUint16(data.objectKey.domaineId, OBJECTKEY_DOMAINEID_OFFSET);
    objectId.writeInt64(data.objectKey.uid, OBJECTKEY_UID_OFFSET);
    return { value: objectId.buffer };
  },
  decode: data => ({
    type: 'raw',
    value: data.value,
    fields: [
      {
        type: 'object',
        name: 'objectType',
        fields: [
          {
            type: 'ushort',
            name: 'area',
            size: OBJECTTYPE_AREA_SIZE,
            offset: OBJECTTYPE_AREA_OFFSET,
          },
          {
            type: 'ushort',
            name: 'service',
            size: OBJECTTYPE_SERVICE_SIZE,
            offset: OBJECTTYPE_SERVICE_OFFSET,
          },
          {
            type: 'uoctet',
            name: 'version',
            size: OBJECTTYPE_VERSION_SIZE,
            offset: OBJECTTYPE_VERSION_OFFSET,
          },
          {
            type: 'ushort',
            name: 'number',
            size: OBJECTTYPE_NUMBER_SIZE,
            offset: OBJECTTYPE_NUMBER_OFFSET,
          },
        ],
      },
      {
        type: 'object',
        name: 'objectKey',
        fields: [
          {
            type: 'ushort',
            name: 'domaineId',
            size: OBJECTKEY_DOMAINEID_SIZE,
            offset: OBJECTKEY_DOMAINEID_OFFSET,
          },
          {
            type: 'long',
            name: 'uid',
            size: OBJECTKEY_UID_SIZE,
            offset: OBJECTKEY_UID_OFFSET,
          },
        ],
      },
    ],
  }),
};
