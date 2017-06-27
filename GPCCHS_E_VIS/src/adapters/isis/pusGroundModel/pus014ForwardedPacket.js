// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const bOOLEAN = require('../ccsds_mal/bOOLEAN');
const pusElement = require('./pusElement');
const uINTEGER = require('../ccsds_mal/uINTEGER');

module.exports = {
  encode: data => ({
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? uINTEGER.encode(data.apid)
      : null,
    forwardingStatus: (data.forwardingStatus !== null && typeof data.forwardingStatus !== 'undefined')
      ? bOOLEAN.encode(data.forwardingStatus)
      : null,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.encode(data.pusElement)
      : null,
  }),
  decode: data => ({
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? uINTEGER.decode(data.apid)
      : undefined,
    forwardingStatus: (data.forwardingStatus !== null && typeof data.forwardingStatus !== 'undefined')
      ? bOOLEAN.decode(data.forwardingStatus)
      : undefined,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.decode(data.pusElement)
      : undefined,
  }),
};
