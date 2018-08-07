// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const uINTEGER = require('../ccsds_mal/uINTEGER');

module.exports = {
  encode: data => ({
    value: (data.value !== null && typeof data.value !== 'undefined')
      ? uINTEGER.encode(data.value)
      : null,
  }),
  decode: data => ({
    value: (data.value !== null && typeof data.value !== 'undefined')
      ? uINTEGER.decode(data.value)
      : undefined,
  }),
};
