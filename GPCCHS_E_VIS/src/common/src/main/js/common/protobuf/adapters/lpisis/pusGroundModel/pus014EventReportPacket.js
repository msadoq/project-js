// Generated file
const pus014ForwardedPacket = require('./pus014ForwardedPacket');

module.exports = {
  encode: data => ({
    rid: (data.rid !== null && typeof data.rid !== 'undefined')
      ? { value: data.rid }
      : null,
    pus014ForwardedPacket: (data.pus014ForwardedPacket !== null && typeof data.pus014ForwardedPacket !== 'undefined')
      ? pus014ForwardedPacket.encode(data.pus014ForwardedPacket)
      : null,
  }),
  decode: data => ({
    rid: (data.rid !== null && typeof data.rid !== 'undefined')
      ? { type: 'uinteger', value: data.rid.value }
      : undefined,
    pus014ForwardedPacket: (data.pus014ForwardedPacket !== null && typeof data.pus014ForwardedPacket !== 'undefined')
      ? pus014ForwardedPacket.decode(data.pus014ForwardedPacket)
      : undefined,
  }),
};

