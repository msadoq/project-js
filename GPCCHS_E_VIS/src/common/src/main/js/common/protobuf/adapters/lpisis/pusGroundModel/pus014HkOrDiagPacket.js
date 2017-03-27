// Produced by Acceleo JavaScript Generator 1.1.0
const pus014ForwardedPacket = require('./pus014ForwardedPacket');

module.exports = {
  encode: data => ({
    subsamplingRatio: (data.subsamplingRatio !== null && typeof data.subsamplingRatio !== 'undefined')
      ? { value: data.subsamplingRatio }
      : null,
    sid: (data.sid !== null && typeof data.sid !== 'undefined')
      ? { value: data.sid }
      : null,
    pus014ForwardedPacket: (data.pus014ForwardedPacket !== null && typeof data.pus014ForwardedPacket !== 'undefined')
      ? pus014ForwardedPacket.encode(data.pus014ForwardedPacket)
      : null,
  }),
  decode: data => ({
    subsamplingRatio: (data.subsamplingRatio !== null && typeof data.subsamplingRatio !== 'undefined')
      ? { type: 'uinteger', value: data.subsamplingRatio.value }
      : undefined,
    sid: (data.sid !== null && typeof data.sid !== 'undefined')
      ? { type: 'uinteger', value: data.sid.value }
      : undefined,
    pus014ForwardedPacket: (data.pus014ForwardedPacket !== null && typeof data.pus014ForwardedPacket !== 'undefined')
      ? pus014ForwardedPacket.decode(data.pus014ForwardedPacket)
      : undefined,
  }),
};

