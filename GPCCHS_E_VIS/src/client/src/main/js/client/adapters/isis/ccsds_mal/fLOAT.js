// Produced by Acceleo JavaScript Generator 1.1.2
const ByteBuffer = require('bytebuffer');

module.exports = {
  encode: data => ({ value: data }),
  decode: data => ({ type: 'float', value: data.value }),
  encodeRaw: (data, buffer, offset = 0) => {
    const float = buffer || new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    float.writeFloat(data, offset);
    return float.buffer;
  },
  decodeRaw: (data, buffer, offset = 0) => {
    const float = buffer || ByteBuffer.wrap(data, ByteBuffer.LITTLE_ENDIAN);
    return { type: 'float', value: float.readFloat(offset) };
  },
};
