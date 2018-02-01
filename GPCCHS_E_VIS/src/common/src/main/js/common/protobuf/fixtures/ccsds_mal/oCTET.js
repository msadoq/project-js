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
    const octet = Buffer.allocUnsafe(1);
    octet.writeInt8(data);
    return { value: octet };
  },
  decode: (data) => {
    if (!data.value) {
      return undefined;
    }
    if (!_isBuffer(data.value)) {
      return undefined;
    }
    return { type: 'octet', value: data.value.readInt8() };
  },
  encodeRaw: (data, buffer, offset = 0) => {
    const octet = buffer || new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    octet.writeInt8(data, offset);
    return octet.buffer;
  },
  decodeRaw: (data, buffer, offset = 0) => {
    const octet = buffer || ByteBuffer.wrap(data, ByteBuffer.LITTLE_ENDIAN);
    return { type: 'octet', value: octet.readInt8(offset) };
  },
};
