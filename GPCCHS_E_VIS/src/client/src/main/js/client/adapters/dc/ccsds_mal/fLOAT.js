// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

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
