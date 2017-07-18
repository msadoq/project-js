// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const bOOLEAN = require('../ccsds_mal/bOOLEAN');
const sTRING = require('../ccsds_mal/sTRING');

module.exports = {
  encode: data => ({
    name: (data.name !== null && typeof data.name !== 'undefined')
      ? sTRING.encode(data.name)
      : null,
    isDefault: (data.isDefault !== null && typeof data.isDefault !== 'undefined')
      ? bOOLEAN.encode(data.isDefault)
      : null,
  }),
  decode: data => ({
    name: (data.name !== null && typeof data.name !== 'undefined')
      ? sTRING.decode(data.name)
      : undefined,
    isDefault: (data.isDefault !== null && typeof data.isDefault !== 'undefined')
      ? bOOLEAN.decode(data.isDefault)
      : undefined,
  }),
};
