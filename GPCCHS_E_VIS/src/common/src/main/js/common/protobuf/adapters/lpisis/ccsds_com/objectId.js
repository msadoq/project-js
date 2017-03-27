// Produced by Acceleo JavaScript Generator 1.1.0
const ByteBuffer = require('bytebuffer');

module.exports = {
  encode: (data) => {
    const objectId = new ByteBuffer(null, true);
    objectId.writeUint16(data.objectType.area);
    objectId.writeUint16(data.objectType.service);
    objectId.writeUint8(data.objectType.version);
    objectId.writeUint16(data.objectType.number);
    objectId.writeUint16(data.objectKey.domaineId);
    objectId.writeInt64(data.objectKey.uid);
    return { value: objectId.flip().buffer };
  },
  decode: data => ({
    objectType: {
      area: { type: 'ushort', value: data.value.readUint16() },
      service: { type: 'ushort', value: data.value.readUint16() },
      version: { type: 'uoctet', value: data.value.readUint8() },
      number: { type: 'ushort', value: data.value.readUint16() },
    },
    objectKey: {
      domaineId: { type: 'ushort', value: data.value.readUint16() },
      uid: { type: 'long', symbol: data.value.readInt64().toString() },
    },
  }),
};
