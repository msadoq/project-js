// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const aTTRIBUTE = require('../ccsds_mal/aTTRIBUTE');
const pusElement = require('./pusElement');
const uINTEGER = require('../ccsds_mal/uINTEGER');

module.exports = {
  encode: data => ({
    parameterId: (data.parameterId !== null && typeof data.parameterId !== 'undefined')
      ? uINTEGER.encode(data.parameterId)
      : null,
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? uINTEGER.encode(data.apid)
      : null,
    currentValue: (data.currentValue !== null && typeof data.currentValue !== 'undefined')
      ? aTTRIBUTE.encode(data.currentValue)
      : null,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.encode(data.pusElement)
      : null,
  }),
  decode: data => ({
    parameterId: (data.parameterId !== null && typeof data.parameterId !== 'undefined')
      ? uINTEGER.decode(data.parameterId)
      : undefined,
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? uINTEGER.decode(data.apid)
      : undefined,
    currentValue: (data.currentValue !== null && typeof data.currentValue !== 'undefined')
      ? aTTRIBUTE.decode(data.currentValue)
      : undefined,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.decode(data.pusElement)
      : undefined,
  }),
};
