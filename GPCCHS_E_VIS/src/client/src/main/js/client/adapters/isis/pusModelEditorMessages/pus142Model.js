// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const pus142FunctionalMonitoring = require('./pus142FunctionalMonitoring');
const sTRING = require('../ccsds_mal/sTRING');
const uINTEGER = require('../ccsds_mal/uINTEGER');
const uLONG = require('../ccsds_mal/uLONG');

module.exports = {
  encode: data => ({
    serviceStatus: (data.serviceStatus !== null && typeof data.serviceStatus !== 'undefined')
      ? uINTEGER.encode(data.serviceStatus)
      : null,
    pus142FunctionalMonitoring: _map(data.pus142FunctionalMonitoring, d => (pus142FunctionalMonitoring.encode(d))),
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? uINTEGER.encode(data.status)
      : null,
    lastUpdateModeServiceStatus: (data.lastUpdateModeServiceStatus !== null && typeof data.lastUpdateModeServiceStatus !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeServiceStatus)
      : null,
    lastUpdateTimeServiceStatus: (data.lastUpdateTimeServiceStatus !== null && typeof data.lastUpdateTimeServiceStatus !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeServiceStatus)
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
  }),
  decode: data => ({
    serviceStatus: (data.serviceStatus !== null && typeof data.serviceStatus !== 'undefined')
      ? uINTEGER.decode(data.serviceStatus)
      : undefined,
    pus142FunctionalMonitoring: _map(data.pus142FunctionalMonitoring, d => (pus142FunctionalMonitoring.decode(d))),
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? uINTEGER.decode(data.status)
      : undefined,
    lastUpdateModeServiceStatus: (data.lastUpdateModeServiceStatus !== null && typeof data.lastUpdateModeServiceStatus !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeServiceStatus)
      : undefined,
    lastUpdateTimeServiceStatus: (data.lastUpdateTimeServiceStatus !== null && typeof data.lastUpdateTimeServiceStatus !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeServiceStatus)
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
  }),
};
