// Generated file
const _map = require('lodash/map');
const pus140Parameter = require('./pus140Parameter');
const pusElement = require('./pusElement');

module.exports = {
  encode: data => ({
    pus140Parameter: _map(data.pus140Parameter, d => (pus140Parameter.encode(d))),
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? { value: data.groundDate }
      : null,
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? { value: data.apid }
      : null,
    noOfParameters: (data.noOfParameters !== null && typeof data.noOfParameters !== 'undefined')
      ? { value: data.noOfParameters }
      : null,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.encode(data.pusElement)
      : null,
  }),
  decode: data => ({
    pus140Parameter: _map(data.pus140Parameter, d => (pus140Parameter.decode(d))),
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? { type: 'time', value: data.groundDate.value.toNumber() }
      : undefined,
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? { type: 'uinteger', value: data.apid.value }
      : undefined,
    noOfParameters: (data.noOfParameters !== null && typeof data.noOfParameters !== 'undefined')
      ? { type: 'uinteger', value: data.noOfParameters.value }
      : undefined,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.decode(data.pusElement)
      : undefined,
    referenceTimestamp: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
        ? { type: 'time', value: data.groundDate.value.toNumber() }
        : undefined,
  }),
};

