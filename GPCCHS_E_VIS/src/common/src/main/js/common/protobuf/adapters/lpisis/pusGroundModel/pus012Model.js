// Produced by Acceleo JavaScript Generator 1.1.0
const _map = require('lodash/map');
const pus012ParameterMonitoringDefinition = require('./pus012ParameterMonitoringDefinition');
const pusElement = require('./pusElement');

module.exports = {
  encode: data => ({
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? { value: data.apid }
      : null,
    pus012ParameterMonitoringDefinition: _map(
      data.pus012ParameterMonitoringDefinition,
      d => (pus012ParameterMonitoringDefinition.encode(d))
    ),
    noOfParameterMonitoringDefinition: (data.noOfParameterMonitoringDefinition !== null && typeof data.noOfParameterMonitoringDefinition !== 'undefined')
      ? { value: data.noOfParameterMonitoringDefinition }
      : null,
    serviceStatus: (data.serviceStatus !== null && typeof data.serviceStatus !== 'undefined')
      ? { value: data.serviceStatus }
      : null,
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? { value: data.groundDate }
      : null,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.encode(data.pusElement)
      : null,
  }),
  decode: data => ({
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? { type: 'uinteger', value: data.apid.value }
      : undefined,
    pus012ParameterMonitoringDefinition: _map(
      data.pus012ParameterMonitoringDefinition,
      d => (pus012ParameterMonitoringDefinition.decode(d))
    ),
    noOfParameterMonitoringDefinition: (data.noOfParameterMonitoringDefinition !== null && typeof data.noOfParameterMonitoringDefinition !== 'undefined')
      ? { type: 'uinteger', value: data.noOfParameterMonitoringDefinition.value }
      : undefined,
    serviceStatus: (data.serviceStatus !== null && typeof data.serviceStatus !== 'undefined')
      ? { type: 'uinteger', value: data.serviceStatus.value }
      : undefined,
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? { type: 'time', value: data.groundDate.value.toNumber() }
      : undefined,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.decode(data.pusElement)
      : undefined,
    referenceTimestamp: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
        ? { type: 'time', value: data.groundDate.value.toNumber() }
        : undefined,
  }),
};
