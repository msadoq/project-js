// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const sTRING = require('../ccsds_mal/sTRING');
const uINTEGER = require('../ccsds_mal/uINTEGER');
const uLONG = require('../ccsds_mal/uLONG');

module.exports = {
  encode: data => ({
    label: (data.label !== null && typeof data.label !== 'undefined')
      ? sTRING.encode(data.label)
      : null,
    address: (data.address !== null && typeof data.address !== 'undefined')
      ? uLONG.encode(data.address)
      : null,
    dataSize: (data.dataSize !== null && typeof data.dataSize !== 'undefined')
      ? uINTEGER.encode(data.dataSize)
      : null,
  }),
  decode: data => ({
    label: (data.label !== null && typeof data.label !== 'undefined')
      ? sTRING.decode(data.label)
      : undefined,
    address: (data.address !== null && typeof data.address !== 'undefined')
      ? uLONG.decode(data.address)
      : undefined,
    dataSize: (data.dataSize !== null && typeof data.dataSize !== 'undefined')
      ? uINTEGER.decode(data.dataSize)
      : undefined,
  }),
};
