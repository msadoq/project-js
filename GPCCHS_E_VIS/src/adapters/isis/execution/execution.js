// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
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
