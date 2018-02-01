// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const flowIdentifier = require('./flowIdentifier');
const flowStatus = require('./flowStatus');

module.exports = {
  encode: data => ({
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? flowStatus.encode(data.status)
      : null,
    identifier: (data.identifier !== null && typeof data.identifier !== 'undefined')
      ? flowIdentifier.encode(data.identifier)
      : null,
  }),
  decode: data => ({
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? flowStatus.decode(data.status)
      : undefined,
    identifier: (data.identifier !== null && typeof data.identifier !== 'undefined')
      ? flowIdentifier.decode(data.identifier)
      : undefined,
  }),
};
