const pus003Packet = require('./pus003Packet');

module.exports = {
  encode: data => ({
    pus003Packet: pus003Packet.encode(data.pus003Packet),
  }),
  decode: data => ({
    pus003Packet: pus003Packet.decode(data.pus003Packet),
  }),
};
