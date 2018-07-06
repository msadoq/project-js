const uINTEGER = require('../ccsds_mal/uINTEGER');
const tIME = require('../ccsds_mal/tIME');
const sTRING = require('../ccsds_mal/sTRING');
const uLONG = require('../ccsds_mal/uLONG');
const pus012ParameterMonitoringDefinition = require('./pus012ParameterMonitoringDefinition');
const _map = require('lodash/map');

module.exports = {
  encode: data => ({
    serviceApid: (data.serviceApid !== null && typeof data.serviceApid !== 'undefined')
      ? uINTEGER.encode(data.serviceApid)
      : null,
    noOfParameterMonitoringDefinition: (data.noOfParameterMonitoringDefinition !== null && typeof data.serviceApid !== 'undefined')
      ? uINTEGER.encode(data.serviceApid)
      : null,
    serviceStatus: (data.serviceStatus !== null && typeof data.serviceStatus !== 'undefined')
      ? uINTEGER.encode(data.serviceStatus)
      : null,
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? tIME.encode(data.groundDate)
      : null,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? uINTEGER.encode(data.status)
      : null,
    lastUpdateModeServiceStatus: (data.lastUpdateModeServiceStatus !== null && typeof data.lastUpdateModeServiceStatus !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeServiceStatus)
      : null,
    lastUpdateTimeServiceStatus: (data.lastUpdateTimeServiceStatus !== null && typeof data.lastUpdateTimeServiceStatus !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeServiceStatus)
      : null,
    serviceApidName: (data.serviceApidName !== null && typeof data.serviceApidName !== 'undefined')
      ? sTRING.encode(data.serviceApidName)
      : null,
    uniqueId: (data.uniqueId !== null && typeof data.uniqueId !== 'undefined')
      ? uLONG.encode(data.uniqueId)
      : null,
    pus012ParameterMonitoringDefinition: _map(data.pus012ParameterMonitoringDefinition, parameterMonitoringDef => pus012ParameterMonitoringDefinition.encode(parameterMonitoringDef)),
  }),
  decode: data => ({
    serviceApid: (data.serviceApid !== null && typeof data.serviceApid !== 'undefined')
      ? uINTEGER.decode(data.serviceApid)
      : undefined,
    noOfParameterMonitoringDefinition: (data.noOfParameterMonitoringDefinition !== null && typeof data.serviceApid !== 'undefined')
      ? uINTEGER.decode(data.serviceApid)
      : undefined,
    serviceStatus: (data.serviceStatus !== null && typeof data.serviceStatus !== 'undefined')
      ? uINTEGER.decode(data.serviceStatus)
      : undefined,
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? tIME.decode(data.groundDate)
      : undefined,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? uINTEGER.decode(data.status)
      : undefined,
    lastUpdateModeServiceStatus: (data.lastUpdateModeServiceStatus !== null && typeof data.lastUpdateModeServiceStatus !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeServiceStatus)
      : undefined,
    lastUpdateTimeServiceStatus: (data.lastUpdateTimeServiceStatus !== null && typeof data.lastUpdateTimeServiceStatus !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeServiceStatus)
      : undefined,
    serviceApidName: (data.serviceApidName !== null && typeof data.serviceApidName !== 'undefined')
      ? sTRING.decode(data.serviceApidName)
      : undefined,
    uniqueId: (data.uniqueId !== null && typeof data.uniqueId !== 'undefined')
      ? uLONG.decode(data.uniqueId)
      : undefined,
    pus012ParameterMonitoringDefinition: _map(data.pus012ParameterMonitoringDefinition, parameterMonitoringDef => pus012ParameterMonitoringDefinition.decode(parameterMonitoringDef)),
  }),
};
