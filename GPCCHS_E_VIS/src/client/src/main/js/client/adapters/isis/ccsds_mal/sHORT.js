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
    const short = Buffer.allocUnsafe(2);
    short.writeInt16LE(data);
    return { value: short };
  },
  decode: (data) => {
    if (!data.value) {
      return undefined;
    }
    if (!_isBuffer(data.value)) {
      return undefined;
    }
    return { type: 'short', value: data.value.readInt16LE() };
  },
  encodeRaw: (data, buffer, offset = 0) => {
    const short = buffer || new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    short.writeInt16(data, offset);
    return short.buffer;
  },
  decodeRaw: (data, buffer, offset = 0) => {
    const short = buffer || ByteBuffer.wrap(data, ByteBuffer.LITTLE_ENDIAN);
    return { type: 'short', value: short.readInt16(offset) };
  },
};
