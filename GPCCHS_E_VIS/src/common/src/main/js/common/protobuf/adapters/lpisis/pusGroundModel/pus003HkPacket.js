// Generated file
const pus003Packet = require('./pus003Packet');

module.exports = {
  encode: data => ({
    generationMode: (data.generationMode !== null && typeof data.generationMode !== 'undefined')
      ? { value: data.generationMode }
      : null,
    pus003Packet: (data.pus003Packet !== null && typeof data.pus003Packet !== 'undefined')
      ? pus003Packet.encode(data.pus003Packet)
      : null,
  }),
  decode: data => ({
    generationMode: (data.generationMode !== null && typeof data.generationMode !== 'undefined')
      ? { type: 'uinteger', value: data.generationMode.value }
      : undefined,
    pus003Packet: (data.pus003Packet !== null && typeof data.pus003Packet !== 'undefined')
      ? pus003Packet.decode(data.pus003Packet)
      : undefined,
  }),
};

