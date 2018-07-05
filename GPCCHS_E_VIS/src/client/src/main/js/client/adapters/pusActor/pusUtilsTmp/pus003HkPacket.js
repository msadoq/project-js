const tIME = require('../ccsds_mal/tIME');
const sTRING = require('../ccsds_mal/sTRING');
const uINTEGER = require('../ccsds_mal/uINTEGER');
const pus003Packet = require('./pus003Packet');

module.exports = {
  encode: data => ({
    generationMode: (data.generationMode !== null && typeof data.generationMode !== 'undefined')
      ? sTRING.encode(data.generationMode)
      : null,
    pus003Packet: pus003Packet.encode(data.pus003Packet),
    lastUpdateTimeGenMode: (data.lastUpdateTimeGenMode !== null && typeof data.lastUpdateTimeGenMode !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeGenMode)
      : null,
    lastUpdateModeGenMode: (data.lastUpdateModeGenMode !== null && typeof data.lastUpdateModeGenMode !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeGenMode)
      : null,
  }),
  decode: data => ({
    generationMode: (data.generationMode !== null && typeof data.generationMode !== 'undefined')
      ? sTRING.decode(data.generationMode)
      : undefined,
    pus003Packet: pus003Packet.decode(data.pus003Packet),
    lastUpdateTimeGenMode: (data.lastUpdateTimeGenMode !== null && typeof data.lastUpdateTimeGenMode !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeGenMode)
      : undefined,
    lastUpdateModeGenMode: (data.lastUpdateModeGenMode !== null && typeof data.lastUpdateModeGenMode !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeGenMode)
      : undefined,
  }),
};
