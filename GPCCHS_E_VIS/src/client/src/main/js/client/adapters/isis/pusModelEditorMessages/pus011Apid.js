// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const sTRING = require('../ccsds_mal/sTRING');
const uINTEGER = require('../ccsds_mal/uINTEGER');
const uLONG = require('../ccsds_mal/uLONG');

module.exports = {
  encode: data => ({
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? uINTEGER.encode(data.apid)
      : null,
    lastUpdateModeApid: (data.lastUpdateModeApid !== null && typeof data.lastUpdateModeApid !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeApid)
      : null,
    lastUpdateTimeApid: (data.lastUpdateTimeApid !== null && typeof data.lastUpdateTimeApid !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeApid)
      : null,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? uINTEGER.encode(data.status)
      : null,
    serviceApid: (data.serviceApid !== null && typeof data.serviceApid !== 'undefined')
      ? uINTEGER.encode(data.serviceApid)
      : null,
    serviceApidName: (data.serviceApidName !== null && typeof data.serviceApidName !== 'undefined')
      ? sTRING.encode(data.serviceApidName)
      : null,
    apidName: (data.apidName !== null && typeof data.apidName !== 'undefined')
      ? sTRING.encode(data.apidName)
      : null,
    uniqueId: (data.uniqueId !== null && typeof data.uniqueId !== 'undefined')
      ? uLONG.encode(data.uniqueId)
      : null,
  }),
  decode: data => ({
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? uINTEGER.decode(data.apid)
      : undefined,
    lastUpdateModeApid: (data.lastUpdateModeApid !== null && typeof data.lastUpdateModeApid !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeApid)
      : undefined,
    lastUpdateTimeApid: (data.lastUpdateTimeApid !== null && typeof data.lastUpdateTimeApid !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeApid)
      : undefined,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? uINTEGER.decode(data.status)
      : undefined,
    serviceApid: (data.serviceApid !== null && typeof data.serviceApid !== 'undefined')
      ? uINTEGER.decode(data.serviceApid)
      : undefined,
    serviceApidName: (data.serviceApidName !== null && typeof data.serviceApidName !== 'undefined')
      ? sTRING.decode(data.serviceApidName)
      : undefined,
    apidName: (data.apidName !== null && typeof data.apidName !== 'undefined')
      ? sTRING.decode(data.apidName)
      : undefined,
    uniqueId: (data.uniqueId !== null && typeof data.uniqueId !== 'undefined')
      ? uLONG.decode(data.uniqueId)
      : undefined,
  }),
};
