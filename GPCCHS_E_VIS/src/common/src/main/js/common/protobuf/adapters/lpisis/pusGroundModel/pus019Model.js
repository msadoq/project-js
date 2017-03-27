// Produced by Acceleo JavaScript Generator 1.1.0
const _map = require('lodash/map');
const pus019EventAction = require('./pus019EventAction');
const pusElement = require('./pusElement');

module.exports = {
  encode: data => ({
    serviceStatus: (data.serviceStatus !== null && typeof data.serviceStatus !== 'undefined')
      ? { value: data.serviceStatus }
      : null,
    noOfEventActions: (data.noOfEventActions !== null && typeof data.noOfEventActions !== 'undefined')
      ? { value: data.noOfEventActions }
      : null,
    pus19EventAction: _map(data.pus19EventAction, d => (pus019EventAction.encode(d))),
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
    noOfEventActions: (data.noOfEventActions !== null && typeof data.noOfEventActions !== 'undefined')
      ? { type: 'uinteger', value: data.noOfEventActions.value }
      : undefined,
    pus19EventAction: _map(data.pus19EventAction, d => (pus019EventAction.decode(d))),
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

