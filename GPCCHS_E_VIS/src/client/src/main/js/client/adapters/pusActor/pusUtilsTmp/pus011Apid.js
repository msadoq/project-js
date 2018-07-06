const uINTEGER = require('../ccsds_mal/uINTEGER');
const tIME = require('../ccsds_mal/tIME');
const uLONG = require('../ccsds_mal/uLong');
const sTRING = require('../ccsds_mal/sTRING');
const _map = require('lodash/map');


module.exports = {
  encode: data => ({
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? uINTEGER.encode(data.apid)
      : null,
    lastUpdateModeApid: (data.lastUpdateModeApid !== null && typeof data.lastUpdateModeApid !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeApid)
      : null,
    lastUpdateTimeApid: (data.lastUpdateTimeApid !== null && typeof data.lastUpdateTimeApid !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeApid)
      : null,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? uINTEGER.encode(data.status)
      : null,
    lastUpdateModeStatus: (data.lastUpdateModeStatus !== null && typeof data.lastUpdateModeStatus !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeStatus)
      : null,
    lastUpdateTimeStatus: (data.lastUpdateTimeStatus !== null && typeof data.lastUpdateTimeStatus !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeStatus)
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
      ? tIME.decode(data.lastUpdateTimeApid)
      : undefined,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? uINTEGER.decode(data.status)
      : undefined,
    lastUpdateModeStatus: (data.lastUpdateModeStatus !== null && typeof data.lastUpdateModeStatus !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeStatus)
      : undefined,
    lastUpdateTimeStatus: (data.lastUpdateTimeStatus !== null && typeof data.lastUpdateTimeStatus !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeStatus)
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
