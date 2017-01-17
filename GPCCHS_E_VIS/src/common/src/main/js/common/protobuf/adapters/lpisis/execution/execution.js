// Generated file
const _map = require('lodash/map');
const namedValue = require('../ccsds_mal/namedValue');

module.exports = {
  encode: data => ({
    launchingParameter: _map(data.launchingParameter, d => (namedValue.encode(d))),
    launchingTime: (data.launchingTime !== null && typeof data.launchingTime !== 'undefined')
      ? { value: data.launchingTime }
      : null,
  }),
  decode: data => ({
    launchingParameter: _map(data.launchingParameter, d => (namedValue.decode(d))),
    launchingTime: (data.launchingTime !== null && typeof data.launchingTime !== 'undefined')
      ? { type: 'time', value: data.launchingTime.value.toNumber() }
      : undefined,
    referenceTimestamp: (data.launchingTime !== null && typeof data.launchingTime !== 'undefined')
        ? { type: 'time', value: data.launchingTime.value.toNumber() }
        : undefined,
  }),
};

