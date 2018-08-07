// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const sTRING = require('../ccsds_mal/sTRING');

module.exports = {
  encode: data => ({
    value: (data.value !== null && typeof data.value !== 'undefined')
      ? sTRING.encode(data.value)
      : null,
  }),
  decode: data => ({
    value: (data.value !== null && typeof data.value !== 'undefined')
      ? sTRING.decode(data.value)
      : undefined,
  }),
};
