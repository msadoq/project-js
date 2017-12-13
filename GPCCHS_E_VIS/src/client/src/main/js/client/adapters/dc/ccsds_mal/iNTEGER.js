// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
const ByteBuffer = require('bytebuffer');

module.exports = {
  encode: data => ({ value: data }),
  decode: data => ({ type: 'integer', value: data.value }),
  encodeRaw: (data, buffer, offset = 0) => {
    const integer = buffer || new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    integer.writeInt32(data, offset);
    return integer.buffer;
  },
  decodeRaw: (data, buffer, offset = 0) => {
    const integer = buffer || ByteBuffer.wrap(data, ByteBuffer.LITTLE_ENDIAN);
    return { type: 'integer', value: integer.readInt32(offset) };
  },
};
