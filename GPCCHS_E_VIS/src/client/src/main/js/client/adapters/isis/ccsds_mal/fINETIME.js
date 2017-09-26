// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
const ByteBuffer = require('bytebuffer');

const _MILLISEC_SIZE = 8;

module.exports = {
  encode: data => ({ millisec: data, pico: 0 }),
  decode: data => ({ type: 'finetime', value: data.millisec.toNumber(), pico: data.pico }),
  encodeRaw: (data, buffer, offset = 0) => {
    const finetime = buffer || new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    finetime.writeInt64(data, offset);
    finetime.writeInt32(0, offset + _MILLISEC_SIZE);
    return finetime.buffer;
  },
  decodeRaw: (data, buffer, offset = 0) => {
    const finetime = buffer || ByteBuffer.wrap(data, ByteBuffer.LITTLE_ENDIAN);
    return {
      type: 'finetime',
      value: finetime.readUint64(offset).toNumber(),
      pico: finetime.readUint32(offset + _MILLISEC_SIZE),
    };
  },
};
