// Produced by Acceleo JavaScript Generator 1.1.2
const ByteBuffer = require('bytebuffer');

module.exports = {
  encode: data => ({ value: data }),
  decode: data => ({ type: 'blob', value: data.value }),
  encodeRaw: (data, buffer, offset = 0, size = 0) => {
    const blob = buffer || new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    blob.writeString(data + '\0'.repeat(size - data.length), offset);
    return blob.buffer;
  },
  decodeRaw: (data, buffer, offset = 0, size = 0) => {
    const blob = buffer || ByteBuffer.wrap(data, ByteBuffer.LITTLE_ENDIAN);
    return { type: 'blob', value: Buffer.from(blob.readString(size, ByteBuffer.METRICS_BYTES, offset).string) };
  },
};
