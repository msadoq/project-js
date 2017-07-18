// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const bLOB = require('../ccsds_mal/bLOB');
const lONG = require('../ccsds_mal/lONG');

module.exports = {
  encode: data => ({
    definitionId: (data.definitionId !== null && typeof data.definitionId !== 'undefined')
      ? lONG.encode(data.definitionId)
      : null,
    rawValue: (data.rawValue !== null && typeof data.rawValue !== 'undefined')
      ? bLOB.encode(data.rawValue)
      : null,
  }),
  decode: data => ({
    definitionId: (data.definitionId !== null && typeof data.definitionId !== 'undefined')
      ? lONG.decode(data.definitionId)
      : undefined,
    rawValue: (data.rawValue !== null && typeof data.rawValue !== 'undefined')
      ? bLOB.decode(data.rawValue)
      : undefined,
  }),
};
