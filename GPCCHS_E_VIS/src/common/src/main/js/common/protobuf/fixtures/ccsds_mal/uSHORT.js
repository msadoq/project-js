// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #6891 : 19/07/2017 : Rename test folder in common and use jest for tests
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
const ByteBuffer = require('bytebuffer');
const _isNil = require('lodash/isNil');
const _isBuffer = require('lodash/isBuffer');
const _isNumber = require('lodash/isNumber');

module.exports = {
  encode: (data) => {
    if (_isNil(data)) {
      return undefined;
    }
    if (!_isNumber(data)) {
      throw new Error(`unable to convert '${data}' to short buffer`);
    }
    const ushort = Buffer.allocUnsafe(2);
    ushort.writeUInt16LE(data);
    return { value: ushort };
  },
  decode: (data) => {
    if (!data.value) {
      return undefined;
    }
    if (!_isBuffer(data.value)) {
      return undefined;
    }
    return { type: 'ushort', value: data.value.readUInt16LE() };
  },
  encodeRaw: (data, buffer, offset = 0) => {
    const ushort = buffer || new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    ushort.writeUint16(data, offset);
    return ushort.buffer;
  },
  decodeRaw: (data, buffer, offset = 0) => {
    const ushort = buffer || ByteBuffer.wrap(data, ByteBuffer.LITTLE_ENDIAN);
    return { type: 'ushort', value: ushort.readUint16(offset) };
  },
};
