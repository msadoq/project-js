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
    area: { type: 'ushort', value: data.value.readUInt16LE() },
    service: { type: 'ushort', value: data.value.readUInt16LE(2) },
    version: { type: 'uoctet', value: data.value.readUInt8(4) },
    number: { type: 'ushort', value: data.value.readUInt16LE(5) },
  }),
};

