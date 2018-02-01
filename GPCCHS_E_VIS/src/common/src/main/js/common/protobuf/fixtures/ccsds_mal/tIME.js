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
