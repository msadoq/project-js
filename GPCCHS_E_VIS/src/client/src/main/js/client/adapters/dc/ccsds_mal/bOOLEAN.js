// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
const ByteBuffer = require('bytebuffer');

module.exports = {
  encode: data => ({ value: data }),
  decode: data => ({ type: 'boolean', value: data.value }),
  encodeRaw: (data, buffer, offset = 0) => {
    const boolean = buffer || new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    boolean.writeByte(data === true ? 1 : 0, offset);
    return boolean.buffer;
  },
  decodeRaw: (data, buffer, offset = 0) => {
    const boolean = buffer || ByteBuffer.wrap(data, ByteBuffer.LITTLE_ENDIAN);
    return { type: 'boolean', value: boolean.readByte(offset) !== 0 };
  },
};
