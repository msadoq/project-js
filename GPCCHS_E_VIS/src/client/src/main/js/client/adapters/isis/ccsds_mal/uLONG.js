// Produced by Acceleo JavaScript Generator 1.1.2
const ByteBuffer = require('bytebuffer');

module.exports = {
  encode: data => ({ value: data }),
  decode: data => ({ type: 'ulong', symbol: data.value.toString() }),
  encodeRaw: (data, buffer, offset = 0) => {
    const ulong = buffer || new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    ulong.writeUint64(data, offset);
    return ulong.buffer;
  },
  decodeRaw: (data, buffer, offset = 0) => {
    const ulong = buffer || ByteBuffer.wrap(data, ByteBuffer.LITTLE_ENDIAN);
    return { type: 'ulong', symbol: ulong.readUint64(offset).toString() };
  },
};
