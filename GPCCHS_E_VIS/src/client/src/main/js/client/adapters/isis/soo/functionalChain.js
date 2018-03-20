// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const activityRequest = require('./activityRequest');
const sTRING = require('../ccsds_mal/sTRING');
const tIME = require('../ccsds_mal/tIME');

module.exports = {
  encode: data => ({
    name: (data.name !== null && typeof data.name !== 'undefined')
      ? sTRING.encode(data.name)
      : null,
    activity: (data.activity !== null && typeof data.activity !== 'undefined')
      ? data.activity
      : null,
    creationDate: (data.creationDate !== null && typeof data.creationDate !== 'undefined')
      ? tIME.encode(data.creationDate)
      : null,
  }),
  decode: data => ({
    name: (data.name !== null && typeof data.name !== 'undefined')
      ? sTRING.decode(data.name)
      : undefined,
    activity: (data.activity !== null && typeof data.activity !== 'undefined')
      ? { type: 'enum', value: data.activity, symbol: activityRequest[data.activity] }
      : undefined,
    creationDate: (data.creationDate !== null && typeof data.creationDate !== 'undefined')
      ? tIME.decode(data.creationDate)
      : undefined,
    referenceTimestamp: (data.creationDate !== null && typeof data.creationDate !== 'undefined')
        ? { type: 'time', value: data.creationDate.value.toNumber() }
        : undefined,
  }),
};
