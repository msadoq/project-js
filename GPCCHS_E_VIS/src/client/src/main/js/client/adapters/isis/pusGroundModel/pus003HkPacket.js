// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const pus003Packet = require('./pus003Packet');
const tIME = require('../ccsds_mal/tIME');
const uOCTET = require('../ccsds_mal/uOCTET');

module.exports = {
  encode: data => ({
    generationMode: (data.generationMode !== null && typeof data.generationMode !== 'undefined')
      ? uOCTET.encode(data.generationMode)
      : null,
    pus003Packet: (data.pus003Packet !== null && typeof data.pus003Packet !== 'undefined')
      ? pus003Packet.encode(data.pus003Packet)
      : null,
    lastUpdateTimeGenMode: (data.lastUpdateTimeGenMode !== null && typeof data.lastUpdateTimeGenMode !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeGenMode)
      : null,
    lastUpdateModeGenMode: (data.lastUpdateModeGenMode !== null && typeof data.lastUpdateModeGenMode !== 'undefined')
      ? uOCTET.encode(data.lastUpdateModeGenMode)
      : null,
  }),
  decode: data => ({
    generationMode: (data.generationMode !== null && typeof data.generationMode !== 'undefined')
      ? uOCTET.decode(data.generationMode)
      : undefined,
    pus003Packet: (data.pus003Packet !== null && typeof data.pus003Packet !== 'undefined')
      ? pus003Packet.decode(data.pus003Packet)
      : undefined,
    lastUpdateTimeGenMode: (data.lastUpdateTimeGenMode !== null && typeof data.lastUpdateTimeGenMode !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeGenMode)
      : undefined,
    lastUpdateModeGenMode: (data.lastUpdateModeGenMode !== null && typeof data.lastUpdateModeGenMode !== 'undefined')
      ? uOCTET.decode(data.lastUpdateModeGenMode)
      : undefined,
  }),
};
