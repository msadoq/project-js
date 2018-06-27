// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const bLOB = require('../ccsds_mal/bLOB');
const sTRING = require('../ccsds_mal/sTRING');

module.exports = {
  encode: data => ({
    data: (data.data !== null && typeof data.data !== 'undefined')
      ? sTRING.encode(data.data)
      : null,
    sooFunctionalChain: (data.sooFunctionalChain !== null && typeof data.sooFunctionalChain !== 'undefined')
      ? bLOB.encode(data.sooFunctionalChain)
      : null,
  }),
  decode: data => ({
    data: (data.data !== null && typeof data.data !== 'undefined')
      ? sTRING.decode(data.data)
      : undefined,
    sooFunctionalChain: (data.sooFunctionalChain !== null && typeof data.sooFunctionalChain !== 'undefined')
      ? bLOB.decode(data.sooFunctionalChain)
      : undefined,
  }),
};
