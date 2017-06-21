// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const bLOB = require('../ccsds_mal/bLOB');
const iNTEGER = require('../ccsds_mal/iNTEGER');
const pusHeader = require('./pusHeader');
const sTRING = require('../ccsds_mal/sTRING');
const tIME = require('../ccsds_mal/tIME');
const uINTEGER = require('../ccsds_mal/uINTEGER');
const uLONG = require('../ccsds_mal/uLONG');

module.exports = {
  encode: data => ({
    encodingDate: (data.encodingDate !== null && typeof data.encodingDate !== 'undefined')
      ? tIME.encode(data.encodingDate)
      : null,
    pusHeader: (data.pusHeader !== null && typeof data.pusHeader !== 'undefined')
      ? pusHeader.encode(data.pusHeader)
      : null,
    fileReference: (data.fileReference !== null && typeof data.fileReference !== 'undefined')
      ? sTRING.encode(data.fileReference)
      : null,
    partition: (data.partition !== null && typeof data.partition !== 'undefined')
      ? sTRING.encode(data.partition)
      : null,
    rawPacket: (data.rawPacket !== null && typeof data.rawPacket !== 'undefined')
      ? bLOB.encode(data.rawPacket)
      : null,
    tcId: (data.tcId !== null && typeof data.tcId !== 'undefined')
      ? iNTEGER.encode(data.tcId)
      : null,
    tc13: _map(data.tc13, d => (bLOB.encode(d))),
    generatedProcedure: (data.generatedProcedure !== null && typeof data.generatedProcedure !== 'undefined')
      ? sTRING.encode(data.generatedProcedure)
      : null,
    tcSourceId: (data.tcSourceId !== null && typeof data.tcSourceId !== 'undefined')
      ? uINTEGER.encode(data.tcSourceId)
      : null,
    sequenceCount: (data.sequenceCount !== null && typeof data.sequenceCount !== 'undefined')
      ? uLONG.encode(data.sequenceCount)
      : null,
    fileUri: (data.fileUri !== null && typeof data.fileUri !== 'undefined')
      ? sTRING.encode(data.fileUri)
      : null,
    fileType: (data.fileType !== null && typeof data.fileType !== 'undefined')
      ? sTRING.encode(data.fileType)
      : null,
    parameterPhysicalValue: _map(data.parameterPhysicalValue, d => (sTRING.encode(d))),
    fileChecksum: (data.fileChecksum !== null && typeof data.fileChecksum !== 'undefined')
      ? uLONG.encode(data.fileChecksum)
      : null,
  }),
  decode: data => ({
    encodingDate: (data.encodingDate !== null && typeof data.encodingDate !== 'undefined')
      ? tIME.decode(data.encodingDate)
      : undefined,
    pusHeader: (data.pusHeader !== null && typeof data.pusHeader !== 'undefined')
      ? pusHeader.decode(data.pusHeader)
      : undefined,
    fileReference: (data.fileReference !== null && typeof data.fileReference !== 'undefined')
      ? sTRING.decode(data.fileReference)
      : undefined,
    partition: (data.partition !== null && typeof data.partition !== 'undefined')
      ? sTRING.decode(data.partition)
      : undefined,
    rawPacket: (data.rawPacket !== null && typeof data.rawPacket !== 'undefined')
      ? bLOB.decode(data.rawPacket)
      : undefined,
    tcId: (data.tcId !== null && typeof data.tcId !== 'undefined')
      ? iNTEGER.decode(data.tcId)
      : undefined,
    tc13: _map(data.tc13, d => (bLOB.decode(d))),
    generatedProcedure: (data.generatedProcedure !== null && typeof data.generatedProcedure !== 'undefined')
      ? sTRING.decode(data.generatedProcedure)
      : undefined,
    tcSourceId: (data.tcSourceId !== null && typeof data.tcSourceId !== 'undefined')
      ? uINTEGER.decode(data.tcSourceId)
      : undefined,
    sequenceCount: (data.sequenceCount !== null && typeof data.sequenceCount !== 'undefined')
      ? uLONG.decode(data.sequenceCount)
      : undefined,
    fileUri: (data.fileUri !== null && typeof data.fileUri !== 'undefined')
      ? sTRING.decode(data.fileUri)
      : undefined,
    fileType: (data.fileType !== null && typeof data.fileType !== 'undefined')
      ? sTRING.decode(data.fileType)
      : undefined,
    parameterPhysicalValue: _map(data.parameterPhysicalValue, d => (sTRING.decode(d))),
    fileChecksum: (data.fileChecksum !== null && typeof data.fileChecksum !== 'undefined')
      ? uLONG.decode(data.fileChecksum)
      : undefined,
    referenceTimestamp: (data.encodingDate !== null && typeof data.encodingDate !== 'undefined')
        ? { type: 'time', value: data.encodingDate.value.toNumber() }
        : undefined,
  }),
};
