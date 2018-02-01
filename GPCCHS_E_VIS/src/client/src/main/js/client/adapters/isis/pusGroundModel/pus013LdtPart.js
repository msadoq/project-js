// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const bLOB = require('../ccsds_mal/bLOB');
const uINTEGER = require('../ccsds_mal/uINTEGER');

module.exports = {
  encode: data => ({
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? uINTEGER.encode(data.status)
      : null,
    partSize: (data.partSize !== null && typeof data.partSize !== 'undefined')
      ? uINTEGER.encode(data.partSize)
      : null,
    partId: (data.partId !== null && typeof data.partId !== 'undefined')
      ? uINTEGER.encode(data.partId)
      : null,
    sourceId: (data.sourceId !== null && typeof data.sourceId !== 'undefined')
      ? uINTEGER.encode(data.sourceId)
      : null,
    commandApid: (data.commandApid !== null && typeof data.commandApid !== 'undefined')
      ? uINTEGER.encode(data.commandApid)
      : null,
    sequenceCount: (data.sequenceCount !== null && typeof data.sequenceCount !== 'undefined')
      ? uINTEGER.encode(data.sequenceCount)
      : null,
    serviceDataUnit: (data.serviceDataUnit !== null && typeof data.serviceDataUnit !== 'undefined')
      ? bLOB.encode(data.serviceDataUnit)
      : null,
  }),
  decode: data => ({
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? uINTEGER.decode(data.status)
      : undefined,
    partSize: (data.partSize !== null && typeof data.partSize !== 'undefined')
      ? uINTEGER.decode(data.partSize)
      : undefined,
    partId: (data.partId !== null && typeof data.partId !== 'undefined')
      ? uINTEGER.decode(data.partId)
      : undefined,
    sourceId: (data.sourceId !== null && typeof data.sourceId !== 'undefined')
      ? uINTEGER.decode(data.sourceId)
      : undefined,
    commandApid: (data.commandApid !== null && typeof data.commandApid !== 'undefined')
      ? uINTEGER.decode(data.commandApid)
      : undefined,
    sequenceCount: (data.sequenceCount !== null && typeof data.sequenceCount !== 'undefined')
      ? uINTEGER.decode(data.sequenceCount)
      : undefined,
    serviceDataUnit: (data.serviceDataUnit !== null && typeof data.serviceDataUnit !== 'undefined')
      ? bLOB.decode(data.serviceDataUnit)
      : undefined,
  }),
};
