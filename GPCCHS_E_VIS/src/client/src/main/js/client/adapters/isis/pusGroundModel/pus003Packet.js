// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const bOOLEAN = require('../ccsds_mal/bOOLEAN');
const pusElement = require('./pusElement');
const sTRING = require('../ccsds_mal/sTRING');
const uINTEGER = require('../ccsds_mal/uINTEGER');

module.exports = {
  encode: data => ({
    sid: (data.sid !== null && typeof data.sid !== 'undefined')
      ? uINTEGER.encode(data.sid)
      : null,
    validityParameterId: (data.validityParameterId !== null && typeof data.validityParameterId !== 'undefined')
      ? uINTEGER.encode(data.validityParameterId)
      : null,
    validityParameterMask: (data.validityParameterMask !== null && typeof data.validityParameterMask !== 'undefined')
      ? sTRING.encode(data.validityParameterMask)
      : null,
    validityParameterExpectedValue: (data.validityParameterExpectedValue !== null && typeof data.validityParameterExpectedValue !== 'undefined')
      ? sTRING.encode(data.validityParameterExpectedValue)
      : null,
    collectionInterval: (data.collectionInterval !== null && typeof data.collectionInterval !== 'undefined')
      ? uINTEGER.encode(data.collectionInterval)
      : null,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? uINTEGER.encode(data.status)
      : null,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.encode(data.pusElement)
      : null,
    sidLabel: (data.sidLabel !== null && typeof data.sidLabel !== 'undefined')
      ? sTRING.encode(data.sidLabel)
      : null,
    isCollectionIntervalSet: (data.isCollectionIntervalSet !== null && typeof data.isCollectionIntervalSet !== 'undefined')
      ? bOOLEAN.encode(data.isCollectionIntervalSet)
      : null,
  }),
  decode: data => ({
    sid: (data.sid !== null && typeof data.sid !== 'undefined')
      ? uINTEGER.decode(data.sid)
      : undefined,
    validityParameterId: (data.validityParameterId !== null && typeof data.validityParameterId !== 'undefined')
      ? uINTEGER.decode(data.validityParameterId)
      : undefined,
    validityParameterMask: (data.validityParameterMask !== null && typeof data.validityParameterMask !== 'undefined')
      ? sTRING.decode(data.validityParameterMask)
      : undefined,
    validityParameterExpectedValue: (data.validityParameterExpectedValue !== null && typeof data.validityParameterExpectedValue !== 'undefined')
      ? sTRING.decode(data.validityParameterExpectedValue)
      : undefined,
    collectionInterval: (data.collectionInterval !== null && typeof data.collectionInterval !== 'undefined')
      ? uINTEGER.decode(data.collectionInterval)
      : undefined,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? uINTEGER.decode(data.status)
      : undefined,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.decode(data.pusElement)
      : undefined,
    sidLabel: (data.sidLabel !== null && typeof data.sidLabel !== 'undefined')
      ? sTRING.decode(data.sidLabel)
      : undefined,
    isCollectionIntervalSet: (data.isCollectionIntervalSet !== null && typeof data.isCollectionIntervalSet !== 'undefined')
      ? bOOLEAN.decode(data.isCollectionIntervalSet)
      : undefined,
  }),
};
