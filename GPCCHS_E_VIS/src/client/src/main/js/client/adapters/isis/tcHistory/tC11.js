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
    timeTaggedTC: _map(data.timeTaggedTC, d => (bLOB.encode(d))),
    pusHeader: (data.pusHeader !== null && typeof data.pusHeader !== 'undefined')
      ? pusHeader.encode(data.pusHeader)
      : null,
    rawPacket: (data.rawPacket !== null && typeof data.rawPacket !== 'undefined')
      ? bLOB.encode(data.rawPacket)
      : null,
    subscheduleId: (data.subscheduleId !== null && typeof data.subscheduleId !== 'undefined')
      ? uINTEGER.encode(data.subscheduleId)
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
    timeTaggedTC: _map(data.timeTaggedTC, d => (bLOB.decode(d))),
    pusHeader: (data.pusHeader !== null && typeof data.pusHeader !== 'undefined')
      ? pusHeader.decode(data.pusHeader)
      : undefined,
    rawPacket: (data.rawPacket !== null && typeof data.rawPacket !== 'undefined')
      ? bLOB.decode(data.rawPacket)
      : undefined,
    subscheduleId: (data.subscheduleId !== null && typeof data.subscheduleId !== 'undefined')
      ? uINTEGER.decode(data.subscheduleId)
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
