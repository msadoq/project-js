// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const bOOLEAN = require('../ccsds_mal/bOOLEAN');

module.exports = {
  encode: data => ({
    read: (data.read !== null && typeof data.read !== 'undefined')
      ? bOOLEAN.encode(data.read)
      : null,
    changeAccessRight: (data.changeAccessRight !== null && typeof data.changeAccessRight !== 'undefined')
      ? bOOLEAN.encode(data.changeAccessRight)
      : null,
    write: (data.write !== null && typeof data.write !== 'undefined')
      ? bOOLEAN.encode(data.write)
      : null,
    execute: (data.execute !== null && typeof data.execute !== 'undefined')
      ? bOOLEAN.encode(data.execute)
      : null,
  }),
  decode: data => ({
    read: (data.read !== null && typeof data.read !== 'undefined')
      ? bOOLEAN.decode(data.read)
      : undefined,
    changeAccessRight: (data.changeAccessRight !== null && typeof data.changeAccessRight !== 'undefined')
      ? bOOLEAN.decode(data.changeAccessRight)
      : undefined,
    write: (data.write !== null && typeof data.write !== 'undefined')
      ? bOOLEAN.decode(data.write)
      : undefined,
    execute: (data.execute !== null && typeof data.execute !== 'undefined')
      ? bOOLEAN.decode(data.execute)
      : undefined,
  }),
};
