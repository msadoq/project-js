// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const tIME = require('../ccsds_mal/tIME');
const uOCTET = require('../ccsds_mal/uOCTET');

module.exports = {
  encode: data => ({
    lastUpdateMode: (data.lastUpdateMode !== null && typeof data.lastUpdateMode !== 'undefined')
      ? uOCTET.encode(data.lastUpdateMode)
      : null,
    lastUpdateTime: (data.lastUpdateTime !== null && typeof data.lastUpdateTime !== 'undefined')
      ? tIME.encode(data.lastUpdateTime)
      : null,
  }),
  decode: data => ({
    lastUpdateMode: (data.lastUpdateMode !== null && typeof data.lastUpdateMode !== 'undefined')
      ? uOCTET.decode(data.lastUpdateMode)
      : undefined,
    lastUpdateTime: (data.lastUpdateTime !== null && typeof data.lastUpdateTime !== 'undefined')
      ? tIME.decode(data.lastUpdateTime)
      : undefined,
  }),
};
