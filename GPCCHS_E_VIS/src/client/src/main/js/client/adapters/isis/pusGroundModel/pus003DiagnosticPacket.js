// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const pus003Packet = require('./pus003Packet');

module.exports = {
  encode: data => ({
    pus003Packet: (data.pus003Packet !== null && typeof data.pus003Packet !== 'undefined')
      ? pus003Packet.encode(data.pus003Packet)
      : null,
  }),
  decode: data => ({
    pus003Packet: (data.pus003Packet !== null && typeof data.pus003Packet !== 'undefined')
      ? pus003Packet.decode(data.pus003Packet)
      : undefined,
  }),
};