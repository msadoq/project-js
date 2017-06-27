// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const bOOLEAN = require('../ccsds_mal/bOOLEAN');
const iNTEGER = require('../ccsds_mal/iNTEGER');

module.exports = {
  encode: data => ({
    val: (data.val !== null && typeof data.val !== 'undefined')
      ? iNTEGER.encode(data.val)
      : null,
    flag: (data.flag !== null && typeof data.flag !== 'undefined')
      ? bOOLEAN.encode(data.flag)
      : null,
  }),
  decode: data => ({
    val: (data.val !== null && typeof data.val !== 'undefined')
      ? iNTEGER.decode(data.val)
      : undefined,
    flag: (data.flag !== null && typeof data.flag !== 'undefined')
      ? bOOLEAN.decode(data.flag)
      : undefined,
  }),
};
