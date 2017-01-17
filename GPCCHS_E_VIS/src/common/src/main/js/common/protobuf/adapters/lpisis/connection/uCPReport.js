// Generated file
const _map = require('lodash/map');
const uCPParameter = require('./uCPParameter');

module.exports = {
  encode: data => ({
    date: (data.date !== null && typeof data.date !== 'undefined')
      ? { value: data.date }
      : null,
    parameters: _map(data.parameters, d => (uCPParameter.encode(d))),
  }),
  decode: data => ({
    date: (data.date !== null && typeof data.date !== 'undefined')
      ? { type: 'time', value: data.date.value.toNumber() }
      : undefined,
    parameters: _map(data.parameters, d => (uCPParameter.decode(d))),
    referenceTimestamp: (data.date !== null && typeof data.date !== 'undefined')
        ? { type: 'time', value: data.date.value.toNumber() }
        : undefined,
  }),
};

