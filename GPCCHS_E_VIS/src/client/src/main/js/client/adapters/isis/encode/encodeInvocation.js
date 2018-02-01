// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const encodedType = require('./encodedType');
const encodingAction = require('./encodingAction');
const inputType = require('./inputType');
const lONG = require('../ccsds_mal/lONG');

module.exports = {
  encode: data => ({
    definitionId: (data.definitionId !== null && typeof data.definitionId !== 'undefined')
      ? lONG.encode(data.definitionId)
      : null,
    inputType: (data.inputType !== null && typeof data.inputType !== 'undefined')
      ? data.inputType
      : null,
    encodingAction: (data.encodingAction !== null && typeof data.encodingAction !== 'undefined')
      ? encodingAction.encode(data.encodingAction)
      : null,
    encodedType: (data.encodedType !== null && typeof data.encodedType !== 'undefined')
      ? data.encodedType
      : null,
  }),
  decode: data => ({
    definitionId: (data.definitionId !== null && typeof data.definitionId !== 'undefined')
      ? lONG.decode(data.definitionId)
      : undefined,
    inputType: (data.inputType !== null && typeof data.inputType !== 'undefined')
      ? { type: 'enum', value: data.inputType, symbol: inputType[data.inputType] }
      : undefined,
    encodingAction: (data.encodingAction !== null && typeof data.encodingAction !== 'undefined')
      ? encodingAction.decode(data.encodingAction)
      : undefined,
    encodedType: (data.encodedType !== null && typeof data.encodedType !== 'undefined')
      ? { type: 'enum', value: data.encodedType, symbol: encodedType[data.encodedType] }
      : undefined,
  }),
};
