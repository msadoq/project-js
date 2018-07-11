// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const tIME = require('../ccsds_mal/tIME');
const uINTEGER = require('../ccsds_mal/uINTEGER');

module.exports = {
  encode: data => ({
    initialisationMode: (data.initialisationMode !== null && typeof data.initialisationMode !== 'undefined')
      ? uINTEGER.encode(data.initialisationMode)
      : null,
    resetType: (data.resetType !== null && typeof data.resetType !== 'undefined')
      ? uINTEGER.encode(data.resetType)
      : null,
    date: (data.date !== null && typeof data.date !== 'undefined')
      ? tIME.encode(data.date)
      : null,
  }),
  decode: data => ({
    initialisationMode: (data.initialisationMode !== null && typeof data.initialisationMode !== 'undefined')
      ? uINTEGER.decode(data.initialisationMode)
      : undefined,
    resetType: (data.resetType !== null && typeof data.resetType !== 'undefined')
      ? uINTEGER.decode(data.resetType)
      : undefined,
    date: (data.date !== null && typeof data.date !== 'undefined')
      ? tIME.decode(data.date)
      : undefined,
  }),
};
