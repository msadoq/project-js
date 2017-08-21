// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const pus012ParameterMonitoringDefinition = require('./pus012ParameterMonitoringDefinition');
const pusElement = require('./pusElement');
const tIME = require('../ccsds_mal/tIME');
const uINTEGER = require('../ccsds_mal/uINTEGER');

module.exports = {
  encode: data => ({
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? uINTEGER.encode(data.apid)
      : null,
    pus012ParameterMonitoringDefinition: _map(data.pus012ParameterMonitoringDefinition, d => (pus012ParameterMonitoringDefinition.encode(d))),
    noOfParameterMonitoringDefinition: (data.noOfParameterMonitoringDefinition !== null && typeof data.noOfParameterMonitoringDefinition !== 'undefined')
      ? uINTEGER.encode(data.noOfParameterMonitoringDefinition)
      : null,
    serviceStatus: (data.serviceStatus !== null && typeof data.serviceStatus !== 'undefined')
      ? uINTEGER.encode(data.serviceStatus)
      : null,
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? tIME.encode(data.groundDate)
      : null,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.encode(data.pusElement)
      : null,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? uINTEGER.encode(data.status)
      : null,
  }),
  decode: data => ({
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? uINTEGER.decode(data.apid)
      : undefined,
    pus012ParameterMonitoringDefinition: _map(data.pus012ParameterMonitoringDefinition, d => (pus012ParameterMonitoringDefinition.decode(d))),
    noOfParameterMonitoringDefinition: (data.noOfParameterMonitoringDefinition !== null && typeof data.noOfParameterMonitoringDefinition !== 'undefined')
      ? uINTEGER.decode(data.noOfParameterMonitoringDefinition)
      : undefined,
    serviceStatus: (data.serviceStatus !== null && typeof data.serviceStatus !== 'undefined')
      ? uINTEGER.decode(data.serviceStatus)
      : undefined,
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? tIME.decode(data.groundDate)
      : undefined,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.decode(data.pusElement)
      : undefined,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? uINTEGER.decode(data.status)
      : undefined,
    referenceTimestamp: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
        ? { type: 'time', value: data.groundDate.value.toNumber() }
        : undefined,
  }),
};
