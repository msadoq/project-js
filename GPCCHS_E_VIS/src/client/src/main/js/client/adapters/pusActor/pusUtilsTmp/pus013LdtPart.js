const uINTEGER = require('../ccsds_mal/uINTEGER');
const bLOB = require('../ccsds_mal/bLOB');
const uLONG = require('../ccsds_mal/uLONG');


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
    uniqueId: (data.uniqueId !== null && typeof data.uniqueId !== 'undefined')
      ? uLONG.encode(data.uniqueId)
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
    uniqueId: (data.uniqueId !== null && typeof data.uniqueId !== 'undefined')
      ? uLONG.decode(data.uniqueId)
      : undefined,
  }),
};
