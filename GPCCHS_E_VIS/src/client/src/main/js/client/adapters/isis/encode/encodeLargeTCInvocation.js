// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const bLOB = require('../ccsds_mal/bLOB');
const lONG = require('../ccsds_mal/lONG');
const uINTEGER = require('../ccsds_mal/uINTEGER');

module.exports = {
  encode: data => ({
    definitionId: (data.definitionId !== null && typeof data.definitionId !== 'undefined')
      ? lONG.encode(data.definitionId)
      : null,
    rawValue: (data.rawValue !== null && typeof data.rawValue !== 'undefined')
      ? bLOB.encode(data.rawValue)
      : null,
    ackField: (data.ackField !== null && typeof data.ackField !== 'undefined')
      ? uINTEGER.encode(data.ackField)
      : null,
    sourceId: (data.sourceId !== null && typeof data.sourceId !== 'undefined')
      ? uINTEGER.encode(data.sourceId)
      : null,
  }),
  decode: data => ({
    definitionId: (data.definitionId !== null && typeof data.definitionId !== 'undefined')
      ? lONG.decode(data.definitionId)
      : undefined,
    rawValue: (data.rawValue !== null && typeof data.rawValue !== 'undefined')
      ? bLOB.decode(data.rawValue)
      : undefined,
    ackField: (data.ackField !== null && typeof data.ackField !== 'undefined')
      ? uINTEGER.decode(data.ackField)
      : undefined,
    sourceId: (data.sourceId !== null && typeof data.sourceId !== 'undefined')
      ? uINTEGER.decode(data.sourceId)
      : undefined,
  }),
};
