// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const sTRING = require('../ccsds_mal/sTRING');
const uINTEGER = require('../ccsds_mal/uINTEGER');
const uLONG = require('../ccsds_mal/uLONG');

module.exports = {
  encode: data => ({
    paramMonId: (data.paramMonId !== null && typeof data.paramMonId !== 'undefined')
      ? uINTEGER.encode(data.paramMonId)
      : null,
    uniqueId: (data.uniqueId !== null && typeof data.uniqueId !== 'undefined')
      ? uLONG.encode(data.uniqueId)
      : null,
    serviceApid: (data.serviceApid !== null && typeof data.serviceApid !== 'undefined')
      ? uINTEGER.encode(data.serviceApid)
      : null,
    serviceApidName: (data.serviceApidName !== null && typeof data.serviceApidName !== 'undefined')
      ? sTRING.encode(data.serviceApidName)
      : null,
    lastUpdateModeId: (data.lastUpdateModeId !== null && typeof data.lastUpdateModeId !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeId)
      : null,
    lastUpdateTimeId: (data.lastUpdateTimeId !== null && typeof data.lastUpdateTimeId !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeId)
      : null,
    paramMonName: (data.paramMonName !== null && typeof data.paramMonName !== 'undefined')
      ? sTRING.encode(data.paramMonName)
      : null,
    fmonId: (data.fmonId !== null && typeof data.fmonId !== 'undefined')
      ? uINTEGER.encode(data.fmonId)
      : null,
  }),
  decode: data => ({
    paramMonId: (data.paramMonId !== null && typeof data.paramMonId !== 'undefined')
      ? uINTEGER.decode(data.paramMonId)
      : undefined,
    uniqueId: (data.uniqueId !== null && typeof data.uniqueId !== 'undefined')
      ? uLONG.decode(data.uniqueId)
      : undefined,
    serviceApid: (data.serviceApid !== null && typeof data.serviceApid !== 'undefined')
      ? uINTEGER.decode(data.serviceApid)
      : undefined,
    serviceApidName: (data.serviceApidName !== null && typeof data.serviceApidName !== 'undefined')
      ? sTRING.decode(data.serviceApidName)
      : undefined,
    lastUpdateModeId: (data.lastUpdateModeId !== null && typeof data.lastUpdateModeId !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeId)
      : undefined,
    lastUpdateTimeId: (data.lastUpdateTimeId !== null && typeof data.lastUpdateTimeId !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeId)
      : undefined,
    paramMonName: (data.paramMonName !== null && typeof data.paramMonName !== 'undefined')
      ? sTRING.decode(data.paramMonName)
      : undefined,
    fmonId: (data.fmonId !== null && typeof data.fmonId !== 'undefined')
      ? uINTEGER.decode(data.fmonId)
      : undefined,
  }),
};
