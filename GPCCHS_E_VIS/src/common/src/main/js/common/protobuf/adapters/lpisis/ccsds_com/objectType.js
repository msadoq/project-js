// Produced by Acceleo JavaScript Generator 1.1.0
const ByteBuffer = require('bytebuffer');

module.exports = {
  encode: (data) => {
    const objectType = new ByteBuffer(null, true);
    objectType.writeUint16(data.area);
    objectType.writeUint16(data.service);
    objectType.writeUint8(data.version);
    objectType.writeUint16(data.number);
    return { value: objectType.flip().buffer };
  },
  decode: data => ({
    area: { type: 'ushort', value: data.value.readUint16() },
    service: { type: 'ushort', value: data.value.readUint16() },
    version: { type: 'uoctet', value: data.value.readUint8() },
    number: { type: 'ushort', value: data.value.readUint16() },
  }),
};

