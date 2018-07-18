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
    sooState: (data.sooState !== null && typeof data.sooState !== 'undefined')
      ? bLOB.encode(data.sooState)
      : null,
    sooOperation: (data.sooOperation !== null && typeof data.sooOperation !== 'undefined')
      ? bLOB.encode(data.sooOperation)
      : null,
    sooFunctionalChain: (data.sooFunctionalChain !== null && typeof data.sooFunctionalChain !== 'undefined')
      ? bLOB.encode(data.sooFunctionalChain)
      : null,
  }),
  decode: data => ({
    data: (data.data !== null && typeof data.data !== 'undefined')
      ? sTRING.decode(data.data)
      : undefined,
    sooState: (data.sooState !== null && typeof data.sooState !== 'undefined')
      ? bLOB.decode(data.sooState)
      : undefined,
    sooOperation: (data.sooOperation !== null && typeof data.sooOperation !== 'undefined')
      ? bLOB.decode(data.sooOperation)
      : undefined,
    sooFunctionalChain: (data.sooFunctionalChain !== null && typeof data.sooFunctionalChain !== 'undefined')
      ? bLOB.decode(data.sooFunctionalChain)
      : undefined,
  }),
};
