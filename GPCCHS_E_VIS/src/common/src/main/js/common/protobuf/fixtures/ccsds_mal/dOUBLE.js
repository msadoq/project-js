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
