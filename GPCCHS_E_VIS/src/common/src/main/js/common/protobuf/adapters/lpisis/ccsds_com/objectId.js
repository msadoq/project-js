// Produced by Acceleo JavaScript Generator 1.1.0
const ByteBuffer = require('bytebuffer');
const Proto = require('protobufjs');
module.exports = {
  encode: (data) => {
    const objectId = new ByteBuffer(null, true);
    const test = new Proto.BufferWriter();
    /* test.uint16(data.objectType.area);
    test.uint16(data.objectType.service);
    test.uint8(data.objectType.version);
    test.uint16(data.objectType.number);
    test.uint16(data.objectType.domaineId);
    test.uint64(data.objectType.uid); */
    objectId.writeUint16(data.objectType.area);
    objectId.writeUint16(data.objectType.service);
    objectId.writeUint8(data.objectType.version);
    objectId.writeUint16(data.objectType.number);
    objectId.writeUint16(data.objectKey.domaineId);
    objectId.writeInt64(data.objectKey.uid);
    return { value: objectId.flip().buffer };
  },
  decode: (data) => {
   // const test = new Proto.BufferReader(data);
    /* return {
      objectType: {
        area: { type: 'ushort', value: test.uint16() },
        service: { type: 'ushort', value: test.uint16() },
        version: { type: 'uoctet', value: test.uint8() },
        number: { type: 'ushort', value: test.uint16() },
      },
      objectKey: {
        domaineId: { type: 'ushort', value: test.uint16() },
        uid: { type: 'long', symbol: test.uint64().toString() },
      },
    };*/ 
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
