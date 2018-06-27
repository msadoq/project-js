// Produced by Acceleo JavaScript Generator 1.1.2
const ByteBuffer = require('bytebuffer');

module.exports = {
  encode: data => ({ value: data }),
  decode: data => ({ type: 'double', symbol: data.value.toString() }),
  encodeRaw: (data, buffer, offset = 0) => {
    const double = buffer || new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    double.writeDouble(data, offset);
    return double.buffer;
  },
  decodeRaw: (data, buffer, offset = 0) => {
    const double = buffer || ByteBuffer.wrap(data, ByteBuffer.LITTLE_ENDIAN);
    return { type: 'double', symbol: double.readDouble(offset).toString() };
  },
};
