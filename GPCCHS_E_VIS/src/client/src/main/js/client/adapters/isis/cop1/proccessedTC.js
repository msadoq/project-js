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
const uOCTET = require('../ccsds_mal/uOCTET');

module.exports = {
  encode: data => ({
    tCID: (data.tCID !== null && typeof data.tCID !== 'undefined')
      ? iDENTIFIER.encode(data.tCID)
      : null,
    receivedDate: (data.receivedDate !== null && typeof data.receivedDate !== 'undefined')
      ? tIME.encode(data.receivedDate)
      : null,
    mnemo: (data.mnemo !== null && typeof data.mnemo !== 'undefined')
      ? uOCTET.encode(data.mnemo)
      : null,
    segment_id: _map(data.segment_id, d => (uINTEGER.encode(d))),
    rawtc_data: (data.rawtc_data !== null && typeof data.rawtc_data !== 'undefined')
      ? bLOB.encode(data.rawtc_data)
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
      ? uOCTET.decode(data.mnemo)
      : undefined,
    segment_id: _map(data.segment_id, d => (uINTEGER.decode(d))),
    rawtc_data: (data.rawtc_data !== null && typeof data.rawtc_data !== 'undefined')
      ? bLOB.decode(data.rawtc_data)
      : undefined,
  }),
};
