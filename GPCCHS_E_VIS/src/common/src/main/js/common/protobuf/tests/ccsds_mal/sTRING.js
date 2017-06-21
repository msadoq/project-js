// Produced by Acceleo JavaScript Generator 1.1.2
const ByteBuffer = require('bytebuffer');

module.exports = {
  encode: data => ({ value: data }),
  decode: data => ({ type: 'string', value: data.value }),
  encodeRaw: (data, buffer, offset = 0, size = 0) => {
    const string = buffer || new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    string.writeString(data + '\0'.repeat(size - data.length), offset);
    return string.buffer;
  },
  decodeRaw: (data, buffer, offset = 0, size = 0) => {
    const string = buffer || ByteBuffer.wrap(data, ByteBuffer.LITTLE_ENDIAN);
    return { type: 'string', value: string.readString(size, ByteBuffer.METRICS_BYTES, offset).string.replace(/\0.*/g, '') };
  },
};
