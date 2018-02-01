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
const iDENTIFIER = require('../ccsds_mal/iDENTIFIER');
const tIME = require('../ccsds_mal/tIME');
const uINTEGER = require('../ccsds_mal/uINTEGER');

module.exports = {
  encode: data => ({
    ackField: (data.ackField !== null && typeof data.ackField !== 'undefined')
      ? uINTEGER.encode(data.ackField)
      : null,
    sourceId: (data.sourceId !== null && typeof data.sourceId !== 'undefined')
      ? uINTEGER.encode(data.sourceId)
      : null,
    subScheduledId: (data.subScheduledId !== null && typeof data.subScheduledId !== 'undefined')
      ? uINTEGER.encode(data.subScheduledId)
      : null,
    definitionIds: _map(data.definitionIds, d => (iDENTIFIER.encode(d))),
    dates: _map(data.dates, d => (tIME.encode(d))),
    rawValues: _map(data.rawValues, d => (bLOB.encode(d))),
  }),
  decode: data => ({
    ackField: (data.ackField !== null && typeof data.ackField !== 'undefined')
      ? uINTEGER.decode(data.ackField)
      : undefined,
    sourceId: (data.sourceId !== null && typeof data.sourceId !== 'undefined')
      ? uINTEGER.decode(data.sourceId)
      : undefined,
    subScheduledId: (data.subScheduledId !== null && typeof data.subScheduledId !== 'undefined')
      ? uINTEGER.decode(data.subScheduledId)
      : undefined,
    definitionIds: _map(data.definitionIds, d => (iDENTIFIER.decode(d))),
    dates: _map(data.dates, d => (tIME.decode(d))),
    rawValues: _map(data.rawValues, d => (bLOB.decode(d))),
  }),
};
