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
    sooOperationRelated: (data.sooOperationRelated !== null && typeof data.sooOperationRelated !== 'undefined')
      ? bLOB.encode(data.sooOperationRelated)
      : null,
    sooOperationSource: (data.sooOperationSource !== null && typeof data.sooOperationSource !== 'undefined')
      ? bLOB.encode(data.sooOperationSource)
      : null,
  }),
  decode: data => ({
    data: (data.data !== null && typeof data.data !== 'undefined')
      ? sTRING.decode(data.data)
      : undefined,
    sooOperationRelated: (data.sooOperationRelated !== null && typeof data.sooOperationRelated !== 'undefined')
      ? bLOB.decode(data.sooOperationRelated)
      : undefined,
    sooOperationSource: (data.sooOperationSource !== null && typeof data.sooOperationSource !== 'undefined')
      ? bLOB.decode(data.sooOperationSource)
      : undefined,
  }),
};
