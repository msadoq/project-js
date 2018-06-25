// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const pusElement = require('./pusElement');
const uINTEGER = require('../ccsds_mal/uINTEGER');
const uOCTET = require('../ccsds_mal/uOCTET');

module.exports = {
  encode: data => ({
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? uOCTET.encode(data.status)
      : null,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.encode(data.pusElement)
      : null,
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? uINTEGER.encode(data.apid)
      : null,
  }),
  decode: data => ({
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? uOCTET.decode(data.status)
      : undefined,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.decode(data.pusElement)
      : undefined,
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? uINTEGER.decode(data.apid)
      : undefined,
  }),
};
