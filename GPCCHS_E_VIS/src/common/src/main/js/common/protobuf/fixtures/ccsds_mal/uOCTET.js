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
      throw new Error(`unable to convert '${data}' to octet buffer`);
    }
    const uoctet = Buffer.allocUnsafe(1);
    uoctet.writeUInt8(data);
    return { value: uoctet };
  },
  decode: (data) => {
    if (!data.value) {
      return undefined;
    }
    if (!_isBuffer(data.value)) {
      return undefined;
    }
    return { type: 'uoctet', value: data.value.readUInt8() };
  },
  encodeRaw: (data, buffer, offset = 0) => {
    const uoctet = buffer || new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    uoctet.writeUint8(data, offset);
    return uoctet.buffer;
  },
  decodeRaw: (data, buffer, offset = 0) => {
    const uoctet = buffer || ByteBuffer.wrap(data, ByteBuffer.LITTLE_ENDIAN);
    return { type: 'uoctet', value: uoctet.readUint8(offset) };
  },
};
