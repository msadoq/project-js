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
    return { type: 'uri', value: data.value.toString() };
  },
  encodeRaw: (data, buffer, offset = 0, size = 0) => {
    const uri = buffer || new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    uri.writeString(data + '\0'.repeat(size - data.length), offset);
    return uri.buffer;
  },
  decodeRaw: (data, buffer, offset = 0, size = 0) => {
    const uri = buffer || ByteBuffer.wrap(data, ByteBuffer.LITTLE_ENDIAN);
    return { type: 'uri', value: uri.readString(size, ByteBuffer.METRICS_BYTES, offset).string.replace(/\0.*/g, '') };
  },
};
