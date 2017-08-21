// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const pus003Packet = require('./pus003Packet');
const uINTEGER = require('../ccsds_mal/uINTEGER');

module.exports = {
  encode: data => ({
    generationMode: (data.generationMode !== null && typeof data.generationMode !== 'undefined')
      ? uINTEGER.encode(data.generationMode)
      : null,
    pus003Packet: (data.pus003Packet !== null && typeof data.pus003Packet !== 'undefined')
      ? pus003Packet.encode(data.pus003Packet)
      : null,
  }),
  decode: data => ({
    generationMode: (data.generationMode !== null && typeof data.generationMode !== 'undefined')
      ? uINTEGER.decode(data.generationMode)
      : undefined,
    pus003Packet: (data.pus003Packet !== null && typeof data.pus003Packet !== 'undefined')
      ? pus003Packet.decode(data.pus003Packet)
      : undefined,
  }),
};
