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
  decode: (data) => {
    const tempData = new Buffer(data.value);
    return {
      objectType: {
        area: { type: 'ushort', value: tempData.readUInt16LE() },
        service: { type: 'ushort', value: tempData.readUInt16LE(2) },
        version: { type: 'uoctet', value: tempData.readUInt8(4) },
        number: { type: 'ushort', value: tempData.readUInt16LE(5) },
      },
      objectKey: {
        domaineId: { type: 'ushort', value: tempData.readUInt16LE(7) },
        uid: { type: 'long', symbol: tempData.readInt32LE(9).toString() },
      },
    };
  },
};
