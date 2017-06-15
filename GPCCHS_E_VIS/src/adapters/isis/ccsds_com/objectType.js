// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
const ByteBuffer = require('bytebuffer');

const AREA_SIZE = 2;
const AREA_OFFSET = 0;
const SERVICE_SIZE = 2;
const SERVICE_OFFSET = AREA_OFFSET + AREA_SIZE; 
const VERSION_SIZE = 1;
const VERSION_OFFSET = SERVICE_OFFSET + SERVICE_SIZE; 
const NUMBER_SIZE = 2;
const NUMBER_OFFSET = VERSION_OFFSET + VERSION_SIZE;

module.exports = {
  encode: (data) => {
    const objectType = new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    objectType.writeUint16(data.area, AREA_OFFSET);
    objectType.writeUint16(data.service, SERVICE_OFFSET);
    objectType.writeUint8(data.version, VERSION_OFFSET);
    objectType.writeUint16(data.number, NUMBER_OFFSET);
    return { value: objectType.buffer };
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
        name: 'number',
        size: NUMBER_SIZE,
        offset: NUMBER_OFFSET,
      },
    ],
  }),
};
