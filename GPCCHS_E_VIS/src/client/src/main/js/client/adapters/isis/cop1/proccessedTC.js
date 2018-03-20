// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const bLOB = require('../ccsds_mal/bLOB');
const fLOAT = require('../ccsds_mal/fLOAT');
const iDENTIFIER = require('../ccsds_mal/iDENTIFIER');
const iNTEGER = require('../ccsds_mal/iNTEGER');
const tIME = require('../ccsds_mal/tIME');
const uINTEGER = require('../ccsds_mal/uINTEGER');

module.exports = {
  encode: data => ({
    tCID: (data.tCID !== null && typeof data.tCID !== 'undefined')
      ? iDENTIFIER.encode(data.tCID)
      : null,
    receivedDate: (data.receivedDate !== null && typeof data.receivedDate !== 'undefined')
      ? tIME.encode(data.receivedDate)
      : null,
    mnemo: (data.mnemo !== null && typeof data.mnemo !== 'undefined')
      ? iDENTIFIER.encode(data.mnemo)
      : null,
    segment_id: (data.segment_id !== null && typeof data.segment_id !== 'undefined')
      ? uINTEGER.encode(data.segment_id)
      : null,
    rawtc_data: (data.rawtc_data !== null && typeof data.rawtc_data !== 'undefined')
      ? bLOB.encode(data.rawtc_data)
      : null,
    aPID: (data.aPID !== null && typeof data.aPID !== 'undefined')
      ? uINTEGER.encode(data.aPID)
      : null,
    definitionID: (data.definitionID !== null && typeof data.definitionID !== 'undefined')
      ? uINTEGER.encode(data.definitionID)
      : null,
    sourceID: (data.sourceID !== null && typeof data.sourceID !== 'undefined')
      ? iNTEGER.encode(data.sourceID)
      : null,
    delay: (data.delay !== null && typeof data.delay !== 'undefined')
      ? fLOAT.encode(data.delay)
      : null,
    mapID: (data.mapID !== null && typeof data.mapID !== 'undefined')
      ? uINTEGER.encode(data.mapID)
      : null,
  }),
  decode: data => ({
    tCID: (data.tCID !== null && typeof data.tCID !== 'undefined')
      ? iDENTIFIER.decode(data.tCID)
      : undefined,
    receivedDate: (data.receivedDate !== null && typeof data.receivedDate !== 'undefined')
      ? tIME.decode(data.receivedDate)
      : undefined,
    mnemo: (data.mnemo !== null && typeof data.mnemo !== 'undefined')
      ? iDENTIFIER.decode(data.mnemo)
      : undefined,
    segment_id: (data.segment_id !== null && typeof data.segment_id !== 'undefined')
      ? uINTEGER.decode(data.segment_id)
      : undefined,
    rawtc_data: (data.rawtc_data !== null && typeof data.rawtc_data !== 'undefined')
      ? bLOB.decode(data.rawtc_data)
      : undefined,
    aPID: (data.aPID !== null && typeof data.aPID !== 'undefined')
      ? uINTEGER.decode(data.aPID)
      : undefined,
    definitionID: (data.definitionID !== null && typeof data.definitionID !== 'undefined')
      ? uINTEGER.decode(data.definitionID)
      : undefined,
    sourceID: (data.sourceID !== null && typeof data.sourceID !== 'undefined')
      ? iNTEGER.decode(data.sourceID)
      : undefined,
    delay: (data.delay !== null && typeof data.delay !== 'undefined')
      ? fLOAT.decode(data.delay)
      : undefined,
    mapID: (data.mapID !== null && typeof data.mapID !== 'undefined')
      ? uINTEGER.decode(data.mapID)
      : undefined,
  }),
};
