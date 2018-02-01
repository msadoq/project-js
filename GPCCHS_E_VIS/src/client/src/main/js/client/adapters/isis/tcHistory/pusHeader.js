// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const fINETIME = require('../ccsds_mal/fINETIME');
const uINTEGER = require('../ccsds_mal/uINTEGER');
const uOCTET = require('../ccsds_mal/uOCTET');

module.exports = {
  encode: data => ({
    versionNumber: (data.versionNumber !== null && typeof data.versionNumber !== 'undefined')
      ? uOCTET.encode(data.versionNumber)
      : null,
    sequenceCount: (data.sequenceCount !== null && typeof data.sequenceCount !== 'undefined')
      ? uINTEGER.encode(data.sequenceCount)
      : null,
    sourceId: (data.sourceId !== null && typeof data.sourceId !== 'undefined')
      ? uINTEGER.encode(data.sourceId)
      : null,
    serviceType: (data.serviceType !== null && typeof data.serviceType !== 'undefined')
      ? uOCTET.encode(data.serviceType)
      : null,
    serviceSubType: (data.serviceSubType !== null && typeof data.serviceSubType !== 'undefined')
      ? uOCTET.encode(data.serviceSubType)
      : null,
    subCounter: (data.subCounter !== null && typeof data.subCounter !== 'undefined')
      ? uOCTET.encode(data.subCounter)
      : null,
    destinationId: (data.destinationId !== null && typeof data.destinationId !== 'undefined')
      ? uOCTET.encode(data.destinationId)
      : null,
    time: (data.time !== null && typeof data.time !== 'undefined')
      ? fINETIME.encode(data.time)
      : null,
  }),
  decode: data => ({
    versionNumber: (data.versionNumber !== null && typeof data.versionNumber !== 'undefined')
      ? uOCTET.decode(data.versionNumber)
      : undefined,
    sequenceCount: (data.sequenceCount !== null && typeof data.sequenceCount !== 'undefined')
      ? uINTEGER.decode(data.sequenceCount)
      : undefined,
    sourceId: (data.sourceId !== null && typeof data.sourceId !== 'undefined')
      ? uINTEGER.decode(data.sourceId)
      : undefined,
    serviceType: (data.serviceType !== null && typeof data.serviceType !== 'undefined')
      ? uOCTET.decode(data.serviceType)
      : undefined,
    serviceSubType: (data.serviceSubType !== null && typeof data.serviceSubType !== 'undefined')
      ? uOCTET.decode(data.serviceSubType)
      : undefined,
    subCounter: (data.subCounter !== null && typeof data.subCounter !== 'undefined')
      ? uOCTET.decode(data.subCounter)
      : undefined,
    destinationId: (data.destinationId !== null && typeof data.destinationId !== 'undefined')
      ? uOCTET.decode(data.destinationId)
      : undefined,
    time: (data.time !== null && typeof data.time !== 'undefined')
      ? fINETIME.decode(data.time)
      : undefined,
  }),
};
