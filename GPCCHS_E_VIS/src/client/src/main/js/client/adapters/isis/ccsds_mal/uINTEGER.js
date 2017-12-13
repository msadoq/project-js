// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
const ByteBuffer = require('bytebuffer');

module.exports = {
  encode: data => ({ value: data }),
  decode: data => ({ type: 'uinteger', value: data.value }),
  encodeRaw: (data, buffer, offset = 0) => {
    const uinteger = buffer || new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    uinteger.writeUint32(data, offset);
    return uinteger.buffer;
  },
  decodeRaw: (data, buffer, offset = 0) => {
    const uinteger = buffer || ByteBuffer.wrap(data, ByteBuffer.LITTLE_ENDIAN);
    return { type: 'uinteger', value: uinteger.readUint32(offset) };
  },
};
