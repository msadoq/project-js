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
const _isString = require('lodash/isString');

module.exports = {
  encode: (data) => {
    if (_isNil(data)) {
      return undefined;
    }
    if (!_isString(data)) {
      throw new Error(`unable to convert '${data}' to byte buffer`);
    }
    const identifier = Buffer.allocUnsafe(data.length);
    identifier.write(data);
    return { value: identifier };
  },
  decode: (data) => {
    if (!data.value) {
      return undefined;
    }
    if (!_isBuffer(data.value)) {
      return undefined;
    }
    return { type: 'identifier', value: data.value.toString() };
  },
  encodeRaw: (data, buffer, offset = 0, size = 0) => {
    const identifier = buffer || new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    identifier.writeString(data + '\0'.repeat(size - data.length), offset);
    return identifier.buffer;
  },
  decodeRaw: (data, buffer, offset = 0, size = 0) => {
    const identifier = buffer || ByteBuffer.wrap(data, ByteBuffer.LITTLE_ENDIAN);
    return { type: 'identifier', value: identifier.readString(size, ByteBuffer.METRICS_BYTES, offset).string.replace(/\0.*/g, '') };
  },
};
