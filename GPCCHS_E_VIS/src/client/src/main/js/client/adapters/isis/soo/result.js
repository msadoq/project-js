// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const dURATION = require('../ccsds_mal/dURATION');
const sTRING = require('../ccsds_mal/sTRING');
const tIME = require('../ccsds_mal/tIME');

module.exports = {
  encode: data => ({
    confirmationStatus: (data.confirmationStatus !== null && typeof data.confirmationStatus !== 'undefined')
      ? sTRING.encode(data.confirmationStatus)
      : null,
    duration: (data.duration !== null && typeof data.duration !== 'undefined')
      ? dURATION.encode(data.duration)
      : null,
    executionStatus: (data.executionStatus !== null && typeof data.executionStatus !== 'undefined')
      ? sTRING.encode(data.executionStatus)
      : null,
    detailedStatus: (data.detailedStatus !== null && typeof data.detailedStatus !== 'undefined')
      ? sTRING.encode(data.detailedStatus)
      : null,
    exceptionDetails: (data.exceptionDetails !== null && typeof data.exceptionDetails !== 'undefined')
      ? sTRING.encode(data.exceptionDetails)
      : null,
    startDatetime: (data.startDatetime !== null && typeof data.startDatetime !== 'undefined')
      ? tIME.encode(data.startDatetime)
      : null,
    endDatetime: (data.endDatetime !== null && typeof data.endDatetime !== 'undefined')
      ? tIME.encode(data.endDatetime)
      : null,
  }),
  decode: data => ({
    confirmationStatus: (data.confirmationStatus !== null && typeof data.confirmationStatus !== 'undefined')
      ? sTRING.decode(data.confirmationStatus)
      : undefined,
    duration: (data.duration !== null && typeof data.duration !== 'undefined')
      ? dURATION.decode(data.duration)
      : undefined,
    executionStatus: (data.executionStatus !== null && typeof data.executionStatus !== 'undefined')
      ? sTRING.decode(data.executionStatus)
      : undefined,
    detailedStatus: (data.detailedStatus !== null && typeof data.detailedStatus !== 'undefined')
      ? sTRING.decode(data.detailedStatus)
      : undefined,
    exceptionDetails: (data.exceptionDetails !== null && typeof data.exceptionDetails !== 'undefined')
      ? sTRING.decode(data.exceptionDetails)
      : undefined,
    startDatetime: (data.startDatetime !== null && typeof data.startDatetime !== 'undefined')
      ? tIME.decode(data.startDatetime)
      : undefined,
    endDatetime: (data.endDatetime !== null && typeof data.endDatetime !== 'undefined')
      ? tIME.decode(data.endDatetime)
      : undefined,
  }),
};
