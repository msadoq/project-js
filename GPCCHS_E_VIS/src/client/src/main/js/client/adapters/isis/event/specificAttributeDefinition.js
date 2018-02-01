// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const iDENTIFIER = require('../ccsds_mal/iDENTIFIER');
const sTRING = require('../ccsds_mal/sTRING');
const uLONG = require('../ccsds_mal/uLONG');

module.exports = {
  encode: data => ({
    name: (data.name !== null && typeof data.name !== 'undefined')
      ? iDENTIFIER.encode(data.name)
      : null,
    type: (data.type !== null && typeof data.type !== 'undefined')
      ? uLONG.encode(data.type)
      : null,
    workingUnit: (data.workingUnit !== null && typeof data.workingUnit !== 'undefined')
      ? sTRING.encode(data.workingUnit)
      : null,
    displayUnit: (data.displayUnit !== null && typeof data.displayUnit !== 'undefined')
      ? sTRING.encode(data.displayUnit)
      : null,
    format: (data.format !== null && typeof data.format !== 'undefined')
      ? sTRING.encode(data.format)
      : null,
  }),
  decode: data => ({
    name: (data.name !== null && typeof data.name !== 'undefined')
      ? iDENTIFIER.decode(data.name)
      : undefined,
    type: (data.type !== null && typeof data.type !== 'undefined')
      ? uLONG.decode(data.type)
      : undefined,
    workingUnit: (data.workingUnit !== null && typeof data.workingUnit !== 'undefined')
      ? sTRING.decode(data.workingUnit)
      : undefined,
    displayUnit: (data.displayUnit !== null && typeof data.displayUnit !== 'undefined')
      ? sTRING.decode(data.displayUnit)
      : undefined,
    format: (data.format !== null && typeof data.format !== 'undefined')
      ? sTRING.decode(data.format)
      : undefined,
  }),
};
