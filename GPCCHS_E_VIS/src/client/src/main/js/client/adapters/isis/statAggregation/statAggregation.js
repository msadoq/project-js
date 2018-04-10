// ====================================================================
// HISTORY
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const statValue = require('./statValue');
const tIME = require('../ccsds_mal/tIME');

module.exports = {
  encode: data => ({
    statDate: (data.statDate !== null && typeof data.statDate !== 'undefined')
      ? tIME.encode(data.statDate)
      : null,
    statValue: (data.statValue !== null && typeof data.statValue !== 'undefined')
      ? statValue.encode(data.statValue)
      : null,
  }),
  decode: data => ({
    statDate: (data.statDate !== null && typeof data.statDate !== 'undefined')
      ? tIME.decode(data.statDate)
      : undefined,
    statValue: (data.statValue !== null && typeof data.statValue !== 'undefined')
      ? statValue.decode(data.statValue)
      : undefined,
    referenceTimestamp: (data.statDate !== null && typeof data.statDate !== 'undefined')
        ? { type: 'time', value: data.statDate.value.toNumber() }
        : undefined,
  }),
};
