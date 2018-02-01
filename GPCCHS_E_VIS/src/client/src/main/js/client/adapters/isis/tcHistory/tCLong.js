// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

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
    tc13: _map(data.tc13, d => (bLOB.encode(d))),
    generatedProcedure: (data.generatedProcedure !== null && typeof data.generatedProcedure !== 'undefined')
      ? sTRING.encode(data.generatedProcedure)
      : null,
    rawPacket: (data.rawPacket !== null && typeof data.rawPacket !== 'undefined')
      ? bLOB.encode(data.rawPacket)
      : null,
    tcId: (data.tcId !== null && typeof data.tcId !== 'undefined')
      ? iNTEGER.encode(data.tcId)
      : null,
    tcSourceId: (data.tcSourceId !== null && typeof data.tcSourceId !== 'undefined')
      ? uINTEGER.encode(data.tcSourceId)
      : null,
    sequenceCount: (data.sequenceCount !== null && typeof data.sequenceCount !== 'undefined')
      ? uLONG.encode(data.sequenceCount)
      : null,
    parameterPhysicalValue: _map(data.parameterPhysicalValue, d => (sTRING.encode(d))),
  }),
  decode: data => ({
    encodingDate: (data.encodingDate !== null && typeof data.encodingDate !== 'undefined')
      ? tIME.decode(data.encodingDate)
      : undefined,
    pusHeader: (data.pusHeader !== null && typeof data.pusHeader !== 'undefined')
      ? pusHeader.decode(data.pusHeader)
      : undefined,
    tc13: _map(data.tc13, d => (bLOB.decode(d))),
    generatedProcedure: (data.generatedProcedure !== null && typeof data.generatedProcedure !== 'undefined')
      ? sTRING.decode(data.generatedProcedure)
      : undefined,
    rawPacket: (data.rawPacket !== null && typeof data.rawPacket !== 'undefined')
      ? bLOB.decode(data.rawPacket)
      : undefined,
    tcId: (data.tcId !== null && typeof data.tcId !== 'undefined')
      ? iNTEGER.decode(data.tcId)
      : undefined,
    tcSourceId: (data.tcSourceId !== null && typeof data.tcSourceId !== 'undefined')
      ? uINTEGER.decode(data.tcSourceId)
      : undefined,
    sequenceCount: (data.sequenceCount !== null && typeof data.sequenceCount !== 'undefined')
      ? uLONG.decode(data.sequenceCount)
      : undefined,
    parameterPhysicalValue: _map(data.parameterPhysicalValue, d => (sTRING.decode(d))),
    referenceTimestamp: (data.encodingDate !== null && typeof data.encodingDate !== 'undefined')
        ? { type: 'time', value: data.encodingDate.value.toNumber() }
        : undefined,
  }),
};
