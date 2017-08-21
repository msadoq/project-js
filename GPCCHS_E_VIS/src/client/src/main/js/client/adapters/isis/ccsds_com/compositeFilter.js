// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const aTTRIBUTE = require('../ccsds_mal/aTTRIBUTE');
const sTRING = require('../ccsds_mal/sTRING');
const uINTEGER = require('../ccsds_mal/uINTEGER');

module.exports = {
  encode: data => ({
    fieldName: (data.fieldName !== null && typeof data.fieldName !== 'undefined')
      ? sTRING.encode(data.fieldName)
      : null,
    type: (data.type !== null && typeof data.type !== 'undefined')
      ? uINTEGER.encode(data.type)
      : null,
    fieldValue: (data.fieldValue !== null && typeof data.fieldValue !== 'undefined')
      ? aTTRIBUTE.encode(data.fieldValue)
      : null,
  }),
  decode: data => ({
    fieldName: (data.fieldName !== null && typeof data.fieldName !== 'undefined')
      ? sTRING.decode(data.fieldName)
      : undefined,
    type: (data.type !== null && typeof data.type !== 'undefined')
      ? uINTEGER.decode(data.type)
      : undefined,
    fieldValue: (data.fieldValue !== null && typeof data.fieldValue !== 'undefined')
      ? aTTRIBUTE.decode(data.fieldValue)
      : undefined,
  }),
};
