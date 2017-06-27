// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const aTTRIBUTE = require('../ccsds_mal/aTTRIBUTE');
const lONG = require('../ccsds_mal/lONG');
const sTRING = require('../ccsds_mal/sTRING');
const uINTEGER = require('../ccsds_mal/uINTEGER');

module.exports = {
  encode: data => ({
    definitionId: (data.definitionId !== null && typeof data.definitionId !== 'undefined')
      ? lONG.encode(data.definitionId)
      : null,
    engValue: (data.engValue !== null && typeof data.engValue !== 'undefined')
      ? aTTRIBUTE.encode(data.engValue)
      : null,
    bitLength: (data.bitLength !== null && typeof data.bitLength !== 'undefined')
      ? uINTEGER.encode(data.bitLength)
      : null,
    newEncodingFormat: (data.newEncodingFormat !== null && typeof data.newEncodingFormat !== 'undefined')
      ? sTRING.encode(data.newEncodingFormat)
      : null,
    newRawValueType: (data.newRawValueType !== null && typeof data.newRawValueType !== 'undefined')
      ? sTRING.encode(data.newRawValueType)
      : null,
  }),
  decode: data => ({
    definitionId: (data.definitionId !== null && typeof data.definitionId !== 'undefined')
      ? lONG.decode(data.definitionId)
      : undefined,
    engValue: (data.engValue !== null && typeof data.engValue !== 'undefined')
      ? aTTRIBUTE.decode(data.engValue)
      : undefined,
    bitLength: (data.bitLength !== null && typeof data.bitLength !== 'undefined')
      ? uINTEGER.decode(data.bitLength)
      : undefined,
    newEncodingFormat: (data.newEncodingFormat !== null && typeof data.newEncodingFormat !== 'undefined')
      ? sTRING.decode(data.newEncodingFormat)
      : undefined,
    newRawValueType: (data.newRawValueType !== null && typeof data.newRawValueType !== 'undefined')
      ? sTRING.decode(data.newRawValueType)
      : undefined,
  }),
};
