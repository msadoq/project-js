// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const encodedType = require('./encodedType');
const encodedValuesList = require('./encodedValuesList');

module.exports = {
  encode: data => ({
    encodedType: (data.encodedType !== null && typeof data.encodedType !== 'undefined')
      ? data.encodedType
      : null,
    encodedValues: (data.encodedValues !== null && typeof data.encodedValues !== 'undefined')
      ? encodedValuesList.encode(data.encodedValues)
      : null,
  }),
  decode: data => ({
    encodedType: (data.encodedType !== null && typeof data.encodedType !== 'undefined')
      ? { type: 'enum', value: data.encodedType, symbol: encodedType[data.encodedType] }
      : undefined,
    encodedValues: (data.encodedValues !== null && typeof data.encodedValues !== 'undefined')
      ? encodedValuesList.decode(data.encodedValues)
      : undefined,
  }),
};
