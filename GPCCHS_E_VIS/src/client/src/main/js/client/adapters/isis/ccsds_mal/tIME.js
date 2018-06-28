// Produced by Acceleo JavaScript Generator 1.1.2
const ByteBuffer = require('bytebuffer');

module.exports = {
  encode: data => ({ value: data }),
  decode: data => ({ type: 'time', value: data.value.toNumber() }),
  encodeRaw: (data, buffer, offset = 0) => {
    const time = buffer || new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    time.writeUint64(data, offset);
    return time.buffer;
  },
  decodeRaw: (data, buffer, offset = 0) => {
    const time = buffer || ByteBuffer.wrap(data, ByteBuffer.LITTLE_ENDIAN);
    return { type: 'time', value: time.readUint64(offset).toNumber() };
  },
};
