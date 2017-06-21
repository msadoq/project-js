// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const bLOB = require('../ccsds_mal/bLOB');
const lONG = require('../ccsds_mal/lONG');
const uINTEGER = require('../ccsds_mal/uINTEGER');

module.exports = {
  encode: data => ({
    rawValue: (data.rawValue !== null && typeof data.rawValue !== 'undefined')
      ? bLOB.encode(data.rawValue)
      : null,
    sequenceCount: (data.sequenceCount !== null && typeof data.sequenceCount !== 'undefined')
      ? uINTEGER.encode(data.sequenceCount)
      : null,
    definitionId: (data.definitionId !== null && typeof data.definitionId !== 'undefined')
      ? lONG.encode(data.definitionId)
      : null,
  }),
  decode: data => ({
    rawValue: (data.rawValue !== null && typeof data.rawValue !== 'undefined')
      ? bLOB.decode(data.rawValue)
      : undefined,
    sequenceCount: (data.sequenceCount !== null && typeof data.sequenceCount !== 'undefined')
      ? uINTEGER.decode(data.sequenceCount)
      : undefined,
    definitionId: (data.definitionId !== null && typeof data.definitionId !== 'undefined')
      ? lONG.decode(data.definitionId)
      : undefined,
  }),
};
