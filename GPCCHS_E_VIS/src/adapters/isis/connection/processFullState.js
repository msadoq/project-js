// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const lONG = require('../ccsds_mal/lONG');
const processState = require('./processState');
const sTRING = require('../ccsds_mal/sTRING');

module.exports = {
  encode: data => ({
    processState: (data.processState !== null && typeof data.processState !== 'undefined')
      ? data.processState
      : null,
    processId: (data.processId !== null && typeof data.processId !== 'undefined')
      ? lONG.encode(data.processId)
      : null,
    functionOId: (data.functionOId !== null && typeof data.functionOId !== 'undefined')
      ? sTRING.encode(data.functionOId)
      : null,
  }),
  decode: data => ({
    processState: (data.processState !== null && typeof data.processState !== 'undefined')
      ? { type: 'enum', value: data.processState, symbol: processState[data.processState] }
      : undefined,
    processId: (data.processId !== null && typeof data.processId !== 'undefined')
      ? lONG.decode(data.processId)
      : undefined,
    functionOId: (data.functionOId !== null && typeof data.functionOId !== 'undefined')
      ? sTRING.decode(data.functionOId)
      : undefined,
  }),
};
