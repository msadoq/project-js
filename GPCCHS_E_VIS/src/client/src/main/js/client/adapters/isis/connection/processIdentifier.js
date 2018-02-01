// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const lONG = require('../ccsds_mal/lONG');
const processInfo = require('./processInfo');
const sTRING = require('../ccsds_mal/sTRING');

module.exports = {
  encode: data => ({
    processId: (data.processId !== null && typeof data.processId !== 'undefined')
      ? lONG.encode(data.processId)
      : null,
    functionOId: (data.functionOId !== null && typeof data.functionOId !== 'undefined')
      ? sTRING.encode(data.functionOId)
      : null,
    processInfo: (data.processInfo !== null && typeof data.processInfo !== 'undefined')
      ? processInfo.encode(data.processInfo)
      : null,
  }),
  decode: data => ({
    processId: (data.processId !== null && typeof data.processId !== 'undefined')
      ? lONG.decode(data.processId)
      : undefined,
    functionOId: (data.functionOId !== null && typeof data.functionOId !== 'undefined')
      ? sTRING.decode(data.functionOId)
      : undefined,
    processInfo: (data.processInfo !== null && typeof data.processInfo !== 'undefined')
      ? processInfo.decode(data.processInfo)
      : undefined,
  }),
};
