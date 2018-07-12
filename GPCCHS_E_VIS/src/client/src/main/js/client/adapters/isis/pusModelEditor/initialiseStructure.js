// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const bOOLEAN = require('../ccsds_mal/bOOLEAN');
const tIME = require('../ccsds_mal/tIME');

module.exports = {
  encode: data => ({
    forReplay: (data.forReplay !== null && typeof data.forReplay !== 'undefined')
      ? bOOLEAN.encode(data.forReplay)
      : null,
    firstTime: (data.firstTime !== null && typeof data.firstTime !== 'undefined')
      ? tIME.encode(data.firstTime)
      : null,
    lastTime: (data.lastTime !== null && typeof data.lastTime !== 'undefined')
      ? tIME.encode(data.lastTime)
      : null,
    continuous: (data.continuous !== null && typeof data.continuous !== 'undefined')
      ? bOOLEAN.encode(data.continuous)
      : null,
  }),
  decode: data => ({
    forReplay: (data.forReplay !== null && typeof data.forReplay !== 'undefined')
      ? bOOLEAN.decode(data.forReplay)
      : undefined,
    firstTime: (data.firstTime !== null && typeof data.firstTime !== 'undefined')
      ? tIME.decode(data.firstTime)
      : undefined,
    lastTime: (data.lastTime !== null && typeof data.lastTime !== 'undefined')
      ? tIME.decode(data.lastTime)
      : undefined,
    continuous: (data.continuous !== null && typeof data.continuous !== 'undefined')
      ? bOOLEAN.decode(data.continuous)
      : undefined,
  }),
};
