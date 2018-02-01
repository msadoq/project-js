// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #6891 : 19/07/2017 : Rename test folder in common and use jest for tests
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
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
