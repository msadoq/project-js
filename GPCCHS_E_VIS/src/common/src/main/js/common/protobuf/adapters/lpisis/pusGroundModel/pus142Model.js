// Produced by Acceleo JavaScript Generator 1.1.0
const _map = require('lodash/map');
const pus142FunctionalMonitoring = require('./pus142FunctionalMonitoring');
const pusElement = require('./pusElement');

module.exports = {
  encode: data => ({
    serviceStatus: (data.serviceStatus !== null && typeof data.serviceStatus !== 'undefined')
      ? { value: data.serviceStatus }
      : null,
    noOfFunctionalMonitoring: (data.noOfFunctionalMonitoring !== null && typeof data.noOfFunctionalMonitoring !== 'undefined')
      ? { value: data.noOfFunctionalMonitoring }
      : null,
    pus142FunctionalMonitoring: _map(
      data.pus142FunctionalMonitoring,
      d => (pus142FunctionalMonitoring.encode(d))
    ),
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? { value: data.groundDate }
      : null,
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? { value: data.apid }
      : null,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.encode(data.pusElement)
      : null,
  }),
  decode: data => ({
    serviceStatus: (data.serviceStatus !== null && typeof data.serviceStatus !== 'undefined')
      ? { type: 'uinteger', value: data.serviceStatus.value }
      : undefined,
    noOfFunctionalMonitoring: (data.noOfFunctionalMonitoring !== null && typeof data.noOfFunctionalMonitoring !== 'undefined')
      ? { type: 'uinteger', value: data.noOfFunctionalMonitoring.value }
      : undefined,
    pus142FunctionalMonitoring: _map(
      data.pus142FunctionalMonitoring,
      d => (pus142FunctionalMonitoring.decode(d))
    ),
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? { type: 'time', value: data.groundDate.value.toNumber() }
      : undefined,
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? { type: 'uinteger', value: data.apid.value }
      : undefined,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.decode(data.pusElement)
      : undefined,
    referenceTimestamp: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
        ? { type: 'time', value: data.groundDate.value.toNumber() }
        : undefined,
  }),
};
